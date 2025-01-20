"use client";
import React, { use, useEffect, useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import Assessment from "../Assessment/Assessment";
import useMobile from "@/app/hooks/isMobileHook";
import { axiosService } from "@/app/services/axios.service";
import { PatientResType, DropdownObject, Complaint } from "@/app/types";
import { useApp } from "@/app/context/AppProvider";
import { ZodError } from "zod";
import { getCookie } from "@/app/services/cookie.service";


type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  
};

export default function ChiefComplaints({ visible, setVisible}: Props) {
  const isMobile = useMobile();
  const { app } = useApp();
  const [selectedChief, setSelectedChief] = useState<DropdownObject | null>(
    null
  );
  const [complaintItemsList, setComplaintItemsList] = useState<Complaint[]>([])
  const [chiefComplaintList, setChiefComplaintList] = useState<
    DropdownObject[]
  >([]);
  const [patientData, setPatientData] = useState<PatientResType[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [durations, setDurations] = useState<string[]>([]);
  const [prescriptionId, setPrescriptionId] = useState<string | null>(null)
  const [id,setId] = useState<string | null>(null)

  useEffect(() => {
    const token = getCookie("doctorId"); 
    setId(token!)
    console.log(token)
    
}, [id]);
  const chiefs = [
    // Respiratory Conditions
    { name: "Common Cold" },
    { name: "Flu (Influenza)" },
    { name: "Bronchitis" },
    { name: "Asthma" },
    { name: "Pneumonia" },
    { name: "Chronic Obstructive Pulmonary Disease (COPD)" },
    { name: "Sinusitis" },
  
    // Cardiovascular Diseases
    { name: "Hypertension (High Blood Pressure)" },
    { name: "Coronary Artery Disease (CAD)" },
    { name: "Heart Failure" },
    { name: "Arrhythmia" },
    { name: "Peripheral Artery Disease (PAD)" },
  
    // Gastrointestinal Disorders
    { name: "Gastroesophageal Reflux Disease (GERD)" },
    { name: "Irritable Bowel Syndrome (IBS)" },
    { name: "Gastritis" },
    { name: "Constipation" },
    { name: "Diarrhea" },
    { name: "Peptic Ulcer Disease" },
  
    // Musculoskeletal Disorders
    { name: "Osteoarthritis" },
    { name: "Rheumatoid Arthritis" },
    { name: "Gout" },
    { name: "Back Pain" },
    { name: "Tendonitis" },
    { name: "Fibromyalgia" },
  
    // Endocrine Disorders
    { name: "Diabetes Mellitus (Type 1 & Type 2)" },
    { name: "Hypothyroidism" },
    { name: "Hyperthyroidism" },
    { name: "Polycystic Ovary Syndrome (PCOS)" },
  
    // Skin Conditions
    { name: "Acne" },
    { name: "Eczema" },
    { name: "Psoriasis" },
    { name: "Dermatitis" },
    { name: "Fungal Infections (e.g., Athlete's Foot, Ringworm)" },
  
    // Neurological Disorders
    { name: "Migraine" },
    { name: "Tension Headache" },
    { name: "Epilepsy" },
    { name: "Parkinson’s Disease" },
    { name: "Stroke" },
  
    // Mental Health Conditions
    { name: "Anxiety Disorders" },
    { name: "Depression" },
    { name: "Bipolar Disorder" },
    { name: "Obsessive-Compulsive Disorder (OCD)" },
    { name: "Post-Traumatic Stress Disorder (PTSD)" },
  
    // Infectious Diseases
    { name: "Tuberculosis (TB)" },
    { name: "Malaria" },
    { name: "Dengue Fever" },
    { name: "Chickenpox" },
    { name: "Urinary Tract Infections (UTIs)" },
  
    // Genitourinary Disorders
    { name: "Kidney Stones" },
    { name: "Urinary Incontinence" },
    { name: "Benign Prostatic Hyperplasia (BPH)" },
    { name: "Urinary Tract Infection (UTI)" },
  
    // Allergies and Immune Disorders
    { name: "Seasonal Allergies (e.g., Hay Fever)" },
    { name: "Food Allergies (e.g., Nut Allergy, Lactose Intolerance)" },
    { name: "Autoimmune Diseases (e.g., Lupus, Rheumatoid Arthritis)" },
    { name: "Anaphylaxis" },
  
    // Eye and Ear Conditions
    { name: "Conjunctivitis (Pink Eye)" },
    { name: "Glaucoma" },
    { name: "Cataracts" },
    { name: "Otitis Media (Ear Infection)" },
    { name: "Hearing Loss" }
  ];
  

  useEffect(() => {
    getPatientData();
    setComplaintItemsList([])
  }, [visible]);

  const [selectedPatient, setSelectedPatient] = useState<DropdownObject | null>(
    null
  );
  const Patient = patientData.map((ele) => ({
    name: `${ele.fristName} ${ele.lastName}`,
  }));

  const ChiefComplaintsHeader = (
    <div className="flex align-items-center gap-2">
      <div className="flex gap-4 items-center">
        <Button
          icon="pi pi-arrow-left"
          className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
          onClick={() => setVisible(false)}
        />
        <div>
          <div className="font-semibold text-base text-[#222]">
            Chief complaints
          </div>
        </div>
      </div>
    </div>
  );

  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const periods = [{ name: "Week" }, { name: "Months" }, { name: "Year" }];

  const [assessmentVisible, setAssessmentVisible] = useState(false);

  const getPatientData = async () => {
    try {
      if(id !== null){
        const { status, message, data } = await axiosService({
          method: "GET",
          url: `/api/doctor/doctor-dashboard/get-patient?id=${id}`,
        });
        if (status < 210) {
          setPatientData(data.patients);
          
        } else {
          app.toastError(message);
        }
      }else{
        return
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  const handleChiefComplaints = (value: DropdownObject) => {
    setSelectedChief(value);
    const newChief = { name: value.name };
    if (
      value &&
      !chiefComplaintList.some((chief) => chief.name === newChief.name)
    ) {
      setChiefComplaintList((prev) => [...prev, newChief]);
    }
    setSelectedChief(null);
  };

  const handelChiefComplaintDelete = (index: number) => {
    setChiefComplaintList((preComp) => preComp.filter((_, i) => i !== index));
  };

  const handelChiefComplaintDetails = (name: string, index: number) => {
    const duration = durations[index];
    const period = selectedPeriods[index];

    if (!duration || !period) {
      app.toastError("Please select both duration and period before saving.");
      return;
    }


    setComplaintItemsList((prev) => [
      ...prev,
      { duration, complaintName: name, period }
    ]);
  
   
    const updatedDurations = [...durations];
    const updatedSelectedPeriods = [...selectedPeriods];
    
    updatedDurations[index] = "";
    updatedSelectedPeriods[index] = "";
    
    setDurations(updatedDurations);
    setSelectedPeriods(updatedSelectedPeriods);
  
  
    handelChiefComplaintDelete(index);
  };
  const handleDurationChange = (value: number | null, index: number) => {
    const updatedDurations = [...durations];
    updatedDurations[index] = value !== null ? String(value) : ""; 
    setDurations(updatedDurations);
  };
 
  
  const handlePeriodChange = (value: { name: string }, index: number) => {
    const updatedSelectedPeriods = [...selectedPeriods];
    updatedSelectedPeriods[index] = value.name; 
    setSelectedPeriods(updatedSelectedPeriods);
  };
 
  
  const handelAddComplaints = async () => {
   
   function getFirstPart(input: string): string {
    return input.split(" ")[0];
}
const userData = complaintItemsList.map(item => ({
  complaintName: item.complaintName,
  duration: item.duration,
  period: {
    name: item.period
  }
}));

  try {
    const {message,data, status} = await axiosService({
      url: '/api/doctor/doctor-epescription/add-complaint',
      method: 'POST',
      body: {
        name : getFirstPart(selectedPatient?.name!),
        userData
      }
    })
    if(status < 210) {
      app.toastSuccess(message)
       setPrescriptionId(data)
       setVisible(false)
       setAssessmentVisible(true)
     
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      const newErrors: Record<string, string> = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          newErrors[err.path[0] as string] = err.message;
        }
      });
      console.log(newErrors);
      setErrors(newErrors);
    } else {
      app.toastError("Server error");
    }
  } 
  }
 
  return (
    <>
      <Sidebar
        header={ChiefComplaintsHeader}
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="w-full md:w-[500px] flex h-full"
      >
       <div className="flex h-full  flex-col justify-between ">
       <div>
       <div className="">
          <div className="text-sm text-[#667085] mb-2"> Patient</div>
          <Dropdown
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.value)}
            options={Patient}
            optionLabel="name"
            filter
            placeholder="Select Patient"
            className="w-full text-sm"
          />
        </div>
        <div className="mt-3 ">
          <div className="text-sm text-[#667085] mb-2 ">
            Selected complaints
          </div>
          <Dropdown
            value={selectedChief}
            onChange={(e) => handleChiefComplaints(e.value)}
            options={chiefs}
            optionLabel="name"
            filter
            placeholder="Search Chief complaints"
            className="w-full text-sm"
          />
          <div className="mt-2">
            {chiefComplaintList.length > 0
              ? chiefComplaintList.map((ele, index) => (
                  <div key={index} className="flex flex-col gap-4 mt-3">
                    <div className="p-3 rounded-lg bg-[#EFF8FF]">
                      <div className="flex items-center justify-between">
                        <div className="text-[#000] font-semibold">
                          {ele.name}
                        </div>

                        <div>
                          <Button
                            onClick={() => handelChiefComplaintDelete(index)}
                            icon="pi pi-times"
                            className="bg-transparent p-0 border-0 shadow-none text-[#000] w-auto"
                          />
                        </div>
                      </div>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div className="">
                          <div className="text-[#98A2B3] text-xs mb-1">
                            Duration:
                          </div>
                          <div>
                            <InputNumber
                              useGrouping={false}
                              value={durations[index] ? parseFloat(durations[index]) : null}
                              onChange={(e) => handleDurationChange(e.value, index)}
                              className="text-sm w-full"
                              placeholder="Enter duration"
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="text-[#98A2B3] text-xs mb-1">
                            Period:
                          </div>
                          <div>
                            <Dropdown
                              value={selectedPeriods[index]}
                              onChange={(e) => handlePeriodChange(e.value, index)}
                              options={periods}
                              optionLabel="name"
                              placeholder="Select Period"
                              className="w-full text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                        onClick={() =>handelChiefComplaintDetails(ele.name,index)}
                        
                          className=" font-bold cursor-pointer  text-[#175cd3] text-sm mt-2"
                         
                        >Save</div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
       </div>
        <div className="pt-4 grid grid-cols-2 gap-4">
          <div>
            <Button
              onClick={() => setVisible(false)}
              className="bg-[#fff] text-[#175CD3] text-sm border-[#175CD3] shadow-none w-full"
              size="small"
              label="Cancel"
            />
          </div>
          <div>
            <Button
              onClick={handelAddComplaints}
              className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none w-full"
              size="small"
              label="Next"
            />
          </div>
        </div>
       </div>
      </Sidebar>
      <Assessment
        visible={assessmentVisible}
        setVisible={setAssessmentVisible}
        prescriptionIdId={prescriptionId!}
      />
    </>
  );
}
