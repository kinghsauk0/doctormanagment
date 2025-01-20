"use client";
import React, { useEffect, useRef, useState } from "react";
import "../clinic.scss";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import Link from "next/link";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { TieredMenu } from "primereact/tieredmenu";
import AddPayment from "../components/AddPayment/AddPayment";
export default function Page() {
    const isMobile = useMobile();
    const[sidebarVisible, setSidebarVisible]=useState(false);
    const menu = useRef(null);

    const items = [            
        {
            label: 'Export',
            icon: 'pi pi-file-export'
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash'
        }
    ];


      const staticData = [
        { slno: '01', pname: 'Olivia Rhye', pemail: 'olivia@someone.com', pimage: '/images/doc1.webp', treatment:'Routine checkup', date:'1 July 2024', invid:'INV-02630', amount:'₹2000', status:'Success' },
        { slno: '02', pname: 'Richard Rhy', pemail: 'olivia@someone.com', pimage: '/images/doc1.webp', treatment:'Routine checkup', date:'1 July 2024', invid:'INV-02630', amount:'₹2000', status:'Success' },
        { slno: '03', pname: 'Richard Rhy', pemail: 'olivia@someone.com', pimage: '/images/doc1.webp', treatment:'Routine checkup', date:'1 July 2024', invid:'INV-02630', amount:'₹2000', status:'Success' },
        { slno: '04', pname: 'Richard Rhy', pemail: 'olivia@someone.com', pimage: '/images/doc1.webp', treatment:'Routine checkup', date:'1 July 2024', invid:'INV-02630', amount:'₹2000', status:'Success' },
        { slno: '05', pname: 'Richard Rhy', pemail: 'olivia@someone.com', pimage: '/images/doc1.webp', treatment:'Routine checkup', date:'1 July 2024', invid:'INV-02630', amount:'₹2000', status:'Success' },
        { slno: '06', pname: 'Richard Rhy', pemail: 'olivia@someone.com', pimage: '/images/doc1.webp', treatment:'Routine checkup', date:'1 July 2024', invid:'INV-02630', amount:'₹2000', status:'Success' },
        { slno: '07', pname: 'Richard Rhy', pemail: 'olivia@someone.com', pimage: '/images/doc1.webp', treatment:'Routine checkup', date:'1 July 2024', invid:'INV-02630', amount:'₹2000', status:'Success' },
        { slno: '08', pname: 'Richard Rhy', pemail: 'olivia@someone.com', pimage: '/images/doc1.webp', treatment:'Routine checkup', date:'1 July 2024', invid:'INV-02630', amount:'₹2000', status:'Success' },
    ];
    
    const editButtonBody = () => {
        return (
            <>
                <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
                <Button icon="pi pi-ellipsis-h" className="bg-transparent p-0 border-0 shadow-none w-auto text-[#666]" onClick={(e) => menu.current.toggle(e)} />
            </>
        );
    };

    const patientInfo = (item) => {
        return (
            <>
                <div className="flex items-center text-left gap-3">
                    <div style={{lineHeight:'0'}}>
                        <Image
                            src={item.pimage}
                            alt="Image"
                            className="rounded-full"
                            width="40"
                            height="40"
                        />
                    </div>
                    <div>
                        <div className="text-[#000] font-semibold text-sm">{item.pname}</div>
                        <div className="text-[#848484] text-xs">{item.pemail}</div>
                    </div>
                </div>
            </>
        );
    };
    

    const op = useRef(null);
    const[paymentVisible, setPaymentVisible]=useState(false);

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
                    Payments
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
                    <div className="flex justify-end items-center md:gap-4 gap-2 mobfilteradjustable">
                        <Button icon="pi pi-sort-alt" label="Sort" className="bg-[#fff] text-[#000] text-sm border-[#fff] p-3 h-[40px]"/>
                        <Button icon="pi pi-filter" label="Filter" className="bg-[#fff] text-[#000] text-sm border-[#fff] p-3 h-[40px]"/>
                        <Button icon="pi pi-plus" label="Add Payment" className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] p-3 h-[40px]" onClick={() => setPaymentVisible(true)}/>
                    </div>
                </section>
                <div style={{height:'calc(100vh - 145px)', overflow:'auto'}}>
                    <div className="lg:px-10 md:px-6 px-4">
                        <div className="p-4 bg-white rounded-md">
                            <div className="mb-4 font-semibold"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#4BAC3B] pr-2">Payment Lists</span></div>
                            <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  value={staticData} stripedRows className="text-sm" tableStyle={{ minWidth: '50rem' }}>
                                <Column field="slno" header="Sl no" className="text-nowrap"></Column>
                                <Column body={patientInfo} header="Patient name" className="text-center"></Column>
                                <Column field="treatment" header="Treatment" className="text-nowrap"></Column>
                                <Column field="date" header="Date" className="text-nowrap"></Column>
                                <Column field="invid" header="Invoice ID" className="text-nowrap"></Column>
                                <Column field="amount" header="Amount" className="text-nowrap"></Column>
                                <Column field="status" header="Status" className="text-nowrap status-active"></Column>
                                <Column body={editButtonBody} header="" className="tableaction"></Column>
                            </DataTable>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddPayment visible={paymentVisible} setVisible={setPaymentVisible} />
    </>
}