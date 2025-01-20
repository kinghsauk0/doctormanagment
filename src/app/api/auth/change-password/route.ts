
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import ApiError from '@/app/utils/ApiError';
import ApiResponse from '@/app/utils/ApiResponse';
import { createPasswordUserSchema } from '@/app/utils/schema/ZodSchema';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';


const prisma = new PrismaClient()



export async function POST(req: NextRequest) {
     try {
        
        const passwordData = await req.json();
        const validatedData = createPasswordUserSchema.parse(passwordData);
        console.log(validatedData)
        if(validatedData.newPassword !== validatedData.confirmPassword){
            throw new ApiError(404, "Password do not match")
        }
       const user = await prisma.user.findUnique({
        where: {
            email: validatedData.email,
            
        }
       })

       if(!user){
        throw new ApiError(404, "User is not found")
       }


       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(validatedData.newPassword, salt);

       await  prisma.user.update({
        where: {email: user.email}
        ,data: {
            password: hashedPassword
        }
       })

       return NextResponse.json(
        new ApiResponse(200, "Password is changed", 
            
        ),
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