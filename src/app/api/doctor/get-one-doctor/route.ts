import { NextResponse,NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';


const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if(!id){
            throw new ApiError(404,"Doctor id is not found")
        }
        const existedDoctor = await prisma.doctor.findUnique({
            where: {
                uid: id
            },
        })
        
        if(!existedDoctor){
            throw new ApiError (404, "Doctor  not found")
        }
        
       return NextResponse.json(
        new ApiResponse(200, "Professional information saved successful", existedDoctor
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