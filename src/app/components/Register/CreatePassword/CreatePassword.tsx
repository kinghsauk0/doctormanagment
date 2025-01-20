"use client";
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import React, { useRef, useState } from "react";
import { Image } from "primereact/image";
import { InputIcon } from 'primereact/inputicon';
import { Password } from 'primereact/password';
import Verification from '../Verification/Verification';


type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreatePassword({visible, setVisible}:Props) {
    const [value, setValue] = useState('');
    const CreatePasswordHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Create Password</div>   
            </div>
        </div>
    );

    const[verificationVisible, setVerificationVisible]=useState(false);
  return (
    <>
        <Sidebar header={CreatePasswordHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col gap-4 h-full'>
                <div className='text-center'>
                    <Image src="/images/createpassword.webp" alt="Image" className='rounded-md overflow-hidden' width="222" height='206' />
                </div>
                <div className='md:px-6'>
                    <div className="flex items-center bg-[#F3F3F5] border-[#F3F3F5] border-solid border rounded-md passwordiconfld">
                        <InputIcon className="pi pi-lock ms-3 me-3" />
                        <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask className="border-0" placeholder="Enter Password" />
                    </div>
                </div>
                <div className='md:px-6'>
                    <div className="flex items-center bg-[#F3F3F5] border-[#F3F3F5] border-solid border rounded-md passwordiconfld">
                        <InputIcon className="pi pi-lock ms-3 me-3" />
                        <Password value={value} onChange={(e) => setValue(e.target.value)} toggleMask className="border-0" placeholder="Confirm your password" />
                    </div>
                </div>
                <div className="mt-auto">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Continue" onClick={() => {setVisible(false);setVerificationVisible(true) }}/>
                </div>
            </div>
        </Sidebar>
        <Verification visible={verificationVisible} setVisible={setVerificationVisible}/>
    </>
  )
}
