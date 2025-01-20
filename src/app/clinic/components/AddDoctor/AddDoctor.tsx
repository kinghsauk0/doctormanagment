"use client";
import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { Tooltip } from "primereact/tooltip";
import { InputTextarea } from "primereact/inputtextarea";



import { ProgressBar } from 'primereact/progressbar';

import { Tag } from 'primereact/tag';

type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddDoctor({visible, setVisible}:Props) {




    const [selectedGander, setSelectedGander] = useState(null);
    const ganders = [
        { name: 'Male' },
        { name: 'Female' },
        { name: 'Others' }
    ];
    const [selectedSpecial, setSelectedSpecial] = useState(null);
    const specials = [
        { name: 'Special-1' },
        { name: 'Special-2' },
        { name: 'Special-3' }
    ];




    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const AddPatientHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setVisible(false)} />
                <div>
                    <div className='font-semibold text-base text-[#222]'>Add Doctor</div>
                    <div className="text-10px text-[#667085]">Add details about Doctor</div>
                </div> 
            </div>
        </div>
    );

    const chooseOptions = { icon: 'pi pi-user-plus', iconOnly: true, className: 'border-0 bg-[#EFF8FF] mx-auto custom-choose-btn rounded-full p-button-outlined w-[100px] h-[100px] flex items-center justify-center' };


    const toast = useRef(null);
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
                <div className="flex flex-col ml-auto">
                    <div className="text-xs">{formatedValue} / 1 MB</div>
                    <ProgressBar value={value} showValue={false} style={{ width: '7rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
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
                <span className="my-5 text-sm">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    const chooseOptionsD = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'p-button-rounded p-button-outlined' };
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };



  return (
    <>
        <Sidebar header={AddPatientHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col gap-4 h-full'>
                <div className="flex flex-col gap-3">
                    <div className="text-lg font-semibold text-[#000]">Personal Information</div>
                    <div className="">
                        <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
                        <FileUpload chooseOptions={chooseOptions} mode="basic" className="" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
                    </div>
                    <div className="">
                        <InputText v-model="value1" className="w-full shadow-none text-sm" placeholder="First Name" />
                    </div>
                    <div className="">
                        <InputText v-model="value1" className="w-full shadow-none text-sm" placeholder="Last Name" />
                    </div>
                    <div className="">
                        <InputNumber v-model="value1" className="w-full shadow-none text-sm" placeholder="Mobile Number" />
                    </div>
                    <div className="">
                        <InputText v-model="value1" className="w-full shadow-none text-sm" placeholder="Email Address" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="">
                            <Dropdown value={selectedGander} onChange={(e) => setSelectedGander(e.value)} options={ganders} optionLabel="name" 
                            placeholder="Select Gander" className="w-full shadow-none text-sm" />
                        </div>
                        <div className="">
                            <InputNumber v-model="value1" className="w-full shadow-none text-sm max-w-full" placeholder="Age" />
                        </div>
                    </div>
                    <div className="">
                        <InputTextarea className="w-full shadow-none text-sm" placeholder="Address" rows={5} cols={30} />
                    </div>
                    <div className="text-lg font-semibold text-[#000]">Professional Information</div>
                    <div className="">
                        <Dropdown value={selectedSpecial} onChange={(e) => setSelectedSpecial(e.value)} options={specials} optionLabel="name" 
                        placeholder="Select Specialization" className="w-full shadow-none text-sm" />
                    </div>
                    <div className="">
                        <InputText v-model="value1" className="w-full shadow-none text-sm" placeholder="Qualification" />
                    </div>
                    <div className="">
                        <InputNumber v-model="value1" className="w-full shadow-none text-sm max-w-full" placeholder="Registration no." />
                    </div>
                    <div className="">
                        <InputText v-model="value1" className="w-full shadow-none text-sm" placeholder="Medical council" />
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
                <div className="mt-auto pb-4">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Submit" onClick={() => setVisible(false)}/>
                </div>
            </div>
        </Sidebar>
    </>
  )
}
