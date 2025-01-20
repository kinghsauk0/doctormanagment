import { NextResponse,NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import { clinicInformation } from '@/app/utils/schema/ZodSchema';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';

const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
    try {
        
        const doctorId = await req.json();

        if(!doctorId){
            throw new ApiError(404,"clinic id is not found")
        }
        
        const clinicSchedule = await prisma.clinicSchedule.findFirst({
            where: {
                doctorId: doctorId
            }, 
        })
       
        if(!clinicSchedule){
            throw new ApiError(404, "Clinic schedule is not found")
        }
        
       return NextResponse.json(
        new ApiResponse(200, "Clinic schedule fetch successful",clinicSchedule 
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