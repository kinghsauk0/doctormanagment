"use client";
import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import CreatePassword from "../Register/CreatePassword/CreatePassword";

type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function RegAddPatient({visible, setVisible}:Props) {
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
                <div className='font-semibold text-base text-[#222]'>Add Patient Details</div>   
            </div>
        </div>
    );

    const[createpasswordVisible, setCreatePasswordVisible]=useState(false);
  return (
    <>
        <Sidebar header={AddPatientHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col gap-4 h-full'>
                <div className="flex flex-col gap-3">
                    <div className="">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user"> </InputIcon>
                            <InputText v-model="value1" className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none" placeholder="First Name" />
                        </IconField>
                    </div>
                    <div className="">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-user"> </InputIcon>
                            <InputText v-model="value1" className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none" placeholder="Last Name" />
                        </IconField>
                    </div>
                    <div className="mobileicontext bg-[#F3F3F5] border-[#F3F3F5] border-solid rounded-md">
                        <InputIcon className="pi pi-mobile"> </InputIcon>
                        <InputNumber v-model="value1" className="w-full shadow-none" placeholder="Mobile Number" />
                    </div>
                    <div className="">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-envelope"> </InputIcon>
                            <InputText v-model="value1" className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none" placeholder="Email Address" />
                        </IconField>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="icocalender">
                            <Calendar iconPos="left" showIcon value={date} onChange={(e) => setDate(e.value)} className="rounded-md w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none" placeholder="Date of Birth" />
                        </div>
                        <div className="">
                            <Dropdown value={selectedGander} onChange={(e) => setSelectedGander(e.value)} options={ganders} optionLabel="name" 
                            placeholder="Select Gander" className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none" />
                        </div>
                    </div>
                    <div className="">
                        <Toast ref={toast}></Toast>
                        <FileUpload mode="basic" chooseLabel="Upload an Image" className="w-full" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
                    </div>
                </div>
                <div className="mt-auto">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Continue" onClick={() => {setVisible(false);setCreatePasswordVisible(true)}}/>
                </div>
            </div>
        </Sidebar>
        <CreatePassword visible={createpasswordVisible} setVisible={setCreatePasswordVisible}/>
    </>
  )
}
