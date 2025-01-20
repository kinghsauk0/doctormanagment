"use client";
import React, { useRef, useState } from "react";
import { Button } from 'primereact/button';
import { Sidebar } from "primereact/sidebar";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { InputNumber } from "primereact/inputnumber";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddPayment({visible, setVisible}:Props) {


    const [date, setDate] = useState(null);

    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const doctors = [
        { name: 'Dr. Strange' },
        { name: 'Dr. Banner' },
        { name: 'Dr. Mahato' }
    ];
    const [selectedPaymentM, setSelectedPaymentM] = useState(null);
    const payments = [
        { name: 'Online' },
        { name: 'Cash' },
        { name: 'Check' }
    ];
    const [selectedPaymentS, setSelectedPaymentS] = useState(null);
    const paymentstatus = [
        { name: 'Paid' },
        { name: 'Due' }
    ];

    
    const [value2, setValue2] = useState(58151);

    const toast = useRef(null);

    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const AddPatientHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setVisible(false)} />
                <div>
                    <div className='font-semibold text-base text-[#222]'>Add Payment</div>
                    <div className="text-10px text-[#667085]">Details about payment information</div>
                </div>
            </div>
        </div>
    );

    const staticData = [
        { particulars: 'Special room', details: 'Details', rate: '₹14400', quantity: '1', amount:'₹14400'},
    ];
    const editButtonBody = () => {
        return (
            <>
                <div className="flex items-center justify-center gap-4">
                    <Button className="p-0 border-0 shadow-none bg-transparent text-[#222] w-auto" icon="pi pi-pen-to-square" />
                    <Button className="p-0 border-0 shadow-none bg-transparent text-[#f00] w-auto" icon="pi pi-trash" />
                </div>
            </>
        );
    };


  return (
    <>
        <Sidebar header={AddPatientHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div className='flex flex-col gap-4 h-full'>
                <div className="flex flex-col gap-3">
                    <div className="text-lg font-semibold text-[#000]">Payment information</div>
                    <div className="">
                        <InputText v-model="value1" className="w-full bg-[#fff] shadow-none text-sm" placeholder="Patient name" />
                    </div>
                    <div className="">
                        <Dropdown value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.value)} options={doctors} optionLabel="name" 
                            placeholder="Select Doctor" className="w-full bg-[#fff] shadow-none text-sm" />
                    </div>
                    <div className="">
                        <Calendar value={date} onChange={(e) => setDate(e.value)} className="w-full shadow-none text-sm" placeholder="Bill Date" />
                    </div>
                    <div className="">
                        <InputNumber inputId="withoutgrouping" className="w-full shadow-none text-sm" value={value2} placeholder="Bill no." useGrouping={false} />
                    </div>
                    <div className="text-lg font-semibold text-[#000]">Item description</div>
                    <div className="mb-10">
                        <DataTable value={staticData} stripedRows className="text-sm" size="small" tableStyle={{ minWidth: '50rem' }}>
                            <Column field="particulars" header="Particulars of Charges" className="text-nowrap"></Column>
                            <Column field="details" header="Details" className="text-nowrap"></Column>
                            <Column field="rate" header="Rate" className="text-nowrap" align={"center"}></Column>
                            <Column field="quantity" header="Quantity" align={"center"} className="text-nowrap"></Column>
                            <Column field="amount" header="Amount" className="text-nowrap" align={"center"}></Column>
                            <Column body={editButtonBody} header="Action" align={"center"}></Column>
                        </DataTable>
                        <Button className="text-xs bg-transparent p-0 border-0 shadow-none text-[#1570EF] mt-2" size="small" label="Add row" icon="pi pi-plus"/>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-3">
                            <div>
                                <Dropdown value={selectedPaymentM} onChange={(e) => setSelectedPaymentM(e.value)} options={payments} optionLabel="name" 
                                placeholder="Select Payment Method" className="w-full bg-[#fff] shadow-none text-sm" />
                            </div>
                            <div>
                                <Dropdown value={selectedPaymentS} onChange={(e) => setSelectedPaymentS(e.value)} options={paymentstatus} optionLabel="name" 
                                placeholder="Select Payment Status" className="w-full bg-[#fff] shadow-none text-sm" />
                            </div>
                        </div>
                        <div className="text-xs text-right flex flex-col gap-3">
                            <div className="grid grid-cols-2 gap-4">
                                <div>Gross Total:</div>
                                <div>$2500.00</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>Tax (%):</div>
                                <div>$200.00 (14%)</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>Discount (%):</div>
                                <div>$100.00 (10%)</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>Total:</div>
                                <div>$2200.00</div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <Toast ref={toast}></Toast>
                        <FileUpload mode="basic" chooseLabel="Upload Document" className="w-full" name="demo[]" url="/api/upload" accept="image/*" maxFileSize={1000000} onUpload={onUpload} />
                    </div>
                </div>
                <div className="mt-auto">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Submit" onClick={() => setVisible(false)}/>
                </div>
            </div>
        </Sidebar>
    </>
  )
}
