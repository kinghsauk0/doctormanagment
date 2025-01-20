import { NextResponse,NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import { PatientInformationSchema, AllergiesSchema } from '@/app/utils/schema/ZodSchema';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();


export async function POST(req: NextRequest) {
    try {
       
        const formData = await req.formData();
        const uid = formData.get('uid')
       const firstName =  formData.get('firstName')
       const lastName =  formData.get('lastName')
       const age = formData.get('age')
       const email = formData.get('email')
       const gender = formData.get('gender')
       const mobile = formData.get('mobile')
       const weight =  formData.get('weight')
       const environmentalAllergies = formData.get('environmentalAllergies')
       const foodAllergies = formData.get('foodAllergies')
       const drugsAllergies =  formData.get('drugsAllergies')
       const  othersAllergies =  formData.get('othersAllergies')
       const diseaseHistoryJson = formData.get('diseaseHistory')as string
       const diseaseHistory = JSON.parse(diseaseHistoryJson) 
       const habitsJson = formData.get('habits') as string
       const habits = JSON.parse(habitsJson)
       const dateOfBirth = formData.get('dateOfBirth') as string
       
       
       const validatedData = PatientInformationSchema.parse({
        uid: uid,
        firstName: firstName,
        lastName: lastName,
        age: age,
        dateOfBirth: dateOfBirth,
        email: email,
        gender: gender,
        mobile: mobile,
        weight: weight
       })
      
       const validAllergies = AllergiesSchema.parse({
        environmentalAllergies: environmentalAllergies,
        foodAllergies: foodAllergies,
        drugsAllergies: drugsAllergies,
        othersAllergies: othersAllergies
       })
      
       const doctorExists = prisma.doctor.findUnique({
        where: {
            uid: validatedData.uid
        }
       })
     
        if(!doctorExists){
            throw new ApiError(404, "Doctor not found")
        }

        const patientId = uuidv4()
        
       const patient = await prisma.patient.create({
            data: {
                uid : patientId,
                fristName: validatedData.firstName,
                lastName: validatedData.lastName,
                dateOfBirth: validatedData.dateOfBirth,
                age: validatedData.age,
                email: validatedData.email,
                gender: validatedData.gender,
                weight: validatedData.weight,
                mobile: validatedData.mobile,
                doctorId: validatedData.uid
            }
        })
        
        if(!patient){
            throw new ApiError(404, "Patient is not found ")
        }
        const patientAllergiesId = uuidv4()
       const patientAllergies = await prisma.patientAllergies.create({
            data : {
                uid: patientAllergiesId,
                environmentalAllergie: validAllergies.environmentalAllergies,
                foodAllergie: validAllergies.foodAllergies,
                drugAllergie: validAllergies.drugsAllergies,
                othersAllergies: validAllergies.othersAllergies,
                patientId: patient.uid
                
            }
        })
      
        if(!patientAllergies){
            throw new ApiError(404, "Allergies is not found ")
        }

        
        const patientMedicalHistory = await Promise.all(
            diseaseHistory.map(async (ele: any) => {
                const patientMedicalHistoryId = uuidv4()
                return prisma.medicalHistory.createMany({
                    data: {
                        uid: patientMedicalHistoryId,
                        duration: ele.diseaseDuration,
                        related: ele.diseaseRelated,
                        patientId: patient.uid,
                        diseaseName: ele.diseaseName
                    },
                });
            })
        );

       if(!patientMedicalHistory){
         throw new ApiError(404, "Patient medical history is not found")
       }
        
       const patientHabit = await Promise.all(
        habits.map(async (ele: any) => {
            const patientHabitId = uuidv4()
            return prisma.habit.createMany({
                data: {
                    uid: patientHabitId,
                    frequency: ele.frequency,
                    duration: ele.duration,
                    patientId: patient.uid,
                    habitName: ele.habitName
                },
            });
        })
    );
     

    if(!patientHabit){
        throw new ApiError(404, "Habit is not found")
    }
   
    
       return NextResponse.json(
        new ApiResponse(200, "Patient  saved successful",patient 
            
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