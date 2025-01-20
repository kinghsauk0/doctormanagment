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
import { InputSwitch } from "primereact/inputswitch";
import AddDoctor from "../components/AddDoctor/AddDoctor";
export default function Page() {
    const isMobile = useMobile();
    const[sidebarVisible, setSidebarVisible]=useState(false);
    const [date, setDate] = useState(new Date());

      const staticData = [
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
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

    const [checked, setChecked] = useState(true);
    const docStatus = () => {
        return (
            <>
                <div className="flex items-center justify-center">
                    <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
                </div>
            </>
        );
    };

    const op = useRef(null);

    const[doctorVisible, setDoctorVisible]=useState(false);
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
                    Doctors
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
                        <div className="headercalender">
                            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon iconPos="left" />
                        </div>
                        <Button icon="pi pi-plus" label="Add Doctor" className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] p-3 h-[40px]" onClick={() => setDoctorVisible(true)}/>
                    </div>
                </section>
                <div style={{height:'calc(100vh - 145px)', overflow:'auto'}}>
                    <div className="lg:px-10 md:px-6 px-4">
                        <div className="p-4 bg-white rounded-md">
                            <div className="mb-4 font-semibold"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#4BAC3B] pr-2">Doctor Lists</span></div>
                            <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  value={staticData} stripedRows className="text-sm" tableStyle={{ minWidth: '50rem' }}>
                                <Column field="name" header="Name" className="text-nowrap"></Column>
                                <Column field="contact" header="Contact" className="text-nowrap"></Column>
                                <Column field="number" header="Number" className="text-nowrap"></Column>
                                <Column field="date" header="Date" className="text-nowrap"></Column>
                                <Column field="time" header="Time" className="text-nowrap"></Column>
                                <Column field="condition" header="Condition" className="text-nowrap"></Column>
                                <Column field="fees" header="Fees" className="text-nowrap"></Column>
                                <Column field="payment" header="Payment" className="text-nowrap"></Column>
                                <Column body={docStatus} header="Status" className="text-center"></Column>
                                <Column body={editButtonBody} header=""></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddDoctor visible={doctorVisible} setVisible={setDoctorVisible} />
    </>
}