"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
import Link from "next/link";
import DrLeftSideBar from "../components/DrLeftSideBar/DrLeftSideBar";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { TieredMenu } from "primereact/tieredmenu";
import ChiefComplaints from "../components/E-precription/ChiefComplaints/ChiefComplaints";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import { Nullable } from "primereact/ts-helpers";
import { axiosService } from "@/app/services/axios.service";
import { useApp } from "@/app/context/AppProvider";
import { p } from "framer-motion/client";

import { useAuth } from "@/app/context/AuthProvider";
import { getCookie } from "@/app/services/cookie.service";

export default function Page() {
  
  const isMobile = useMobile();
  const[sidebarVisible, setSidebarVisible]=useState(false);
  const [date, setDate] = useState<Nullable<Date>>(new Date());
  const op = useRef<OverlayPanel>(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const  {app} = useApp()
  const menuRefs = useRef<Array<React.RefObject<TieredMenu>>>([]); 
  const  [id, setId] = useState<string | null>(null)
  const {user} = useAuth()
  
  const TableAction = [
    {
        label: 'View',
    },
    {
        label: 'Remove',
    }
  ];

  useEffect(() => {
    const doctorId = getCookie("doctorId");
    if (doctorId) {
        console.log("doctor id", doctorId);
        setId(doctorId);
    } else {
        console.log("Doctor ID cookie not found.");
    }
}, []);

useEffect(() => {
  console.log("User data:", user);
  if (id) {  
      getPrescription();
  }
}, [id]);

const getPrescription = async () => {
  console.log("frist error id is",id)
  try {
      if (id !== null) {
        console.log("error")
          const { message, status, data } = await axiosService({
              method: 'GET',
              url: `/api/doctor/doctor-epescription/doctor-eprescription-many?id=${id}`
          });

          if (status < 210) {
              app.toastSuccess(message);
          }
          console.log(data);
      } else {
          console.log("No user or doctor ID found.");
          return;
      }
  } catch (error) {
      console.error("Error fetching prescription:", error);
  }
};


  const staticData = [
    { slno: '01', image: '/images/Suresh-Din.webp', Pname: 'Olivia Rhye', subtitle: 'Male | 28yrs', Pid: 'VCU5566654', Pdate: '00/00/0000', chiefComplaints : 'Stomach pain', status:'<div class="suc">Success</div>' },
    { slno: '02', image: '/images/Suresh-Din.webp', Pname: 'Olivia Rhye', subtitle: 'Male | 28yrs', Pid: 'VCU5566654', Pdate: '00/00/0000', chiefComplaints : 'Stomach pain', status:'<div class="Dra">Draft</div>' },
    { slno: '03', image: '/images/Suresh-Din.webp', Pname: 'Olivia Rhye', subtitle: 'Male | 28yrs', Pid: 'VCU5566654', Pdate: '00/00/0000', chiefComplaints : 'Stomach pain', status:'<div class="suc">Success</div>' },
    { slno: '04', image: '/images/Suresh-Din.webp', Pname: 'Olivia Rhye', subtitle: 'Male | 28yrs', Pid: 'VCU5566654', Pdate: '00/00/0000', chiefComplaints : 'Stomach pain', status:'<div class="Dra">Draft</div>' },
    { slno: '05', image: '/images/Suresh-Din.webp', Pname: 'Olivia Rhye', subtitle: 'Male | 28yrs', Pid: 'VCU5566654', Pdate: '00/00/0000', chiefComplaints : 'Stomach pain', status:'<div class="suc">Success</div>' },
  ];

  const statusBodyTemplate = (rowData: { status: any; }) => {
    return <div dangerouslySetInnerHTML={{ __html: rowData.status }} />;
  };

  const actionBodyTemplate = (_rowData: any, index: number) => {
    if (!menuRefs.current[index]) {
        menuRefs.current[index] = React.createRef<TieredMenu>();
    }

    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        menuRefs.current[index]?.current?.toggle(e);
    };

    return (
        <>
            <TieredMenu model={TableAction} popup ref={menuRefs.current[index]} breakpoint="767px" />
            <Button icon="pi pi-ellipsis-h" className="btnico" onClick={handleToggle} />
        </>
    );
};

  const imageTitleSubtitleTemplate = (rowData: { image: string | undefined; title: string | undefined; Pname: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; subtitle: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => {
    return (
        <div className="flex gap-3">
            <div>
              <img src={rowData.image} alt={rowData.title} className="rounded-full" style={{ width: '38px', height: '38px'}} />
            </div>
            <div>
                <div className="">{rowData.Pname}</div>
                <small>{rowData.subtitle}</small>
            </div>
        </div>
    );
  };


  const [createpreVisible, setCreatePreVisible] = useState(false);

  


 console.log("use", user)
  
  return (
    <>
    {isMobile ? <></> : <></>}

    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <DrLeftSideBar visible={sidebarVisible} setVisible={setSidebarVisible} />
            </div>
            <div className="col-span-3 lg:col-span-4">
                <DashboardHeader setSidebarVisible={setSidebarVisible} pageName="E-Prescription"/>
                <section className="py-4 lg:px-10 md:px-6 px-4">
                    <div className="flex justify-end items-center md:gap-4 gap-3">
                        <Button icon="pi pi-plus" label="Add E-prescription" className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] py-3 h-[40px]" onClick={() => setCreatePreVisible(true)}/>
                    </div>
                </section>
                <div style={{height:'calc(100vh - 145px)', overflow:'auto'}}>
                  <div className="lg:px-10 md:px-6 px-4">
                    {isMobile ? 
                    <>
                      <div className="mb-2 text-[#667085]">Patients</div>
                      <div className="flex flex-col gap-2">
                        <div className="bg-white rounded-md p-2 flex items-center gap-3">
                          <div>
                            <img src="/images/rvw3.webp" alt="" className="rounded-full" style={{ width: '40px', height: '40px'}} />
                          </div>
                          <div>
                            <div className="font-semibold text-base">Robert hawks</div>
                            <div className="text-xs text-[#475467]">32 years | Female</div>
                          </div>
                        </div>
                        <div className="bg-white rounded-md p-2 flex items-center gap-3">
                          <div>
                            <img src="/images/rvw3.webp" alt="" className="rounded-full" style={{ width: '40px', height: '40px'}} />
                          </div>
                          <div>
                            <div className="font-semibold text-base">Robert hawks</div>
                            <div className="text-xs text-[#475467]">32 years | Female</div>
                          </div>
                        </div>
                      </div>
                    </> : 
                    <>
                      <div className="bg-white">
                        <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  value={staticData} stripedRows className="text-sm" tableStyle={{ minWidth: '100%' }}>
                          <Column field="slno" header="Sl NO"></Column>
                          <Column header="Patients Name" body={imageTitleSubtitleTemplate} />
                          <Column field="Pid" header="Prescription ID"></Column>
                          <Column field="Pdate" header="Prescribed Date"></Column>
                          <Column field="chiefComplaints" header="Chief Complaints"></Column>
                          <Column header="Status" body={statusBodyTemplate}></Column>
                          <Column header="Actions" body={(rowData, options) => actionBodyTemplate(rowData, options.rowIndex)} />
                        </DataTable>
                      </div>
                    </>}
                    
                  </div>
                </div>
              </div>
            </div>

            

          <ChiefComplaints visible={createpreVisible} setVisible={setCreatePreVisible} />
    </>
  )
}
