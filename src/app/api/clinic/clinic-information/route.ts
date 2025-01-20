import { NextResponse,NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import { clinicInformation, clinicScheduleSchema } from '@/app/utils/schema/ZodSchema';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        
        const uid = formData.get('uid') as string;
        const clinicName = formData.get('clinicName') as string;
        const clinicSpecialization = formData.get('clinicSpecialization') as string;
        const pinCode = formData.get('pinCode') as string;
        
       
        const clinicScheduleListJson = formData.get('clinicScheduleList') as string;
        const clinicScheduleList = JSON.parse(clinicScheduleListJson);
       const validatedData = clinicInformation.parse({
        uid,
        clinicName,
        clinicSpecialization,
        pinCode,
       })
      

       const doctorExists = await prisma.doctor.findUnique({
        where: { uid: validatedData.uid },
    });
    
    if (!doctorExists) {
        throw new ApiError(404, "Doctor not found.");
    }
    
  
    const existingClinic = await prisma.clinic.findUnique({
        where: { doctorId: doctorExists.uid },
    });
    
    if (existingClinic) {
        throw new ApiError(400, "A clinic already exists for this doctor.");
    }
    
    const clinicId = uuidv4();
    const createClinic = await prisma.clinic.create({
        data: {
            uid: clinicId,
            clinicName: validatedData.clinicName,
            clinicSpecialization: validatedData.clinicSpecialization,
            pinCode: validatedData.pinCode,
            doctorId: doctorExists.uid,
        },
    });
    

    if (!createClinic) {
        throw new ApiError(404, "Clinic is not created.");
    }

   
    const clinicSchedules = await Promise.all(
        clinicScheduleList.map(async (ele: any) => {
            const clinicScheduleId = uuidv4(); 
            return prisma.clinicSchedule.createMany({
                data: {
                    uid: clinicScheduleId,
                    timeFrom: ele.timeFrom,
                    timeTo: ele.timeTo, 
                    visitingType: ele.visitingType,
                    availabilityDays: ele.availabilityDays,
                    doctorId: doctorExists.uid,
                    clinicId: createClinic.uid,
                },
            });
        })
    );

       return NextResponse.json(
        new ApiResponse(200, "Clinic information saved successful", 
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