"use client";

import Link from "next/link";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { useEffect, useRef, useState } from "react";
import { Image } from "primereact/image";
import { DoctorResType } from "@/app/types";
import { getCookie } from "@/app/services/cookie.service";
import { axiosService } from "@/app/services/axios.service";
import { useApp } from "@/app/context/AppProvider";
import { ZodError } from "zod";
import { TieredMenu } from "primereact/tieredmenu";
import { useRouter } from "next/navigation";

interface DashboardHeaderProps {
    setSidebarVisible: (visible: boolean) => void,
    pageName: string
}

export default function DashboardHeader({ setSidebarVisible,pageName }: DashboardHeaderProps) {
    const op = useRef<OverlayPanel>(null);
    const [doctorData, setDoctorData] = useState<DoctorResType | null>(null)
    const {app} = useApp()
    const [errors, setErrors] = useState<Record<string, string>>({});
    const router = useRouter()
  
    useEffect(() => {
        getDoctor()
    },[])
    const getDoctor = async () => {
        try {
          const doctorId = getCookie("doctorId")
          if(doctorId !== null){
            
            const {status, message, data} = await axiosService({
              method: 'GET',
              url: `/api/doctor/get-one-doctor?id=${doctorId}`
            })
            if(status < 210){
              setDoctorData(data)
            }else{
              app.toastError(message)
            }
          }else{
            app.toastError("Doctor id not found ")
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




      const menu = useRef(null);
    const items = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => router.push('/doctor/profile')
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
        }
    ];
    return (
        <section className="pageheader flex items-center py-4 lg:px-10 md:px-6 px-4 bg-white gap-4">
            <Button 
                icon="pi pi-bars" 
                className="md:hidden bg-transparent p-0 shadow-none border-0 w-auto text-[#222]" 
                onClick={() => setSidebarVisible(true)}
            />
            <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
                {pageName}
            </div>
            <div className="ml-auto">
                <Button 
                    icon="pi pi-search" 
                    className="m-0 p-0 border-0 shadow-none bg-transparent text-[#222]" 
                    onClick={(e) => op.current?.toggle(e)} 
                />
                <OverlayPanel ref={op}>
                    <IconField iconPosition="left">
                        <InputIcon className="pi pi-search"> </InputIcon>
                        <InputText placeholder="Search" />
                    </IconField>
                </OverlayPanel>
            </div>

            <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
            <Button className="flex items-center gap-3 text-[#222] text-sm bg-transparent border-0 shadow-none p-0" onClick={(e) => menu.current.toggle(e)}>
                <div style={{ lineHeight: "0" }}>
                    <Image
                        src="/images/rvw1.webp"
                        alt="Image"
                        className="rounded-full"
                        width="30"
                        height="30"
                    />
                </div>
                <div className="hidden md:block">{doctorData?.name}</div>
            </Button>
        </section>
    );
}
