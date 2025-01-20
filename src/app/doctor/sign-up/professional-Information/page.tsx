"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import useMobile from "@/app/hooks/isMobileHook";
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { ProgressBar } from 'primereact/progressbar';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import { FileUpload , FileUploadHeaderTemplateOptions, FileUploadSelectEvent, FileUploadUploadEvent, ItemTemplateOptions,} from 'primereact/fileupload';
import { Tag } from 'primereact/tag';
import { useApp } from '@/app/context/AppProvider';
import { Routes } from '@/app/routes';
import { ProfessionalInformationFromType } from '@/app/types';
import { getCookie } from '@/app/services/cookie.service';
import { doctorProfessionalInformation } from '@/app/utils/schema/ZodSchema';
import { axiosService } from '@/app/services/axios.service';
import { ZodError } from 'zod';

export default function Page() {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [doctorId,setDoctorId]= useState<string | null>(null)
    const [professionalInformation,setProfessionalInformation] = useState<ProfessionalInformationFromType>({
        specialization: {name: ''},
        qualification: '',
        registration: '',
        medicalCouncil: ''
    })




    const isMobile = useMobile();
   
    
    const specializations = [
        { name:  'Cardiology' },
        { name: 'Neurology' },
        { name : 'Orthopedics' },
        { name : 'Pediatrics' },
        { name : 'Dermatology' },
        { name: 'Ophthalmology' },
        { name: 'Endocrinology' },
        { name:'Gastroenterology' },
        { name: 'Radiology' },
        { name: 'Oncology' },
      ];

    const {app} = useApp()

    useEffect(() => {
        const cookie = getCookie("doctorId")
        if(cookie !== null){
            setDoctorId(cookie!)
        }
    },[])

    const toast = useRef<Toast>(null);
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef<FileUpload>(null);

    
    const onTemplateSelect = (e: FileUploadSelectEvent) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key: any) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e: FileUploadUploadEvent) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current?.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file:  File, callback: Function) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };
   
   

   

    const ProfessionalInformationHandelOnClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        setProfessionalInformation({ ...professionalInformation, [name]: e.target.value });
      };

    const handelProfessionalInformation = async() => {
         const userData = {
            uid: doctorId,
            specialization: professionalInformation.specialization.name,
            qualification: professionalInformation.qualification,
            registration: professionalInformation.registration,
            medicalCouncil: professionalInformation.medicalCouncil,
           
         }
        
        try {
            const validatedData = doctorProfessionalInformation.parse(userData);
            const formData = new FormData();
            formData.append("uid",validatedData.uid)
            formData.append("specialization",validatedData.specialization)
            formData.append("qualification",validatedData.qualification)
            formData.append("registration",validatedData.registration)
            formData.append("medicalCouncil",validatedData.medicalCouncil)
            setErrors({})
            const {data, message, status} = await axiosService({
                method: 'POST',
                url: '/api/doctor/doctor-information',
                 body: formData 
            })

            if(status < 210){
                app.toastSuccess(message)
                app.goTo(Routes.clinicInformation())
                setProfessionalInformation({
                    specialization: {name: ''},
                    qualification: '',
                    registration: '',
                    medicalCouncil: ''
                })
            }else{
                app.toastError(message)
            }
            
        } catch (error) {
            if (error instanceof ZodError) {
                const newErrors = error.errors.reduce((acc, err) => {
                    acc[err.path[0]] = err.message;
                    return acc;
                }, {} as Record<string, string>);
                
                setErrors(newErrors);
            } else {
                app.toastError("Server Error");
            }
        }
        
    }

    const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex flex-col ml-auto">
                    <div className="text-xs">{formatedValue} / 1 MB</div>
                    <ProgressBar value={value} showValue={false} style={{ width: '7rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
        const file = inFile as File;
        return (
            <div className="flex items-center flex-wrap">

                <div className="flex items-center" style={{ width: '40%' }}>
            
                <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    <span className="flex flex-col text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex items-center flex-col">
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '2em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <div className="my-5 text-sm text-center">
                <div className='text-[#000] font-semibold'>Drag and Drop Here.</div>
                Add Certificate or important medical documents 
                </div>
            </div>
        );
    };

    const chooseOptionsD = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

   console.log(errors.specialization)
   console.log(errors.registration)
   console.log(errors.medicalCouncil)
   console.log(errors.qualification)
   console.log(errors.specialization)
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
                                <div className='shadow-sm p-4 bg-[#EAECF0]'>
                                    <div className='font-semibold text-[#000]'>Professional Information</div>
                                    <div className='text-[#667085] text-xs'>Add details about your qualification, specialization etc</div>
                                </div>
                                
                                <div className='flex flex-col gap-4 bg-white p-4 overflow-auto' style={{height:isMobile?'calc(100vh - 132px)':"60vh"}}>
                                    <div>
                                        <Dropdown
                                         value={professionalInformation.specialization}
                                         onChange={(e) => setProfessionalInformation({...professionalInformation, specialization: e.value})} options={specializations} optionLabel="name" 
                                         placeholder="Select Specialization"
                                         className="w-full text-sm" />
                                          {errors.specialization && <p className="text-red-600 text-xs mt-1">{errors.specialization}</p>}
                                    </div>
                                    <div>
                                        <InputText
                                         value={professionalInformation.qualification}
                                         name='qualification'
                                         onChange={ProfessionalInformationHandelOnClick}
                                         className='w-full text-sm'
                                         placeholder='Enter your qualification' />
                                          {errors.qualification && <p className="text-red-600 text-xs mt-1">{errors.qualification}</p>}
                                    </div>
                                    <div>
                                    <InputNumber
                                        value={professionalInformation.registration === '' ? null : Number(professionalInformation.registration)} 
                                        name='registration'
                                        onChange={(e) => setProfessionalInformation({
                                        ...professionalInformation, 
                                        registration: String(e.value)
                                        })} 
                                        className='w-full text-sm' 
                                        placeholder='Enter your registration no.' 
                                        useGrouping={false}
                                    />
                                    {errors.registration && <p className="text-red-600 text-xs mt-1">{errors.registration}</p>}
                                    </div>
                                    <div>
                                        <InputText
                                        value={professionalInformation.medicalCouncil}
                                        name='medicalCouncil'
                                        onChange={ProfessionalInformationHandelOnClick}
                                         className='w-full text-sm' 
                                         placeholder='Enter your medical council' />
                                           {errors.medicalCouncil && <p className="text-red-600 text-xs mt-1">{errors.medicalCouncil}</p>}
                                    </div>
                                    <div>
                                        <div className='font-semibold text-[#000]'>Documents</div>
                                        <div className='text-xs text-[#667085]'>Attach any certificate if you have</div>
                                    </div>
                                    <div>
                                        <Toast ref={toast}></Toast>
                                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                                        <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
                                        <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />
                                        <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                                            chooseOptions={chooseOptionsD} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-4 bg-white p-4 border-t border-solid border-[#EAECF0] border-l-0 border-r-0 border-b-0'>
                                    <div>
                                       
                                    <Button onClick={() => app.goTo(Routes.cancelSingUp())} className="bg-[#fff] text-[#1D4ED8] border-[#1D4ED8] shadow-none w-full" label="Cancel" size="small"/>
                                       
                                    </div>
                                    <div>
                                       
                                            <Button onClick={handelProfessionalInformation} className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full" label="Next" size="small"/>
                                       
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
