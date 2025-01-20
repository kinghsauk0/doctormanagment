"use client";
import React, { useState } from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import "./login.scss";
import { Sidebar } from 'primereact/sidebar';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import AppointmentFor from "../AppointmentFor/AppointmentFor";
import Link from "next/link";
import { FloatLabel } from "primereact/floatlabel";
import { InputOtp } from "primereact/inputotp";

type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>
}


export default function Login({visible, setVisible}:Props) {
    const LoginHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Login</div>   
            </div>
        </div>
    );

    const [value, setValue] = useState('');

    const[appoVisible, setAppoVisible]=useState(false);


    const [forgotPasswordEmail,setForgotPasswordEmail] = useState<string>('')
    const [otp, setOtp] = useState<string | number | undefined>('');
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const [isOTP, setIsOTP] = useState<Boolean>(false);
    const [isNewPass, setIsNewPass] = useState<Boolean>(false);
    //const {app} = useApp()

    const handleToggle = () => {
        setIsNewPass(false);
        setIsOTP(false);
        setIsOpen(!isOpen);
    };

    const handleSendOTP = async() => {
        setIsOTP(!isOTP);
    };

    const handleNewPassToggle = () => {
        console.log("passs")
    }

  return (
    <>
        <Sidebar header={LoginHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col gap-4 h-full'>
                <div className='mx-auto w-[250px] mb-6'>
                    <Image src="/images/rafiki.webp" alt="Image" className='w-full h-auto' width="306" height='228' />
                </div>
                

{/* ===================== */}


                                    {isOpen ? (
                                        <>
                                        {isOTP ? (
                                            <>{
                                                !isNewPass?
                                        <div>
                                            <div className="text-center mb-6 text-[#000] text-2xl">Type OTP</div>
                                            <div className="mb-4 flex justify-center">
                                                <InputOtp value={otp} onChange={(e) => setOtp(e.value!)}/>
                                            </div>
                                            <div className="flex justify-between items-center mb-8">
                                                <div>
                                                    <Button className="p-0 bg-transparent border-0 shadow-none text-[#000] text-xs" label="Re-send OTP"/>
                                                </div>
                                                <div>
                                                    <Button className="p-0 bg-transparent border-0 shadow-none text-[#000] text-xs" label="Return to Sign in" onClick={handleToggle}/>
                                                </div>
                                            </div>
                                            <div className="mb-4">
                                                <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Submit" size="small" onClick={handleNewPassToggle}/>
                                            </div>
                                        </div>:(
                                            <>
                                                <div className="text-center mb-6 text-[#000] text-2xl">Type New Password</div>
                                                <div className="mb-8">
                                                    <FloatLabel>
                                                        <Password 
                                                        id="loginPassword" 
                                                        
                                                        name="password"
                                                        className="w-full" 
                                                        toggleMask />
                                                          
                                                        <label htmlFor="loginPassword">Password</label>
                                                    </FloatLabel>
                                                </div>
                                                <div className="mb-4">
                                                    <FloatLabel>
                                                        <Password 
                                                        id="loginPassword" 
                                                        
                                                        name="confirmPassword"
                                                        className="w-full" 
                                                        toggleMask />
                                                        
                                                        <label htmlFor="loginPassword">Confirm Password</label>
                                                    </FloatLabel>
                                                </div>
                                                <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Save" onClick={handleSetResetPassword}/>
                                            </>
                                        )}
                                        </>
                                    ) : (
                                        <div>
                                            <div className="text-center mb-6 text-[#000] text-2xl">Forget Password</div>
                                            <div className="mb-4">
                                                <FloatLabel>
                                                    <InputText
                                                    value={forgotPasswordEmail}
                                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                                     id="username" 
                                                     className="w-full" />
                                                    <label htmlFor="username">Email</label>
                                                </FloatLabel>
                                            </div>
                                            <div className="flex justify-end mb-8">
                                                <Button className="p-0 bg-transparent border-0 shadow-none text-[#000] text-xs" label="Return to Sign in" onClick={handleToggle}/>
                                            </div>
                                            <div className="mb-4">
                                                <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Send OTP" size="small" onClick={handleSendOTP}/>
                                            </div>
                                            <div className="flex justify-center items-center gap-2 text-xs">
                                                <div>Don&apos;t have an account?</div>
                                                <Link href="/doctor/create-account">Sign up now</Link>
                                            </div>
                                        </div>
                                    )}
                                        </>
                                    ) : (
                                        <div className="md:px-6">
                                            <div className="text-center mb-6 text-[#000] text-2xl">Sign in</div>
                                            <div className="mb-8">
                                                <FloatLabel>
                                                    <InputText 
                                                    id="userEmail" 
                                                    className="w-full" 
                                                    
                                                     name="email"
                                                     placeholder="Enter your email"
                                                      
                                                    />
                                                     
                                                    <label htmlFor="username">Email</label>
                                                </FloatLabel>
                                            </div>
                                            <div className="mb-4 ">
                                                <FloatLabel>
                                                    <Password 
                                                    id="loginPassword" 
                                                    className="w-full" 
                                                    toggleMask
                                                    
                                                    name="password"
                                                    
                                                     />
                                                      
                                                    <label htmlFor="loginPassword">Password</label>
                                                </FloatLabel>
                                            </div>
                                            <div className="flex justify-end mb-8">
                                                <Button className="p-0 bg-transparent border-0 shadow-none text-[#000] text-xs" label="Forgot password?" onClick={handleToggle}/>
                                            </div>
                                            <div className="mb-4">
                                                <Button onClick={() => {setVisible(false);setAppoVisible(true) }} className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Sign In" size="small"/>
                                            </div>
                                            <div className="flex justify-center items-center gap-2 text-xs">
                                                <div>Don&apos;t have an account?</div>
                                                <Link href="/doctor/create-account">Sign up now</Link>
                                            </div>
                                        </div>
                                    )}
                                

{/* ===================== */}
                
                {/* <div className="mt-auto">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Login" onClick={() => {setVisible(false);setAppoVisible(true) }}/>
                </div> */}
            </div>
        </Sidebar>
        <AppointmentFor appointmentvisible={appoVisible} setAppointmentForVisible={setAppoVisible}/>
    </>
  )
}
