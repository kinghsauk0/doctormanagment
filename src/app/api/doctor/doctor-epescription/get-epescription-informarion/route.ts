import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import ApiError from "@/app/utils/ApiError";
import ApiResponse from "@/app/utils/ApiResponse";
import { ZodError } from "zod";



const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if(!id){
        throw new ApiError(404," id is not found ")
    }

    const prescribedData = await prisma.ePrescription.findUnique({
       where: {
        uid: id,
       },include: {
        patient: {
          include: {
            diagnosis: true,
            investigation: true,
            
          }
        },
        doctor: {
          include: {
            Clinic: true
          }
        },
       }
    })
    

    if(!prescribedData){
      throw new ApiError(404, "Prescription  not found")
    }

    
    /*const doctorData = await prisma.doctor.findUnique({
      where: {
        uid: id
      },include: {
        eprescription: true
      }
    })

    if(!doctorData?.uid){
      throw new ApiError(404,"Doctor id is not found")
    }
    
    console.log(doctorData)*/

   
    return NextResponse.json(
      new ApiResponse(200, "eprescription  created  successful"),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));
      return NextResponse.json({ errors: formattedErrors }, { status: 400 });
    }

    const message = error instanceof ApiError ? error.message : "Server Error!";
    const status = error instanceof ApiError ? error.statusCode : 500;

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as any).code === "P2002"
    ) {
      return NextResponse.json(
        { message: "This email is already associated with another account." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message, status }, { status });
  }
}
