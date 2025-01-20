"use client";

import React, { useState } from "react";
import DashboardLeftBar from "../components/dashboardLeftBar/DashboardLeftBar";
import Link from "next/link";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Badge } from "primereact/badge";
import { Rating } from "primereact/rating";
import { Sidebar } from "primereact/sidebar";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";

export default function Page() {
    const isMobile = useMobile();
    const [visible, setVisible] = useState(false);

    const [selectedReason, setSelectedReason] = useState(null);
    const reasons = [
        { name: 'Reason 1' },
        { name: 'Reason 2' },
        { name: 'Reason 3' },
        { name: 'Reason 4' },
        { name: 'Reason 5' }
    ];

    const [appointmentsdetailsvisible, setAppointmentsDetailsVisible] = useState(false);
    const AppointmentsDetailsHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setAppointmentsDetailsVisible(false)} />
                <div className='font-semibold text-base text-[#222]'>Appointment Details</div>   
            </div>
        </div>
    );
    return (
      <>
        {isMobile ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
              <div>
                <DashboardLeftBar />
              </div>
              <div className="col-span-3 lg:col-span-4 lg:px-10 md:px-6 px-4">
                <section className="pageheader flex items-center justify-between md:py-4 py-2">
                  <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
                  My Appointments
                  </div>
                  <div className="flex item-center gap-4">
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
                    </Link>
                    <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.5rem', marginTop:'5px' }}>
                        <Badge value="8" severity="danger" style={{ fontSize: '8px', minWidth:'15px',height:'15px',lineHeight:'15px',fontWeight:'normal' }}></Badge>
                    </i>
                  </div>
                </section>
                <section className="md:py-4 py-2">
                  <div className="max-w-[500px] mx-auto flex flex-col gap-4">
                    <div className="p-4 bg-white rounded-md">
                      <h3 className="mb-1">Welcome to Carbon Health</h3>
                      <div className="text-xs mb-4">
                        A friendlier Health care experience without membership
                        fees.
                      </div>
                      <Button className="bg-[#0D52AF] w-full justify-center rounded-md">
                        Book Appointment
                      </Button>
                    </div>
                    <div style={{ height: "calc(100vh - 330px)", overflow: "auto" }}>
                      <div className="flex flex-col gap-2">
                      <div className="mb-2 text-base text-[#15192CCC]">Appointments</div>
                          <div className="shadow-md rounded-lg overflow-hidden bg-white">
                            <div className="grid grid-cols-2">
                                <div className="p-4 md:p-12 bg-[#87D6A5] flex flex-col gap-1 md:gap-2">
                                    <div className="text-white md:text-lg">Monday</div>
                                    <div className="text-white md:text-lg">2:15pm</div>
                                    <div className="text-white font-semibold text-2xl md:text-3xl">Mar 10</div>
                                </div>
                                <div>
                                    <Image
                                        src="/images/Mindwell.webp"
                                        alt="Image"
                                        className="w-full h-auto"
                                        width="152"
                                        height="139"
                                    />
                                </div>
                            </div>
                            <div className="p-4 flex flex-col gap-2">
                                <div className="shadow-md flex items-center gap-3 p-3 rounded-md">
                                    <div style={{lineHeight:'0'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                            viewBox="0 0 512 512" enableBackground="new 0 0 512 512" height="30" width="30">
                                            <path d="M315.793,19.932h-59.796v37.372h41.109v70.384c0,61.82-50.297,112.117-112.117,112.117S72.873,189.509,72.873,127.689
                                                V57.304h39.864V19.932h-58.55c-10.321,0-18.686,8.365-18.686,18.686v89.071c0,82.431,67.058,149.489,149.489,149.489
                                                s149.489-67.058,149.489-149.489V38.618C334.479,28.297,326.114,19.932,315.793,19.932z"/>
                                            <path d="M388.668,292.749v88.448c0,51.518-41.913,93.431-93.431,93.431c-51.518,0-93.431-41.913-93.431-93.431V259.114h-37.372
                                                v122.083c0,72.122,58.674,130.803,130.803,130.803c72.122,0,130.803-58.681,130.803-130.803v-88.448H388.668z"/>
                                            <path d="M407.361,171.912c-38.132,0-69.145,31.013-69.145,69.139c0,38.12,31.013,69.139,69.139,69.139
                                                c38.126,0,69.139-31.019,69.145-69.139C476.499,202.925,445.481,171.912,407.361,171.912z M407.355,272.818
                                                c-17.521,0-31.773-14.251-31.773-31.766s14.251-31.766,31.773-31.766c17.515,0,31.766,14.251,31.766,31.766
                                                S424.87,272.818,407.355,272.818z"/>
                                            <path d="M112.114,0c-10.321,0-18.686,8.365-18.686,18.686V58.55c0,10.321,8.365,18.686,18.686,18.686
                                                c10.321,0,18.686-8.365,18.686-18.686V18.686C130.8,8.365,122.435,0,112.114,0z"/>
                                            <path d="M256.62,0c-10.321,0-18.686,8.365-18.686,18.686V58.55c0,10.321,8.365,18.686,18.686,18.686s18.686-8.365,18.686-18.686
                                                V18.686C275.306,8.365,266.941,0,256.62,0z"/>
                                        </svg>
                                    </div>
                                    <div className="text-base text-[#15192C]">Cold & Flu fever</div>
                                </div>
                                <div className="shadow-md flex gap-3 p-3 rounded-md">
                                    <div style={{lineHeight:'0'}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="30" width="30"
                                            viewBox="0 0 512 512" enableBackground="new 0 0 512 512" >
                                            <path d="M341.476,338.285c54.483-85.493,47.634-74.827,49.204-77.056C410.516,233.251,421,200.322,421,166
                                                C421,74.98,347.139,0,256,0C165.158,0,91,74.832,91,166c0,34.3,10.704,68.091,31.19,96.446l48.332,75.84
                                                C118.847,346.227,31,369.892,31,422c0,18.995,12.398,46.065,71.462,67.159C143.704,503.888,198.231,512,256,512
                                                c108.025,0,225-30.472,225-90C481,369.883,393.256,346.243,341.476,338.285z M147.249,245.945
                                                c-0.165-0.258-0.337-0.51-0.517-0.758C129.685,221.735,121,193.941,121,166c0-75.018,60.406-136,135-136
                                                c74.439,0,135,61.009,135,136c0,27.986-8.521,54.837-24.646,77.671c-1.445,1.906,6.094-9.806-110.354,172.918L147.249,245.945z
                                                M256,482c-117.994,0-195-34.683-195-60c0-17.016,39.568-44.995,127.248-55.901l55.102,86.463
                                                c2.754,4.322,7.524,6.938,12.649,6.938s9.896-2.617,12.649-6.938l55.101-86.463C411.431,377.005,451,404.984,451,422
                                                C451,447.102,374.687,482,256,482z"/>
                                            <path d="M256,91c-41.355,0-75,33.645-75,75s33.645,75,75,75c41.355,0,75-33.645,75-75S297.355,91,256,91z M256,211
                                                c-24.813,0-45-20.187-45-45s20.187-45,45-45s45,20.187,45,45S280.813,211,256,211z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-base text-[#15192C]">Mindwell clinic</div>
                                        <div className="text-xs text-[#848484] mb-2">245/3 Hoston,Dale st NE | 1.2 km away </div>
                                        <div className="flex gap-2">
                                            <Button className="bg-[#0D52AF] px-3 py-2 text-xs text-[#fff] border-[#0D52AF]" label="Show Details" onClick={() => setAppointmentsDetailsVisible(true)}/>
                                            <Button icon="pi pi-map-marker" className="bg-[#fff] px-3 py-2 text-xs text-[#0D52AF] border-[#0D52AF]" label="Get Direction"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="shadow-md flex gap-3 p-3 rounded-md">
                                    <div style={{lineHeight:'0'}}>
                                        <Image
                                            src="/images/Suresh-Din.webp"
                                            alt="Image"
                                            className="rounded-full"
                                            width="50"
                                            height="50"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-base text-[#15192C]">Dr. Archana Saha</div>
                                        <div className="text-xs text-[#848484] mb-2">MBBS, MD - General Physician (12+ Years)</div>
                                        <div className="flex gap-1 items-center">
                                            <Rating className="rating-sml" value={5} disabled cancel={false} />
                                            <span className="text-10px">(4 with 103 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
            <div style={{ height: "80px" }}></div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
              <div>
                <DashboardLeftBar />
              </div>
              <div className="col-span-3 lg:col-span-4 lg:px-10 md:px-6 px-4">
                <section className="pageheader flex items-center justify-between md:py-4 py-2">
                  <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
                  My Appointments
                  </div>
                  <div className="flex item-center gap-4">
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
                    <div>Ron john</div>
                  </Link>
                    <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '1.5rem', marginTop:'5px' }}>
                        <Badge value="8" severity="danger" style={{ fontSize: '8px', minWidth:'15px',height:'15px',lineHeight:'15px',fontWeight:'normal' }}></Badge>
                    </i>
                    </div>
                </section>
                <section className="md:py-4 py-2">
                  <div className="flex flex-col gap-4">
                    <div
                      style={{ height: "calc(100vh - 95px)", overflow: "auto" }}
                    >
                      <div className="flex flex-col gap-2">
                          <div className="mb-2 text-base text-[#15192CCC]">Appointments</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-md bg-white p-4">
                                <div className="flex items-center gap-3">
                                    <div className="">
                                        <Image
                                            src="/images/Mindwell.webp"
                                            alt="Image"
                                            className="rounded-full"
                                            width="60"
                                            height="60"
                                        />
                                    </div>
                                    <div className="">
                                        <div className="text-lg text-[#222]">Mindwell clinic, WA - Quantas </div>
                                        <div className="text-xs text-[#848484]">245/3 Hoston,Dale st NE | 1.2 km away</div>
                                    </div>
                                </div>
                                <div className="pt-3 mt-3 border border-top border-solid border-l-0 border-r-0 border-b-0 border-[#f1f1f1]">
                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-3 p-3 bg-[#F1F9FE] rounded-md">
                                                <div className="">
                                                    <div className="text-xs text-[#4BA63E] mb-2">Symptoms</div>
                                                    <div className="flex items-center gap-2">
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                                viewBox="0 0 512 512" enableBackground="new 0 0 512 512" height="30" width="30">
                                                                <path d="M315.793,19.932h-59.796v37.372h41.109v70.384c0,61.82-50.297,112.117-112.117,112.117S72.873,189.509,72.873,127.689
                                                                    V57.304h39.864V19.932h-58.55c-10.321,0-18.686,8.365-18.686,18.686v89.071c0,82.431,67.058,149.489,149.489,149.489
                                                                    s149.489-67.058,149.489-149.489V38.618C334.479,28.297,326.114,19.932,315.793,19.932z"/>
                                                                <path d="M388.668,292.749v88.448c0,51.518-41.913,93.431-93.431,93.431c-51.518,0-93.431-41.913-93.431-93.431V259.114h-37.372
                                                                    v122.083c0,72.122,58.674,130.803,130.803,130.803c72.122,0,130.803-58.681,130.803-130.803v-88.448H388.668z"/>
                                                                <path d="M407.361,171.912c-38.132,0-69.145,31.013-69.145,69.139c0,38.12,31.013,69.139,69.139,69.139
                                                                    c38.126,0,69.139-31.019,69.145-69.139C476.499,202.925,445.481,171.912,407.361,171.912z M407.355,272.818
                                                                    c-17.521,0-31.773-14.251-31.773-31.766s14.251-31.766,31.773-31.766c17.515,0,31.766,14.251,31.766,31.766
                                                                    S424.87,272.818,407.355,272.818z"/>
                                                                <path d="M112.114,0c-10.321,0-18.686,8.365-18.686,18.686V58.55c0,10.321,8.365,18.686,18.686,18.686
                                                                    c10.321,0,18.686-8.365,18.686-18.686V18.686C130.8,8.365,122.435,0,112.114,0z"/>
                                                                <path d="M256.62,0c-10.321,0-18.686,8.365-18.686,18.686V58.55c0,10.321,8.365,18.686,18.686,18.686s18.686-8.365,18.686-18.686
                                                                    V18.686C275.306,8.365,266.941,0,256.62,0z"/>
                                                            </svg>
                                                        </div>
                                                        <div className="text-[#222] text-lg">Cold & Flu fever </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-3 p-3 bg-[#F1F9FE] rounded-md">
                                                <div className="">
                                                    <div className="text-xs text-[#4BA63E] mb-2">Appointment Date</div>
                                                    <div className="flex items-center gap-2">
                                                        <div>
                                                            <svg enableBackground="new 0 0 512.228 512.228" height="30" viewBox="0 0 512.228 512.228" width="30" xmlns="http://www.w3.org/2000/svg"><g><path d="m413.333 39.447h-19.106v-19.333c0-11.046-8.954-20-20-20s-20 8.954-20 20v19.333h-196.227v-19.333c0-11.046-8.954-20-20-20s-20 8.954-20 20v19.333h-19.105c-54.531 0-98.895 44.364-98.895 98.894v274.878c0 54.531 44.364 98.895 98.895 98.895h314.439c54.53 0 98.894-44.364 98.894-98.895v-274.878c0-54.53-44.364-98.894-98.895-98.894zm-314.438 40h19.105v39c0 11.046 8.954 20 20 20s20-8.954 20-20v-39h196.228v39c0 11.046 8.954 20 20 20s20-8.954 20-20v-39h19.106c32.474 0 58.894 26.42 58.894 58.894v19.106h-432.228v-19.106c0-32.474 26.42-58.894 58.895-58.894zm314.438 392.667h-314.438c-32.475 0-58.895-26.42-58.895-58.895v-215.772h432.228v215.772c0 32.475-26.42 58.895-58.895 58.895zm-235.666-196c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm236.228 0c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm-118.228 0c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm-118 118c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm236.228 0c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm-118.228 0c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20z"/></g></svg>
                                                        </div>
                                                        <div className="text-[#222] text-lg">23/04/2023</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 p-3 bg-[#F1F9FE] rounded-md">
                                            <div style={{marginTop:'5px'}}>
                                                <Image
                                                    src="/images/Victoria-lili.webp"
                                                    alt="Image"
                                                    className="rounded-full"
                                                    width="50"
                                                    height="50"
                                                />
                                            </div>
                                            <div className="">
                                                <div className="text-lg text-[#222]">Dr. Aria Patel</div>
                                                <div className="text-xs text-[#848484]">General Physician</div>
                                                <div className="text-xs text-[#4BA63E]">Available slot 23/30 (9:30am - 10:30am)</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <Button className="w-full bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" label="Show Details" onClick={() => setAppointmentsDetailsVisible(true)}/>
                                            </div>
                                            <div>
                                                <Button className="flex gap-2 items-center justify-center w-full bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]">
                                                    <i className="pi pi-map-marker"></i>
                                                    <span>Get Direction</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        )}
        <Sidebar header={AppointmentsDetailsHeader} visible={appointmentsdetailsvisible} position="right" onHide={() => setAppointmentsDetailsVisible(false)} className="w-full md:w-[500px] appodtlsmodal">
            <div className="bg-[#87D6A5] flex flex-col gap-4 px-4 py-6">
                <div className="flex gap-3">
                    <div style={{lineHeight:'0'}}>
                        <svg fill="#fff" enableBackground="new 0 0 512.228 512.228" height="30" viewBox="0 0 512.228 512.228" width="30" xmlns="http://www.w3.org/2000/svg"><g><path d="m413.333 39.447h-19.106v-19.333c0-11.046-8.954-20-20-20s-20 8.954-20 20v19.333h-196.227v-19.333c0-11.046-8.954-20-20-20s-20 8.954-20 20v19.333h-19.105c-54.531 0-98.895 44.364-98.895 98.894v274.878c0 54.531 44.364 98.895 98.895 98.895h314.439c54.53 0 98.894-44.364 98.894-98.895v-274.878c0-54.53-44.364-98.894-98.895-98.894zm-314.438 40h19.105v39c0 11.046 8.954 20 20 20s20-8.954 20-20v-39h196.228v39c0 11.046 8.954 20 20 20s20-8.954 20-20v-39h19.106c32.474 0 58.894 26.42 58.894 58.894v19.106h-432.228v-19.106c0-32.474 26.42-58.894 58.895-58.894zm314.438 392.667h-314.438c-32.475 0-58.895-26.42-58.895-58.895v-215.772h432.228v215.772c0 32.475-26.42 58.895-58.895 58.895zm-235.666-196c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm236.228 0c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm-118.228 0c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm-118 118c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm236.228 0c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20zm-118.228 0c0 11.046-8.954 20-20 20h-39.333c-11.046 0-20-8.954-20-20s8.954-20 20-20h39.333c11.045 0 20 8.954 20 20z"/></g></svg>
                    </div>
                    <div>
                        <div className="text-[#000] text-10px">Monday 9:45am</div>
                        <div className="text-white text-base">March 20, 2023</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div style={{lineHeight:'0'}}>
                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512" height="30" width="30"><path d="M315.793,19.932h-59.796v37.372h41.109v70.384c0,61.82-50.297,112.117-112.117,112.117S72.873,189.509,72.873,127.689   V57.304h39.864V19.932h-58.55c-10.321,0-18.686,8.365-18.686,18.686v89.071c0,82.431,67.058,149.489,149.489,149.489   s149.489-67.058,149.489-149.489V38.618C334.479,28.297,326.114,19.932,315.793,19.932z"></path><path d="M388.668,292.749v88.448c0,51.518-41.913,93.431-93.431,93.431c-51.518,0-93.431-41.913-93.431-93.431V259.114h-37.372   v122.083c0,72.122,58.674,130.803,130.803,130.803c72.122,0,130.803-58.681,130.803-130.803v-88.448H388.668z"></path><path d="M407.361,171.912c-38.132,0-69.145,31.013-69.145,69.139c0,38.12,31.013,69.139,69.139,69.139   c38.126,0,69.139-31.019,69.145-69.139C476.499,202.925,445.481,171.912,407.361,171.912z M407.355,272.818   c-17.521,0-31.773-14.251-31.773-31.766s14.251-31.766,31.773-31.766c17.515,0,31.766,14.251,31.766,31.766   S424.87,272.818,407.355,272.818z"></path><path d="M112.114,0c-10.321,0-18.686,8.365-18.686,18.686V58.55c0,10.321,8.365,18.686,18.686,18.686   c10.321,0,18.686-8.365,18.686-18.686V18.686C130.8,8.365,122.435,0,112.114,0z"></path><path d="M256.62,0c-10.321,0-18.686,8.365-18.686,18.686V58.55c0,10.321,8.365,18.686,18.686,18.686s18.686-8.365,18.686-18.686   V18.686C275.306,8.365,266.941,0,256.62,0z"></path></svg>
                    </div>
                    <div>
                        <div className="text-[#000] text-10px">Primary care visit</div>
                        <div className="text-white text-base">Cold & Flu fever </div>
                    </div>
                </div>
            </div>
            <div className="px-4 py-6 bg-[#F7F7F7]">
                <div className="text-[#15192C] text-xl mb-2 font-medium">About Visit</div>
                <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat.</div>
                <div className="flex flex-col gap-4 my-4">
                    <div className="shadow-md flex gap-3 p-3 rounded-md">
                        <div style={{lineHeight:'0'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" height="30" width="30"
                                viewBox="0 0 512 512" enableBackground="new 0 0 512 512" >
                                <path d="M341.476,338.285c54.483-85.493,47.634-74.827,49.204-77.056C410.516,233.251,421,200.322,421,166
                                    C421,74.98,347.139,0,256,0C165.158,0,91,74.832,91,166c0,34.3,10.704,68.091,31.19,96.446l48.332,75.84
                                    C118.847,346.227,31,369.892,31,422c0,18.995,12.398,46.065,71.462,67.159C143.704,503.888,198.231,512,256,512
                                    c108.025,0,225-30.472,225-90C481,369.883,393.256,346.243,341.476,338.285z M147.249,245.945
                                    c-0.165-0.258-0.337-0.51-0.517-0.758C129.685,221.735,121,193.941,121,166c0-75.018,60.406-136,135-136
                                    c74.439,0,135,61.009,135,136c0,27.986-8.521,54.837-24.646,77.671c-1.445,1.906,6.094-9.806-110.354,172.918L147.249,245.945z
                                    M256,482c-117.994,0-195-34.683-195-60c0-17.016,39.568-44.995,127.248-55.901l55.102,86.463
                                    c2.754,4.322,7.524,6.938,12.649,6.938s9.896-2.617,12.649-6.938l55.101-86.463C411.431,377.005,451,404.984,451,422
                                    C451,447.102,374.687,482,256,482z"/>
                                <path d="M256,91c-41.355,0-75,33.645-75,75s33.645,75,75,75c41.355,0,75-33.645,75-75S297.355,91,256,91z M256,211
                                    c-24.813,0-45-20.187-45-45s20.187-45,45-45s45,20.187,45,45S280.813,211,256,211z"/>
                            </svg>
                        </div>
                        <div>
                            <div className="text-base text-[#15192C]">Mindwell clinic</div>
                            <div className="text-xs text-[#848484] mb-2">245/3 Hoston,Dale st NE | 1.2 km away </div>
                            <div className="flex gap-2">
                                <Button icon="pi pi-map-marker" className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" label="Get Direction"/>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-md flex gap-3 p-3 rounded-md">
                        <div style={{lineHeight:'0'}}>
                            <Image
                                src="/images/Suresh-Din.webp"
                                alt="Image"
                                className="rounded-full"
                                width="50"
                                height="50"
                            />
                        </div>
                        <div>
                            <div className="text-base text-[#15192C]">Dr. Archana Saha</div>
                            <div className="text-xs text-[#848484] mb-2">MBBS, MD - General Physician (12+ Years)</div>
                            <div className="flex gap-1 items-center">
                                <Rating className="rating-sml" value={5} disabled cancel={false} />
                                <span className="text-10px">(4 with 103 reviews)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-[#15192C] text-xl mb-2 font-medium">Documents</div>
                <div className="flex flex-col gap-3">
                    <Button className="w-full shadow-none flex items-center gap-4 bg-white border-white text-[#15192CCC]">
                        <span style={{lineHeight:'0'}}>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.035 25.514V23.195C22.3427 23.195 22.6377 23.0728 22.8552 22.8552C23.0728 22.6377 23.195 22.3427 23.195 22.035V3.479C23.195 3.17135 23.0728 2.8763 22.8552 2.65876C22.6377 2.44121 22.3427 2.319 22.035 2.319H10.435C10.1273 2.319 9.8323 2.44121 9.61476 2.65876C9.39721 2.8763 9.275 3.17135 9.275 3.479V5.706H6.958V3.479C6.958 3.02205 7.04802 2.56957 7.22292 2.14741C7.39782 1.72526 7.65417 1.34169 7.97733 1.01862C8.30049 0.695554 8.68413 0.439313 9.10634 0.264536C9.52854 0.0897589 9.98105 -0.000131202 10.438 1.43733e-07H22.038C22.9607 1.43733e-07 23.8456 0.366537 24.498 1.01898C25.1505 1.67141 25.517 2.55631 25.517 3.479V22.035C25.517 22.4921 25.4269 22.9448 25.2519 23.367C25.0769 23.7893 24.8203 24.173 24.497 24.4961C24.1736 24.8192 23.7897 25.0754 23.3673 25.25C22.9448 25.4247 22.4921 25.5144 22.035 25.514ZM20.875 4.639H11.6V6.958H20.878L20.875 4.639ZM20.875 12.757V22.035C20.875 22.957 20.509 23.8413 19.8574 24.4936C19.2059 25.1459 18.322 25.5129 17.4 25.514H3.479C2.55631 25.514 1.67141 25.1475 1.01898 24.495C0.366536 23.8426 0 22.9577 0 22.035V10.435C0.000530234 9.51266 0.367301 8.62827 1.01968 7.97627C1.67206 7.32426 2.55666 6.958 3.479 6.958H8.118C8.27054 6.95714 8.42174 6.98638 8.56296 7.04404C8.70418 7.10169 8.83265 7.18663 8.941 7.294L10.913 9.277H17.4C18.3222 9.27806 19.2062 9.6452 19.8578 10.2977C20.5094 10.9503 20.8753 11.8348 20.875 12.757ZM13.917 16.236H11.6V13.917H9.278V16.236H6.958V18.555H9.277V20.874H11.6V18.556H13.919L13.917 16.236Z" fill="#0D52AF"/>
                            </svg>
                        </span>
                        <span>Report</span>
                        <span style={{lineHeight:'0'}} className="ml-auto">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99997 11.4115C7.87946 11.4115 7.76728 11.3923 7.66345 11.3538C7.5596 11.3154 7.46088 11.2493 7.3673 11.1557L4.2577 8.04615C4.10898 7.89743 4.03559 7.7234 4.03753 7.52405C4.03944 7.3247 4.11283 7.14746 4.2577 6.99232C4.41283 6.83721 4.59103 6.75708 4.7923 6.75195C4.99358 6.74682 5.17179 6.82182 5.32692 6.97695L7.25 8.90003V1.25C7.25 1.03718 7.32179 0.858984 7.46537 0.715401C7.60896 0.571801 7.78716 0.5 7.99997 0.5C8.21279 0.5 8.39099 0.571801 8.53458 0.715401C8.67816 0.858984 8.74995 1.03718 8.74995 1.25V8.90003L10.673 6.97695C10.8217 6.82823 10.9983 6.75483 11.2028 6.75675C11.4073 6.75868 11.5871 6.83721 11.7422 6.99232C11.8871 7.14746 11.9621 7.3231 11.9672 7.51925C11.9724 7.7154 11.8974 7.89103 11.7422 8.04615L8.63265 11.1557C8.53907 11.2493 8.44035 11.3154 8.3365 11.3538C8.23267 11.3923 8.12049 11.4115 7.99997 11.4115ZM2.3077 15.5C1.80257 15.5 1.375 15.325 1.025 14.975C0.675 14.625 0.5 14.1974 0.5 13.6923V11.7307C0.5 11.5179 0.5718 11.3397 0.7154 11.1961C0.858983 11.0525 1.03718 10.9808 1.25 10.9808C1.46282 10.9808 1.64102 11.0525 1.7846 11.1961C1.92818 11.3397 1.99997 11.5179 1.99997 11.7307V13.6923C1.99997 13.7692 2.03202 13.8397 2.09612 13.9038C2.16024 13.9679 2.23077 14 2.3077 14H13.6922C13.7692 14 13.8397 13.9679 13.9038 13.9038C13.9679 13.8397 14 13.7692 14 13.6923V11.7307C14 11.5179 14.0718 11.3397 14.2154 11.1961C14.3589 11.0525 14.5371 10.9808 14.75 10.9808C14.9628 10.9808 15.141 11.0525 15.2845 11.1961C15.4281 11.3397 15.5 11.5179 15.5 11.7307V13.6923C15.5 14.1974 15.325 14.625 14.975 14.975C14.625 15.325 14.1974 15.5 13.6922 15.5H2.3077Z" fill="#15192C"/>
                            </svg>
                        </span>
                    </Button>
                    <Button className="w-full shadow-none flex items-center gap-4 bg-white border-white text-[#15192CCC]">
                        <span style={{lineHeight:'0'}}>
                            <svg width="26" height="26" viewBox="0 0 20 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 7.425V0H0.666667C0.489856 0 0.320287 0.071116 0.195262 0.197703C0.070238 0.32429 0 0.495979 0 0.675V26.325C0 26.504 0.070238 26.6757 0.195262 26.8023C0.320287 26.9289 0.489856 27 0.666667 27H19.3333C19.5101 27 19.6797 26.9289 19.8047 26.8023C19.9298 26.6757 20 26.504 20 26.325V8.1H12.6667C12.4899 8.1 12.3203 8.02888 12.1953 7.9023C12.0702 7.77571 12 7.60402 12 7.425ZM13.3333 6.75V0.39555L19.6093 6.75H13.3333ZM5.33333 10.125C5.33333 9.94598 5.40357 9.77429 5.52859 9.6477C5.65362 9.52112 5.82319 9.45 6 9.45H9.33333C10.0172 9.45078 10.6747 9.71756 11.1698 10.1952C11.665 10.6729 11.9599 11.3249 11.9938 12.0165C12.0276 12.7081 11.7976 13.3864 11.3515 13.9113C10.9054 14.4361 10.2772 14.7673 9.59667 14.8365L12 17.2712L14.1953 15.0485L15.138 16.0029L12.9427 18.225L15.138 20.4478L14.1953 21.4022L12 19.1795L9.80467 21.4022L8.862 20.4478L11.0573 18.225L7.724 14.85H6.66667V19.575H5.33333V10.125ZM9.33333 13.5H6.66667V10.8H9.33333C9.68696 10.8 10.0261 10.9422 10.2761 11.1954C10.5262 11.4486 10.6667 11.792 10.6667 12.15C10.6667 12.508 10.5262 12.8514 10.2761 13.1046C10.0261 13.3578 9.68696 13.5 9.33333 13.5Z" fill="#0D52AF"/>
                            </svg>
                        </span>
                        <span>E- prescription</span>
                        <span style={{lineHeight:'0'}} className="ml-auto">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.99997 11.4115C7.87946 11.4115 7.76728 11.3923 7.66345 11.3538C7.5596 11.3154 7.46088 11.2493 7.3673 11.1557L4.2577 8.04615C4.10898 7.89743 4.03559 7.7234 4.03753 7.52405C4.03944 7.3247 4.11283 7.14746 4.2577 6.99232C4.41283 6.83721 4.59103 6.75708 4.7923 6.75195C4.99358 6.74682 5.17179 6.82182 5.32692 6.97695L7.25 8.90003V1.25C7.25 1.03718 7.32179 0.858984 7.46537 0.715401C7.60896 0.571801 7.78716 0.5 7.99997 0.5C8.21279 0.5 8.39099 0.571801 8.53458 0.715401C8.67816 0.858984 8.74995 1.03718 8.74995 1.25V8.90003L10.673 6.97695C10.8217 6.82823 10.9983 6.75483 11.2028 6.75675C11.4073 6.75868 11.5871 6.83721 11.7422 6.99232C11.8871 7.14746 11.9621 7.3231 11.9672 7.51925C11.9724 7.7154 11.8974 7.89103 11.7422 8.04615L8.63265 11.1557C8.53907 11.2493 8.44035 11.3154 8.3365 11.3538C8.23267 11.3923 8.12049 11.4115 7.99997 11.4115ZM2.3077 15.5C1.80257 15.5 1.375 15.325 1.025 14.975C0.675 14.625 0.5 14.1974 0.5 13.6923V11.7307C0.5 11.5179 0.5718 11.3397 0.7154 11.1961C0.858983 11.0525 1.03718 10.9808 1.25 10.9808C1.46282 10.9808 1.64102 11.0525 1.7846 11.1961C1.92818 11.3397 1.99997 11.5179 1.99997 11.7307V13.6923C1.99997 13.7692 2.03202 13.8397 2.09612 13.9038C2.16024 13.9679 2.23077 14 2.3077 14H13.6922C13.7692 14 13.8397 13.9679 13.9038 13.9038C13.9679 13.8397 14 13.7692 14 13.6923V11.7307C14 11.5179 14.0718 11.3397 14.2154 11.1961C14.3589 11.0525 14.5371 10.9808 14.75 10.9808C14.9628 10.9808 15.141 11.0525 15.2845 11.1961C15.4281 11.3397 15.5 11.5179 15.5 11.7307V13.6923C15.5 14.1974 15.325 14.625 14.975 14.975C14.625 15.325 14.1974 15.5 13.6922 15.5H2.3077Z" fill="#15192C"/>
                            </svg>
                        </span>
                    </Button>
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] mt-3" label="Resedule"/>
                    <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF]" label="Cancel Appointment" onClick={() => setVisible(true)}/>
                </div>
            </div>
        </Sidebar>
        <Dialog className="md:w-[450px] w-[320px]" header="Cancel Appointment" visible={visible} onHide={() => {if (!visible) return; setVisible(false); }}>
            <div className="text-center">
                <svg width="29" height="33" viewBox="0 0 29 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.4998 26.5612C14.8122 26.5612 15.0741 26.4555 15.2854 26.2442C15.4967 26.0329 15.6024 25.771 15.6024 25.4587C15.6024 25.1462 15.4967 24.8844 15.2854 24.673C15.0741 24.4617 14.8122 24.3561 14.4998 24.3561C14.1874 24.3561 13.9256 24.4617 13.7142 24.673C13.5029 24.8844 13.3973 25.1462 13.3973 25.4587C13.3973 25.771 13.5029 26.0329 13.7142 26.2442C13.9256 26.4555 14.1874 26.5612 14.4998 26.5612ZM14.501 21.2551C14.7552 21.2551 14.9679 21.1692 15.139 20.9975C15.3101 20.8258 15.3957 20.6131 15.3957 20.3593V11.2631C15.3957 11.0093 15.3097 10.7965 15.1378 10.6248C14.9658 10.4531 14.7528 10.3673 14.4986 10.3673C14.2444 10.3673 14.0318 10.4531 13.8607 10.6248C13.6896 10.7965 13.604 11.0093 13.604 11.2631V20.3593C13.604 20.6131 13.69 20.8258 13.8619 20.9975C14.0338 21.1692 14.2469 21.2551 14.501 21.2551ZM3.06072 32.832C2.2648 32.832 1.58346 32.5486 1.01669 31.9818C0.449901 31.4151 0.166504 30.7337 0.166504 29.9378V7.05958C0.166504 6.26366 0.449901 5.58232 1.01669 5.01556C1.58346 4.44876 2.2648 4.16536 3.06072 4.16536H11.4815C11.3185 3.25114 11.5373 2.42536 12.1379 1.68803C12.7386 0.950697 13.5317 0.582031 14.5171 0.582031C15.5025 0.582031 16.2955 0.950697 16.8962 1.68803C17.4969 2.42536 17.7042 3.25114 17.5181 4.16536H25.939C26.7349 4.16536 27.4162 4.44876 27.983 5.01556C28.5498 5.58232 28.8332 6.26366 28.8332 7.05958V29.9378C28.8332 30.7337 28.5498 31.4151 27.983 31.9818C27.4162 32.5486 26.7349 32.832 25.939 32.832H3.06072ZM3.06072 31.0404H25.939C26.2146 31.0404 26.4672 30.9255 26.697 30.6958C26.9267 30.4661 27.0415 30.2134 27.0415 29.9378V7.05958C27.0415 6.78396 26.9267 6.53129 26.697 6.30157C26.4672 6.07188 26.2146 5.95703 25.939 5.95703H3.06072C2.7851 5.95703 2.53243 6.07188 2.30271 6.30157C2.07302 6.53129 1.95817 6.78396 1.95817 7.05958V29.9378C1.95817 30.2134 2.07302 30.4661 2.30271 30.6958C2.53243 30.9255 2.7851 31.0404 3.06072 31.0404ZM14.4998 4.95782C14.888 4.95782 15.209 4.83091 15.4629 4.57709C15.7167 4.32327 15.8436 4.00226 15.8436 3.61407C15.8436 3.22587 15.7167 2.90487 15.4629 2.65105C15.209 2.39723 14.888 2.27032 14.4998 2.27032C14.1116 2.27032 13.7906 2.39723 13.5368 2.65105C13.283 2.90487 13.1561 3.22587 13.1561 3.61407C13.1561 4.00226 13.283 4.32327 13.5368 4.57709C13.7906 4.83091 14.1116 4.95782 14.4998 4.95782Z" fill="#C55353"/>
                </svg>
                <div className="text-lg text-[#848484] my-4">Please select a reason for<br/>
                canceling your appointment</div>
                <Dropdown value={selectedReason} onChange={(e) => setSelectedReason(e.value)} options={reasons} optionLabel="name" 
                placeholder="Tell Us a Reason" className="w-full" />
                <Link href="/appointment-cancel-confirmed">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] mt-3" label="Submit"/>
                </Link>
            </div>
        </Dialog>
      </>
    );
  }