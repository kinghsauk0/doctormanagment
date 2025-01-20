"use client";
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import React from 'react'

export default function Page() {
  return (
    <>
        <div className='flex flex-col justify-between h-[100vh]'>
            <div className='h-full flex flex-col justify-center'>
                <div className='container mx-auto px-4'>
                    <div className='max-w-[900px] mx-auto'>
                        <div className='mb-8'>
                            <Link href="/doctor" className='dochdrlogo'>
                                <Image src="/images/logo.webp" alt="Image" width="200" height='40' />
                            </Link>
                            <div className='text-[#000] text-xl mt-2 font-semibold'>Welcome to VCURE HEALTH</div>
                        </div>
                        <div className='grid items-center lg:grid-cols-2 grid-cols-1 gap-8 p-4 bg-white rounded-lg'>
                            <div className='hidden lg:block rounded-lg p-8' style={{backgroundImage:'url(/images/createaccbg.svg)', backgroundRepeat:'no-repeat', backgroundSize:'cover', backgroundPosition:'center center'}}>
                                <div className='text-white text-2xl mb-2'>Let’s Get Started! </div>
                                <div className='text-white text-sm mb-20'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                                </div>
                                <Button label='Learn more' className='bg-white text-[#1570EF] border-[#fff]' iconPos='right' size='small' icon="pi pi-arrow-up-right"/>
                            </div>
                            <div>
                                <div className='mb-6'>Here’s what we’ll do:</div>
                                <div className='flex flex-col gap-6 mb-10'>
                                    <div className='flex gap-4 items-center'>
                                        <div style={{lineHeight:'0'}}>
                                            <svg width="60" height="60" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="72" height="72" fill="#EAECF0"/>
                                                <path d="M48 49.5V46.5C48 44.9087 47.3679 43.3826 46.2426 42.2574C45.1174 41.1321 43.5913 40.5 42 40.5H30C28.4087 40.5 26.8826 41.1321 25.7574 42.2574C24.6321 43.3826 24 44.9087 24 46.5V49.5M42 28.5C42 31.8137 39.3137 34.5 36 34.5C32.6863 34.5 30 31.8137 30 28.5C30 25.1863 32.6863 22.5 36 22.5C39.3137 22.5 42 25.1863 42 28.5Z" stroke="#1570EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Tell Us About You</div>
                                            <div className='text-[#667085] text-xs'>Add your Personal Information </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 items-center'>
                                        <div style={{lineHeight:'0'}}>
                                            <svg width="60" height="60" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="72" height="72" fill="#EAECF0"/>
                                                <g clipPath="url(#clip0_49_9495)">
                                                    <path d="M53.0753 21.2253C52.2038 20.0699 50.8739 19.4073 49.4266 19.4073H48.814V19.0557C48.814 18.4733 48.3418 18.001 47.7593 18.001C47.1768 18.001 46.7046 18.4733 46.7046 19.0557V21.8681C46.7046 22.4506 47.1768 22.9228 47.7593 22.9228C48.3418 22.9228 48.814 22.4506 48.814 21.8681V21.5166H49.4266C50.2059 21.5166 50.922 21.8734 51.3913 22.4955C51.8605 23.1176 52.0069 23.9042 51.7928 24.6535L48.9936 34.4507C48.2125 37.1847 45.681 39.0942 42.8376 39.0942C39.9941 39.0942 37.4627 37.1847 36.6815 34.4507L33.8824 24.6534C33.6683 23.9041 33.8147 23.1175 34.2839 22.4954C34.7532 21.8733 35.4693 21.5165 36.2485 21.5165H36.8612V21.8681C36.8612 22.4505 37.3334 22.9227 37.9158 22.9227C38.4983 22.9227 38.9705 22.4505 38.9705 21.8681V19.0556C38.9705 18.4732 38.4983 18.001 37.9158 18.001C37.3334 18.001 36.8612 18.4732 36.8612 19.0556V19.4072H36.2485C34.8013 19.4072 33.4714 20.0699 32.5999 21.2252C31.7283 22.3806 31.4566 23.8413 31.8542 25.2328L34.6534 35.0301C35.1657 36.823 36.2233 38.3641 37.7119 39.487C38.031 39.7277 38.3638 39.9425 38.707 40.1339L41.783 47.394V48.1552C41.783 50.215 40.1073 51.8907 38.0475 51.8907C35.9878 51.8907 34.3121 50.215 34.3121 48.1552V40.9222C34.3121 37.5881 31.5995 34.8755 28.2653 34.8755C24.9312 34.8755 22.2186 37.5881 22.2186 40.9222V43.4189C19.8146 43.9088 18 46.0394 18 48.5861C18 51.4938 20.3656 53.8594 23.2733 53.8594C26.181 53.8594 28.5466 51.4938 28.5466 48.5861C28.5466 46.0395 26.732 43.9089 24.328 43.4189V40.9222C24.328 38.7512 26.0943 36.9848 28.2653 36.9848C30.4364 36.9848 32.2027 38.7512 32.2027 40.9222V48.1552C32.2027 51.378 34.8247 54 38.0475 54C41.2703 54 43.8923 51.378 43.8923 48.1552V47.394L46.9683 40.1339C47.3116 39.9425 47.6443 39.7277 47.9633 39.487C49.452 38.3642 50.5096 36.823 51.0219 35.0301L53.8211 25.2328C54.2187 23.8414 53.9468 22.3806 53.0753 21.2253ZM26.4373 48.5861C26.4373 50.3307 25.0179 51.7501 23.2733 51.7501C21.5287 51.7501 20.1093 50.3307 20.1093 48.5861C20.1093 46.8415 21.5287 45.4221 23.2733 45.4221C25.0179 45.4221 26.4373 46.8415 26.4373 48.5861ZM42.8376 44.4764L41.3996 41.0823C41.8705 41.1621 42.3509 41.2035 42.8377 41.2035C43.3245 41.2035 43.8048 41.1621 44.2757 41.0823L42.8376 44.4764Z" fill="#1570EF"/>
                                                    <path d="M23.2733 49.6406C23.8558 49.6406 24.328 49.1684 24.328 48.5859C24.328 48.0034 23.8558 47.5312 23.2733 47.5312C22.6908 47.5312 22.2186 48.0034 22.2186 48.5859C22.2186 49.1684 22.6908 49.6406 23.2733 49.6406Z" fill="#1570EF"/>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_49_9495">
                                                    <rect width="36" height="36" fill="white" transform="translate(18 18)"/>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Medical information</div>
                                            <div className='text-[#667085] text-xs'>Add your Medical Credentials</div>
                                        </div>
                                    </div>
                                    <div className='flex gap-4 items-center'>
                                        <div style={{lineHeight:'0'}}>
                                            <svg width="60" height="60" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="72" height="72" fill="#EAECF0"/>
                                                <path d="M21 51H51" stroke="#1570EF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M43.5 21H28.5C24 21 22.5 23.685 22.5 27V51H49.5V27C49.5 23.685 48 21 43.5 21Z" stroke="#1570EF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M39.09 40.5H32.895C32.13 40.5 31.485 41.13 31.485 41.91V51H40.485V41.91C40.5 41.13 39.87 40.5 39.09 40.5Z" stroke="#1570EF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M36 27V34.5" stroke="#1570EF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M32.25 30.75H39.75" stroke="#1570EF" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='font-semibold'>Clinic or Hospital Information</div>
                                            <div className='text-[#667085] text-xs'>Add your Workplace Information</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <Link href="/doctor/sign-up">
                                        <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none" label="Continue" size="small"/>
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
