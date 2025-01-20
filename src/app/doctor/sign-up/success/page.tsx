"use client";
import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import useMobile from "@/app/hooks/isMobileHook";

export default function Page() {
    const isMobile = useMobile();

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
                                    <div className='text-[#000] text-2xl mt-2 font-semibold'>Let’s start this <br/>journey together</div>
                                </div>
                                <div className='text-[#667085] text-sm mb-10'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation  
                                </div>
                                <Image src='/images/signupimg.webp' alt='' width='541' height='315' className='w-full h-auto'/>
                            </div>
                            <div>
                                <div className='flex justify-center text-center flex-col gap-4 bg-white p-10 overflow-auto' style={{height:isMobile?'calc(100vh - 73px)':"60vh"}}>
                                    <div>
                                        <Image src='/images/success.svg' alt='' width='100' height='100'/>
                                    </div>
                                    <div className='text-[#000] font-semibold text-2xl'>Registration Successful!</div>
                                    <div className='text-sm text-[#667085]'>  Your account has been created and is pending verification. We&apos;ll notify you once your credentials are approved.</div>
                                </div>
                                <div className='bg-white p-4 border-t border-solid border-[#EAECF0] border-l-0 border-r-0 border-b-0'>
                                    <Link href="/doctor/dashboard">
                                        <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Back to Dashboard" size="small"/>
                                    </Link>
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
