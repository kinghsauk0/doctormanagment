import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import ApiError from "@/app/utils/ApiError";
import ApiResponse from "@/app/utils/ApiResponse";
import { ZodError } from "zod";
import {} from "@/app/utils/schema/ZodSchema";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { prescriptionIdId, findingList, investigationList, diagnosisList } = await req.json();

    if (!prescriptionIdId) {
      throw new ApiError(404, "prescriptionIdId ");
    }
    if (findingList.length <= 0) {
      throw new ApiError(404, "assessment is not found");
    }
    if (investigationList.length <= 0) {
      throw new ApiError(404, "assessment is not found");
    }
    if (diagnosisList.length <= 0) {
      throw new ApiError(404, "assessment is not found");
    }
    
    if (!prescriptionIdId) {
      throw new ApiError(404, "patient is not found!");
    }
   const  prescription = await prisma.ePrescription.findUnique({
    where: {
      uid: prescriptionIdId
    }
   })
   if (!prescription) {
    throw new ApiError(404, "patient is not found!");
  }

    await Promise.all(
        findingList.map(async (ele: any) => {
          const findingId = uuidv4();
          return prisma.finding.create({
            data: {
              uid: findingId,
              findingName: ele.findingName,
              reading: ele.reading,
              eprescriptionId: prescription.uid
            },
          });
        })
      );
    

      await Promise.all(
        findingList.map(async (ele: any) => {
          const findingId = uuidv4();
          return prisma.finding.create({
            data: {
              uid: findingId,
              findingName: ele.findingName,
              reading: ele.reading,
              eprescriptionId: prescription.uid
            },
          });
        })
      );

      await Promise.all(
        investigationList.map(async (ele: any) => {
          const investigationId = uuidv4();
          return prisma.investigation.create({
            data: {
              uid: investigationId,
              investigationName: ele.investigationName,
              reading: ele.reading,
              eprescriptionId: prescription.uid
            },
          });
        })
      );

      await Promise.all(
        diagnosisList.map(async (ele: any) => {
          const  diagnosisId = uuidv4();
          return prisma.diagnosis.create({
            data: {
              uid: diagnosisId,
              diagnosisName: ele.diagnosisName,
              reading: ele.reading,
              eprescriptionId: prescription.uid
            },
          });
        })
      );

    return NextResponse.json(
      new ApiResponse(200, "Assessment  saved successful", prescription.uid),
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
