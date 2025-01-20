"use client";
import { Button } from 'primereact/button';
import React, { useRef, useState } from "react";
import { Sidebar } from 'primereact/sidebar';
import { InputOtp } from 'primereact/inputotp';
import UploadInsurance from '../../UploadInsurance/UploadInsurance';

type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Verification({visible, setVisible}:Props) {

    const [token, setTokens] = useState();
    const VerificationHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Verification</div>   
            </div>
        </div>
    );

    const[uploadinsuranceVisible, setUploadinsuranceVisible]=useState(false);
  return (
    <>
        <Sidebar header={VerificationHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col h-full text-center'>
                <div className=''>
                    <div className='text-lg text-[#15192C] font-semibold'>Please enter Verification Code</div>
                    <div className='text-sm text-[#797979] mb-4'>Your temporary login code was sent to <br/>+910****025</div>
                    <div className='flex justify-center mb-10'>
                        <InputOtp value={token} onChange={(e) => setTokens(e.value)}/>
                    </div>
                    <div className='text-sm text-[#797979]'>Didn’t receive a code? <Button className='bg-white p-0 border-0 shadow-none text-sm font-bold text-[#0D52AF]' label='Send again'/></div>
                </div>
                <div className="mt-auto">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Continue" onClick={() => {setVisible(false);setUploadinsuranceVisible(true) }}/>
                </div>
            </div>
        </Sidebar>
        <UploadInsurance visible={uploadinsuranceVisible} setVisible={setUploadinsuranceVisible}/>
    </>
  )
}
