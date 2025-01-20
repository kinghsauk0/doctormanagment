"use client";
import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddAppointment({visible, setVisible}:Props) {


    const [date, setDate] = useState(null);

    const [selectedGander, setSelectedGander] = useState(null);
    const ganders = [
        { name: 'Male' },
        { name: 'Female' },
        { name: 'Others' }
    ];


    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const AddPatientHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Add Appointment</div>   
            </div>
        </div>
    );


  return (
    <>
        <Sidebar header={AddPatientHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col gap-4 h-full'>
                <div className="flex flex-col gap-3">
                    <div className="">
                        <InputText v-model="value1" className="w-full shadow-none text-sm" placeholder="First Name" />
                    </div>
                    <div className="">
                        <InputText v-model="value1" className="w-full shadow-none text-sm" placeholder="Last Name" />
                    </div>
                    <div className="">
                        <InputNumber v-model="value1" className="w-full shadow-none text-sm" placeholder="Mobile Number" />
                    </div>
                    <div className="">
                        <InputText v-model="value1" className="w-full shadow-none text-sm" placeholder="Email Address" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="">
                            <Calendar value={date} onChange={(e) => setDate(e.value)} className="w-full shadow-none text-sm" placeholder="Date of Birth" />
                        </div>
                        <div className="">
                            <Dropdown value={selectedGander} onChange={(e) => setSelectedGander(e.value)} options={ganders} optionLabel="name" 
                            placeholder="Select Gander" className="w-full shadow-none text-sm" />
                        </div>
                    </div>
                </div>
                <div className="mt-auto">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Submit" onClick={() => setVisible(false)}/>
                </div>
            </div>
        </Sidebar>
    </>
  )
}
