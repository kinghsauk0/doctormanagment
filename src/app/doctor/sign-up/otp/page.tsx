"use client";
import React, { useEffect,  useState } from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import useMobile from "@/app/hooks/isMobileHook";
import { InputOtp } from 'primereact/inputotp';
import { useApp } from '@/app/context/AppProvider';
import { Routes } from '@/app/routes';
import { axiosService } from '@/app/services/axios.service';
import { setCookie } from '@/app/services/cookie.service';
import { useAuth } from '@/app/context/AuthProvider';

export default function Page() {
    const isMobile = useMobile();

    const [otp, setOtp] = useState<string | number | undefined>();
    const [token, setToken] = useState<string | null>(null)
    const {app} = useApp()
    const {setUser} = useAuth()

  useEffect(() => {
      if(!token){
          setToken(localStorage.getItem("registration_token"))
      }
  },[])


  const handleSendAgin = async() => {
    if(token === null){
        return 
    }
     
    try {
        const {data, message, status} = await axiosService({
            method: 'POST',
            url: '/api/auth/reset-otp',
            body: {token: token}
        })
        
        if(status< 210){
            app.toastSuccess(`otp is ${data.otp}`)
            app.toastSuccess(message)
        }else{
            app.toastError(message)
        }

    } catch (error) {
        console.log(error)
        app.toastError("Server error")
    }
  }

 

 const handleVerify = async () => {
    if (typeof otp !== 'string' || otp.length !== 4) {
        app.toastError('Please enter a valid OTP with 4 digits!');
        return;
    }

    if(token === null){
        app.toastError("Server error")
        return 
    }

    try {
        const {data, message, status} = await axiosService({
            method: 'POST',
            url: '/api/auth/verification-otp',
            body: {
                otp: otp,
                token: token,
            }
        })

        if(status < 210){
            localStorage.clear()
            setUser({
                userId: data.uid,
                doctorId: data.doctor.uid                ,
            })
            setCookie("userId",data.uid)
            setCookie("doctorId",data.doctor.uid)
            if (typeof window !== 'undefined') {
                localStorage.setItem('isAuthenticated', 'isAuthenticated');
              }
            setOtp('')
            console.log("doctor ===>",data)
            app.toastSuccess(message)
            app.goTo(Routes.professionalInformation())
        }else{
            app.toastError(message)
            return
        }
    } catch (error) {
        console.log(error)
        app.toastError("Server error !")
    }
 }


 


  return (
    <>
        <div className='flex flex-col justify-between h-[100vh]'>
            <div className='h-full flex flex-col md:justify-center'>
                <div className='container mx-auto md:px-4'>
                    <div className='max-w-[900px] mx-auto'>
                        <div className='grid items-center lg:grid-cols-2 grid-cols-1 gap-8'>
                            <div className='hidden lg:block'>
                                <div className='mb-6'>
                                    <Link href="/doctor" className='dochdrlogo'>
                                        <Image src="/images/logo.webp" alt="Image" width="200" height='40' />
                                    </Link>
                                    <div className='text-[#000] text-2xl mt-2 font-semibold'>Your Expertise, <br/>Our Trusted Network</div>
                                </div>
                                <div className='text-[#667085] text-sm mb-10'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation  
                                </div>
                                <Image src='/images/signupimg.webp' alt='' width='541' height='315' className='w-full h-auto'/>
                            </div>
                            <div>
                                <div className='flex justify-center flex-col gap-4 bg-white p-4 overflow-auto' style={{height:isMobile?'calc(100vh - 73px)':"60vh"}}>
                                    <div>
                                        <div className='font-semibold text-[#000] text-center text-xl mb-2'>Enter Verification Code</div>
                                        <div className='text-[#667085] text-xs text-center'>We sent a verification code to your registered email</div>
                                    </div>
                                    <div className='flex justify-center'>
                                        <InputOtp value={otp} onChange={(e) => setOtp(e.value!)}/>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 bg-white p-4 border-t border-solid border-[#EAECF0] border-l-0 border-r-0 border-b-0'>
                                    <div>
                                        
                                            <Button onClick={handleSendAgin} className="bg-[#fff] text-[#1D4ED8] border-[#1D4ED8] shadow-none w-full" label="Send again" size="small"/>
                                       
                                    </div>
                                    <div>
                                            <Button onClick={handleVerify} className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Verify" size="small"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
