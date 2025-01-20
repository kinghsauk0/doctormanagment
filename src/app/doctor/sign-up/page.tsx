"use client";
import React, {  useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import useMobile from "@/app/hooks/isMobileHook";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Password } from 'primereact/password';
import { useApp } from '@/app/context/AppProvider';
import { Routes } from '@/app/routes';
import { PersonalInformationFromType } from '@/app/types';
import { axiosService } from '@/app/services/axios.service';
import { registrationSchema } from '@/app/utils/schema/ZodSchema';
import { ZodError } from 'zod';


export default function Page() {
    const isMobile = useMobile();

    const [imageSrc, setImageSrc] = useState('/images/Avatar.webp');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    
    const {app} = useApp()
    const [personalInformationData, setPersonalInformationData] = useState<PersonalInformationFromType>({
        name: '',
        mobile: '',
        email: '',
        gender: {name: ''},
        dateOfBirth: null,
        address: '',
        password: '' ,
        confirmPassword: ''
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e: ProgressEvent<FileReader>) => {
            if (e.target) {
              setImageSrc(e.target.result as string);
            }
          };
          reader.readAsDataURL(file);
        }
      };
      
      const handleImageClick = (): void => {
        inputFileRef.current?.click();
      };


    
    
    const genders = [
        { name: 'male' },
        { name: 'female' },
        { name: 'others' }
    ];

   
    const PersonalInformationHandelOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setPersonalInformationData({ ...personalInformationData, [name]: e.target.value });
      };

    const handleDoctorInformation = async () => {
        const userData = {
            name: personalInformationData.name,
            email: personalInformationData.email,
            mobile: personalInformationData.mobile,
            password: personalInformationData.password,
            confirmPassword: personalInformationData.confirmPassword,
            gender: personalInformationData.gender.name,
            dateOfBirth:personalInformationData.dateOfBirth
            ? new Date(personalInformationData.dateOfBirth).toISOString().split('T')[0] 
            : '',
            address: personalInformationData.address
    }
        try { 
           const validateData =  registrationSchema.parse(userData);
           const formData = new FormData();
           formData.append("name",validateData.name)
           formData.append("email",validateData.email)
           formData.append("mobile",validateData.mobile)
           formData.append("password",validateData.password)
           formData.append("confirmPassword",validateData.confirmPassword)
           formData.append("gender",validateData.gender)
           formData.append("dateOfBirth", validateData.dateOfBirth)
           formData.append("address",validateData.address)

            setErrors({});
            const {data,message,status} = await axiosService({
                method: 'POST',
                url: '/api/auth/sing-up',
                body: formData
            })
            
            if(status <210){
                localStorage.setItem("registration_token",data.token)
                
                app.toastSuccess(message)
                console.log(data)
                app.goTo(Routes.otp())
                app.toastSuccess(`otp is ${data.otp}`)
                return
            }else{
                app.toastError(message)
                return
            }
        } catch (error) {
           if (error instanceof ZodError) {
            const newErrors: Record<string, string> = {};
            error.errors.forEach((err) => {
              if (err.path[0]) {
                newErrors[err.path[0] as string] = err.message;
              }
            });
            console.log(newErrors)
            setErrors(newErrors); 
          }else {
            app.toastError("Server Error") 
          }
         
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
                                    <div className='text-[#000] text-2xl mt-2 font-semibold'>Transform Healthcare, <br/>Register with Us</div>
                                </div>
                                <div className='text-[#667085] text-sm mb-10'>
                                The &quot;Register with Us&quot; page for the doctor management system collects essential personal information, including name, contact details, qualifications, and specialization, to facilitate registration for doctors.
                                </div>
                                <Image src='/images/signupimg.webp' alt='' width='541' height='315' className='w-full h-auto'/>
                            </div>
                            <div>
                                <div className='shadow-sm p-4 bg-[#EAECF0]'>
                                    <div className='font-semibold text-[#000]'>Personal Infromation</div>
                                    <div className='text-[#667085] text-xs'>Add details about you</div>
                                </div>
                                
                                <div className='flex flex-col gap-4 bg-white p-4 overflow-auto' style={{height:isMobile?'calc(100vh - 132px)':"60vh"}}>
                                    <div className="image-upload text-center">
                                        <img 
                                            src={imageSrc} 
                                            alt="Uploaded Preview" 
                                            width={100} 
                                            height={100} 
                                            onClick={handleImageClick}
                                            style={{ cursor: 'pointer', borderRadius:'100%' }}
                                        />
                                        <input
                                            type="file"
                                            ref={inputFileRef}
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div>
                                        <InputText 
                                        id="name" 
                                        value={personalInformationData.name}
                                        onChange={PersonalInformationHandelOnClick}
                                        name='name'
                                        className='w-full text-sm' 
                                        placeholder='Enter your name' />
                                        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        < InputNumber
                                        id="name" 
                                        name='mobile'
                                        value={personalInformationData.mobile === '' ? null : Number(personalInformationData.mobile)}
                                        onChange={(e) => setPersonalInformationData({...personalInformationData,mobile: String(e.value)})}
                                        className='w-full text-sm' 
                                        placeholder='Enter your phone no.'
                                        useGrouping={false} 
                                        />
                                          {errors.mobile && <p className="text-red-600 text-xs mt-1">{errors.mobile}</p>}
                                    </div>
                                    <div>
                                        <InputText 
                                        value={personalInformationData.email}
                                        onChange={PersonalInformationHandelOnClick}
                                        id="name" 
                                        name='email'
                                        className='w-full text-sm' 
                                        placeholder='Enter your email' />
                                          {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <Dropdown  
                                        options={genders} 
                                        name='gender'
                                        value={personalInformationData.gender}
                                        onChange={(e) => setPersonalInformationData({ ...personalInformationData, gender: e.value })}
                                        optionLabel="name" 
                                        placeholder="Select Gender" 
                                        className="w-full text-sm" />
                                    </div>
                                    {errors.gender && <p className="text-red-600 text-xs mt-1">{errors.gender}</p>}
                                    <div>
                                    <Calendar
                                        value={personalInformationData.dateOfBirth}
                                        name="dateOfBirth"
                                        onChange={(e) =>
                                        setPersonalInformationData({ ...personalInformationData, dateOfBirth: e.value })
                                        }
                                        placeholder="0000-00-00"
                                        dateFormat="yy-mm-dd"
                                        className='w-full text-sm' 
                                    />
                                     {errors.dateOfBirth && <p className="text-red-600 text-xs mt-1">{errors.dateOfBirth}</p>}
                                    </div>
                                    <div>
                                        <InputTextarea 
                                        value={personalInformationData.address}
                                        onChange={(e) => setPersonalInformationData({...personalInformationData, address:e.target.value })}
                                        name='address'
                                        className='w-full text-sm' 
                                        placeholder='Enter your address' 
                                        rows={3} 
                                        cols={30} />
                                          {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
                                    </div>
                                    <div className='font-semibold text-[#000]'>Create password</div>
                                    <div>
                                        <Password 
                                        id="regPassword"
                                        value={personalInformationData.password} 
                                        name='password'
                                        onChange={PersonalInformationHandelOnClick}
                                        className="w-full text-sm" 
                                        placeholder='Password' 
                                        toggleMask />
                                          {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                                    </div>
                                    <div>
                                        <Password 
                                        id="regPassword"
                                        value={personalInformationData.confirmPassword}
                                        onChange={PersonalInformationHandelOnClick} 
                                        name='confirmPassword'
                                        className="w-full text-sm" 
                                        placeholder='Confirm Password' 
                                        toggleMask />
                                         {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 bg-white p-4 border-t border-solid border-[#EAECF0] border-l-0 border-r-0 border-b-0'>
                                    <div>
                                        <Link href="/doctor/sign-up">
                                            <Button className="bg-[#fff] text-[#1D4ED8] border-[#1D4ED8] shadow-none w-full" label="Cancel" size="small"/>
                                        </Link>
                                    </div>
                                    <div>
                                      
                                  <Button  onClick={handleDoctorInformation} className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Next" size="small"/>
                                      
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
