import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import ApiError from "@/app/utils/ApiError";
import ApiResponse from "@/app/utils/ApiResponse";
import { ZodError } from "zod";
import { v4 as uuidv4 } from "uuid";
import { FollowUpSchema } from "@/app/utils/schema/ZodSchema";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const validData = await req.json();
    if (!id) {
      throw new ApiError(404, "Prescription ID is not found");
    }
    
    if (!validData) {
      throw new ApiError(404, "Medicine data is not set");
    }

    const userValidData = FollowUpSchema.parse(validData);
    
    const prescription = await prisma.ePrescription.findUnique({
      where: {
        uid: id,
      },
    });

    if (!prescription) {
      throw new ApiError(404, "Prescription is not found");
    }

   
    const existingFollowUp = await prisma.followUp.findUnique({
      where: {
        eprescriptionId: prescription.uid,
      },
    });

    if (existingFollowUp) {
      
      const updatedFollowUp = await prisma.followUp.update({
        where: {
          id: existingFollowUp.id, 
        },
        data: {
          followUpDate: userValidData.followUpDate!,
          sos: userValidData.ingredients?.includes('SOS') || false,
          withReport: userValidData.ingredients?.includes('WithReports') || false,
          
        },
      });

      return NextResponse.json(
        new ApiResponse(200, "Follow-up updated successfully"),
        { status: 200 }
      );
    } else {
     
      const followUpDateId = uuidv4();
      const followUp = await prisma.followUp.create({
        data: {
          uid: followUpDateId,
          followUpDate: userValidData.followUpDate!,
          sos: userValidData.ingredients?.includes('SOS') || false,
          withReport: userValidData.ingredients?.includes('WithReports') || false,
          eprescriptionId: prescription.uid,
        },
      });

      return NextResponse.json(
        new ApiResponse(200, "Follow-up created successfully"),
        { status: 200 }
      );
    }

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
