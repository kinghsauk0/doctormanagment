
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import ApiError from '@/app/utils/ApiError';
import ApiResponse from '@/app/utils/ApiResponse';
import   {resetOptUserSchema}   from '@/app/utils/schema/ZodSchema'
import { PrismaClient } from '@prisma/client';
import { generateOTP } from '@/app/utils/GenerateOTP';

const prisma = new PrismaClient()



export async function POST(req: NextRequest) {
     try {
        
        const otpData = await req.json()
        const validatedData = resetOptUserSchema.parse(otpData)
        
        const tokenData  = await prisma.resetToken.findUnique({
            where: { 
                token: validatedData.token,
                isVerified: false,
                expiresAt: {
                gte: new Date(),
                  },
            }
        })

        if(!tokenData){
            throw new ApiError(404,"Otp resend failed")
        }
        
        const otp = generateOTP(4)
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 10);
        
       const updatedToken = await prisma.resetToken.update({
        where: {
            uid: tokenData.uid
        }, data: {
            otp: otp,
            expiresAt: expirationDate,
        }
       }) 

      if(!updatedToken){
        throw new ApiError(501,"Server error")
      }

      return NextResponse.json(
        new ApiResponse(200, "OTP sent successfully",{
            token: tokenData.token,
            email: tokenData.email,
            otp,
        }),
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