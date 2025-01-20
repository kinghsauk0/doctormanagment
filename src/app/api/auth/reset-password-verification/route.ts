
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import ApiError from '@/app/utils/ApiError';
import ApiResponse from '@/app/utils/ApiResponse';
import   {otpVerifiedUserSchema}   from '@/app/utils/schema/ZodSchema'
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient()



export async function POST(req: NextRequest) {
    try {
        const otpData = await req.json();
        const validatedData = otpVerifiedUserSchema.parse(otpData);
        const verifiedAt = new Date();

        const isValid = await prisma.resetToken.findFirst({
            where: {
                token: validatedData.token,
                otp: validatedData.otp,
                isVerified: false,
            },
        });

        if (!isValid) {
            throw new ApiError(400, "Invalid OTP or token");
        }

        if (isValid.expiresAt < verifiedAt) {
            throw new ApiError(404, "OTP expired");
        }

        
        const user = await prisma.user.findFirst({
            where: {
                email: isValid.email
            }
        })

        if(!user){
           throw new ApiError(404,"Invalid user credentials")
        }

        const { password, ...userWithoutPassword } = user;
        
        return NextResponse.json(
            new ApiResponse(200, "Otp verified successful", userWithoutPassword),
            { status: 200 }
        );
        
       
    } catch (error: unknown) {
        console.log(error);

        if (error instanceof ZodError) {
            const formattedErrors = error.errors.map(e => ({
                path: e.path.join('.'),
                message: e.message,
            }));
            return NextResponse.json(
                { errors: formattedErrors },
                { status: 400 }
            );
        }

        const message = error instanceof ApiError ? error.message : "Server Error!";
        const status = error instanceof ApiError ? error.statusCode : 500;

        if (typeof error === "object" && error !== null && "code" in error && (error as any).code === "P2002") {
            return NextResponse.json(
                { message: "This email is already associated with another account." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message, status },
            { status }
        );
    }
}