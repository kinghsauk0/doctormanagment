import { NextResponse,NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';



const prisma = new PrismaClient();


export async function GET(req: NextRequest) {
    try {
        
        const { searchParams } = new URL(req.url);
    
       
        const limit = searchParams.get('limit') || '10'; 
        const page = searchParams.get('page') || '1';
        const id  = searchParams.get('id')
        if(!id){
            throw new ApiError (404, "Patient id is not passing")
        }
        const skip = (Number(page) - 1) * Number(limit);
        
        const totalCount = await prisma.ePrescription.count({
            where: {
                patientId: id,
                prescribtionSatus: 'success', 
            },
        });

        const prescriptions = await prisma.ePrescription.findMany({
            where: {
                patientId: id,
            },
            skip,
            take: Number(limit),
            include: {
                complaint: true,
                patient: true,
            },
        });
      
   
       return NextResponse.json(
        new ApiResponse(200, "prescriptions data successful", {totalCount,prescriptions}
            
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