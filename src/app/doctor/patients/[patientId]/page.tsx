"use client";
import React, { useEffect, useRef, useState } from "react";
import "../../../clinic/clinic.scss";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
import Link from "next/link";
import { Button } from "primereact/button";
import ChiefComplaints from "../../components/E-precription/ChiefComplaints/ChiefComplaints";
import DrLeftSideBar from "../../components/DrLeftSideBar/DrLeftSideBar";
import { OverlayPanel } from "primereact/overlaypanel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { SpeedDial } from "primereact/speeddial";
import { Accordion, AccordionTab } from "primereact/accordion";
import { TieredMenu } from "primereact/tieredmenu";
import { useParams } from 'next/navigation';
import { axiosService } from "@/app/services/axios.service";
import { ZodError } from "zod";
import { useApp } from "@/app/context/AppProvider";
import { PatientResType } from "@/app/types";
import EditPatient from "../../components/EditPatient/EditPatient";
import { Routes } from "@/app/routes";


export default function Page() {
    const isMobile = useMobile();
    const[sidebarVisible, setSidebarVisible]=useState<boolean>(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [patientData, setPatientData] = useState<PatientResType | null >(null)
    const params = useParams();
    const id = params.patientId as string;
    const {app} = useApp()
    const[editPatientVisible, setEditPatientVisible]=useState(false);

    useEffect(() => {
        getPatientData()
    },[])

  const getPatientData = async () => {
    try {
        const {status,message,data} = await axiosService({
            method: "GET",
            url: `/api/doctor/doctor-dashboard/view-patient?id=${id}`
          })
        if(status < 210){
           setPatientData(data)
        }else{
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
            app.toastError("Server Error")
          }
    }
  }
    
 

    const op = useRef<OverlayPanel>(null);
    
    const menu = useRef<TieredMenu>(null);
    const items = [
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
                 url:  `/api/doctor/doctor-dashboard/delete-patient?id=${patientData?.uid}`
                })
 

                if(status <210){
                 app.toastSuccess(message)
                 await getPatientData()
                 app.goTo(Routes.patient())
                }else{
                 app.toastError(message)
                }
            }
        },
        {
            label: 'Prescriptions',
            icon: 'pi pi-file',
        }
    ];

      
    const [createpreVisible, setCreatePreVisible] = useState<boolean>(false);

    const preitems = [
        {
            label: 'Create prescription',
            icon: 'pi pi-file',
            command: () => setCreatePreVisible(true)
        }
    ];
    



    return <>
        {isMobile ? <></> : <></>}

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <DrLeftSideBar visible={sidebarVisible} setVisible={setSidebarVisible} />
            </div>
            <div className="col-span-3 lg:col-span-4">
                <section className="pageheader flex items-center py-4 lg:px-10 md:px-6 px-4 bg-white gap-4">
                    <Button icon="pi pi-arrow-left" className="mt-1 bg-transparent p-0 shadow-none border-0 w-auto text-[#222]"/>
                    <Button icon="pi pi-bars" className="mt-1 md:hidden bg-transparent p-0 shadow-none border-0 w-auto text-[#222]" onClick={()=> setSidebarVisible(true)}/>
                    <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
                    Patient Details
                    </div>
                    <div className="ml-auto">
                        <Button icon="pi pi-search" className="m-0 p-0 border-0 shadow-none bg-transparent text-[#222]" onClick={(e) => op.current?.toggle(e)} />
                        <OverlayPanel ref={op}>
                            <IconField iconPosition="left">
                                <InputIcon className="pi pi-search"> </InputIcon>
                                <InputText v-model="value1" placeholder="Search" />
                            </IconField>
                        </OverlayPanel>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-[#222] text-sm"
                    >
                        <div style={{ lineHeight: "0" }}>
                        <Image
                            src="/images/rvw1.webp"
                            alt="Image"
                            className="rounded-full"
                            width="30"
                            height="30"
                        />
                        </div>
                        <div className="hidden md:block">{patientData?.fristName} {patientData?.lastName}</div>
                    </Link>
                </section>
                <div className="pt-6" style={isMobile?{height:'calc(100vh - 62px)', overflow:'auto'}:{height:'calc(100vh - 70px)', overflow:'auto'}}>
                    <div className="lg:px-10 md:px-6 px-4">
                        <div className="flex flex-col gap-6 bg-white p-4 rounded-lg">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div style={{lineHeight:'0'}}>
                                        <Image
                                            src="/images/rvw1.webp"
                                            alt="Image"
                                            className="rounded-full"
                                            width="50"
                                            height="50"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-lg text-[#000] font-semibold">{patientData?.fristName} {patientData?.lastName}</div>
                                        <div className="text-xs text-[#667085]">{patientData?.gender} - {patientData?.age} years</div>
                                        <div className="text-xs text-[#667085]">Created Date : {patientData?.dateOfBirth}</div>
                                    </div>
                                </div>
                                <div>
                                    <Button onClick={(e) => menu.current?.toggle(e)} className="p-0 bg-transparent border-0 shadow-none w-auto text-[#98A2B3]" icon="pi pi-ellipsis-v"/>
                                    <TieredMenu className="text-sm" model={items} popup ref={menu} breakpoint="767px" />
                                </div>
                            </div>
                            <div className="patiaccro">
                                <Accordion activeIndex={0}>
                         
                                    <AccordionTab header="Personal information">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-6 lg:max-w-[700px]">
                                            <div className="text-sm">
                                                <div className="text-[#667085]">Name</div>
                                                <div className="text-[#000] font-semibold">{patientData?.fristName} {patientData?.lastName}</div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-[#667085]">Date of birth</div>
                                                <div className="text-[#000] font-semibold">{patientData?.dateOfBirth}</div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-[#667085]">Contact no.</div>
                                                <div className="text-[#000] font-semibold">{patientData?.mobile}</div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-[#667085]">Age</div>
                                                <div className="text-[#000] font-semibold">{patientData?.age} years</div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-[#667085]">Email</div>
                                                <div className="text-[#000] font-semibold">{patientData?.email}</div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-[#667085]">Gender</div>
                                                <div className="text-[#000] font-semibold">{patientData?.gender}</div>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab header="Allergies">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-6">
                                            <div className="text-sm">
                                                <div className="text-[#000] font-semibold">Environmental allergies</div>
                                                <div className="text-[#667085]">{patientData?.allergies.environmentalAllergie}</div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-[#000] font-semibold">Food allergies</div>
                                                <div className="text-[#667085]">{patientData?.allergies.foodAllergie}</div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-[#000] font-semibold">Drugs allergies</div>
                                                <div className="text-[#667085]">{patientData?.allergies.drugAllergie}</div>
                                            </div>
                                            <div className="text-sm">
                                                <div className="text-[#000] font-semibold">Others</div>
                                                <div className="text-[#667085]">{patientData?.allergies.othersAllergies}</div>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab header="History">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-6">
                                           {
                                            patientData?.medicalHistory.map((ele,index) => (
                                                <div key={index}>
                                                <div className='rounded-t-lg px-4 py-3 bg-[#dff1ff] flex items-center justify-between'>
                                                    <div className='text-[#000] font-semibold text-base'>{ele.diseaseName}</div>
                                                </div>
                                                <div className='p-4 rounded-b-lg bg-[#EFF8FF] grid grid-cols-2 gap-x-1 gap-y-3'>
                                                    <div>
                                                        <div className='text-[#000] font-semibold text-sm'>Duration</div>
                                                        <div className="text-[#667085] text-xs">{ele.duration}</div>
                                                    </div>
                                                    <div>
                                                        <div className='text-[#000] font-semibold text-sm'>Related to</div>
                                                        <div className="text-[#667085] text-xs">{ele.related}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            ))
                                           }
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab header="Habits">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-y-6">
                                            {
                                                patientData?.habit.map((ele,index) => (
                                                    <div key={index}>
                                                <div className='rounded-t-lg px-4 py-3 bg-[#dff1ff] flex items-center justify-between'>
                                                    <div className='text-[#000] font-semibold text-base'>{ele.habitName}</div>
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
                                            }
                                        </div>
                                    </AccordionTab>
                                    <AccordionTab header="Notes">
                                        <div className="text-sm">
                                            <div className="text-[#667085]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the  standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s</div>
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="prefloat">
                    <SpeedDial model={preitems} direction="up" className="speeddial-bottom-left right-[15px] bottom-[15px]" buttonClassName="p-button-help" />
                </div>
            </div>
        </div>
        <ChiefComplaints visible={createpreVisible} setVisible={setCreatePreVisible} />
       
         {
           patientData !== null ? <EditPatient visible={editPatientVisible} setVisible={setEditPatientVisible} patientData={patientData!} onGetPatientData={getPatientData}/> : null
          } 
       
    </>
}