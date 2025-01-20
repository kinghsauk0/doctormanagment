import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
         
        if(!id){
            throw new ApiError(404, "Patient id not found ")
        }
        const  existPatient = await prisma.patient.findUnique({
            where: {
                uid: id,
                status: "active"
            }
        })


        if(!existPatient){
            throw new ApiError(404, "Patient id  found ")
        }


        await prisma.patient.update({
            where: {
                uid: id,
            },
            data: {
                status: 'deleted',
                deleted_at: new Date(),
            }
        })
        return NextResponse.json(
            new ApiResponse(200, "Patient deleted successfully"),
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

        if (typeof error === 'object' && error !== null && 'code' in error && (error as any).code === 'P2002') {
            return NextResponse.json(
                { message: "This email is already associated with another account." },
                { status: 400 }
            );
        }

        const message = (error instanceof ApiError) ? error.message : "Server Error!";
        const status = (error instanceof ApiError) ? error.statusCode : 500;

        return NextResponse.json(
            { message, status },
            { status }
        );
    }
}
