import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import ApiError from '@/app/utils/ApiError';
import ApiResponse from '@/app/utils/ApiResponse';
import { resetPasswordSchema } from '@/app/utils/schema/ZodSchema';
import { PrismaClient } from '@prisma/client';
import { generateOTP } from '@/app/utils/GenerateOTP';
import { md5 } from '@/app/utils/Md';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const resetPasswordData = await req.json();
        const validatedData = resetPasswordSchema.parse(resetPasswordData);

        const user = await prisma.user.findFirst({
            where: {
                email: validatedData.email,
            },
        });

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const resetToken = md5(new Date().getTime() + validatedData.email);

        if (!resetToken) {
            throw new ApiError(404, "Reset Token is not found!");
        }

        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        const otp = generateOTP(4);
        const uid = uuidv4();

        
        const existingResetToken = await prisma.resetToken.findUnique({
            where: {
                email: user.email, 
            },
        });

        if (existingResetToken) {
           
            const updatedResetToken = await prisma.resetToken.update({
                where: {
                    email: user.email,
                },
                data: {
                    uid: uid,
                    otp: otp,
                    token: resetToken,
                    expiresAt: expirationDate,
                },
            });

            if (!updatedResetToken) {
                throw new ApiError(500, "Database error while updating reset token");
            }

            return NextResponse.json(
                new ApiResponse(200, "OTP sent successfully", {
                    token: updatedResetToken.token,
                    email: updatedResetToken.email,
                    otp: otp,
                }),
                { status: 200 }
            );
        } else {
            
            const createdResetToken = await prisma.resetToken.create({
                data: {
                    uid: uid,
                    email: user.email,
                    otp: otp,
                    token: resetToken,
                    expiresAt: expirationDate,
                },
            });

            if (!createdResetToken) {
                throw new ApiError(500, "Database error while creating reset token");
            }

            return NextResponse.json(
                new ApiResponse(200, "OTP sent successfully", {
                    token: createdResetToken.token,
                    email: createdResetToken.email,
                    otp: otp,
                }),
                { status: 200 }
            );
        }
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

        const message = (error instanceof ApiError) ? error.message : "Server Error!";
        const status = (error instanceof ApiError) ? error.statusCode : 500;

        if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2002') {
            return NextResponse.json(
                { message: "This email is already associated with another account." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message, status, },
            { status }
        );
    }
}
