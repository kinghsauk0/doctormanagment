import { NextResponse,NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import { doctorProfessionalInformation } from '@/app/utils/schema/ZodSchema';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const userData: Record<string, any> = {};
    
        formData.forEach((value, key) => {
          userData[key] = value;
        });

        const validatedData = doctorProfessionalInformation.parse(userData)
        const specializationUid = uuidv4()
        const doctorQualificationUid = uuidv4()
        
       await prisma.doctorSpecialization.create({
        data: {
            uid: specializationUid,
            specializationName: validatedData.specialization,
            doctorId: validatedData.uid
        }
       })

       await prisma.doctorQualification.create({
        data: {
            uid: doctorQualificationUid,
            qualificationName: validatedData.qualification,
            doctorId: validatedData.uid,
        }
       })

       await prisma.doctor.update({
        where: {
            uid: validatedData.uid
        },
        data: {
            medicalCouncil: validatedData.medicalCouncil,
            medicalRegistration: validatedData.registration
        }
       })


       return NextResponse.json(
        new ApiResponse(200, "Professional information saved successful", 
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