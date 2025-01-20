import exp from "constants"
import { Nullable } from "primereact/ts-helpers"
import { ReactNode } from "react"

export type SignInFromType = {
    email: string,
    password: string
}


export type ForgotPasswordFromType = {
    password: string,
    confirmPassword : string
}


export type PersonalInformationFromType = {
    name: string,
    mobile: string,
    email: string,
    gender: DropdownObject,
    dateOfBirth:  Nullable<Date>,
    address: string,
    password: string,
    confirmPassword: string,
}


export type ProfessionalInformationFromType =  {
  specialization : DropdownObject,
  qualification : string,
  registration   : string,
  medicalCouncil : string
}

export type ClinicInformationFromType = {
    name: string,
    specialization: DropdownObject,
    pinCode : string
}


export type PatientInformationType = {
    firstName: string,
    lastName: string,
    mobile: string,
    email: string,
    dateOfBirth: Nullable<Date>,
    gender: DropdownObject,
    age: string,
    weight: string
} 


export type EditPatientInformationType = {
    firstName: string,
    lastName: string,
    mobile: string,
    email: string,
    dateOfBirth: Nullable<Date>,
    gander: DropdownObject,
    age: string,
    weight: string,
    environmentalAllergies: string,
    foodAllergies: string,
    drugsAllergies: string,
    othersAllergies: string,
    
}


export type AllergiesType = {
    environmentalAllergies: string,
    foodAllergies: string,
    drugsAllergies: string,
    othersAllergies: string
}


export interface DropdownObject {
    name: string;
  }


export interface AvailabilityDayTypes {
    name: string;
} 

export type TimeType = {
    from: Nullable<Date>,
    to  : Nullable<Date>
}


export type SideBarItemTypes  = {
    id: number,
    name: string,
    path: string,
    icon: ReactNode
}



export  interface PieDataType {
    name: string;
    value: number;
    color: string;
}

export type AppointmentDataType = {
  name: string,
  contact: string,
  number: string,
  date: string,
  time: string,
  condition: string,
  fees: string,
  payment: string
}


export type PatientDataType = {
    id: string,
    name: string,
    image: string,
    patientId: string,
    age: string,
    weight: string,
    lastVisit: string,
    visitStatus: string
 }


 export type ResetPasswordOtpAndTokenDataType = {
    email: string | null,
    token: string | null,
 }

 export interface AuthContextType  {
            userId: string,
            doctorId: string
 }


 export interface AuthContextPropsType {
     user: AuthContextType | null,
    setUser: (user: AuthContextType | null) => void,
 }



 export type GetScheduleData = {
        id: number;
        uid: string;
        availabilityDays: AvailabilityDays[];
        timeFrom: string;
        timeTo: string;
        visitingType: string;
        clinicId: string;
 }

 type AvailabilityDays = {
    name: string;
};

export type ClinicScheduleListType = {
    availabilityDays: AvailabilityDays[];
    timeFrom: string;
    timeTo: string;
    visitingType: string;
};


export type UserDataType = {
    timeFrom: Nullable<Date>; 
    timeTo: Nullable<Date>;
    visitingType: string;
    availabilityDays: AvailabilityDayTypes | null; 
};


export interface DiseaseHistoryType {
    diseaseName: string;
    diseaseDuration: string;
    diseaseRelated: string;
}


export interface HabitsType {
    habitName: string,
    frequency: string,
    duration  : string
}

export type PatientResType= {
    age: string;
    allergies: Allergy;
    createdAt: string;
    email: string;
    fristName: string;
    lastName: string;
    gender: string;
    habit: Habit[];
    id: number;
    medicalHistory: MedicalHistory[];
    mobile: string;
    status: string;
    uid: string;
    updatedAt: string;
    weight: string;
    dateOfBirth: string
    
}

export interface Allergy {
    id: number;
    uid: string;
    drugAllergie: string;
    environmentalAllergie: string;
    foodAllergie: string;
    othersAllergies?: string; 
    patientId: string;
  }
  
  export interface Habit {
    id: number;
    uid: string;
    frequency: string;
    duration: string;
    patientId: string;
    habitName: string
  }
  
  export interface MedicalHistory {
    id: number;
    uid: string;
    duration: string;
    related: string;
    patientId: string;
    diseaseName : string
  }

  export interface DoctorResType {
    id: number;
    uid: string;
    name: string;
    email: string;
    mobile: string;
    address: string;
    created_at: string; 
    updated_at: string; 
    dateOfBirth: string; 
    gender: 'male' | 'female' | 'other'; 
    image: string | null;
    medicalCouncil: string;
    medicalRegistration: string;
    status:  "active"| "inactive" | "deleted"
    userId: string;
  }


  export interface Complaint {
    complaintName: string;
    duration: string;
    period: string; 
  }


  export interface Finding {
        findingName :String
        reading: string
  }

  export interface Investigationtype {
    investigationName :String
    reading: string
}

export interface DiagnosisType {
    diagnosisName :String
    reading: string
}

export interface TableRow {
    medication: string;
    dosage: string;
    regimen: string;
    duration: string;
    remarks: string;
}


interface Clinic {
    clinicName: string;
    clinicSpecialization: string;
    createdAt: string;
    doctorId: string;
    gps: string | null;
    id: number;
    pinCode: string;
    select: string;
    uid: string;
    updatedAt: string;
    address: string;
  }
  
  interface diagnosis
  {
    diagnosisName: string;
    eprescriptionId: string | null;
    id: number;
    patientId: string;
    reading: string;
    uid: string;
  }
  
  interface patients
  {
    age: string;
    createdAt: string;
    dateOfBirth: string;
    deleted_at: string | null;
    diagnosis: diagnosis[];
    doctorId: string;
    email: string;
    fristName: string;
    gender: string;
    id: number;
    lastName: string;
    mobile: string;
    status: string;
    uid: string;
    updatedAt: string;
    weight: string;
  }
  
  interface specialization
  {
    id: number;
    uid: string;
    specializationName: string;
    specializationDescription: string | null;
    doctorId: string;
  }
  
  export interface DoctorResponse {
    address: string;
    created_at: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    id: number;
    image: string | null;
    medicalCouncil: string;
    medicalRegistration: string;
    mobile: string;
    name: string;
    patients: patients[];
    specialization: specialization[];
    status: string;
    uid: string;
    updated_at: string;
    userId: string;
    Clinic: Clinic[];
  }

  export interface MedicineData {
    dosageType: string;
    brand: string;
    dose: string;
    regimen: string;
    consume: string;
    duration: string;
    period: string;
    startMedication: string;
    medicineNote: string
  }

  export interface MedicineDataRes {
    MedicationNotes: string;
    brand: string;
    chooseDose: string;
    consume: string;
    dosegeType: string;
    duration: string;
    eprescriptionId: string;
    id: number;
    period: string;
    regimen: string;
    startmedication: string;
    uid: string;
  };



  interface Doctor {
    id: number;
    uid: string;
    name: string;
    email: string;
    mobile: string;
    image: string | null;
    gender: string;
    dateOfBirth: string;
    address: string;
    medicalRegistration: string;
    medicalCouncil: string;
    status: string;
    created_at: string;
    updated_at: string;
    userId: string;
    Clinic: Clinic[];
  }
  
  interface Clinic {
    id: number;
    uid: string;
    clinicName: string;
    clinicSpecialization: string;
    pinCode: string;
    gps: string | null;
    select: string;
    doctorId: string;
    createdAt: string;
    updatedAt: string;
  }
  
  interface Patient {
    id: number;
    uid: string;
    fristName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    age: string;
    gender: string;
    weight: string;
    mobile: string;
    status: string;
    doctorId: string;
    createdAt: string;
    updatedAt: string;
    deleted_at: string | null;
  }
  
  interface Medicine {
    id: number;
    uid: string;
    dosegeType: string;
    brand: string;
    chooseDose: string;
    regimen: string;
    consume: string;
    duration: string;
    period: string;
    startmedication: string;
    MedicationNotes: string;
    eprescriptionId: string;
  }
  
  interface Advice {
    id: number;
    uid: string;
    AdviceName: string;
    eprescriptionId: string;
  }
  
  interface Investigation {
    id: number;
    uid: string;
    investigationName: string;
    reading: string;
    patientId: string | null;
    eprescriptionId: string;
  }
  
  interface Note {
    id: number;
    uid: string;
    note: string;
    eprescriptionId: string;
  }
  
  interface LabTest {
    id: number;
    uid: string;
    labTestName: string;
    eprescriptionId: string;
  }

  interface Diagnosis {
    diagnosisName: string;
    eprescriptionId: string;
    id: number;
    patientId: string | null;
    reading: string;
    uid: string;
  }

  interface FollowUp {
    id: number; 
    uid: string; 
    followUpDate: string; 
    sos: boolean; 
    withReport: boolean; 
    eprescriptionId: string; 
  }
  
  export interface PrescriptionResponse {
    id: number;
    uid: string;
    patientId: string;
    doctorId: string;
    prescribedDate: string;
    doctor: Doctor;
    patient: Patient;
    diagnosis: Diagnosis[]|null
    followUp: FollowUp| null
    medicine: Medicine[] | null;
    advice: Advice[] | null;
    investigation: Investigation[] | null;
    note: Note[] | null;
    labTest: LabTest[] | null;
  }

  export interface FollowUpType {
    followUpDate: string;
    ingredients?: string[] ; 
  }


  
  
