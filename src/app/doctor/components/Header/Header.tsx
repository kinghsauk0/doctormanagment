"use client"
import "./header.scss";
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import Link from 'next/link';

export default function Header () {
    
    const items = [
        {
            label: 'Home'
        },
        {
            label: 'About'
        },
        {
            label: 'Contact'
        },
        {
            label: 'Pricing'
        }
    ];

    return (
        <header className="docHeader py-2 bg-white shadow-sm fixed w-full top-0 left-0 z-10">
            <div className='container mx-auto px-4'>
                <div className='grid grid-cols-3 items-center'>
                    <div>
                        <Menubar model={items}/>
                    </div>
                    <div className='flex justify-center'>
                        <Link href="#" className='dochdrlogo'>
                            <Image src="/images/logo.webp" alt="Image" width="250" height='50' />
                        </Link>
                    </div>
                    <div className='flex justify-end'>
                        <Link href="/doctor/sign-in">
                            <Button className='bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none' size='small' label='Sign in'/>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
        