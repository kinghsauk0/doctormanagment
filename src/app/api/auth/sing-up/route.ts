import { NextResponse,NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { generateOTP } from '@/app/utils/GenerateOTP';
import bcrypt from 'bcryptjs';
import ApiError from '@/app/utils/ApiError';
import { registrationSchema } from '@/app/utils/schema/ZodSchema';
import { md5 } from '@/app/utils/Md';
import { v4 as uuidv4 } from 'uuid';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';


const prisma = new PrismaClient();

export const config = {
    api: {
      bodyParser: false,
    },
  }

export async function POST(req: NextRequest) {
    try {
        
        const formData = await req.formData();
        const userData: Record<string, any> = {};
    
        formData.forEach((value, key) => {
          userData[key] = value;
        });
        
        const validatedData = registrationSchema.parse(userData);



        const userExists = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: validatedData.email },
                    { mobile: validatedData.mobile },
                ],
            },
        });

        if (userExists) {
            throw new ApiError(400, "User already exists");
        }

        if (validatedData.password !== validatedData.confirmPassword) {
           throw new ApiError(400,"Password is not match ")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedData.password, salt);
        
        const resetToken = md5(new Date().getTime() + validatedData.mobile);
        
        if (!resetToken) {
            throw new ApiError(404, "Reset Token is not found!");
        }
        
        const otp = generateOTP(4);
        const expirationDate = new Date();
        expirationDate.setMinutes(expirationDate.getMinutes() + 10);

        const isTempDoctor = await prisma.tempDoctor.findFirst({
            where: { email: validatedData.email }
        });

        if (isTempDoctor) {
            await prisma.tempDoctor.delete({
                where: { email: validatedData.email },
            });
        }
       
        const doctorUid = uuidv4();
        const userUid = uuidv4()


        const formattedDateOfBirth = new Date(validatedData.dateOfBirth).toISOString();

        const createTempDoctor = await prisma.resetToken.create({
            data: {
                uid: userUid,
                email: validatedData.email,
                otp: otp,
                token: resetToken,
                expiresAt: expirationDate,
                TempDoctor: {
                    create: {
                        uid: doctorUid,
                        name: validatedData.name,
                        email: validatedData.email,
                        mobile: validatedData.mobile,
                        gender: validatedData.gender,
                        password: hashedPassword,
                        dateOfBirth: formattedDateOfBirth,
                        address: validatedData.address
                    },
                },
            },
        });

        if (!createTempDoctor) {
            throw new ApiError(404, "Temp doctor is not created");
        }

        return NextResponse.json(
            new ApiResponse(200, "Registration successful", createTempDoctor),
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