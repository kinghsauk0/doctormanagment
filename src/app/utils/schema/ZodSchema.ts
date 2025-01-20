import { z } from 'zod';



export const registrationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    mobile: z.string().length(10, "The number must be exactly 10 digits"),
    gender: z.string().min(1,"Gender is required"),
    password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
   confirmPassword: z.string()
   .min(8, "Password must be at least 8 characters long")
   .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
   .regex(/[a-z]/, "Password must contain at least one lowercase letter")
   .regex(/[0-9]/, "Password must contain at least one number")
   .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }),
    address: z.string().min(6, "address is required"),
    image: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: "Image size must be less than 5MB" })
        .refine((file) => ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type), {
            message: "Only .jpg, .jpeg, or .png files are allowed",
        })
        .optional(),  
});



export  const otpVerifiedUserSchema = z.object({
    token: z.string(),
    otp: z.string(),
});

export const resetOptUserSchema = z.object({
    token: z.string()
})

export const signInUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email format"),
})


export const createPasswordUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    newPassword: z.string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    confirmPassword: z.string()
    .min(8, "Confirm Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Confirm Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Confirm Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Confirm Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Confirm Password must contain at least one special character")
})


export const doctorProfessionalInformation = z.object({
    uid: z.string().uuid("Invalid UID format"), 
    specialization: z.string().min(1, "Specialization is required"),
    qualification: z.string().min(1, "Qualification is required"),
    registration: z.string().min(1, "Registration is required"),
    medicalCouncil: z.string().min(1, "Medical Council is required"),
});

export const availabilityDaySchema = z.object({
  name: z.string().min(1, "Day name is required"),
});

export const clinicScheduleSchema = z.object({
  availabilityDays: z.array(availabilityDaySchema).min(1, "At least one availability day is required"),
  
  timeFrom: z.union([z.string(), z.date()]).refine((date) => {
    return typeof date === 'string' ? !isNaN(Date.parse(date)) : date instanceof Date;
  }, {
    message: "Invalid date format for 'timeFrom'",
  }),

  timeTo: z.union([z.string(), z.date()]).refine((date) => {
    return typeof date === 'string' ? !isNaN(Date.parse(date)) : date instanceof Date;
  }, {
    message: "Invalid date format for 'timeTo'",
  }),

  visitingType: z.string().min(1, "Visiting type is required"),
});

export const clinicInformation = z.object({
    uid: z.string().uuid("Invalid UID format"), 
    clinicName: z.string().min(1, " Clinic name is required"),
    clinicSpecialization: z.string().min(1, "Clinic specialization is required"),
    pinCode: z.string().min(1, "Pin code is required"),
   
});

export const logOutSchema = z.object({
  uid: z.string().ulid("Invalid UID format")
})

export const DiseaseHistorySchema = z.object({
    diseaseName: z.string().min(1, "Disease Name is required"),
    diseaseDuration: z.string().min(1,  "Disease duration is required"),
    diseaseRelated: z.string().min(1, "Relation is required")
})

export const HabitSchema = z.object({
  habitName: z.string().min(1,"Habit name  is required"),
  habitFrequency : z.string().min(1, "Habit frequency is required"),
  habitDuration : z.string().min(1, "Habit duration is required")
})


export const  PatientInformationSchema = z.object({
  uid: z.string().uuid("Invalid UID format"),
  firstName: z.string().min(1,"Patient first name  is required"),
  lastName: z.string().min(1,"Patient first name  is required"),
  dateOfBirth: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format"
}),
  age: z.string().min(1, "Age is required"),
  email: z.string().email("Invalid email format"),
  gender: z.string().min(1, "Gender is required"),
  mobile: z.string().length(10, "The number must be exactly 10 digits"),
  weight: z.string().min(1,"Weight is required")
})


export const AllergiesSchema =  z.object({
  environmentalAllergies: z.string().min(1,"Environmental allergies is required"),
  foodAllergies: z.string().min(1,"Food allergies is required"),
  drugsAllergies: z.string().min(1,"Drug allergies is required"),
  othersAllergies: z.string().min(1,"OthersAllergies allergies is required")
})

export const complaintName =  z.string()
export const ComplaintItemSchema = z.object({
  complaintName: z.string(), 
  duration: z.string(), 
  period: z.object({
    name: z.string()
  })
});

export const complaintItemsListSchema = z.array(ComplaintItemSchema)

export const medicationSchema = z.object({
  dosageType: z.string().nonempty("Dosage type is required"),
  brand: z.string().nonempty("Brand is required"),
  dose: z.string().nonempty("Dose is required"),
  regimen: z.string().nonempty("Regimen is required"),
  consume: z.string().nonempty("Consume is required"),
  duration: z.string().nonempty("Duration is required"),
  period: z.string().nonempty("Period is required"),
  startMedication: z.string().nonempty("startMedication is required"),
  medicineNote: z.string().nonempty("Note is required"),
});


export const addMedicationSchema = z.array(medicationSchema)


export const labTestSchema = z.string().min(1,"At least one lab test is required")
export const addLabTestSchema = z.array(z.string()).min(1, "At least one lab test is required");
export const noteSchema = z.string().min(1,"At least one note is required")
export const adviceSchema = z.string().min(1,"At least one Advice is required")
export const addAdviceSchema = z.array(z.string()).min(1, "At least one advice is required");


export const FollowUpSchema = z.object({
  followUpDate: z.string(),   
  ingredients: z.array(z.string()).optional(),     
});