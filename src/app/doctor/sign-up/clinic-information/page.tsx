"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import useMobile from "@/app/hooks/isMobileHook";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { ProgressBar } from "primereact/progressbar";
import { Toast } from "primereact/toast";
import { Tooltip } from "primereact/tooltip";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { Tag } from "primereact/tag";
import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";
import "./clinic-information.scss";
import { Calendar } from "primereact/calendar";
import {
  GetScheduleData,
  ClinicInformationFromType,
  AvailabilityDayTypes,
  TimeType,
  DropdownObject,
  ClinicScheduleListType,
  UserDataType
} from "@/app/types";
import { useApp } from "@/app/context/AppProvider";
import { Routes } from "@/app/routes";
import { ZodError } from "zod";
import { clinicInformation,clinicScheduleSchema} from "@/app/utils/schema/ZodSchema";
import { axiosService } from "@/app/services/axios.service";
import { getCookie } from "@/app/services/cookie.service";
import { Nullable } from "primereact/ts-helpers";


type ScheduleItem = {
    timeFrom: Nullable<Date>;
    timeTo: Nullable<Date>;
    visitingType: string;
    availabilityDays: AvailabilityDayTypes[];
};


export default function Page() {
  const [clinicInformationData, setClinicInformationData] =
    useState<ClinicInformationFromType>({
      name: "",
      specialization: { name: "" },
      pinCode: "",
    });
    const [clinicScheduleList, setClinicScheduleList] = useState<ScheduleItem[]>([]);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [timeData, setTimeData] = useState<TimeType>({
    to: null,
    from: null,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [availabilityDay, setAvailabilityDay] =
    useState<AvailabilityDayTypes[] >([]);
  

  const isMobile = useMobile();
  const { app } = useApp();
  useEffect(() => {
    const cookie = getCookie("doctorId");
    if (cookie !== null) {
      setDoctorId(cookie!);
    }
  }, []);

 

  const specializations: AvailabilityDayTypes[] = [
    { name: "Cardiology" },
    { name: "Neurology" },
    { name: "Orthopedics" },
    { name: "Pediatrics" },
    { name: "Dermatology" },
    { name: "Ophthalmology" },
    { name: "Endocrinology" },
    { name: "Gastroenterology" },
    { name: "Radiology" },
    { name: "Oncology" },
  ];

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
    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {uploadButton}
        {cancelButton}
        <div className="flex flex-col ml-auto">
          <div className="text-xs">{formatedValue} / 1 MB</div>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "7rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;
    return (
      <div className="flex items-center flex-wrap">
        <div className="flex items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-col text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex items-center flex-col">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "2em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <div className="my-5 text-sm text-center">
          <div className="text-[#000] font-semibold">Drag and Drop Here.</div>
        </div>
      </div>
    );
  };

  const chooseOptionsD = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  const [isAdd, setIsAdd] = useState(false);
  const toggleAdd = () => {
    setIsAdd(!isAdd);
  };

  const availabilityDays: AvailabilityDayTypes[] = [
    { name: "Sun" },
    { name: "Mon" },
    { name: "Tue" },
    { name: "Wed" },
    { name: "Thu" },
    { name: "Fri" },
    { name: "Sat" },
  ];

  const itemDayTemplate = (option: any) => {
    return (
      <div className="flex items-center gap-1">
        <i className="pi pi-check" />
        <span>{option.name}</span>
      </div>
    );
  };

  const [selectedVisitingData, setSelectedVisitingData] =
    useState<DropdownObject>({ name: "" });
  const visitings = [
    { name: "1st week of month" },
    { name: "2st week of month" },
    { name: "3st week of month" },
    { name: "4st week of month" },
    { name: "every week of month" },
  ];

  const handelCancel = () => {
    app.goTo(Routes.cancelSingUp());
  };

  const handelClinicInformation = async () => {
   
      
    const userData = {
      uid: doctorId,
      clinicName: clinicInformationData.name,
      clinicSpecialization: clinicInformationData.specialization.name,
      pinCode: clinicInformationData.pinCode,
    };
    if (clinicScheduleList.length === 0) {
      app.toastError("Please fill in the additional information.");
      return;
  }
    try {
      const validatedData = clinicInformation.parse(userData);
      setErrors({});
     
      const formData = new FormData();
      formData.append("uid", validatedData.uid);
      formData.append("clinicName", validatedData.clinicName);
      formData.append(
        "clinicSpecialization",
        validatedData.clinicSpecialization
      );
      formData.append("pinCode", validatedData.pinCode);
      formData.append("clinicScheduleList", JSON.stringify(clinicScheduleList))
      const { message, status } = await axiosService({
        method: "POST",
        url: "/api/clinic/clinic-information",
        body: formData,
      });

      if (status < 210) {
        app.toastSuccess(message);
        app.goTo(Routes.success());
      } else {
        app.toastError(message);
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
  };

  

  const handelScheduleAdd = () => {
   try {
    const userData: ScheduleItem = {
      timeFrom: timeData.from,
      timeTo: timeData.to,
      visitingType: selectedVisitingData.name,
      availabilityDays: availabilityDay,
  };
  clinicScheduleSchema.parse(userData)
  setClinicScheduleList((prv) => [...prv, userData]);
  setTimeData({
    to: null,
    from: null,
  })
  setSelectedVisitingData({name: ''})
  setAvailabilityDay([])
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
    
};

const handelCancelSchedule = () => {
  setTimeData({
    to: null,
    from: null,
  })
  setSelectedVisitingData({name: ''})
  setAvailabilityDay([])
}

  
 console.log(clinicScheduleList)
  
  return (
    <>
      <div className="flex flex-col justify-between h-[100vh]">
        <div className="h-full flex flex-col md:justify-center">
          <div className="container mx-auto md:px-4">
            <div className="max-w-[900px] mx-auto">
              <div className="grid items-center lg:grid-cols-2 grid-cols-1 gap-8">
                <div className="hidden lg:block">
                  <div className="mb-6">
                    <Link href="/doctor" className="dochdrlogo">
                      <Image
                        src="/images/logo.webp"
                        alt="Image"
                        width="200"
                        height="40"
                      />
                    </Link>
                    <div className="text-[#000] text-2xl mt-2 font-semibold">
                      Your Patients Await, <br />
                      Join Now
                    </div>
                  </div>
                  <div className="text-[#667085] text-sm mb-10">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  </div>
                  <video width="600" controls className="w-full rounded-lg m-0">
                    <source
                      src="https://www.w3schools.com/html/mov_bbb.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div>
                  <div className="shadow-sm p-4 bg-[#EAECF0]">
                    <div className="font-semibold text-[#000]">
                      Clinic or Chamber Information{" "}
                    </div>
                    <div className="text-[#667085] text-xs">
                      Add your Workplace Information
                    </div>
                  </div>
                  <div
                    className="flex flex-col gap-4 bg-white p-4 overflow-auto"
                    style={{
                      height: isMobile ? "calc(100vh - 132px)" : "60vh",
                    }}
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#000]">
                        Upload Clinic or Chamber Photos
                      </div>
                    </div>
                    <div>
                      <Toast ref={toast}></Toast>
                      <Tooltip
                        target=".custom-choose-btn"
                        content="Choose"
                        position="bottom"
                      />
                      <Tooltip
                        target=".custom-upload-btn"
                        content="Upload"
                        position="bottom"
                      />
                      <Tooltip
                        target=".custom-cancel-btn"
                        content="Clear"
                        position="bottom"
                      />
                      <FileUpload
                        ref={fileUploadRef}
                        name="demo[]"
                        url="/api/upload"
                        multiple
                        accept="image/*"
                        maxFileSize={1000000}
                        onUpload={onTemplateUpload}
                        onSelect={onTemplateSelect}
                        onError={onTemplateClear}
                        onClear={onTemplateClear}
                        headerTemplate={headerTemplate}
                        itemTemplate={itemTemplate}
                        emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptionsD}
                        uploadOptions={uploadOptions}
                        cancelOptions={cancelOptions}
                      />
                    </div>
                    <div>
                      <InputText
                        value={clinicInformationData.name}
                        onChange={(e) =>
                          setClinicInformationData({
                            ...clinicInformationData,
                            name: e.target.value,
                          })
                        }
                        className="w-full text-sm"
                        placeholder="Enter Clinic / Chamber name"
                      />
                      {errors.clinicName && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.clinicName}
                        </p>
                      )}
                    </div>
                    <div>
                      <Dropdown
                        value={clinicInformationData.specialization}
                        onChange={(e) =>
                          setClinicInformationData({
                            ...clinicInformationData,
                            specialization: e.value,
                          })
                        }
                        options={specializations}
                        optionLabel="name"
                        placeholder="Select Specialization"
                        className="w-full text-sm"
                      />
                      {errors.clinicSpecialization && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.clinicSpecialization}
                        </p>
                      )}
                    </div>
                    <div>
                      <InputNumber
                        value={
                          clinicInformationData.pinCode === ""
                            ? null
                            : Number(clinicInformationData.pinCode)
                        }
                        onChange={(e) =>
                          setClinicInformationData({
                            ...clinicInformationData,
                            pinCode: String(e.value),
                          })
                        }
                        className="w-full text-sm"
                        placeholder="Enter your pin code"
                        useGrouping={false}
                      />
                      {errors.pinCode && (
                        <p className="text-red-600 text-xs mt-1">
                          {errors.pinCode}
                        </p>
                      )}
                    </div>
                    <div>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.3523125584!2d88.26495139615295!3d22.535406374734368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1726808544827!5m2!1sen!2sin"
                        width="100%"
                        height="200"
                        style={{ border: "none" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-lg m-0"
                      ></iframe>
                    </div>
                    <div>
                      <Button
                        className="p-0 bg-transparent border-0 shadow-none text-[#1849A9]"
                        label="Add additional info"
                        icon="pi pi-chevron-down"
                        iconPos="right"
                        onClick={toggleDiv}
                      />
                    </div>
                    {isOpen && (
                      <>
                        {
                           clinicScheduleList.length > 0 ? 
                           clinicScheduleList.map((ele, index) => (
                               <div key={index} className="flex flex-col gap-2">
                                   <div>
                                       <div className="rounded-t-lg px-4 py-2 bg-[#dff1ff] flex items-center justify-between">
                                           <div className="text-[#000] font-semibold text-base">
                                               Schedule {index + 1}
                                           </div>
                                           <div>
                                               <Button
                                                   size="small"
                                                   className="bg-[#fff] border-0 shadow-none text-[#1849A9]"
                                                   label="Edit"
                                                   icon="pi pi-pen-to-square"
                                                   iconPos="right"
                                                   onClick={toggleAdd}
                                               />
                                           </div>
                                       </div>
                                       <div className="p-4 rounded-b-lg bg-[#EFF8FF] grid grid-cols-2 gap-x-1 gap-y-3">
                                           <div className="col-span-2">
                                               <div className="text-[#000] font-semibold text-sm mb-1">
                                                   Availability Days
                                               </div>
                                               <div className="dayscheck">
                                                   <div className="p-button-group">
                                                       {
                                                        ele.availabilityDays.length > 0 && 
                                                        ele.availabilityDays.map((day, index) => (
                                                          <div key={index} className="p-button p-highlight">
                                                           <div className="flex items-center gap-1">
                                                               <i className="pi pi-check" />
                                                               <span>
                                                                  {day.name}
                                                               </span>
                                                           </div>
                                                       </div>
                                                        ))
                                                       }
                                                   </div>
                                               </div>
                                           </div>
                                           <div>
                                               <div className="text-[#000] font-semibold text-sm mb-1">
                                                   Time
                                               </div>
                                               <div className="text-xs text-[#667085] text-nowrap">
                                               {ele?.timeFrom && ele?.timeTo ? 
                                `${new Date(ele.timeFrom).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                                 ${new Date(ele.timeTo).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}` 
                                : "N/A"}
                                               </div>
                                           </div>
                                           <div>
                                               <div className="text-[#000] font-semibold text-sm mb-1">
                                                   Visiting Type
                                               </div>
                                               <div className="text-xs text-[#667085] text-nowrap">
                                                   {ele?.visitingType || "N/A"}
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           )) 
                       : 
                           <div>No schedules available.</div>
                        }

                        {isAdd && (
                          <div className="p-4 shadow-md rounded-md">
                            <div className="text-[#000] font-semibold text-sm mb-1">
                              Availability days
                            </div>
                            <div className="dayscheck flex justify-start mb-3">
                              <SelectButton
                                value={availabilityDay}
                                onChange={(e: SelectButtonChangeEvent) =>
                                  setAvailabilityDay(e.value)
                                }
                                options={availabilityDays}
                                optionLabel="name"
                                multiple
                                itemTemplate={itemDayTemplate}
                              />
                              {errors.availabilityDays && (
                                <p className="text-red-600 text-xs mt-1">
                                  {errors.availabilityDays}
                                </p>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div>
                                <div className="text-[#000] font-semibold text-sm mb-1">
                                  From
                                </div>
                                <Calendar
                                  className="text-sm"
                                  placeholder="Select time"
                                  value={timeData.from}
                                  onChange={(e) =>
                                    setTimeData({ ...timeData, from: e.value })
                                  }
                                  timeOnly
                                />
                                {errors.timeFrom && (
                                  <p className="text-red-600 text-xs mt-1">
                                    {errors.timeFrom}
                                  </p>
                                )}
                              </div>
                              <div>
                                <div className="text-[#000] font-semibold text-sm mb-1">
                                  To
                                </div>
                                <Calendar
                                  className="text-sm"
                                  placeholder="Select time"
                                  value={timeData.to}
                                  onChange={(e) =>
                                    setTimeData({ ...timeData, to: e.value })
                                  }
                                  timeOnly
                                />
                                {errors.timeTo && (
                                  <p className="text-red-600 text-xs mt-1">
                                    {errors.timeTo}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-[#000] font-semibold text-sm mb-1">
                              Visiting type
                            </div>
                            <div>
                              <Dropdown
                                value={selectedVisitingData}
                                onChange={(e) =>
                                  setSelectedVisitingData(e.value)
                                }
                                options={visitings}
                                optionLabel="name"
                                placeholder="Select Visiting type"
                                className="w-full md:w-14rem"
                              />
                              {errors.visitingType && (
                                <p className="text-red-600 text-xs mt-1">
                                  {errors.visitingType}
                                </p>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-4 bg-white p-4 border-t border-solid border-[#EAECF0] border-l-0 border-r-0 border-b-0">
                              <div>
                                <Button
                                onClick={handelCancelSchedule}
                                  className="bg-[#fff] text-[#1D4ED8] border-[#1D4ED8] shadow-none w-full"
                                  label="Cancel"
                                  size="small"
                                />
                              </div>
                              <div>
                                <Button
                                onClick={handelScheduleAdd}
                                  className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full"
                                  label="Save"
                                  size="small"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        <div>
                          <Button
                            size="small"
                            className="bg-[#1849A9] border-0 shadow-none text-[#fff]"
                            label="Add Schedule"
                            icon="pi pi-plus"
                            iconPos="right"
                            onClick={toggleAdd}
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 bg-white p-4 border-t border-solid border-[#EAECF0] border-l-0 border-r-0 border-b-0">
                    <div>
                      <Button
                        onClick={handelCancel}
                        className="bg-[#fff] text-[#1D4ED8] border-[#1D4ED8] shadow-none w-full"
                        label="Cancel"
                        size="small"
                      />
                    </div>
                    <div>
                      <Button
                        onClick={handelClinicInformation}
                        className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none w-full"
                        label="Next"
                        size="small"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
