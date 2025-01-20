import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import { signInUserSchema } from '@/app/utils/schema/ZodSchema';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Correctly define the runtime for the route
export const runtime = 'edge'; // Use 'node' if you're not using edge runtime

export async function POST(req: NextRequest) {
    try {
        const signInData = await req.json();

        // Validate the request payload
        const validatedData = signInUserSchema.parse(signInData);

        // Fetch the user from the database
        const user = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
            include: {
                doctor: true,
            },
        });

        // Check if user exists
        if (!user) {
            throw new ApiError(404, 'User does not exist');
        }

        // Validate the password
        const isValidPassword = await bcrypt.compare(validatedData.password, user.password);

        if (!isValidPassword) {
            throw new ApiError(401, 'Invalid email or password');
        }

        // Exclude the password field before sending the response
        const { password, ...userWithoutPassword } = user;

        return NextResponse.json(
            new ApiResponse(200, 'Sign in successful', userWithoutPassword),
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error(error);

        if (error instanceof ZodError) {
            const formattedErrors = error.errors.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
            }));
            return NextResponse.json(
                { errors: formattedErrors },
                { status: 400 }
            );
        }

        const message = error instanceof ApiError ? error.message : 'Server Error!';
        const status = error instanceof ApiError ? error.statusCode : 500;

        // Handle Prisma unique constraint violation error (P2002)
        if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2002') {
            return NextResponse.json(
                { message: 'This email is already associated with another account.' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message, status },
            { status }
        );
    }
}
