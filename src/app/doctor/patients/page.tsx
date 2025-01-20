"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../clinic/clinic.scss";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
import Link from "next/link";
import { OverlayPanel } from "primereact/overlaypanel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import AddPatient from "../components/AddPatient/AddPatient";
import DrLeftSideBar from "../components/DrLeftSideBar/DrLeftSideBar";
import { TieredMenu } from "primereact/tieredmenu";
import { Nullable } from "primereact/ts-helpers";
import { ProgressSpinner } from "primereact/progressspinner";
import { useRouter } from 'next/navigation'
import EditPatient from "../components/EditPatient/EditPatient";
import { getCookie } from "@/app/services/cookie.service";
import { axiosService } from "@/app/services/axios.service";
import { useApp } from "@/app/context/AppProvider";
import { PatientResType } from "@/app/types";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";


export default function Page() {
    const isMobile = useMobile();
    const[sidebarVisible, setSidebarVisible]=useState(false);
    const [date, setDate] = useState<Nullable<Date>>(new Date());
    const [patientId,setPatientId] = useState<string | null>(null)
    const [patientRes, setPatientRes] = useState<PatientResType[]>([])
    const [editPatientData, setEditPatientData] = useState<PatientResType | null>(null)
    const[appointmentVisible, setAppointmentVisible]=useState(false);
    const [loading, setLoading] = useState<boolean> (false)
    const op = useRef<OverlayPanel>(null);
    const[editPatientVisible, setEditPatientVisible]=useState(false);
    const menu = useRef<TieredMenu>(null);
    const router = useRouter()
    const {app} = useApp()
    const [id, setId] = useState<string | null>(null)
   

    

    useEffect(() => { 
      const token = getCookie("doctorId"); 
      setId(token!)
      if (!token) {
          router.push('sign-in');
      } 
  }, [router]);

 
   console.log("edit pratient data", editPatientData)
 

    const items = [
        {
            label: 'View',
            icon: 'pi pi-eye',
            command: () => {
               router.push(`/doctor/patients/${editPatientData?.uid}`)
            }
        },
        {
            label: 'Edit',
            icon: 'pi pi-pen-to-square',
            command: () => {
               setEditPatientVisible(true)
            }

        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: async() => {
               const {message, status} = await  axiosService({
                method: 'PATCH',
                url:  `/api/doctor/doctor-dashboard/delete-patient?id=${editPatientData?.uid}`
               })


               if(status <210){
                app.toastSuccess(message)
                await getPatientData()
               }else{
                app.toastError(message)
               }
           }
        }
    ];
    
   
   
    useEffect(() => {
      getPatientData()
    },[id])


  const getPatientData = async () => {
      setLoading(true)
      try {
       if(id !==null){
        const {status, message ,data} = await axiosService({
          method: 'GET',
          url: `/api/doctor/doctor-dashboard/get-patient?id=${id}`
     })
        if(status < 210){
           setPatientRes(data.patients)
        }else {
           app.toastError(message)
        }
       }else{
        return
       }
      } catch (error) {
         app.toastError("Something is wrong")
      }finally{
          setLoading(false)
      }
     
 }

console.log(id)
 const padNumberWithLeadingZeros = (number: number) => {
  return String(number).padStart(3, '0');
};
    const convertDateFormat = (dateString : any) => {
      const date = new Date(dateString);
      const day = String(date.getUTCDate()).padStart(2, '0'); 
      const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
      const year = String(date.getUTCFullYear()).slice(-2); 
      return `${day}/${month}/${year}`;
  };

 

    return <>
        {isMobile ? <></> : <></>}

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <DrLeftSideBar visible={sidebarVisible} setVisible={setSidebarVisible} />
            </div>
            <div className="col-span-3 lg:col-span-4">
             <DashboardHeader pageName="Patient" setSidebarVisible={setSidebarVisible}/>
                <section className="py-4 flex flex-row justify-between items-center lg:px-10 md:px-6 px-4">
                <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
                   
                    </div>
                    <div className="flex justify-between md:justify-end items-center md:gap-4 gap-3">
                    
                    <div className="flex justify-content-end">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText placeholder="Search patients" />
                </IconField>
            </div>
                        <Button icon="pi pi-plus" label="Add Patient" className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] py-3 h-[40px]" onClick={()=> setAppointmentVisible(true)}  />
                    </div>
                </section>
                <div style={{height:'calc(100vh - 145px)', overflow:'auto'}}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-10 md:px-6 px-4">
                        {
                          !loading ? 
                          patientRes.length > 0 ? 
                          patientRes.map((patient, index) => (
                            <div key={index} className="bg-white rounded-md p-4">
                          <div className="flex items-center pb-3">
                            <div className="flex gap-3 items-center">
                              <div>
                                <Image
                                    src="/images/rvw1.webp"
                                    alt="Image"
                                    className="rounded-full"
                                    width="40"
                                    height="40"
                                />
                              </div>
                              <div className="flex flex-col">
                                <div className='text-[#000] font-semibold text-sm'>{patient.fristName} {patient.lastName}</div>
                                <div className="flex flex-row items-center">
                              <div className="text-[#667085] text-xs mr-2">Patient ID</div>
                              <div className='text-[#000] font-semibold text-sm'>{padNumberWithLeadingZeros(patient.id)}</div>
                            </div>
                              </div>
                            </div>
                            <div className="ml-auto">
                              <Button onClick={(e) => {
                                menu.current?.toggle(e)
                                setPatientId(String(patient.id))
                                setEditPatientData(patient)
                              }
                                  
                                } className="p-0 bg-transparent border-0 shadow-none w-auto text-[#98A2B3]" icon="pi pi-ellipsis-v"/>
                              <TieredMenu className="text-sm" model={items} popup ref={menu} breakpoint="767px" />
                            </div>
                          </div>
                          <div className="p-3 rounded-md bg-[#EFF8FF] grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-[#667085] text-xs">Patient ID</div>
                              <div className='text-[#000] font-semibold text-sm'>{padNumberWithLeadingZeros(patient.id)}</div>
                            </div>
                            <div>
                              <div className="text-[#667085] text-xs">Age</div>
                              <div className='text-[#000] font-semibold text-sm'>{patient.age}</div>
                            </div>
                            <div>
                              <div className="text-[#667085] text-xs">Weight</div>
                              <div className='text-[#000] font-semibold text-sm'>{patient.weight}</div>
                            </div>
                            <div>
                              <div className="text-[#667085] text-xs">Last visit</div>
                              <div className='text-[#000] font-semibold text-sm'>{convertDateFormat(patient.updatedAt)}</div>
                            </div>
                          </div>
                        </div>
                          ))
                          : <div />
                          : <div className=" w-screen h-screen  flex flex-col justify-center items-center">
                          <ProgressSpinner 
                        style={{ width: '50px', height: '50px', stroke: '#0D52AF',  }}
                        strokeWidth="8"
                        fill="transparent" 
                        animationDuration=".5s" 
                       />
                       </div>
                        }
                         
                    </div>
                </div>
            </div>
        </div>
        <AddPatient visible={appointmentVisible} setVisible={setAppointmentVisible} />
        {
          !patientId ? null : <EditPatient visible={editPatientVisible} setVisible={setEditPatientVisible} patientData={editPatientData!} onGetPatientData={getPatientData}/>
        }
    </>
}