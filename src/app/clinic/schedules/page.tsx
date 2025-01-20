"use client";

import React, { useEffect, useRef, useState } from "react";
import "../clinic.scss";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import Link from "next/link";
import { Calendar } from "primereact/calendar";
import { OverlayPanel } from "primereact/overlaypanel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import $ from 'jquery';
import './jquery.calendarPicker.js';
import AddAppointment from "../components/AddAppointment/AddAppointment";



export default function Page() {
    const isMobile = useMobile();
    const[sidebarVisible, setSidebarVisible]=useState(false);
    const [date, setDate] = useState(new Date());
    const op = useRef(null);
    const[appointmentVisible, setAppointmentVisible]=useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          // Ensure jQuery is used on the client-side
          $('#dsel1').calendarPicker({
            monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          });
        }
      }, []);

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
                    Schedules
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
                    <div className="flex justify-between md:justify-end items-center md:gap-4 gap-3">
                        <div className="headercalender">
                            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon iconPos="left" />
                        </div>
                        <Button icon="pi pi-plus" label="Add Appointment" className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] py-3 h-[40px]" onClick={()=> setAppointmentVisible(true)}/>
                    </div>
                </section>
                <div style={{height:'calc(100vh - 145px)', overflow:'auto'}}>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:px-10 md:px-6 px-4">
                        <div className="col-span-4 flex flex-col gap-4">
                            <div className="p-4 rounded-md bg-white">
                                <div id="dsel1"></div>
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <div className="p-3 shadow-md rounded-md">
                                        <div className="flex gap-3">
                                            <div>
                                                <Image
                                                    src="/images/rvw1.webp"
                                                    alt="Image"
                                                    className="rounded-full"
                                                    width="60"
                                                    height="60"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="mt-0 mb-1">Dr. Aria Patel</h5>
                                                <small className="block text-[#4BA63E] text-10px">Dermatologist</small>
                                                <div className="flex gap-2 items-center text-[#222] text-sm mb-1">
                                                    <div style={{lineHeight:'0'}}>
                                                        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <mask style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                                                            <rect width="30" height="30" fill="#D9D9D9"></rect>
                                                        </mask>
                                                        <g mask="url(#mask0_2974_1796)">
                                                            <path d="M16.8534 26.8752C14.7727 26.8752 13.0003 26.1456 11.5361 24.6865C10.0719 23.2273 9.33984 21.4569 9.33984 19.3752V18.6925C7.65234 18.473 6.24089 17.7206 5.10547 16.4353C3.97005 15.1501 3.40234 13.63 3.40234 11.8752V5.81756C3.40234 5.49745 3.51061 5.22912 3.72716 5.01256C3.94372 4.79601 4.21205 4.68774 4.53216 4.68774H7.15234V4.37521C7.15234 4.10961 7.24223 3.88696 7.422 3.70728C7.60177 3.52759 7.82452 3.43774 8.09025 3.43774C8.35598 3.43774 8.57859 3.52759 8.75809 3.70728C8.93757 3.88696 9.02731 4.10961 9.02731 4.37521V6.87521C9.02731 7.14084 8.93743 7.36349 8.75766 7.54318C8.57789 7.72287 8.35514 7.81271 8.08941 7.81271C7.82368 7.81271 7.60106 7.72287 7.42156 7.54318C7.24208 7.36349 7.15234 7.14084 7.15234 6.87521V6.56271H5.27731V11.8752C5.27731 13.2502 5.7669 14.4273 6.74606 15.4065C7.72523 16.3856 8.90231 16.8752 10.2773 16.8752C11.6523 16.8752 12.8294 16.3856 13.8086 15.4065C14.7877 14.4273 15.2773 13.2502 15.2773 11.8752V6.56271H13.4023V6.87521C13.4023 7.14084 13.3124 7.36349 13.1326 7.54318C12.9529 7.72287 12.7301 7.81271 12.4644 7.81271C12.1986 7.81271 11.976 7.72287 11.7965 7.54318C11.6171 7.36349 11.5273 7.14084 11.5273 6.87521V4.37521C11.5273 4.10961 11.6172 3.88696 11.7969 3.70728C11.9767 3.52759 12.1995 3.43774 12.4652 3.43774C12.7309 3.43774 12.9536 3.52759 13.133 3.70728C13.3125 3.88696 13.4023 4.10961 13.4023 4.37521V4.68774H16.0225C16.3426 4.68774 16.6109 4.79601 16.8274 5.01256C17.044 5.22912 17.1522 5.49745 17.1522 5.81756V11.8752C17.1522 13.63 16.5846 15.1501 15.4492 16.4353C14.3137 17.7206 12.9023 18.473 11.2148 18.6925V19.3752C11.2148 20.9377 11.7628 22.2658 12.8589 23.3596C13.955 24.4533 15.286 25.0002 16.8518 25.0002C18.4143 25.0002 19.7424 24.4533 20.8362 23.3596C21.9299 22.2658 22.4768 20.9377 22.4768 19.3752V17.3536C21.8198 17.1468 21.2789 16.7649 20.8542 16.2077C20.4296 15.6504 20.2172 15.0156 20.2172 14.3031C20.2172 13.415 20.5282 12.6602 21.1501 12.0385C21.772 11.4169 22.5272 11.106 23.4157 11.106C24.3042 11.106 25.0589 11.4169 25.6799 12.0385C26.3009 12.6602 26.6113 13.415 26.6113 14.3031C26.6113 15.0156 26.399 15.6504 25.9743 16.2077C25.5497 16.7649 25.0088 17.1468 24.3517 17.3536V19.3752C24.3517 21.4569 23.6222 23.2273 22.1631 24.6865C20.7039 26.1456 18.934 26.8752 16.8534 26.8752ZM23.4143 15.6252C23.7845 15.6252 24.0974 15.4974 24.353 15.2418C24.6086 14.9862 24.7364 14.6733 24.7364 14.3031C24.7364 13.9329 24.6086 13.62 24.353 13.3644C24.0974 13.1088 23.7845 12.981 23.4143 12.981C23.0441 12.981 22.7312 13.1088 22.4756 13.3644C22.22 13.62 22.0922 13.9329 22.0922 14.3031C22.0922 14.6733 22.22 14.9862 22.4756 15.2418C22.7312 15.4974 23.0441 15.6252 23.4143 15.6252Z" fill="#248479"></path>
                                                        </g>
                                                        </svg> 
                                                    </div>
                                                    <div>General Physicial</div>
                                                </div>
                                                <small className="block text-[#4BA63E] text-10px">Available slot 23/30</small>
                                                <div className="flex gap-2 items-center text-[#222] text-sm">  
                                                    <div style={{lineHeight:'0'}}>
                                                        <svg fill="#666" enableBackground="new 0 0 512 512" height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-140.959 0-256 115.049-256 256 0 140.959 115.049 256 256 256 140.959 0 256-115.05 256-256 0-140.959-115.049-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path><circle cx="128.721" cy="383.279" r="15"></circle><circle cx="383.279" cy="128.721" r="15"></circle><path d="m118.114 118.114c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0 5.858-15.355 0-21.213c-5.857-5.858-15.355-5.858-21.213 0z"></path><path d="m372.673 372.673c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0 5.858-15.355 0-21.213-15.356-5.858-21.213 0z"></path><path d="m256 121c8.284 0 15-6.716 15-15v-30c0-8.284-6.716-15-15-15s-15 6.716-15 15v30c0 8.284 6.716 15 15 15z"></path><path d="m256 391c-8.284 0-15 6.716-15 15v30c0 8.284 6.716 15 15 15s15-6.716 15-15v-30c0-8.284-6.716-15-15-15z"></path><path d="m121 256c0-8.284-6.716-15-15-15h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.284 0 15-6.716 15-15z"></path><path d="m391 256c0 8.284 6.716 15 15 15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15h-30c-8.284 0-15 6.716-15 15z"></path><path d="m271 249.787v-83.787c0-8.284-6.716-15-15-15s-15 6.716-15 15v90c0 3.978 1.581 7.793 4.394 10.607l90 90c5.857 5.857 15.355 5.858 21.213 0s5.858-15.355 0-21.213z"></path></g></svg>
                                                    </div>         
                                                    <div>9:30am - 10:30am</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 shadow-md rounded-md">
                                        <div className="flex gap-3">
                                            <div>
                                                <Image
                                                    src="/images/rvw1.webp"
                                                    alt="Image"
                                                    className="rounded-full"
                                                    width="60"
                                                    height="60"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="mt-0 mb-1">Dr. Aria Patel</h5>
                                                <small className="block text-[#4BA63E] text-10px">Dermatologist</small>
                                                <div className="flex gap-2 items-center text-[#222] text-sm mb-1">
                                                    <div style={{lineHeight:'0'}}>
                                                        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <mask style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                                                            <rect width="30" height="30" fill="#D9D9D9"></rect>
                                                        </mask>
                                                        <g mask="url(#mask0_2974_1796)">
                                                            <path d="M16.8534 26.8752C14.7727 26.8752 13.0003 26.1456 11.5361 24.6865C10.0719 23.2273 9.33984 21.4569 9.33984 19.3752V18.6925C7.65234 18.473 6.24089 17.7206 5.10547 16.4353C3.97005 15.1501 3.40234 13.63 3.40234 11.8752V5.81756C3.40234 5.49745 3.51061 5.22912 3.72716 5.01256C3.94372 4.79601 4.21205 4.68774 4.53216 4.68774H7.15234V4.37521C7.15234 4.10961 7.24223 3.88696 7.422 3.70728C7.60177 3.52759 7.82452 3.43774 8.09025 3.43774C8.35598 3.43774 8.57859 3.52759 8.75809 3.70728C8.93757 3.88696 9.02731 4.10961 9.02731 4.37521V6.87521C9.02731 7.14084 8.93743 7.36349 8.75766 7.54318C8.57789 7.72287 8.35514 7.81271 8.08941 7.81271C7.82368 7.81271 7.60106 7.72287 7.42156 7.54318C7.24208 7.36349 7.15234 7.14084 7.15234 6.87521V6.56271H5.27731V11.8752C5.27731 13.2502 5.7669 14.4273 6.74606 15.4065C7.72523 16.3856 8.90231 16.8752 10.2773 16.8752C11.6523 16.8752 12.8294 16.3856 13.8086 15.4065C14.7877 14.4273 15.2773 13.2502 15.2773 11.8752V6.56271H13.4023V6.87521C13.4023 7.14084 13.3124 7.36349 13.1326 7.54318C12.9529 7.72287 12.7301 7.81271 12.4644 7.81271C12.1986 7.81271 11.976 7.72287 11.7965 7.54318C11.6171 7.36349 11.5273 7.14084 11.5273 6.87521V4.37521C11.5273 4.10961 11.6172 3.88696 11.7969 3.70728C11.9767 3.52759 12.1995 3.43774 12.4652 3.43774C12.7309 3.43774 12.9536 3.52759 13.133 3.70728C13.3125 3.88696 13.4023 4.10961 13.4023 4.37521V4.68774H16.0225C16.3426 4.68774 16.6109 4.79601 16.8274 5.01256C17.044 5.22912 17.1522 5.49745 17.1522 5.81756V11.8752C17.1522 13.63 16.5846 15.1501 15.4492 16.4353C14.3137 17.7206 12.9023 18.473 11.2148 18.6925V19.3752C11.2148 20.9377 11.7628 22.2658 12.8589 23.3596C13.955 24.4533 15.286 25.0002 16.8518 25.0002C18.4143 25.0002 19.7424 24.4533 20.8362 23.3596C21.9299 22.2658 22.4768 20.9377 22.4768 19.3752V17.3536C21.8198 17.1468 21.2789 16.7649 20.8542 16.2077C20.4296 15.6504 20.2172 15.0156 20.2172 14.3031C20.2172 13.415 20.5282 12.6602 21.1501 12.0385C21.772 11.4169 22.5272 11.106 23.4157 11.106C24.3042 11.106 25.0589 11.4169 25.6799 12.0385C26.3009 12.6602 26.6113 13.415 26.6113 14.3031C26.6113 15.0156 26.399 15.6504 25.9743 16.2077C25.5497 16.7649 25.0088 17.1468 24.3517 17.3536V19.3752C24.3517 21.4569 23.6222 23.2273 22.1631 24.6865C20.7039 26.1456 18.934 26.8752 16.8534 26.8752ZM23.4143 15.6252C23.7845 15.6252 24.0974 15.4974 24.353 15.2418C24.6086 14.9862 24.7364 14.6733 24.7364 14.3031C24.7364 13.9329 24.6086 13.62 24.353 13.3644C24.0974 13.1088 23.7845 12.981 23.4143 12.981C23.0441 12.981 22.7312 13.1088 22.4756 13.3644C22.22 13.62 22.0922 13.9329 22.0922 14.3031C22.0922 14.6733 22.22 14.9862 22.4756 15.2418C22.7312 15.4974 23.0441 15.6252 23.4143 15.6252Z" fill="#248479"></path>
                                                        </g>
                                                        </svg> 
                                                    </div>
                                                    <div>General Physicial</div>
                                                </div>
                                                <small className="block text-[#4BA63E] text-10px">Available slot 23/30</small>
                                                <div className="flex gap-2 items-center text-[#222] text-sm">  
                                                    <div style={{lineHeight:'0'}}>
                                                        <svg fill="#666" enableBackground="new 0 0 512 512" height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-140.959 0-256 115.049-256 256 0 140.959 115.049 256 256 256 140.959 0 256-115.05 256-256 0-140.959-115.049-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path><circle cx="128.721" cy="383.279" r="15"></circle><circle cx="383.279" cy="128.721" r="15"></circle><path d="m118.114 118.114c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0 5.858-15.355 0-21.213c-5.857-5.858-15.355-5.858-21.213 0z"></path><path d="m372.673 372.673c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0 5.858-15.355 0-21.213-15.356-5.858-21.213 0z"></path><path d="m256 121c8.284 0 15-6.716 15-15v-30c0-8.284-6.716-15-15-15s-15 6.716-15 15v30c0 8.284 6.716 15 15 15z"></path><path d="m256 391c-8.284 0-15 6.716-15 15v30c0 8.284 6.716 15 15 15s15-6.716 15-15v-30c0-8.284-6.716-15-15-15z"></path><path d="m121 256c0-8.284-6.716-15-15-15h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.284 0 15-6.716 15-15z"></path><path d="m391 256c0 8.284 6.716 15 15 15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15h-30c-8.284 0-15 6.716-15 15z"></path><path d="m271 249.787v-83.787c0-8.284-6.716-15-15-15s-15 6.716-15 15v90c0 3.978 1.581 7.793 4.394 10.607l90 90c5.857 5.857 15.355 5.858 21.213 0s5.858-15.355 0-21.213z"></path></g></svg>
                                                    </div>         
                                                    <div>9:30am - 10:30am</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 shadow-md rounded-md">
                                        <div className="flex gap-3">
                                            <div>
                                                <Image
                                                    src="/images/rvw1.webp"
                                                    alt="Image"
                                                    className="rounded-full"
                                                    width="60"
                                                    height="60"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="mt-0 mb-1">Dr. Aria Patel</h5>
                                                <small className="block text-[#4BA63E] text-10px">Dermatologist</small>
                                                <div className="flex gap-2 items-center text-[#222] text-sm mb-1">
                                                    <div style={{lineHeight:'0'}}>
                                                        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <mask style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                                                            <rect width="30" height="30" fill="#D9D9D9"></rect>
                                                        </mask>
                                                        <g mask="url(#mask0_2974_1796)">
                                                            <path d="M16.8534 26.8752C14.7727 26.8752 13.0003 26.1456 11.5361 24.6865C10.0719 23.2273 9.33984 21.4569 9.33984 19.3752V18.6925C7.65234 18.473 6.24089 17.7206 5.10547 16.4353C3.97005 15.1501 3.40234 13.63 3.40234 11.8752V5.81756C3.40234 5.49745 3.51061 5.22912 3.72716 5.01256C3.94372 4.79601 4.21205 4.68774 4.53216 4.68774H7.15234V4.37521C7.15234 4.10961 7.24223 3.88696 7.422 3.70728C7.60177 3.52759 7.82452 3.43774 8.09025 3.43774C8.35598 3.43774 8.57859 3.52759 8.75809 3.70728C8.93757 3.88696 9.02731 4.10961 9.02731 4.37521V6.87521C9.02731 7.14084 8.93743 7.36349 8.75766 7.54318C8.57789 7.72287 8.35514 7.81271 8.08941 7.81271C7.82368 7.81271 7.60106 7.72287 7.42156 7.54318C7.24208 7.36349 7.15234 7.14084 7.15234 6.87521V6.56271H5.27731V11.8752C5.27731 13.2502 5.7669 14.4273 6.74606 15.4065C7.72523 16.3856 8.90231 16.8752 10.2773 16.8752C11.6523 16.8752 12.8294 16.3856 13.8086 15.4065C14.7877 14.4273 15.2773 13.2502 15.2773 11.8752V6.56271H13.4023V6.87521C13.4023 7.14084 13.3124 7.36349 13.1326 7.54318C12.9529 7.72287 12.7301 7.81271 12.4644 7.81271C12.1986 7.81271 11.976 7.72287 11.7965 7.54318C11.6171 7.36349 11.5273 7.14084 11.5273 6.87521V4.37521C11.5273 4.10961 11.6172 3.88696 11.7969 3.70728C11.9767 3.52759 12.1995 3.43774 12.4652 3.43774C12.7309 3.43774 12.9536 3.52759 13.133 3.70728C13.3125 3.88696 13.4023 4.10961 13.4023 4.37521V4.68774H16.0225C16.3426 4.68774 16.6109 4.79601 16.8274 5.01256C17.044 5.22912 17.1522 5.49745 17.1522 5.81756V11.8752C17.1522 13.63 16.5846 15.1501 15.4492 16.4353C14.3137 17.7206 12.9023 18.473 11.2148 18.6925V19.3752C11.2148 20.9377 11.7628 22.2658 12.8589 23.3596C13.955 24.4533 15.286 25.0002 16.8518 25.0002C18.4143 25.0002 19.7424 24.4533 20.8362 23.3596C21.9299 22.2658 22.4768 20.9377 22.4768 19.3752V17.3536C21.8198 17.1468 21.2789 16.7649 20.8542 16.2077C20.4296 15.6504 20.2172 15.0156 20.2172 14.3031C20.2172 13.415 20.5282 12.6602 21.1501 12.0385C21.772 11.4169 22.5272 11.106 23.4157 11.106C24.3042 11.106 25.0589 11.4169 25.6799 12.0385C26.3009 12.6602 26.6113 13.415 26.6113 14.3031C26.6113 15.0156 26.399 15.6504 25.9743 16.2077C25.5497 16.7649 25.0088 17.1468 24.3517 17.3536V19.3752C24.3517 21.4569 23.6222 23.2273 22.1631 24.6865C20.7039 26.1456 18.934 26.8752 16.8534 26.8752ZM23.4143 15.6252C23.7845 15.6252 24.0974 15.4974 24.353 15.2418C24.6086 14.9862 24.7364 14.6733 24.7364 14.3031C24.7364 13.9329 24.6086 13.62 24.353 13.3644C24.0974 13.1088 23.7845 12.981 23.4143 12.981C23.0441 12.981 22.7312 13.1088 22.4756 13.3644C22.22 13.62 22.0922 13.9329 22.0922 14.3031C22.0922 14.6733 22.22 14.9862 22.4756 15.2418C22.7312 15.4974 23.0441 15.6252 23.4143 15.6252Z" fill="#248479"></path>
                                                        </g>
                                                        </svg> 
                                                    </div>
                                                    <div>General Physicial</div>
                                                </div>
                                                <small className="block text-[#4BA63E] text-10px">Available slot 23/30</small>
                                                <div className="flex gap-2 items-center text-[#222] text-sm">  
                                                    <div style={{lineHeight:'0'}}>
                                                        <svg fill="#666" enableBackground="new 0 0 512 512" height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-140.959 0-256 115.049-256 256 0 140.959 115.049 256 256 256 140.959 0 256-115.05 256-256 0-140.959-115.049-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path><circle cx="128.721" cy="383.279" r="15"></circle><circle cx="383.279" cy="128.721" r="15"></circle><path d="m118.114 118.114c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0 5.858-15.355 0-21.213c-5.857-5.858-15.355-5.858-21.213 0z"></path><path d="m372.673 372.673c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0 5.858-15.355 0-21.213-15.356-5.858-21.213 0z"></path><path d="m256 121c8.284 0 15-6.716 15-15v-30c0-8.284-6.716-15-15-15s-15 6.716-15 15v30c0 8.284 6.716 15 15 15z"></path><path d="m256 391c-8.284 0-15 6.716-15 15v30c0 8.284 6.716 15 15 15s15-6.716 15-15v-30c0-8.284-6.716-15-15-15z"></path><path d="m121 256c0-8.284-6.716-15-15-15h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.284 0 15-6.716 15-15z"></path><path d="m391 256c0 8.284 6.716 15 15 15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15h-30c-8.284 0-15 6.716-15 15z"></path><path d="m271 249.787v-83.787c0-8.284-6.716-15-15-15s-15 6.716-15 15v90c0 3.978 1.581 7.793 4.394 10.607l90 90c5.857 5.857 15.355 5.858 21.213 0s5.858-15.355 0-21.213z"></path></g></svg>
                                                    </div>         
                                                    <div>9:30am - 10:30am</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3 shadow-md rounded-md">
                                        <div className="flex gap-3">
                                            <div>
                                                <Image
                                                    src="/images/rvw1.webp"
                                                    alt="Image"
                                                    className="rounded-full"
                                                    width="60"
                                                    height="60"
                                                />
                                            </div>
                                            <div>
                                                <h5 className="mt-0 mb-1">Dr. Aria Patel</h5>
                                                <small className="block text-[#4BA63E] text-10px">Dermatologist</small>
                                                <div className="flex gap-2 items-center text-[#222] text-sm mb-1">
                                                    <div style={{lineHeight:'0'}}>
                                                        <svg width="20" height="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <mask style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="30" height="30">
                                                            <rect width="30" height="30" fill="#D9D9D9"></rect>
                                                        </mask>
                                                        <g mask="url(#mask0_2974_1796)">
                                                            <path d="M16.8534 26.8752C14.7727 26.8752 13.0003 26.1456 11.5361 24.6865C10.0719 23.2273 9.33984 21.4569 9.33984 19.3752V18.6925C7.65234 18.473 6.24089 17.7206 5.10547 16.4353C3.97005 15.1501 3.40234 13.63 3.40234 11.8752V5.81756C3.40234 5.49745 3.51061 5.22912 3.72716 5.01256C3.94372 4.79601 4.21205 4.68774 4.53216 4.68774H7.15234V4.37521C7.15234 4.10961 7.24223 3.88696 7.422 3.70728C7.60177 3.52759 7.82452 3.43774 8.09025 3.43774C8.35598 3.43774 8.57859 3.52759 8.75809 3.70728C8.93757 3.88696 9.02731 4.10961 9.02731 4.37521V6.87521C9.02731 7.14084 8.93743 7.36349 8.75766 7.54318C8.57789 7.72287 8.35514 7.81271 8.08941 7.81271C7.82368 7.81271 7.60106 7.72287 7.42156 7.54318C7.24208 7.36349 7.15234 7.14084 7.15234 6.87521V6.56271H5.27731V11.8752C5.27731 13.2502 5.7669 14.4273 6.74606 15.4065C7.72523 16.3856 8.90231 16.8752 10.2773 16.8752C11.6523 16.8752 12.8294 16.3856 13.8086 15.4065C14.7877 14.4273 15.2773 13.2502 15.2773 11.8752V6.56271H13.4023V6.87521C13.4023 7.14084 13.3124 7.36349 13.1326 7.54318C12.9529 7.72287 12.7301 7.81271 12.4644 7.81271C12.1986 7.81271 11.976 7.72287 11.7965 7.54318C11.6171 7.36349 11.5273 7.14084 11.5273 6.87521V4.37521C11.5273 4.10961 11.6172 3.88696 11.7969 3.70728C11.9767 3.52759 12.1995 3.43774 12.4652 3.43774C12.7309 3.43774 12.9536 3.52759 13.133 3.70728C13.3125 3.88696 13.4023 4.10961 13.4023 4.37521V4.68774H16.0225C16.3426 4.68774 16.6109 4.79601 16.8274 5.01256C17.044 5.22912 17.1522 5.49745 17.1522 5.81756V11.8752C17.1522 13.63 16.5846 15.1501 15.4492 16.4353C14.3137 17.7206 12.9023 18.473 11.2148 18.6925V19.3752C11.2148 20.9377 11.7628 22.2658 12.8589 23.3596C13.955 24.4533 15.286 25.0002 16.8518 25.0002C18.4143 25.0002 19.7424 24.4533 20.8362 23.3596C21.9299 22.2658 22.4768 20.9377 22.4768 19.3752V17.3536C21.8198 17.1468 21.2789 16.7649 20.8542 16.2077C20.4296 15.6504 20.2172 15.0156 20.2172 14.3031C20.2172 13.415 20.5282 12.6602 21.1501 12.0385C21.772 11.4169 22.5272 11.106 23.4157 11.106C24.3042 11.106 25.0589 11.4169 25.6799 12.0385C26.3009 12.6602 26.6113 13.415 26.6113 14.3031C26.6113 15.0156 26.399 15.6504 25.9743 16.2077C25.5497 16.7649 25.0088 17.1468 24.3517 17.3536V19.3752C24.3517 21.4569 23.6222 23.2273 22.1631 24.6865C20.7039 26.1456 18.934 26.8752 16.8534 26.8752ZM23.4143 15.6252C23.7845 15.6252 24.0974 15.4974 24.353 15.2418C24.6086 14.9862 24.7364 14.6733 24.7364 14.3031C24.7364 13.9329 24.6086 13.62 24.353 13.3644C24.0974 13.1088 23.7845 12.981 23.4143 12.981C23.0441 12.981 22.7312 13.1088 22.4756 13.3644C22.22 13.62 22.0922 13.9329 22.0922 14.3031C22.0922 14.6733 22.22 14.9862 22.4756 15.2418C22.7312 15.4974 23.0441 15.6252 23.4143 15.6252Z" fill="#248479"></path>
                                                        </g>
                                                        </svg> 
                                                    </div>
                                                    <div>General Physicial</div>
                                                </div>
                                                <small className="block text-[#4BA63E] text-10px">Available slot 23/30</small>
                                                <div className="flex gap-2 items-center text-[#222] text-sm">  
                                                    <div style={{lineHeight:'0'}}>
                                                        <svg fill="#666" enableBackground="new 0 0 512 512" height="16" viewBox="0 0 512 512" width="16" xmlns="http://www.w3.org/2000/svg"><g><path d="m256 0c-140.959 0-256 115.049-256 256 0 140.959 115.049 256 256 256 140.959 0 256-115.05 256-256 0-140.959-115.049-256-256-256zm0 482c-124.617 0-226-101.383-226-226s101.383-226 226-226 226 101.383 226 226-101.383 226-226 226z"></path><circle cx="128.721" cy="383.279" r="15"></circle><circle cx="383.279" cy="128.721" r="15"></circle><path d="m118.114 118.114c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0 5.858-15.355 0-21.213c-5.857-5.858-15.355-5.858-21.213 0z"></path><path d="m372.673 372.673c-5.858 5.858-5.858 15.355 0 21.213s15.355 5.858 21.213 0 5.858-15.355 0-21.213-15.356-5.858-21.213 0z"></path><path d="m256 121c8.284 0 15-6.716 15-15v-30c0-8.284-6.716-15-15-15s-15 6.716-15 15v30c0 8.284 6.716 15 15 15z"></path><path d="m256 391c-8.284 0-15 6.716-15 15v30c0 8.284 6.716 15 15 15s15-6.716 15-15v-30c0-8.284-6.716-15-15-15z"></path><path d="m121 256c0-8.284-6.716-15-15-15h-30c-8.284 0-15 6.716-15 15s6.716 15 15 15h30c8.284 0 15-6.716 15-15z"></path><path d="m391 256c0 8.284 6.716 15 15 15h30c8.284 0 15-6.716 15-15s-6.716-15-15-15h-30c-8.284 0-15 6.716-15 15z"></path><path d="m271 249.787v-83.787c0-8.284-6.716-15-15-15s-15 6.716-15 15v90c0 3.978 1.581 7.793 4.394 10.607l90 90c5.857 5.857 15.355 5.858 21.213 0s5.858-15.355 0-21.213z"></path></g></svg>
                                                    </div>         
                                                    <div>9:30am - 10:30am</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-2 col-span-4">
                            <div className="flex flex-col gap-4">
                                <div className="p-4 bg-[#2280DE] rounded-md">
                                    <div className="mb-4 font-semibold text-[#fff]"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#fff] pr-2">Doctor List</span></div>
                                    <div className="flex justify-between items-center text-10px text-[#fff] uppercase mb-3">
                                        <span>Doctor name</span>
                                        <span>Status</span>
                                    </div>
                                    <div className="flex flex-col dashdoclist">
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#f00] text-10px font-bold">Absent</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#6ACB6A] text-10px font-bold">Available</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#6ACB6A] text-10px font-bold">Available</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#f00] text-10px font-bold">Absent</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#6ACB6A] text-10px font-bold">Available</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#f00] text-10px font-bold">Absent</div>
                                        </div>
                                    </div>
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