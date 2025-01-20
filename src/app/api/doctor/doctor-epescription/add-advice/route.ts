import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import ApiError from "@/app/utils/ApiError";
import ApiResponse from "@/app/utils/ApiResponse";
import { ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";
import { console } from "inspector/promises";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const validData = await req.json();
    
    if(!id){
      throw new ApiError(404,"prescription id is not found")
    }
    
    if(!validData){
      throw new ApiError (404,"medicine data is not set")
    }
    
    const prescription = await prisma.ePrescription.findUnique({
      where: {
        uid: id
      }
    })

    if(!prescription){
      throw new ApiError(404,"prescription  is not found")
    }
    const advice = await Promise.all(
        validData.map(async (ele: any) => {
          const adviceId = uuidv4();
          return prisma.advice.create({
            data: {
              uid: adviceId,
              AdviceName: ele,
              eprescriptionId: prescription.uid
            },
          });
        })
      );

    return NextResponse.json(
      new ApiResponse(200, "medicine  saved successful",advice),
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
