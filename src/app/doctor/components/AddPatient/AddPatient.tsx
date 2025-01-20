
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Accordion, AccordionTab } from "primereact/accordion";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { AllergiesType, DropdownObject, PatientInformationType, DiseaseHistoryType, HabitsType } from "@/app/types";
import { DiseaseHistorySchema, HabitSchema, PatientInformationSchema , AllergiesSchema} from "@/app/utils/schema/ZodSchema";
import Image from "next/image";
import { ZodError } from 'zod';
import { useApp } from "@/app/context/AppProvider";
import { axiosService } from "@/app/services/axios.service";
import { getCookie } from "@/app/services/cookie.service";



type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>,
}

export default function AddPatient({visible, setVisible,}:Props) {
     
    const [doctorId, setDoctorId] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [diseaseHistoryList, setDiseaseHistoryList] = useState<DiseaseHistoryType[]>([]);
    const [habitsList,setHabitsList] = useState<HabitsType[]>([])
    const {app} = useApp()
    const [patientInformationData,setPatientInformationData] = useState<PatientInformationType>({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        dateOfBirth: null,
        gender: {name: ''},
        age: '',
        weight: ''
    })
    const [allergiesData,setAllergiesData] = useState<AllergiesType>({
        environmentalAllergies: '',
        foodAllergies: '',
        drugsAllergies: '',
        othersAllergies: ''
    })

    const [duration,setDuration] = useState('')
    
    useEffect(() => {
        const cookie = getCookie("doctorId");
        if (cookie !== null) {
          setDoctorId(cookie!);
        }
      }, []);

   
    const ganders = [
        { name: 'Male' },
        { name: 'Female' },
        { name: 'Others' }
    ];

    const [imageSrc, setImageSrc] = useState('/images/Avatar.webp');
    const inputFileRef = useRef<HTMLInputElement | null>(null);;
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                    setImageSrc(e.target.result as string);
                  } 
            };
            reader.readAsDataURL(file);
        }
    };
    const handleImageClick = (): void => {
        inputFileRef.current?.click();
    };


    const PatientInformationDataHandelOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setPatientInformationData({ ...patientInformationData, [name]: e.target.value });
      };

      const AllergiesDataHandelOnClick = ( e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const name = e.target.name;
        setAllergiesData({ ...allergiesData, [name]: e.target.value });
      };

    const AddPatientHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setVisible(false)} />
                <div>
                    <div className='font-semibold text-base text-[#222]'>Add patient details</div> 
                    <div className="text-10px text-[#667085]">Medical information about patient</div>
                </div>
            </div>
        </div>
    );

    const [isOpen, setIsOpen] = useState(false);
    const toggleDiv = () => {
        setIsOpen(!isOpen);
    };

    const [hisVisible, setHisVisible] = useState<boolean>(false);
    const [editHisVisible, setEditHisVisible] = useState<boolean>(false)


    const [selectedHistory, setSelectedHistory] = useState<DropdownObject[]>([]);
    const historys = [
        { name: 'Diabetes' },
        { name: 'Appendix' },
        { name: 'Spondylitis' },
        { name: 'Sugar' }
    ];

    
    const [selectedRelatedData, setSelectedRelatedData] = useState<DropdownObject> ({
        name: ''
    })
    const relateds = [
        { name: 'Self' },
        { name: 'Family' },
        { name: 'Outside' }
    ];

    const [habVisible, setHabVisible] = useState<boolean>(false);
    const [editHubVisible, setEditHubVisible] = useState<boolean>(false)
    const [successvisible, setSuccessVisible] = useState<boolean>(false);
   
    

    const [selectedHabits, setSelectedHabits] = useState<DropdownObject[]>([]);
    const habits = [
        { name: 'Cigarettes' },
        { name: 'Bidis' },
        { name: 'Cigars' },
        { name: 'Hookah' }
    ];

    const [selectedFrequency, setSelectedFrequency] = useState<DropdownObject>({
        name: ''
    });
    const frequencys = [
        { name: 'Everyday' },
        { name: 'Occasionally' }
    ];

    const [selectedHabDuration, setSelectedHabDuration] = useState<DropdownObject>({
        name: ''
    });

    const habduration = [
        { name: '1 Week' },
        { name: '1 month' },
        { name: '1 Year' },
        { name: '2 Years' },
        { name: 'More Then 5 Years' },
    ];
    
    const handelHistorySave = (index: number) => {
      try {
        const saveDuration = duration; 
        const saveRelated = selectedRelatedData.name;
        const selectedHistoryItem = selectedHistory[index];
        
        if (selectedHistoryItem) {
            const saveHistoryName = selectedHistoryItem.name;
           const validateData = DiseaseHistorySchema.parse({
            diseaseName: saveHistoryName,
            diseaseDuration: saveDuration,
            diseaseRelated: saveRelated
           })
           setErrors({})
            setDiseaseHistoryList((prevList) => [
                ...prevList, 
                {
                    diseaseName: validateData.diseaseName, 
                    diseaseDuration: validateData.diseaseDuration, 
                    diseaseRelated: validateData.diseaseRelated 
                }
                
            ]);
            handleHistoryDelete(index)
            setDuration('')
            setSelectedRelatedData({name: ''})
           
            
        } else {
            console.log("No history item found at this index.");
        }
      } catch (error) {
        console.log(error)
        if (error instanceof ZodError) {
            const newErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                newErrors[err.path[0] as string] = err.message;
              }
            });
            console.log(newErrors)
            setErrors(newErrors); 
          }else{
            app.toastError("Server error")
          }
        
      }
    };

  const handleHistoryDelete = (index: number) => {
    setSelectedHistory(prevHistory => prevHistory.filter((_, i) => i !== index));
};


const handelHabitSave = (index: number) => {
    try {
        const saveFrequency = selectedFrequency.name
        const saveDuration = selectedHabDuration.name
        const selectedHabitsItem = selectedHabits[index];
        if(selectedHabitsItem){
            const saveHabitName = selectedHabitsItem.name;
            const validateData =  HabitSchema.parse({
                habitName: saveHabitName,
                habitFrequency : saveFrequency,
                habitDuration : saveDuration,
            })

            setErrors({})
            setHabitsList((prevList) => [
                ...prevList, 
                {
                    habitName: validateData.habitName,
                    frequency: validateData.habitFrequency,
                    duration: validateData.habitDuration
                }
                
            ]);

            
           setSelectedFrequency({name: ''})
            setSelectedHabDuration({name: ''})
            handelHabitSaveDelete(index)
        } else {
            console.log("No habit item found at this index.");
        }

       
    } catch (error) {
        console.log(error)
        if (error instanceof ZodError) {
            const newErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                newErrors[err.path[0] as string] = err.message;
              }
            });
            console.log(newErrors)
            setErrors(newErrors); 
          }else{
            app.toastError("Server error")
          }
        
    }
}


const handelHabitSaveDelete = (index: number) => {
    setSelectedHabits(preHabits => preHabits.filter((_,i) => i !== index))
}


const handelAddPatient = async () => {
   const userData = {
    uid: doctorId,
    firstName: patientInformationData.firstName,
    lastName: patientInformationData.lastName,
    dateOfBirth:patientInformationData.dateOfBirth
            ? new Date(patientInformationData.dateOfBirth).toISOString().split('T')[0] 
            : '',
    age:patientInformationData.age,
    email:patientInformationData.email,
    gender:patientInformationData.gender.name,
    mobile:patientInformationData.mobile,
    weight:patientInformationData.weight
   }
   

   const userAllergies = {
    environmentalAllergies: allergiesData.environmentalAllergies,
    foodAllergies: allergiesData.foodAllergies,
    drugsAllergies: allergiesData.drugsAllergies,
    othersAllergies: allergiesData.othersAllergies
   }


   try {
      const validateData = PatientInformationSchema.parse(userData)
      const validAllergiesData = AllergiesSchema.parse(userAllergies)
      setErrors({})
      const formData = new FormData();
      formData.append('uid',validateData.uid)
      formData.append('firstName',validateData.firstName)
      formData.append('lastName',validateData.lastName)
      formData.append('age',validateData.age)
      formData.append('email',validateData.email)
      formData.append('gender',validateData.gender)
      formData.append('mobile',validateData.mobile)
      formData.append('weight',validateData.weight)
      formData.append('environmentalAllergies',validAllergiesData.environmentalAllergies)
      formData.append('foodAllergies', validAllergiesData.foodAllergies)
      formData.append('drugsAllergies', validAllergiesData.drugsAllergies)
      formData.append('othersAllergies', validAllergiesData.othersAllergies)
      formData.append('dateOfBirth',validateData.dateOfBirth)
      if(diseaseHistoryList.length > 0){
        formData.append('diseaseHistory',JSON.stringify(diseaseHistoryList))
      }
      if(habitsList.length > 0){
        formData.append('habits',JSON.stringify(habitsList))
      }
      
     
     const {message , status, data} = await axiosService({
        method: 'POST',
        url: '/api/doctor/doctor-dashboard/add-patient',
        body: formData
     })
  
     if(status < 210){
        app.toastSuccess(message)
       
        setPatientInformationData({
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        dateOfBirth: null,
        gender: {name: ''},
        age: '',
        weight: ''
        })
        setAllergiesData({
            environmentalAllergies: '',
            foodAllergies: '',
            drugsAllergies: '',
            othersAllergies: ''
        })
        setHabitsList([])
        setDiseaseHistoryList([])
        setVisible(false)
     }else {
        app.toastError(message)
     }
     
   } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors)
        setErrors(newErrors); 
      }else{
        app.toastError("Server error")
      }
   }
   
   
}

const handleDurationChange = (e: any) => {
    setDuration(e.value ? String(e.value) : ''); 
   ; 
};
    
const handelDeleteDiseaseHistory = (index: number) => {
     setDiseaseHistoryList(preHabits => preHabits.filter((_,i) => i !== index))
}

const handelHabitListDelete = (index : number) => {
     setHabitsList(preHabits => preHabits.filter((_,i) => i !== index))
}

function findDataByIndex<T>(array: T[], index: number): T | null {
    if (index >= 0 && index < array.length) {
        return array[index];
    } else {
        console.warn("Index out of bounds");
        return null;
    }
}


  return (
    <>
        <Sidebar header={AddPatientHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col gap-4 h-full'>
                <div className="flex flex-col gap-3">
                    <div className="image-upload text-center">
                        <Image 
                            src={imageSrc} 
                            alt="Uploaded Preview" 
                            width={100} 
                            height={100} 
                            onClick={handleImageClick}
                            style={{ cursor: 'pointer', borderRadius:'100%' }}
                        />
                        <input
                            type="file"
                            ref={inputFileRef}
                            style={{ display: 'none' }}
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="">
                            <InputText
                            value={patientInformationData.firstName}
                            onChange={PatientInformationDataHandelOnClick}
                            name="firstName"
                             v-model="value1" 
                             className="w-full shadow-none text-sm" 
                             placeholder="Enter patient first Name" />
                              {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div className="">
                            <InputText
                            value={patientInformationData.lastName}
                            name="lastName"
                            onChange={PatientInformationDataHandelOnClick}
                             v-model="value1" 
                             className="w-full shadow-none text-sm" 
                             placeholder="Enter patient last Name" />
                             {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="">
                            <InputNumber
                            name="mobile" 
                            value={patientInformationData.mobile === '' ? null : Number(patientInformationData.mobile)}
                            onChange={(e) => setPatientInformationData({...patientInformationData, mobile: String(e.value)})}
                            v-model="value1" 
                            className="w-full shadow-none text-sm" 
                            placeholder="Enter patient mobile number" 
                            useGrouping={false} 
                            />
                           {errors.mobile && <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>}
                        </div>
                        <div className="">
                            <InputText 
                            value={patientInformationData.email}
                            onChange={PatientInformationDataHandelOnClick}
                            name="email"
                            v-model="value1" 
                            className="w-full shadow-none text-sm" 
                            placeholder="Enter patient email Address" />
                             {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="">
                            <Calendar 
                            value={patientInformationData.dateOfBirth}
                            onChange={(e) => setPatientInformationData({...patientInformationData, dateOfBirth: e.value})} 
                            className="w-full shadow-none text-sm" 
                            placeholder="Enter patient Date of Birth" />
                             {errors.dateOfBirth && <p className="text-red-600 text-xs mt-1">{errors.dateOfBirth}</p>}
                        </div>
                        <div className="">
                            <Dropdown 
                            options={ganders} 
                            value={patientInformationData.gender}
                            onChange={(e) => setPatientInformationData({...patientInformationData, gender: e.value})}
                            name="gander"
                            optionLabel="name" 
                            placeholder="Select Gander" className="w-full shadow-none text-sm" />
                             {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="">
                            <InputNumber 
                            value={patientInformationData.age === '' ? null : Number(patientInformationData.age)}
                            onChange={(e) => setPatientInformationData({...patientInformationData, age: String(e.value)})}
                             
                            className="w-full shadow-none text-sm" 
                            placeholder="Enter patient age" />
                            {errors.age && <p className="text-red-600 text-xs mt-1">{errors.age}</p>}
                        </div>
                        <div className="">
                            <InputNumber
                            value={patientInformationData.weight === '' ? null : Number(patientInformationData.weight)}
                            onChange={(e) => setPatientInformationData({...patientInformationData, weight: String(e.value)})}
                             v-model="value1" 
                             className="w-full shadow-none text-sm" 
                             placeholder="Enter patient weight in kg" />
                              {errors.weight && <p className="text-red-600 text-xs mt-1">{errors.weight}</p>}
                        </div>
                    </div>
                    <div>
                        <Button size="small" className='p-0 bg-transparent border-0 shadow-none text-[#1849A9]' label='Add additional info' icon="pi pi-chevron-down" iconPos='right' onClick={toggleDiv}/>
                    </div>
                    {isOpen && (
                        <>
                            <div className="addiAccordion">
                                <Accordion activeIndex={0}>
                                    <AccordionTab
                                        header={
                                            <div>
                                                <div className='text-[#000] font-semibold text-base'>Allergies</div>
                                                <div className="text-xs text-[#475467] font-normal">Add details regarding whether the patient has any known allergies.</div>
                                            </div>
                                        }
                                    >
                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <div className='text-[#000] font-semibold text-sm'>Environmental allergies</div>
                                                <InputTextarea
                                                value={allergiesData.environmentalAllergies}
                                                onChange={AllergiesDataHandelOnClick}
                                                name="environmentalAllergies"
                                                 className="w-full shadow-none text-sm" 
                                                 rows={3} 
                                                 cols={30} />
                                                  {errors.environmentalAllergies && <p className="text-red-600 text-xs mt-1">{errors.environmentalAllergies}</p>}
                                            </div>
                                            <div>
                                                <div className='text-[#000] font-semibold text-sm'>Food allergies</div>
                                                <InputTextarea 
                                                value={allergiesData.foodAllergies}
                                                onChange={AllergiesDataHandelOnClick}
                                                name="foodAllergies"
                                                className="w-full shadow-none text-sm" 
                                                rows={3} 
                                                cols={30} />
                                                 {errors.environmentalAllergies && <p className="text-red-600 text-xs mt-1">{errors.environmentalAllergies}</p>}
                                            </div>
                                            <div>
                                                <div className='text-[#000] font-semibold text-sm'>Drugs allergies</div>
                                                <InputTextarea 
                                                value={allergiesData.drugsAllergies}
                                                onChange={AllergiesDataHandelOnClick}
                                                name="drugsAllergies"
                                                className="w-full shadow-none text-sm" 
                                                rows={3} 
                                                cols={30} />
                                                 {errors.drugsAllergies && <p className="text-red-600 text-xs mt-1">{errors.drugsAllergies}</p>}
                                            </div>
                                            <div>
                                                <div className='text-[#000] font-semibold text-sm'>Others</div>
                                                <InputTextarea 
                                                value={allergiesData.othersAllergies}
                                                onChange={AllergiesDataHandelOnClick}
                                                name="othersAllergies"
                                                className="w-full shadow-none text-sm" 
                                                rows={3} 
                                                cols={30} />
                                                 {errors.othersAllergies && <p className="text-red-600 text-xs mt-1">{errors.othersAllergies}</p>}
                                            </div>
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab
                                        header={
                                            <div>
                                                <div className='text-[#000] font-semibold text-base'>History</div>
                                                <div className="text-xs text-[#475467] font-normal">Add details regarding patient disease history</div>
                                            </div>
                                        }
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className='text-[#000] font-semibold text-sm'>Disease History</div>
                                            <Button onClick={() => setHisVisible(true)} className="text-[#175CD3] bg-transparent p-0 border-0 shadow-none" size="small" label="Add Disease history" icon="pi pi-plus" iconPos="left"/>
                                        </div>
                                        <div className='flex flex-col gap-2'>

                                         {
                                            diseaseHistoryList.length > 0 ? 
                                            diseaseHistoryList.map((ele, index) => (
                                                <div key={index}>
                                                <div className='rounded-t-lg px-4 py-2 bg-[#dff1ff] flex items-center justify-between'>
                                                    <div className='text-[#000] font-semibold text-base'>{ele.diseaseName}</div>
                                                    <div className="flex gap-2">
                                                        
                                                        <div>
                                                            <Button size='small' onClick={() =>handelDeleteDiseaseHistory(index)} className='w-auto bg-transparent p-2 border-0 shadow-none text-[#1849A9]' icon="pi pi-trash"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='p-4 rounded-b-lg bg-[#EFF8FF] grid grid-cols-2 gap-x-1 gap-y-3'>
                                                    <div>
                                                        <div className='text-[#000] font-semibold text-sm'>Duration</div>
                                                        <div className="text-[#667085] text-xs">{ele.diseaseDuration} Year</div>
                                                    </div>
                                                    <div>
                                                        <div className='text-[#000] font-semibold text-sm'>Related to</div>
                                                        <div className="text-[#667085] text-xs">{ele.diseaseRelated}</div>
                                                    </div>
                                                </div>
                                            </div>    
                                            ))
                                            : null
                                         } 
                                          
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab
                                        header={
                                            <div>
                                                <div className='text-[#000] font-semibold text-base'>Habits</div>
                                                <div className="text-xs text-[#475467] font-normal">Add details regarding patient habits</div>
                                            </div>
                                        }
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div className='text-[#000] font-semibold text-sm'>Habits History</div>
                                            <Button onClick={() => setHabVisible(true)} className="text-[#175CD3] bg-transparent p-0 border-0 shadow-none" size="small" label="Add habits" icon="pi pi-plus" iconPos="left"/>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            {
                                                habitsList.length > 0 ?
                                                habitsList.map((ele, index) => (
                                                    <div key={index}>
                                                <div className='rounded-t-lg px-4 py-2 bg-[#dff1ff] flex items-center justify-between'>
                                                    <div className='text-[#000] font-semibold text-base'>{ele.habitName}</div>
                                                    <div className="flex gap-2">
                                                       
                                                        <div>
                                                            <Button onClick={() => handelHabitListDelete(index)} size='small' className='w-auto bg-transparent p-2 border-0 shadow-none text-[#1849A9]' icon="pi pi-trash"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='p-4 rounded-b-lg bg-[#EFF8FF] grid grid-cols-2 gap-x-1 gap-y-3'>
                                                    <div>
                                                        <div className='text-[#000] font-semibold text-sm'>Frequency</div>
                                                        <div className="text-[#667085] text-xs">{ele.frequency}</div>
                                                    </div>
                                                    <div>
                                                        <div className='text-[#000] font-semibold text-sm'>Duration</div>
                                                        <div className="text-[#667085] text-xs">{ele.duration}</div>
                                                    </div>
                                                </div>
                                            </div>
                                                ))
                                                : null
                                            }
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                            </div>
                        </>
                    )}
                </div>
                <div className="mt-auto pb-3">
                    <Button  className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Save" onClick={handelAddPatient}/>
                </div>
            </div>
        </Sidebar>
        <Dialog position='center' className="max-w-[500px] w-[100%] modalheadercolor m-0" header="History" visible={hisVisible} onHide={() => setHisVisible(false)}>
            <div className="mb-4">
                <MultiSelect value={selectedHistory} onChange={(e) => setSelectedHistory(e.value)} options={historys} optionLabel="name" 
                filter placeholder="Search History" maxSelectedLabels={3} className="w-full text-sm" />
                 {errors.diseaseName && <p className="text-red-600 text-xs mt-1">{errors.diseaseName}</p>}
            </div>
            <div className="modaltab">
                <Accordion activeIndex={0}>
                    
                 {
                    selectedHistory.length > 0 ? 
                    selectedHistory.map((his,index) => (
                       <AccordionTab  key={index} header={his.name}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="text-[#000] font-semibold text-xs mb-1">Duration</div>
                                <InputNumber
                                value={duration === '' ? null : Number(duration)}
                                onChange={handleDurationChange}
                                 className="w-full text-sm" 
                                 inputId="mile"  
                                 suffix=" Year" />
                                  {errors.diseaseDuration && <p className="text-red-600 text-xs mt-1">{errors.diseaseDuration}</p>}
                            </div>
                            <div>
                                <div className="text-[#000] font-semibold text-xs mb-1">Related to</div>
                                <Dropdown
                                value={selectedRelatedData}
                                onChange={(e) => setSelectedRelatedData(e.value)} 
                                options={relateds} 
                                optionLabel="name" 
                                placeholder="Select Related to" 
                                className="w-full text-sm" />
                                 {errors.diseaseRelated && <p className="text-red-600 text-xs mt-1">{errors.diseaseRelated}</p>}
                            </div>
                          
                        </div>
                        <div className="flex gap-4 justify-end">
                            <div>
                                <Button  onClick={() => handleHistoryDelete(index)} size='small' className='bg-[#fff] border-[#1849A9] shadow-none text-[#1849A9]' label='Delete' icon="pi pi-trash" iconPos='right'/>
                            </div>
                            <div>
                                <Button onClick={()=>handelHistorySave(index)} size='small' className='bg-[#1849A9] border-[#1849A9] shadow-none text-[#fff]' label='Save' icon="pi pi-save" iconPos='right'/>
                            </div>
                        </div>
                    </AccordionTab> 
                   
                    ))
                   : null
                 }
                </Accordion>            
            </div>
        </Dialog>
        
         {
            // Habits
         }
        <Dialog position='center' className="max-w-[500px] w-[100%] modalheadercolor m-0" header="Habits" visible={habVisible} onHide={() =>  setHabVisible(false)}>
            <div className="mb-4">
                <MultiSelect value={selectedHabits} onChange={(e) => setSelectedHabits(e.value)} options={habits} optionLabel="name" 
                filter placeholder="Search Habits" maxSelectedLabels={3} className="w-full text-sm" />
                {errors.habitName && <p className="text-red-600 text-xs mt-1">{errors.habitName}</p>}
            </div>
            <div className="modaltab">
                <Accordion activeIndex={0}>
                    {
                        selectedHabits.length > 0 ? 
                        selectedHabits.map((hab, index) => (
                            <AccordionTab key={index} header={hab.name}>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <div className="text-[#000] font-semibold text-xs mb-1">Frequency</div>
                                <Dropdown
                                value={selectedFrequency}
                                onChange={(e) => setSelectedFrequency(e.value)}
                                name="frequency"
                                options={frequencys} 
                                optionLabel="name" 
                                placeholder="Select Frequency" 
                                className="w-full text-sm" />
                                {errors.habitFrequency && <p className="text-red-600 text-xs mt-1">{errors.habitFrequency}</p>}
                            </div>
                            <div>
                                <div className="text-[#000] font-semibold text-xs mb-1">Duration</div>
                                <Dropdown 
                                value={selectedHabDuration}
                                onChange={(e) => setSelectedHabDuration(e.value)}
                                options={habduration} 
                                name="duration"
                                optionLabel="name" 
                                placeholder="Select Duration" 
                                className="w-full text-sm" />
                                 {errors.habitDuration && <p className="text-red-600 text-xs mt-1">{errors.habitDuration}</p>}
                            </div>
                        </div>
                        <div className="flex gap-4 justify-end">
                            <div>
                                <Button onClick={() => handelHabitSaveDelete(index)} size='small' className='bg-[#fff] border-[#1849A9] shadow-none text-[#1849A9]' label='Delete' icon="pi pi-trash" iconPos='right'/>
                            </div>
                            <div>
                                <Button onClick={() =>handelHabitSave(index)} size='small' className='bg-[#1849A9] border-[#1849A9] shadow-none text-[#fff]' label='Save' icon="pi pi-save" iconPos='right'/>
                            </div>
                        </div>
                    </AccordionTab>
                        ))
                        : null
                    }
                </Accordion>            
            </div>            
        </Dialog>


       

 

        <Dialog className="md:max-w-[400px] max-w-[300px] w-full" visible={successvisible} onHide={() => setSuccessVisible(false)}>
            <div className="text-center">
                <svg enableBackground="new 0 0 100 100" width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="#175CD3"><path d="m62.9575729 36.7091522c-2.0045395-1.4952126-4.8507843-1.0742302-6.3459282.9302483l-11.8721923 15.9588775-3.9537277-4.3855934c-1.6501389-1.86063-4.4852943-2.0267792-6.3458595-.3877258-.022171.022171-.044342.044342-.0664444.0554276-1.8605652 1.6501427-2.0377998 4.485363-.387661 6.3458633.022171.022171.0332565.044342.0554276.0665131l7.6415977 8.4832268c.8638687.9636421 2.0931625 1.5173836 3.3888969 1.5173836.0664482 0 .1439781-.0110855.2104263-.0332565 1.3511658-.0554276 2.6026268-.7309799 3.411068-1.8162918l15.2057343-20.388813c1.472969-2.0156976 1.0521239-4.8507845-.9413377-6.3458597zm0 0c-2.0045395-1.4952126-4.8507843-1.0742302-6.3459282.9302483l-11.8721923 15.9588775-3.9537277-4.3855934c-1.6501389-1.86063-4.4852943-2.0267792-6.3458595-.3877258-.022171.022171-.044342.044342-.0664444.0554276-1.8605652 1.6501427-2.0377998 4.485363-.387661 6.3458633.022171.022171.0332565.044342.0554276.0665131l7.6415977 8.4832268c.8638687.9636421 2.0931625 1.5173836 3.3888969 1.5173836.0664482 0 .1439781-.0110855.2104263-.0332565 1.3511658-.0554276 2.6026268-.7309799 3.411068-1.8162918l15.2057343-20.388813c1.472969-2.0156976 1.0521239-4.8507845-.9413377-6.3458597zm0 0c-2.0045395-1.4952126-4.8507843-1.0742302-6.3459282.9302483l-11.8721923 15.9588775-3.9537277-4.3855934c-1.6501389-1.86063-4.4852943-2.0267792-6.3458595-.3877258-.022171.022171-.044342.044342-.0664444.0554276-1.8605652 1.6501427-2.0377998 4.485363-.387661 6.3458633.022171.022171.0332565.044342.0554276.0665131l7.6415977 8.4832268c.8638687.9636421 2.0931625 1.5173836 3.3888969 1.5173836.0664482 0 .1439781-.0110855.2104263-.0332565 1.3511658-.0554276 2.6026268-.7309799 3.411068-1.8162918l15.2057343-20.388813c1.472969-2.0156976 1.0521239-4.8507845-.9413377-6.3458597z"/><path d="m92.4498749 41.9918709c-1.5726776-1.2183418-2.8573303-2.7797966-3.7433014-4.5629654-.3433151-2.0486832-.2436829-4.1530647.2989731-6.1575394.5980835-3.3002796 1.2071915-6.6780243-.6091003-9.1920338-1.8052063-2.5029926-5.2494659-2.9902878-8.5719147-3.4111366-2.0709915-.0996361-4.0866165-.6312065-5.9250107-1.5726089-1.4397812-1.4397154-2.5472641-3.167387-3.2670898-5.0722942-1.4508057-3.0565987-2.9569626-6.2240539-5.9471817-7.1986451-2.8795013-.9302485-5.8918266.6645308-8.826683 2.2371392-1.7608644 1.1739301-3.7654039 1.9491825-5.8585664 2.2703285-2.1152649-.3100605-4.1198769-1.0853128-5.8918228-2.2703285-2.5140076-1.8938217-5.6813965-2.6911778-8.7934227-2.2371392-2.9902229.9745913-4.5074692 4.1420465-5.9914589 7.1986451-.6977196 1.9049072-1.8162899 3.6325788-3.2560062 5.0722942-1.8384609.9303169-3.8430042 1.4618874-5.8918209 1.5726089-3.211731-.0664463-6.3237581 1.1629124-8.6162577 3.4111366-1.8052034 2.4807529-1.1739302 5.8917542-.5980167 9.1920338.5537424 2.0044746.6755486 4.1088562.3322315 6.1575394-.9192305 1.7720833-2.1927967 3.3224525-3.7543864 4.5629654-2.4696674 2.3588104-5.0390377 4.8064423-5.0390377 8.0070839 0 3.2006454 2.5693705 5.6481438 5.0390377 8.0070877 1.5615897 1.2403755 2.835156 2.8019676 3.7543864 4.5628281.343317 2.059906.2215109 4.1641541-.3322315 6.1686249-.5759134 3.2893295-1.2071867 6.7003326.5980167 9.1810837 2.2924995 2.24823 5.4045267 3.4775162 8.6162577 3.422226 2.0488167.0885468 4.0644455.6312027 5.8918209 1.5614548 1.4397163 1.4397812 2.5582867 3.1675186 3.2560062 5.0834427 1.4839897 3.0455856 3.001236 6.2239227 5.9914589 7.187561 3.1120262.4650574 6.2794151-.3433838 8.7934227-2.2371368 1.771946-1.173996 3.7765579-1.9491806 5.8918228-2.2593079 2.0931625.3101273 4.097702 1.0853119 5.8585663 2.2593079 2.1153297 1.3732681 4.5296364 2.2371368 7.0436478 2.5140076.5980186.0110855 1.2071228-.0775986 1.7830353-.2768707 2.9902191-.9636383 4.496376-4.1419754 5.9471817-7.187561.7198257-1.9049683 1.8273087-3.632576 3.2670898-5.0834427 1.8383942-.9191666 3.8429337-1.4508667 5.8918228-1.5614548 3.3556366-.4320755 6.7998962-.9414749 8.6051025-3.422226 1.8162918-2.480751 1.2071838-5.8917542.6091003-9.1810837-.5426559-2.0155563-.6422882-4.1087189-.2989731-6.1686249.8859711-1.7830315 2.1706238-3.3335381 3.7433014-4.5628281 2.4807511-2.3589441 5.0501252-4.8064424 5.0501252-8.0070878 0-3.2006417-2.5693741-5.6482735-5.0501251-8.0070839zm-21.1197281 29.3483238c-5.4598847 5.459816-13.0018463 8.8376999-21.3301468 8.8487854-16.6787033 0-30.1900215-13.5112534-30.1900215-30.1900253 0-16.6676826 13.5113182-30.1789322 30.1900215-30.1789322 16.6676178 0 30.1789322 13.5112495 30.1789322 30.1789322-.0110855 8.3283004-3.3888931 15.881279-8.8487854 21.3412399z"/></g></svg>
                <div className="text-[#000] text-2xl font-semibold my-4">Patient added</div>  
                <div className="text-[#667085] ">Patient details has been added successfully</div>  
            </div>            
        </Dialog>
    </>
  )
}


