"use client";
import React, { useEffect, useRef, useState } from "react";
import "./messages.scss";
import DashboardLeftBar from "../components/dashboardLeftBar/DashboardLeftBar";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { OverlayPanel } from "primereact/overlaypanel";

export default function page() {
    const isMobile = useMobile();
    const op = useRef(null);

    const [msgvisible, setMsgVisible] = useState(false);
    const MsgHeader = (
        <div className="chthdr flex gap-2 items-center bg-white w-full">
            <Button className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setMsgVisible(false)}>
                <svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.04279 8.29259L8.04279 1.29259C8.13503 1.19708 8.24538 1.1209 8.36738 1.06849C8.48939 1.01608 8.62061 0.988496 8.75339 0.987342C8.88616 0.986189 9.01784 1.01149 9.14074 1.06177C9.26364 1.11205 9.37529 1.18631 9.46918 1.2802C9.56307 1.37409 9.63733 1.48574 9.68761 1.60864C9.73789 1.73154 9.76319 1.86321 9.76204 1.99599C9.76088 2.12877 9.7333 2.25999 9.68089 2.382C9.62848 2.504 9.5523 2.61435 9.45679 2.70659L4.16379 7.99959H21.7498C22.015 7.99959 22.2694 8.10495 22.4569 8.29249C22.6444 8.48002 22.7498 8.73438 22.7498 8.99959C22.7498 9.26481 22.6444 9.51916 22.4569 9.7067C22.2694 9.89424 22.015 9.99959 21.7498 9.99959H4.16379L9.45679 15.2926C9.5523 15.3848 9.62848 15.4952 9.68089 15.6172C9.7333 15.7392 9.76088 15.8704 9.76204 16.0032C9.76319 16.136 9.73789 16.2676 9.68761 16.3905C9.63733 16.5134 9.56307 16.6251 9.46918 16.719C9.37529 16.8129 9.26364 16.8871 9.14074 16.9374C9.01784 16.9877 8.88616 17.013 8.75339 17.0118C8.62061 17.0107 8.48939 16.9831 8.36738 16.9307C8.24538 16.8783 8.13503 16.8021 8.04279 16.7066L1.04279 9.70659C0.855315 9.51906 0.75 9.26476 0.75 8.99959C0.75 8.73443 0.855315 8.48012 1.04279 8.29259Z" fill="#6A6A6A"/>
                </svg>
            </Button>
            <div className="" style={{lineHeight:'0'}}>
                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="44" height='44' />
            </div>
            <div className="flex flex-col">
                <div className="m-0 text-[#15192C] font-semibold text-base">Elmer Laverty</div>
                <div className="text-10px text-[#4BA63E] flex items-center gap-1">
                    <div style={{lineHeight:'0'}}>
                        <svg width="10" height="10" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5.5" r="5" fill="#4BA63E"/>
                        </svg>
                    </div>
                    <span>Online</span>
                </div>
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
        </div>   
      );
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            <div className="md:border-r border-t-0 border-b-0 border-l-0 border-solid border-[#f1f1f1]">
              <DashboardLeftBar />
            </div>
            <div className="col-span-3 lg:col-span-4">
                {isMobile ? (
                <>
                    <div className="px-4 py-2">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search"> </InputIcon>
                            <InputText v-model="value1" placeholder="Search" className="shadow-none w-full" />
                        </IconField>
                    </div>
                    <div className="flex flex-col" style={{height:'calc(100vh - 140px)', overflow:'auto'}}>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard active" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                        <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard" onClick={() => setMsgVisible(true)}>
                            <div className="" style={{lineHeight:'0'}}>
                                <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex items-center justify-between ">
                                    <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                    <div className="text-10px text-[#4BA63E]">12m</div>
                                </div>
                                <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                            </div>
                        </div>
                    </div>
                    <div style={{height:'75px'}}></div>
                </>
                ) : (
                <>
                    <div className="msgtab grid grid-cols-8">
                        <div className="col-span-2 border-r border-t-0 border-b-0 border-l-0 border-solid border-[#f1f1f1] bg-white">
                            <div className="p-4 text-[#000000] text-lg font-semibold border-r-0 border-t-0 border-b border-l-0 border-solid border-[#f1f1f1]">Messages</div>
                            <div className="px-4 py-2">
                                <IconField iconPosition="left">
                                    <InputIcon className="pi pi-search"> </InputIcon>
                                    <InputText v-model="value1" placeholder="Search" className="shadow-none w-full" />
                                </IconField>
                            </div>
                            <div className="flex flex-col" style={{height:'calc(100vh - 125px)', overflow:'auto'}}>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard active">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                                <div className="cursor-pointer flex gap-2 items-center px-4 py-3 chtlistcard">
                                    <div className="" style={{lineHeight:'0'}}>
                                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="40" height='40' />
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex items-center justify-between ">
                                            <div className="m-0 text-[#15192C] font-semibold text-sm">Elmer Laverty</div>
                                            <div className="text-10px text-[#4BA63E]">12m</div>
                                        </div>
                                        <div className="text-10px text-[#6E7071]">Haha oh man 🔥</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="col-span-6">
                            <div className="chthdr flex gap-2 items-center px-4 py-2 bg-white">
                                <div className="" style={{lineHeight:'0'}}>
                                    <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="44" height='44' />
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col">
                                        <div className="m-0 text-[#15192C] font-semibold text-base">Elmer Laverty</div>
                                        <div className="text-10px text-[#4BA63E] flex items-center gap-1">
                                            <div style={{lineHeight:'0'}}>
                                                <svg width="10" height="10" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="5" cy="5.5" r="5" fill="#4BA63E"/>
                                                </svg>
                                            </div>
                                            <span>Online</span>
                                        </div>
                                    </div>
                                    <div className="">
                                        <Button icon="pi pi-phone" className="bg-transparent p-0 border-0 shadow-none text-[#000]"/>
                                    </div>
                                </div>
                            </div>
                            <div className="chtdoby p-4 gap-2 h-full" style={{height:'calc(100vh - 120px)', overflow:'auto'}}>
                            <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-white px-4 py-2">
                                <div>
                                    <Button icon="pi pi-paperclip" className="h-[44px] w-[44px] rounded-full items-center justify-center bg-[#F3F4F9] text-[#000] p-0 border-0 shadow-none"/>
                                </div>
                                <InputText className="w-full text-xs shadow-none" placeholder="Type a message..." />
                                <div>
                                    <Button icon="pi pi-send" className="h-[44px] w-[44px] rounded-full items-center justify-center bg-[#F3F4F9] text-[#000] p-0 border-0 shadow-none"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                )}
                
            </div>
        </div>
        <Sidebar header={MsgHeader} visible={msgvisible} position="right" onHide={() => setMsgVisible(false)} className="w-full md:w-[500px] p-0 bg-[#f1f1f1] mobilecht">
            <div className="chtdoby p-4 gap-2 h-full" style={{height:'calc(100vh - 140px)', overflow:'auto'}}>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
                <div className="flex gap-2 msgtxt">
                    <div className="flex flex-col text-center" style={{lineHeight:'0'}}>
                        <Image src="/images/Suresh-Din.webp" alt="Image" className="rounded-full" width="20" height='20' />
                        <i style={{lineHeight:'0', color:'#959595'}}>
                        <svg fill="currentColor" enableBackground="new 0 0 24 24" height="10" viewBox="0 0 24 24" width="10" xmlns="http://www.w3.org/2000/svg"><g><path d="m12.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l3.5 3.5 7.8-7.8c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-8.5 8.5c-.1.2-.4.3-.7.3z"/></g><g><path d="m7.2 17.7c-.3 0-.5-.1-.7-.3l-4.2-4.2c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.2 4.2c.4.4.4 1 0 1.4-.1.2-.4.3-.7.3zm5.3-5.2c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l3.2-3.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-3.2 3.3c-.2.2-.4.3-.7.3z"/></g></svg></i>
                    </div>
                    <div className=" text-xs inline-flex">
                        <div className="text-10px self-end">11:00am</div>
                        <div className="py-2 px-3 bg-white rounded-md">just ideas for next time Wow, this is really epic ideas for Wow</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4 bg-white px-4 py-2">
                <div>
                    <Button icon="pi pi-paperclip" className="h-[44px] w-[44px] rounded-full items-center justify-center bg-[#F3F4F9] text-[#000] p-0 border-0 shadow-none"/>
                </div>
                <InputText className="w-full text-xs shadow-none" placeholder="Type a message..." />
                <div>
                    <Button icon="pi pi-send" className="h-[44px] w-[44px] rounded-full items-center justify-center bg-[#F3F4F9] text-[#000] p-0 border-0 shadow-none"/>
                </div>
            </div>
        </Sidebar>
    </>
  )
}
