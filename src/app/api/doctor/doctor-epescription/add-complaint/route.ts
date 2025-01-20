import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import ApiError from "@/app/utils/ApiError";
import ApiResponse from "@/app/utils/ApiResponse";
import { ZodError } from "zod";
import {
  complaintItemsListSchema,
  complaintName,
} from "@/app/utils/schema/ZodSchema";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { userData, name } = await req.json();
    if (!userData) {
      throw new ApiError(404, "User data  given");
    }
    if (!name) {
      throw new ApiError(404, "Patient name is not found ");
    }
    const validatedData = complaintItemsListSchema.parse(userData);
    const validName = complaintName.parse(name);
    if (!validatedData) {
      throw new ApiError(404, "User is not given valid data");
    }

    const patient = await prisma.patient.findFirst({
      where: {
        fristName: validName,
      },
      include: {
        doctor: true,
      }
    });

    if (!patient) {
      throw new ApiError(404, " Patient is not found ");
    }
    const doctor = await prisma.doctor.findUnique({
      where: {
        uid: patient.doctorId
      },include: {
        Clinic: {
          where: {
            select: 'active'
          },
        },
        specialization: true,
        patients: {
          where: {
            uid: patient.uid
          },
          include: {
            diagnosis: true
          }
        }
      },
     })
    await Promise.all(
      validatedData.map(async (ele: any) => {
        const patientComplaintId = uuidv4();
        return prisma.complaint.create({
          data: {
            uid: patientComplaintId,
            duration: ele.duration,
            complaintName: ele.complaintName,
            preiod: ele.period.name,
            patientId: patient.uid,
          },
        });
      })
    );

    if(!doctor){
      throw new ApiError(404, "doctor is dot found")
     }
     const prescriptionId = uuidv4()
      const ePrescription = await prisma.ePrescription.create({
      data: {
         uid: prescriptionId,
         doctorId: patient.doctorId,
         patientId: patient.uid
      }
     })
    return NextResponse.json(
      new ApiResponse(200, "Patient  Complaint saved successful", ePrescription.uid),
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
