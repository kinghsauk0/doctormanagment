"use client";
import React, { useRef, useState } from 'react';
import "./profile.scss";
import DrLeftSideBar from "../components/DrLeftSideBar/DrLeftSideBar";
import { Image } from 'primereact/image';
import Link from 'next/link';
import { Button } from 'primereact/button';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import { TabPanel, TabView } from 'primereact/tabview';
import { RadioButton } from 'primereact/radiobutton';
import { FileUpload } from 'primereact/fileupload';
import { Sidebar } from 'primereact/sidebar';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { SelectButton } from 'primereact/selectbutton';
import { Panel } from 'primereact/panel';
import { Dialog } from 'primereact/dialog';

export default function Page() {

    const [imageSrc, setImageSrc] = useState("/images/rvw1.webp");
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImageSrc(imageURL); // Set the image URL to preview the uploaded file
    }
  };

    const[sidebarVisible, setSidebarVisible]=useState(false);

    

    const [personalinfovisible, setPersonalInfoVisible] = useState(false);
    const PersonalInformationHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setPersonalInfoVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Personal Infromation</div>   
            </div>
        </div>
    );

    const [professionalinfovisible, setProfessionalInfoVisible] = useState(false);
    const ProfessionalInformationHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setProfessionalInfoVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Professional Infromation</div>   
            </div>
        </div>
    );
    
    const [clinicinfovisible, setClinicInfoVisible] = useState(false);
    const ClinicInformationHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setClinicInfoVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Add Clinic or chamber Information </div>   
            </div>
        </div>
    );
    

    

    const [ingredient, setIngredient] = useState('');

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
    };

    const [selectedGender, setSelectedGender] = useState(null);
    const gender = [
        { name: 'Male' },
        { name: 'Female' },
        { name: 'Others' }
    ];
    const [date, setDate] = useState(null);

    const [selectedSpecialization, setSelectedSpecialization] = useState(null);
    const specialization = [
        { name: 'Specialization-1' },
        { name: 'Specialization-2' },
        { name: 'Specialization-3' }
    ];

    
    const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex items-center gap-3 ml-auto">
                    <span>{formatedValue} / 1 MB</span>
                    <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex items-center flex-wrap">
                <div className="flex items-center" style={{ width: '30%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={60} />
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
                <i className="pi pi-image mt-3 p-5" style={{ fontSize: '3em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-4">
                Add Certificate or important medical documents
                </span>
            </div>
        );
    };

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };


    const [value3, setValue3] = useState(500);

    const [value, setValue] = useState(null);
    const items = [
        { name: 'Sun', value: 1 },
        { name: 'Mon', value: 2 },
        { name: 'Tue', value: 3 },
        { name: 'Wed', value: 4 },
        { name: 'Thu', value: 5 },
        { name: 'Fri', value: 6 },
        { name: 'Sat', value: 7 }
    ];

    const itemDayTemplate = (option) => {
        return (
            <div className="flex items-center gap-1">
                <i className="pi pi-check" />
                <span>{option.name}</span>
            </div>
        );
    };
    
    const [time, setTime] = useState(null);

    const [selectedVisiting, setSelectedVisiting] = useState(null);
    const visitings = [
        { name: '1st week of month' },
        { name: '2st week of month' },
        { name: '3st week of month' },
        { name: '4st week of month' }
    ];

    const [selectedClinic, setSelectedClinic] = useState(null);
    const clinics = [
        { name: 'Clinic-1' },
        { name: 'Clinic-2' },
        { name: 'Clinic-3' },
        { name: 'Clinic-4' }
    ];

    const [visible, setVisible] = useState(false);

    const [selectedLang, setSelectedLang] = useState(null);
    const langs = [
        { name: 'English' },
        { name: 'Hindi' },
        { name: 'Bangla' }
    ];

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            <div>
                <DrLeftSideBar visible={sidebarVisible} setVisible={setSidebarVisible} />
            </div>
            <div className="col-span-3 lg:col-span-4">
                <DashboardHeader setSidebarVisible={setSidebarVisible} pageName="Profile"/>
                
                <section className="py-4 lg:px-10 md:px-6 px-4">
                    <div className='profiletabsec'>
                        <TabView scrollable>
                            <TabPanel header="Profile">
                                <div style={{height:'calc(100vh - 210px)', overflow:'auto'}}>
                                    <div className='border-t-0 border-l-0 border-r-0 border-b border-solid border-[#d9dee6] pb-3 mb-3'> 
                                        <div className='text-[#000] font-semibold mb-1'>My profile</div> 
                                        <div className='text-xs text-[#667085]'>Your profile information</div>
                                    </div>
                                    <div className='flex flex-col gap-6'>
                                        <div className='flex flex-col gap-5 p-3 rounded-md border border-solid border-[#d9dee6]'>
                                            <div className='flex items-center justify-between'>
                                                <div className='text-[#000] font-semibold'>Personal information</div>
                                                <div>
                                                    <Button onClick={() => setPersonalInfoVisible(true)} className='bg-white text-[#344054] border-[#D0D5DD]' label='Edit' icon="pi pi-pen-to-square" iconPos='left' size='small'/>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-4'>
                                                <div style={{lineHeight:'0'}}>
                                                    <Image
                                                        src="/images/rvw1.webp"
                                                        alt="Image"
                                                        className="rounded-full"
                                                        width="60"
                                                        height="60"
                                                    />
                                                </div>
                                                <div>
                                                    <div className='mb-1 text-sm text-[#000] font-medium'>Marvin McKinney</div>
                                                    <div className='text-xs text-[#667085]'>General Physician</div>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3 text-sm'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Name</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>Marvin McKinney</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Contact no.</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>+91 00000000</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Email</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>someone@email.com</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Gender</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>Male</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Date of birth</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>00/00/0000</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Age</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>32yrs</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Address</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>2972 Westheimer Rd. Santa Ana, Illinois 85486 </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-5 p-3 rounded-md border border-solid border-[#d9dee6]'>
                                            <div className='flex items-center justify-between'>
                                                <div className='text-[#000] font-semibold'>Professional information</div>
                                                <div>
                                                    <Button onClick={() => setProfessionalInfoVisible(true)} className='bg-white text-[#344054] border-[#D0D5DD]' label='Edit' icon="pi pi-pen-to-square" iconPos='left' size='small'/>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-3 text-sm'>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Specialization</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>General physician</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Qualification</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>MBBS,MD</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Registration no.</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>WHF455456456</div>
                                                </div>
                                                <div className='flex items-center gap-4'>
                                                    <div className='w-3/12 text-[#667085]'>Medical council</div>
                                                    <div className='w-1/12'>:</div>
                                                    <div className='w-8/12 text-[#000]'>State medical council</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-[#000] font-semibold mb-3'>Attached documents</div>
                                                <div className='flex flex-wrap gap-4'>
                                                    <div className='flex items-center gap-3 bg-[#EFF8FF] rounded-md border border-solid border-[#2E90FA]'>
                                                        <div style={{lineHeight:'0'}}>
                                                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="2" y="2" width="32" height="32" rx="16" fill="#D1E9FF"/>
                                                                <rect x="2" y="2" width="32" height="32" rx="16" stroke="#EFF8FF" stroke-width="4"/>
                                                                <path d="M18.6666 11.332H14C13.6463 11.332 13.3072 11.4725 13.0572 11.7226C12.8071 11.9726 12.6666 12.3117 12.6666 12.6654V23.332C12.6666 23.6857 12.8071 24.0248 13.0572 24.2748C13.3072 24.5249 13.6463 24.6654 14 24.6654H22C22.3536 24.6654 22.6927 24.5249 22.9428 24.2748C23.1928 24.0248 23.3333 23.6857 23.3333 23.332V15.9987M18.6666 11.332L23.3333 15.9987M18.6666 11.332V15.9987H23.3333" stroke="#1570EF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <div className='text-sm'>Medical document .pdf</div>
                                                        <div>
                                                            <Button className='bg-transparent text-[#667085] border-0 p-0' icon="pi pi-times"/>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center gap-3 bg-[#EFF8FF] rounded-md border border-solid border-[#2E90FA]'>
                                                        <div style={{lineHeight:'0'}}>
                                                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="2" y="2" width="32" height="32" rx="16" fill="#D1E9FF"/>
                                                                <rect x="2" y="2" width="32" height="32" rx="16" stroke="#EFF8FF" stroke-width="4"/>
                                                                <path d="M18.6666 11.332H14C13.6463 11.332 13.3072 11.4725 13.0572 11.7226C12.8071 11.9726 12.6666 12.3117 12.6666 12.6654V23.332C12.6666 23.6857 12.8071 24.0248 13.0572 24.2748C13.3072 24.5249 13.6463 24.6654 14 24.6654H22C22.3536 24.6654 22.6927 24.5249 22.9428 24.2748C23.1928 24.0248 23.3333 23.6857 23.3333 23.332V15.9987M18.6666 11.332L23.3333 15.9987M18.6666 11.332V15.9987H23.3333" stroke="#1570EF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <div className='text-sm'>Medical license .pdf</div>
                                                        <div>
                                                            <Button className='bg-transparent text-[#667085] border-0 p-0' icon="pi pi-times"/>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center gap-3 bg-[#EFF8FF] rounded-md border border-solid border-[#2E90FA]'>
                                                        <div style={{lineHeight:'0'}}>
                                                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <rect x="2" y="2" width="32" height="32" rx="16" fill="#D1E9FF"/>
                                                                <rect x="2" y="2" width="32" height="32" rx="16" stroke="#EFF8FF" stroke-width="4"/>
                                                                <path d="M18.6666 11.332H14C13.6463 11.332 13.3072 11.4725 13.0572 11.7226C12.8071 11.9726 12.6666 12.3117 12.6666 12.6654V23.332C12.6666 23.6857 12.8071 24.0248 13.0572 24.2748C13.3072 24.5249 13.6463 24.6654 14 24.6654H22C22.3536 24.6654 22.6927 24.5249 22.9428 24.2748C23.1928 24.0248 23.3333 23.6857 23.3333 23.332V15.9987M18.6666 11.332L23.3333 15.9987M18.6666 11.332V15.9987H23.3333" stroke="#1570EF" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </div>
                                                        <div className='text-sm'>Registration certificate .pdf</div>
                                                        <div>
                                                            <Button className='bg-transparent text-[#667085] border-0 p-0' icon="pi pi-times"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-5 p-3 rounded-md border border-solid border-[#d9dee6]'>
                                            <div className='flex items-center justify-between'>
                                                <div className='text-[#000] font-semibold'>Clinics information</div>
                                                <div>
                                                    <Button  onClick={() => setClinicInfoVisible(true)} className='bg-[#2E90FA] text-[#fff] border-[#2E90FA]' label='Add clinic' icon="pi pi-plus" iconPos='left' size='small'/>
                                                </div>
                                            </div>
                                            <div className='p-3 bg-[#EFF8FF] rounded-md'>
                                                <div className='p-3 rounded-md bg-white'>
                                                    <div className="flex align-items-center">
                                                        <RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} />
                                                        <label htmlFor="ingredient1" className="ml-2">Mark as default</label>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-3 justify-between mb-2 mt-3'>
                                                    <div className='text-sm text-[#000] font-semibold'>#Clinic 1</div>
                                                    <div><Button className='bg-white text-[#344054] border-[#D0D5DD]' label='Edit' icon="pi pi-pen-to-square" iconPos='left' size='small'/></div>
                                                </div>
                                                <div className='flex flex-col gap-3 text-sm'>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Clinic name</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>Abc clinic</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Specilazation</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>General physician</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Visiting fee</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>₹ 1000</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Availability</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>Every day</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Availability time</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>11AM - 2PM</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Visiting type</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>1st week of month</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Clinic address</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>2972 Westheimer Rd. Santa Ana, Illinois 85486 </div>
                                                    </div>
                                                    <div className='flex flex-col gap-1 docfileupload'>
                                                        <label className='text-sm'>Upload Clinic Logo</label>
                                                        <FileUpload chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0 text-sm p-2">Drag and drop files to here to upload.</p>} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='p-3 bg-[#EFF8FF] rounded-md'>
                                                <div className='p-3 rounded-md bg-white'>
                                                    <div className="flex align-items-center">
                                                        <RadioButton inputId="ingredient2" name="pizza" value="Mushroom" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Mushroom'} />
                                                        <label htmlFor="ingredient2" className="ml-2">Mark as default</label>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-3 justify-between mb-2 mt-3'>
                                                    <div className='text-sm text-[#000] font-semibold'>#Clinic 2</div>
                                                    <div><Button className='bg-white text-[#344054] border-[#D0D5DD]' label='Edit' icon="pi pi-pen-to-square" iconPos='left' size='small'/></div>
                                                </div>
                                                <div className='flex flex-col gap-3 text-sm'>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Clinic name</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>Abc clinic</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Specilazation</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>General physician</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Visiting fee</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>₹ 1000</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Availability</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>Every day</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Availability time</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>11AM - 2PM</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Visiting type</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>1st week of month</div>
                                                    </div>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='w-3/12 text-[#667085]'>Clinic address</div>
                                                        <div className='w-1/12'>:</div>
                                                        <div className='w-8/12 text-[#000]'>2972 Westheimer Rd. Santa Ana, Illinois 85486 </div>
                                                    </div>
                                                    <div className='flex flex-col gap-1 docfileupload'>
                                                        <label className='text-sm'>Upload Clinic Logo</label>
                                                        <FileUpload chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0 text-sm p-2">Drag and drop files to here to upload.</p>} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="Virtual signature">
                                <div className='flex flex-col' style={{height:'calc(100vh - 210px)', overflow:'auto'}}>
                                    <div className='border-t-0 border-l-0 border-r-0 border-b border-solid border-[#d9dee6] pb-3 mb-3'> 
                                        <div className='text-[#000] font-semibold mb-1'>Virtual Signature</div> 
                                        <div className='text-xs text-[#667085]'>Draw virtual signature below</div>
                                    </div>
                                    <div className='flex flex-col gap-6'>
                                        <div className='flex flex-col gap-1 mb-4 docfileupload signatureupload'>
                                            <label className='text-sm'>Upload your Virtual signature</label>
                                            <FileUpload chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0 text-sm p-2">Add your Virtual signature.</p>} />
                                        </div>
                                    </div>
                                    <div className='mt-auto flex justify-end items-center gap-4'>
                                        <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]" size='small' label="Cancel"/>
                                        <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" size='small' label="Save"/>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="Manage Schedule">
                                <div className='flex flex-col' style={{height:'calc(100vh - 210px)', overflow:'auto'}}>
                                    <div className='border-t-0 border-l-0 border-r-0 border-b border-solid border-[#d9dee6] pb-3 mb-3'> 
                                        <div className='flex justify-between items-center'>
                                            <div>
                                                <div className='text-[#000] font-semibold mb-1'>Manage your schedule</div> 
                                                <div className='text-xs text-[#667085]'>Easily setup your preferred schedule</div>
                                            </div>
                                            <div>
                                                <Button onClick={() => setVisible(true)} className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] text-nowrap" iconPos='left' icon="pi pi-plus" size='small' label="Add schedule"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid md:grid-cols-2 gap-4'>
                                        <Panel header="Clinic 1">
                                            <div className='dayscheck mb-4'>
                                                <SelectButton
                                                    value={value}
                                                    onChange={(e) => setValue(e.value)}
                                                    options={items}
                                                    optionLabel="name"
                                                    multiple
                                                    itemTemplate={itemDayTemplate}
                                                />
                                            </div>
                                            <div className='p-4 rounded-md border border-solid border-[#2E90FA] bg-[#EFF8FF] mb-3'>
                                                <div className='grid md:grid-cols-3 gap-4'>
                                                    <div>
                                                        <div className='text-xs text-[#000]'>Selected time</div>
                                                        <div className='text-sm text-[#000]'>10:00 AM - 12:00 PM</div>
                                                    </div>
                                                    <div>
                                                        <div className='text-xs text-[#000]'>Visiting type</div>
                                                        <div className='text-sm text-[#000]'>1st week of month</div>
                                                    </div>
                                                    <div className='text-end'>
                                                        <Button className='bg-white border-[#2E90FA] text-[#2E90FA] rounded-3xl' size='small' label='Edit' icon="pi pi-pen-to-square" iconPos='left'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button onClick={() => setVisible(true)} className='bg-white border-[#2E90FA] text-[#2E90FA] rounded-3xl' size='small' label='Add' icon="pi pi-plus" iconPos='left'/>
                                        </Panel>
                                        <Panel header="Clinic 2">
                                            <div className='dayscheck mb-4'>
                                                <SelectButton
                                                    value={value}
                                                    onChange={(e) => setValue(e.value)}
                                                    options={items}
                                                    optionLabel="name"
                                                    multiple
                                                    itemTemplate={itemDayTemplate}
                                                />
                                            </div>
                                            <div className='p-4 rounded-md border border-solid border-[#2E90FA] bg-[#EFF8FF] mb-3'>
                                                <div className='grid md:grid-cols-3 gap-4'>
                                                    <div>
                                                        <div className='text-xs text-[#000]'>Selected time</div>
                                                        <div className='text-sm text-[#000]'>10:00 AM - 12:00 PM</div>
                                                    </div>
                                                    <div>
                                                        <div className='text-xs text-[#000]'>Visiting type</div>
                                                        <div className='text-sm text-[#000]'>1st week of month</div>
                                                    </div>
                                                    <div className='text-end'>
                                                        <Button className='bg-white border-[#2E90FA] text-[#2E90FA] rounded-3xl' size='small' label='Edit' icon="pi pi-pen-to-square" iconPos='left'/>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button onClick={() => setVisible(true)} className='bg-white border-[#2E90FA] text-[#2E90FA] rounded-3xl' size='small' label='Add' icon="pi pi-plus" iconPos='left'/>
                                        </Panel>
                                    </div>                                    
                                    <div className='mt-auto flex justify-end items-center gap-4'>
                                        <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]" size='small' label="Cancel"/>
                                        <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" size='small' label="Save"/>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header="Language">
                                <div className='flex flex-col' style={{height:'calc(100vh - 210px)', overflow:'auto'}}>
                                    <div className='border-t-0 border-l-0 border-r-0 border-b border-solid border-[#d9dee6] pb-3 mb-3'> 
                                        <div className='text-[#000] font-semibold mb-1'>Choose your preferred language</div> 
                                        <div className='text-xs text-[#667085]'>Easily switch to your preferred language</div>
                                    </div>
                                    <div className='grid md:grid-cols-2 gap-4'>
                                        <div className="flex flex-col gap-1">
                                            <label className='text-sm'>Choose language</label>
                                            <Dropdown value={selectedLang} onChange={(e) => setSelectedLang(e.value)} options={langs} optionLabel="name" 
                    placeholder="Select Language" className="w-full" />
                                        </div>
                                    </div>
                                    <div className='mt-auto flex justify-end items-center gap-4'>
                                        <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]" size='small' label="Cancel"/>
                                        <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" size='small' label="Save"/>
                                    </div>
                                </div>
                            </TabPanel>
                        </TabView>
                    </div>
                </section>
            </div>
        </div>
        {/* =========== Personal information Edit ================= */}
        <Sidebar header={PersonalInformationHeader} visible={personalinfovisible} position="right" onHide={() => setPersonalInfoVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col h-full'>
                <div style={{height:'calc(100vh - 155px)', overflow:'auto'}}>
                    <div className='mb-4'>
                        <div className='relative'>
                            <input 
                                type='file' 
                                className='absolute top-0 left-0 w-full h-full' 
                                style={{ opacity: '0' }} 
                                onChange={handleFileChange} // Handle file change
                            />
                            <Image
                                src={imageSrc} // Display the selected image
                                alt="Uploaded Image"
                                className="rounded-full"
                                width="60"
                                height="60"
                            />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Name</label>
                            <InputText placeholder='Enter name' className='w-full text-sm' />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Contact no.</label>
                            <InputNumber placeholder='0000000000' className='w-full text-sm' prefix="+91" useGrouping={false} />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Email</label>
                            <InputText placeholder='Enter email' className='w-full text-sm' />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Gender</label>
                            <Dropdown value={selectedGender} onChange={(e) => setSelectedGender(e.value)} options={gender} optionLabel="name" 
                        placeholder="Select Gender" className="w-full text-sm" />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Date of birth</label>
                            <Calendar value={date} onChange={(e) => setDate(e.value)} dateFormat="dd/mm/yy" className="w-full text-sm"/>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Address</label>
                            <InputTextarea rows={5} cols={30} className="w-full text-sm" />
                        </div>
                    </div>
                </div>
                <div className='mt-auto flex justify-end items-center gap-4'>
                    <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]" size='small' label="Cancel"/>
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" size='small' label="Save"/>
                </div>
            </div>
        </Sidebar>

        {/* =========== Professional information Edit ================= */}
        <Sidebar header={ProfessionalInformationHeader} visible={professionalinfovisible} position="right" onHide={() => setProfessionalInfoVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col h-full'>
                <div style={{height:'calc(100vh - 155px)', overflow:'auto'}}>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Specialization</label>
                            <Dropdown value={selectedSpecialization} onChange={(e) => setSelectedSpecialization(e.value)} options={specialization} optionLabel="name" 
                        placeholder="Enter or select primary specialization" className="w-full text-sm" />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Qualification</label>
                            <InputText placeholder='Enter qualification' className='w-full text-sm' />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Registration no.</label>
                            <InputNumber placeholder='Enter registration no.' className='w-full text-sm' useGrouping={false} />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Medical council</label>
                            <InputText placeholder='Enter medical council name' className='w-full text-sm' />
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col gap-1 docfileupload">
                            <label className='text-sm'>Documents</label>
                            <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={1000000}
                            onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
                            headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
                            chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
                        </div>
                    </div>
                </div>
                <div className='mt-auto flex justify-end items-center gap-4'>
                    <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]" size='small' label="Cancel"/>
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" size='small' label="Save"/>
                </div>
            </div>
        </Sidebar>

        {/* =========== Clinic information Edit ================= */}
        <Sidebar header={ClinicInformationHeader} visible={clinicinfovisible} position="right" onHide={() => setClinicInfoVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col h-full'>
                <div style={{height:'calc(100vh - 155px)', overflow:'auto'}}>
                    <div className='flex flex-col gap-1 mb-4 docfileupload'>
                        <label className='text-sm'>Upload Clinic Logo</label>
                        <FileUpload chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} name="demo[]" url={'/api/upload'} multiple accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0 text-sm p-2">Drag and drop files to here to upload.</p>} />
                    </div>
                    <div className='mb-4'>
                        <div className="flex flex-col gap-1">
                            <label className='text-sm'>Clinic/chamber name</label>
                            <InputText placeholder='' className='w-full text-sm' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                        <label className='text-sm'>Specialization</label>
                        <Dropdown value={selectedSpecialization} onChange={(e) => setSelectedSpecialization(e.value)} options={specialization} optionLabel="name" 
                    placeholder="Enter or select primary specialization" className="w-full text-sm" />
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                        <label className='text-sm'>Visiting fee</label>
                        <InputNumber className="w-full text-sm" inputId="currency-india" value={value3} onValueChange={(e) => setValue3(e.value)} mode="currency" currency="INR" currencyDisplay="code" locale="en-IN" />
                    </div>
                    <div className="flex flex-col gap-1 mb-4">
                        <label className='text-sm'>Pincode</label>
                        <InputNumber useGrouping={false} className="w-full text-sm" />
                    </div>
                    <div>
                        <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.3523125584!2d88.26495139615301!3d22.535406374734368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1729512695381!5m2!1sen!2sin"
                        width="100%"
                        height="300"
                        loading="lazy"
                        className='border-0'
                        referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
                <div className='mt-auto flex justify-end items-center gap-4'>
                    <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]" size='small' label="Cancel"/>
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" size='small' label="Save"/>
                </div>
            </div>
        </Sidebar>
        
        {/* =========== Add Schedule ================= */}
        <Dialog header="Add Schedule" visible={visible} onHide={() => {if (!visible) return; setVisible(false); }}
            style={{ width: '500px' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
            <div className=''>
                <div className="flex flex-col gap-1 mb-4">
                    <label className='text-[#000] font-semibold text-sm'>Clinic</label>
                    <Dropdown value={selectedClinic} onChange={(e) => setSelectedClinic(e.value)} options={clinics} optionLabel="name" 
                placeholder="Select Clinic" className="w-full text-sm" />
                </div>
                <div className='text-[#000] font-semibold text-sm mb-1'>Availability days</div>
                <div className='dayscheck flex justify-start mb-3'>
                    <SelectButton
                        value={value}
                        onChange={(e) => setValue(e.value)}
                        options={items}
                        optionLabel="name"
                        multiple
                        itemTemplate={itemDayTemplate}
                    />
                </div>
                <div className='grid grid-cols-2 gap-4 mb-3'>
                    <div>
                        <div className='text-[#000] font-semibold text-sm mb-1'>From</div>
                        <Calendar className='text-sm w-full' placeholder='Select time' value={time} onChange={(e) => setTime(e.value)} timeOnly />
                    </div>
                    <div>
                        <div className='text-[#000] font-semibold text-sm mb-1'>To</div>
                        <Calendar className='text-sm w-full' placeholder='Select time' value={time} onChange={(e) => setTime(e.value)} timeOnly />
                    </div>
                </div>
                <div className='text-[#000] font-semibold text-sm mb-1'>Visiting type</div>
                <div>
                    <Dropdown value={selectedVisiting} onChange={(e) => setSelectedVisiting(e.value)} options={visitings} optionLabel="name" 
placeholder="Select Visiting type" className="w-full" />
                </div>
                <div className='mt-4 flex justify-end items-center gap-4'>
                    <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]" size='small' label="Cancel"/>
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" size='small' label="Save"/>
                </div>
            </div>
        </Dialog>
    </>
  )
}
