"use client";
import React, { useEffect, useRef, useState } from "react";
import "../clinic.scss";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import Link from "next/link";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ProgressBar } from "primereact/progressbar";
import { Timeline } from "primereact/timeline";
import AddAppointment from "../components/AddAppointment/AddAppointment";

export default function Page() {
    const isMobile = useMobile();
    const[sidebarVisible, setSidebarVisible]=useState(false);
    const [date, setDate] = useState(new Date());
    const[appointmentVisible, setAppointmentVisible]=useState(false);

      const staticData = [
        { name: 'Sumit roy', contact: '000050065', number: '25', date: 20/10/23, time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: 20/10/23, time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: 20/10/23, time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: 20/10/23, time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: 20/10/23, time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: 20/10/23, time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: 20/10/23, time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: 20/10/23, time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
    ];
    
    const editButtonBody = () => {
        return (
            <>
                <div className="flex items-center justify-end gap-4">
                    <Button className="p-0 border-0 shadow-none bg-transparent text-[#222] w-auto" icon="pi pi-pen-to-square" />
                    <Button className="p-0 border-0 shadow-none bg-transparent text-[#f00] w-auto" icon="pi pi-trash" />
                </div>
            </>
        );
    };

    const op = useRef(null);

    
    const searchs = [
        { name: 'By Doctor' },
        { name: 'By Patient' }
    ];
    const [selectedSearchby, setSelectedSearchby] = useState(searchs[0]);


    const events = [
        { title: 'Jorme dil', subtitle:'Headache', date: '15/10/2020 10:30', icon: 'pi pi-check', color: '#5D9D54', image: '/images/doc1.webp' },
        { title: 'Guy hawking', subtitle:'Stomach Pain', date: '15/10/2020 10:30', icon: 'pi pi-check', color: '#5D9D54', image: '/images/doc1.webp' },
        { title: 'Din Edwards', subtitle:'Back Pain', date: '15/10/2020 10:30', icon: 'pi pi-check', color: '#5D9D54', image: '/images/doc1.webp' },
        { title: 'Christian b', subtitle:'Stomach Pain', date: '15/10/2020 10:30', icon: 'pi pi-check', color: '#5D9D54', image: '/images/doc1.webp' },
        { title: 'john', subtitle:'Joint pain', date: '15/10/2020 10:30', icon: 'pi pi-gauge', color: '#487AEC', image: '/images/doc1.webp' },
        { title: 'Ian Bel', subtitle:'Joint pain', date: '15/10/2020 10:30', icon: 'pi pi-gauge', color: '#487AEC', image: '/images/doc1.webp' },
        { title: 'john', subtitle:'Joint pain', date: '15/10/2020 10:30', icon: 'pi pi-gauge', color: '#487AEC', image: '/images/doc1.webp' },
    ];

    const customizedMarker = (item) => {
        return (
            <>
                <div className="flex items-start gap-1 appotimeinfo">
                    <div className="text-10px text-[#848484] max-w-[53px] text-center">{item.date}</div>
                    <span className="flex min-w-[14px] min-h-[14px] rounded-full border-3 border-solid" style={{ backgroundColor: '#fff', borderColor:item.color }}></span>
                </div>
            </>
        );
    };

    const customizedContent = (item) => {
        return (
            <div className="flex items-center gap-4 p-3 rounded-md border border-solid border-[#D9D9D9] bg-[#FBFBFC]">
                <div>
                    <Image
                        src={item.image}
                        alt="Image"
                        className="rounded-full"
                        width="44"
                        height="44"
                    />
                </div>
                <div>
                    <div className="text-[#000] font-medium">{item.title}</div>
                    <div className="text-xs text-[#848484]">{item.subtitle}</div>
                </div>
                <div className="ml-auto statusico">
                    <div className="flex items-center justify-center rounded-full h-[30px] w-[30px] border border-solid p-2" style={{ borderColor: item.color }}>
                        <i className={`${item.icon} text-white rounded-full`} style={{ backgroundColor: item.color }}></i>
                    </div>
                </div>
            </div>
        );
    };


    return <>
        {isMobile ? <></> : <></>}

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <LeftSideBar visible={sidebarVisible} setVisible={setSidebarVisible} />
            </div>
            <div className="col-span-3 lg:col-span-4">
                <section className="pageheader flex items-center py-4 lg:px-10 md:px-6 px-4 bg-white gap-4">
                    <Button icon="pi pi-bars" className="md:hidden bg-transparent p-0 shadow-none border-0 w-auto text-[#222]" onClick={()=> setSidebarVisible(true)}/>
                    <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
                    Appointments
                    </div>
                    <div className="ml-auto">
                        <Button icon="pi pi-search" className="m-0 p-0 border-0 shadow-none bg-transparent text-[#222]" onClick={(e) => op.current.toggle(e)} />
                        <OverlayPanel ref={op}>
                            <IconField iconPosition="left">
                                <InputIcon className="pi pi-search"> </InputIcon>
                                <InputText v-model="value1" placeholder="Search" />
                            </IconField>
                        </OverlayPanel>
                    </div>
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-[#222] text-sm"
                    >
                        <div style={{ lineHeight: "0" }}>
                        <Image
                            src="/images/rvw1.webp"
                            alt="Image"
                            className="rounded-full"
                            width="30"
                            height="30"
                        />
                        </div>
                        <div className="hidden md:block">Ron john</div>
                    </Link>
                </section>
                <section className="py-4 lg:px-10 md:px-6 px-4">
                    <div className="flex justify-between md:justify-end items-center md:gap-4 gap-2 mobfilteradjustable">
                        <Dropdown 
                            value={selectedSearchby} 
                            onChange={(e) => setSelectedSearchby(e.value)} 
                            options={searchs} 
                            optionLabel="name" 
                            placeholder="Select an option" 
                        />
                        <div className="headercalender">
                            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon iconPos="left" />
                        </div>
                        <Button icon="pi pi-plus" label="Add Appointment" className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] p-3 h-[40px]" onClick={()=> setAppointmentVisible(true)}/>
                    </div>
                </section>
                <div style={{height:'calc(100vh - 145px)', overflow:'auto'}}>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:px-10 md:px-6 px-4">
                        <div className="col-span-4 flex flex-col gap-4">
                            <div className="p-4 bg-white rounded-md">
                                <div className="mb-4 font-semibold"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#4BAC3B] pr-2">Appointment Activity</span></div>
                                <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  value={staticData} stripedRows className="text-sm" tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="name" header="Name" className="text-nowrap"></Column>
                                    <Column field="contact" header="Contact" className="text-nowrap"></Column>
                                    <Column field="number" header="Number" className="text-nowrap"></Column>
                                    <Column field="date" header="Date" className="text-nowrap"></Column>
                                    <Column field="time" header="Time" className="text-nowrap"></Column>
                                    <Column field="condition" header="Condition" className="text-nowrap"></Column>
                                    <Column field="fees" header="Fees" className="text-nowrap"></Column>
                                    <Column field="payment" header="Payment" className="text-nowrap"></Column>
                                    <Column body={editButtonBody} header=""></Column>
                                </DataTable>
                            </div>
                        </div>
                        <div className="md:col-span-2 col-span-4">
                            <div className="p-4 bg-white rounded-md">
                                <div className="mb-4 font-semibold"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#4BAC3B] pr-2">Appointment For Today</span></div>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    <div className="px-3 py-6 rounded-md shadow-md">
                                        <div className="flex justify-between items-center text-xs mb-1">
                                            <div>New Patients</div>
                                            <div className="">10/<span className="text-[#848484]">30</span></div>
                                        </div>
                                        <ProgressBar value={40} className="activityprogress" style={{ height: '5px' }}></ProgressBar>
                                    </div>
                                    <div className="px-3 py-6 rounded-md shadow-md">
                                        <div className="flex justify-between items-center text-xs mb-1">
                                            <div>Follow-Up Patients</div>
                                            <div className="">20/<span className="text-[#848484]">30</span></div>
                                        </div>
                                        <ProgressBar value={70} className="activityprogress" style={{ height: '5px' }}></ProgressBar>
                                    </div>
                                </div>
                                <div className="appotimeline">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="uppercase text-[#000] font-medium">Appointment</div>
                                            <span className="h-[20px] w-[20px] rounded-full flex justify-center items-center text-[#fff] bg-[#2280DE] text-10px">30</span>
                                        </div>
                                        <Button className="p-0 w-auto bg-transparent border-0 shadow-none text-[#222] text-xs">View All</Button>
                                    </div>
                                    <Timeline value={events} align="left" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddAppointment visible={appointmentVisible} setVisible={setAppointmentVisible} />
    </>
}