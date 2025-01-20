import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import ApiError from '@/app/utils/ApiError';
import { PatientInformationSchema, AllergiesSchema } from '@/app/utils/schema/ZodSchema';
import ApiResponse from '@/app/utils/ApiResponse';
import { ZodError } from 'zod';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
    try {
        const formData = await req.formData();

        const uid = formData.get('uid') as string | null;
        const firstName = formData.get('firstName') as string | null;
        const lastName = formData.get('lastName') as string | null;
        const age = formData.get('age') as string | null;
        const email = formData.get('email') as string | null;
        const gender = formData.get('gender') as string | null;
        const mobile = formData.get('mobile') as string | null;
        const weight = formData.get('weight') as string | null;
        const environmentalAllergies = formData.get('environmentalAllergies') as string | null;
        const foodAllergies = formData.get('foodAllergies') as string | null;
        const drugsAllergies = formData.get('drugsAllergies') as string | null;
        const othersAllergies = formData.get('othersAllergies') as string | null;
        const diseaseHistoryJson = formData.get('diseaseHistory') as string;
        const diseaseHistory = JSON.parse(diseaseHistoryJson);
        const habitsJson = formData.get('habits') as string;
        const habits = JSON.parse(habitsJson);
        const dateOfBirth = formData.get('dateOfBirth') as string | null;
        

        if(habits.length > 0){
            throw new ApiError(400,"User must fill the habits") 
        }
        if(diseaseHistory.length > 0){
            throw new ApiError(400,"User must fill the history")  
        }
        const validatedData = PatientInformationSchema.parse({
            uid: uid,
            firstName: firstName,
            lastName: lastName,
            age: age,
            dateOfBirth: dateOfBirth,
            email: email,
            gender: gender,
            mobile: mobile,
            weight: weight,
        });

        const validAllergies = AllergiesSchema.parse({
            environmentalAllergies: environmentalAllergies,
            foodAllergies: foodAllergies,
            drugsAllergies: drugsAllergies,
            othersAllergies: othersAllergies,
        });

       await prisma.patient.update({
            where: { uid: uid! },
            data: {
                    uid: validatedData.uid,
                    fristName: validatedData.firstName,
                    lastName: validatedData.lastName,
                    age: validatedData.age,
                    dateOfBirth: validatedData.dateOfBirth,
                    email: validatedData.email,
                    gender: validatedData.gender,
                    weight: validatedData.weight,
            }
        });

        await prisma.patientAllergies.update({
            where: {
                patientId: uid!
            },
            data: {
                environmentalAllergie: validAllergies.environmentalAllergies,
                foodAllergie: validAllergies.foodAllergies,
                drugAllergie: validAllergies.drugsAllergies,
                othersAllergies: validAllergies.othersAllergies
            }
        })

       diseaseHistory.map(async (ele: any) => {
           if(ele.uid === null || undefined ){
             await Promise.all(
                diseaseHistory.map(async (his : any) => {
                    const diseaseHistoryUid = uuidv4()
                    await prisma.medicalHistory.createMany({
                        data: {
                            uid: diseaseHistoryUid,
                            diseaseName: his.diseaseName,
                            duration: his.diseaseDuration,
                           related: his.diseaseRelated,
                           patientId: uid!
                        }
                    })
                })
             )
           }else{
            await Promise.all(
                diseaseHistory.map(async (his: any) => {
                    await prisma.medicalHistory.upsert({
                        where: {
                            uid: his.uid, 
                        },
                        update: {
                            uid:his.uid,
                           diseaseName: his.diseaseName,
                           duration: his.diseaseDuration,
                           related: his.diseaseRelated
                        },
                        create: {
                            uid:his.uid,
                           diseaseName: his.diseaseName,
                           duration: his.diseaseDuration,
                           related: his.diseaseRelated,
                            patientId: uid!
                        }
                    });
                })
            );
           }
        })


        habits.map(async (ele: any) => {
            if(ele.uid === null || undefined ){
              await Promise.all(
                 diseaseHistory.map(async (habit : any) => {
                     const habitUid = uuidv4()
                     await prisma.habit.createMany({
                         data: {
                           uid: habitUid,
                           frequency: habit.frequency,
                        duration: habit.duration,
                        habitName: habit.habitName,
                        patientId: uid!
                         }
                     })
                 })
              )
            }else{
                await Promise.all(
                    habits.map(async (habit: any) => {
                        await prisma.habit.upsert({
                            where: {
                                uid: habit.uid,
                            },
                            update: {
                                frequency: habit.frequency,
                                duration: habit.duration,
                                habitName: habit.habitName
                            },
                            create: {
                                uid: habit.uid,
                                frequency: habit.frequency,
                                duration: habit.duration,
                                habitName: habit.habitName,
                                patientId: uid!
                            }
                        });
                    })
                );
            }
         })
 
        return NextResponse.json(
            new ApiResponse(200, "Patient updated successfully"),
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
