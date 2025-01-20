"use client";
import React, { useState, useRef } from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import "./AppointmentFor.scss";
import { Sidebar } from 'primereact/sidebar';
import ConfirmAppointment from "../ConfirmAppointment/ConfirmAppointment";
import AddPatient from "../AddPatient/AddPatient";

type Props={
    appointmentvisible:boolean, setAppointmentForVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function AppointmentFor({appointmentvisible, setAppointmentForVisible}:Props) {
    const AppointmentForHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setAppointmentForVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Who is the Appointment for?</div>   
            </div>
        </div>
    );

    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false);
    

    const[confappoVisible, setConfAppoVisible]=useState(false);

    const[patientVisible, setPatientVisible]=useState(false);
  return (
    <>
        <Sidebar header={AppointmentForHeader} visible={appointmentvisible} position="right" onHide={() => setAppointmentForVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col gap-4 h-full'>
                <div className="px-10">
                    <Button onClick={() => {setAppointmentForVisible(false);setConfAppoVisible(true) }} 
                    className="forappiobtn flex items-center gap-3 p-2 bg-[#F4F4F4] rounded-full w-full text-left border-[#F4F4F4]">
                        <div style={{lineHeight:'0'}}>
                            <Image src="/images/Suresh-Din.webp" alt="Image" className='rounded-full' width="50" height='50' />
                        </div>
                        <div>
                            <div className="text-base text-[#15192C]">Sam Smi</div>
                            <div className="text-10px text-[#848484]">Male - 36yrs old</div>
                            <div className="text-10px text-[#848484]">Last visit on 20/05/2023</div>
                        </div>
                    </Button>
                </div>
                <div className="px-10">
                    <Button onClick={() => {setAppointmentForVisible(false);setConfAppoVisible(true) }} 
                    className="forappiobtn flex items-center gap-3 p-2 bg-[#F4F4F4] rounded-full w-full text-left border-[#F4F4F4]">
                        <div style={{lineHeight:'0'}}>
                            <Image src="/images/Suresh-Din.webp" alt="Image" className='rounded-full' width="50" height='50' />
                        </div>
                        <div>
                            <div className="text-base text-[#15192C]">Rhan jain</div>
                            <div className="text-10px text-[#848484]">Male - 36yrs old</div>
                            <div className="text-10px text-[#848484]">Last visit on 20/05/2023</div>
                        </div>
                    </Button>
                </div>
                <div className="px-10">
                    <Button onClick={() => {setAppointmentForVisible(false);setConfAppoVisible(true) }} 
                    className="forappiobtn flex items-center gap-3 p-2 bg-[#F4F4F4] rounded-full w-full text-left border-[#F4F4F4]">
                        <div style={{lineHeight:'0'}}>
                            <Image src="/images/Suresh-Din.webp" alt="Image" className='rounded-full' width="50" height='50' />
                        </div>
                        <div>
                            <div className="text-base text-[#15192C]">Rhan jain</div>
                            <div className="text-10px text-[#848484]">Male - 36yrs old</div>
                            <div className="text-10px text-[#848484]">Last visit on 20/05/2023</div>
                        </div>
                    </Button>
                </div>
                
                <div className="text-center md:px-6">
                    <Button className="p-0 bg-[#fff] text-sm text-[#222] border-0 shadow-none" icon="pi pi-user-plus" iconPos="left" label="Add Patient" onClick={() => setPatientVisible(true)}/>
                </div>
            </div>
        </Sidebar>
        <ConfirmAppointment confappointmentvisible={confappoVisible} setConfAppointmentForVisible={setConfAppoVisible}/>

        <AddPatient visible={patientVisible} setVisible={setPatientVisible} />
    </>
  )
}
