"use client";

import React, { useState } from "react";
import DashboardLeftBar from "../components/dashboardLeftBar/DashboardLeftBar";
import Link from "next/link";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Calendar } from "primereact/calendar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Timeline } from "primereact/timeline";
import { Card } from "primereact/card";
import "./health-data.scss";
import { Carousel } from "primereact/carousel";

export default function Page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isMobile = useMobile();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [date, setDate] = useState(new Date());

  const events = [
    {
      cname: "Mindwell  clinic",
      dname: "Dr. Archana Saha",
      subtitle: "Your Prescription has been generated",
      date: "March 23 at 08:30PM",
      icon: "pi pi-circle-fill",
      color: "#4BA63E",
      image: [
        {
            title: "Document title1",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title2",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title3",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title4",
            url: "/images/prescription.webp",
        },
      ],
    },
    {
      cname: "Mindwell  clinic",
      dname: "Dr. Archana Saha",
      subtitle: "Lab Test report is Pending",
      date: "March 23 at 08:30PM",
      icon: "pi pi-info-circle",
      color: "#487AEC",
      image: [
        {
            title: "Document title1",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title2",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title3",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title4",
            url: "/images/prescription.webp",
        },
      ],
    },
    {
      cname: "Mindwell  clinic",
      dname: "Dr. Archana Saha",
      subtitle: "Your Prescription has been generated",
      date: "March 23 at 08:30PM",
      icon: "pi pi-bullseye",
      color: "#FF9800",
      image: [
        {
            title: "Document title1",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title2",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title3",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title4",
            url: "/images/prescription.webp",
        },
      ],
    },
    {
      cname: "Mindwell  clinic",
      dname: "Dr. Archana Saha",
      subtitle: "Your Prescription has been generated",
      date: "March 23 at 08:30PM",
      icon: "pi pi-bullseye",
      color: "#607D8B",
      image: [
        {
            title: "Document title1",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title2",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title3",
            url: "/images/prescription.webp",
        },
        {
            title: "Document title4",
            url: "/images/prescription.webp",
        },
      ],
    },
  ];

  const customizedMarker = (item) => {
    return (
      <span
        className="flex w-2rem h-2rem items-center justify-center text-white border-circle z-1 shadow-1 rounded-full p-1 timelftico"
        style={{ backgroundColor: item.color }}
      >
        <i className={item.icon}></i>
      </span>
    );
  };

  const responsiveDoctOptions = [
    {
      breakpoint: "1400px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const doctTemplate = (item) => {
    return (
      <>
        <div className="rounded-lg bg-[#3c77b3] prescriptionthmb shadow-md overflow-hidden m-2">
          <div className="flex justify-center h-[150px] overflow-hidden">
            <Image src={item.url} alt="Image" width="150" preview />
          </div>
          <div className="p-3 bg-white text-[#222] text-base">{item.title}</div>
        </div>
      </>
    );
  };

  const customizedContent = (item) => {
    return (
      <Card>
        <div className="text-[#0D52AF] text-base font-semibold">
          {item.date}
        </div>
        <div className="text-[#222]">{item.subtitle}</div>
        <div className="text-[#15192CCC] text-lg font-semibold">
          {item.dname}
        </div>
        <div className="text-[#222] text-base font-semibold">{item.cname}</div>
        <div className="">
          <Carousel
            value={item.image}
            responsiveOptions={responsiveDoctOptions}
            numVisible={3}
            numScroll={1}
            className="prescription-carousel"
            circular
            itemTemplate={doctTemplate}
            showIndicators={false}
            showNavigators={true}
          />
        </div>
      </Card>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
        <div>
          <DashboardLeftBar />
        </div>
        <div className="col-span-3 lg:col-span-4">
          <section className="pageheader flex items-center justify-between md:py-4 py-2 lg:px-10 md:px-6 px-4 bg-white">
            <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
              Health Data
            </div>
            <div className="flex items-center gap-4">
              <div className="headercalender">
                <Calendar
                  id="buttondisplay"
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  showIcon
                  iconPos="left"
                />
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
            </div>
          </section>
          <section className="lg:px-10 md:px-6 px-4 py-4">
            <div className="flex items-center justify-between mb-3 md:mb-0">
              <div className="text-[#15192C] font-semibold text-lg">
                Doctors
              </div>
              <div>
                <IconField iconPosition="left">
                  <InputIcon className="pi pi-search"> </InputIcon>
                  <InputText
                    v-model="value1"
                    placeholder="Search"
                    className="md:w-[305px] w-[238px]"
                  />
                </IconField>
              </div>
            </div>
            <div className="flex gap-4 items-center mb-3">
              <Button className="flex flex-col gap-1 items-center justify-center p-0 text-[#222] bg-transparent border-0 shadow-none">
                <Image
                  src="/images/Lavanya-sham.webp"
                  alt="Image"
                  className="rounded-full"
                  width="60"
                  height="60"
                />
                <div className="text-10px truncate" style={{ width: "60px" }}>
                  Dr. Archana Saha
                </div>
              </Button>
              <Button className="flex flex-col gap-1 items-center justify-center p-0 text-[#222] bg-transparent border-0 shadow-none">
                <Image
                  src="/images/Suresh-Din.webp"
                  alt="Image"
                  className="rounded-full"
                  width="60"
                  height="60"
                />
                <div className="text-10px truncate" style={{ width: "60px" }}>
                  Dr. Pritam Saha
                </div>
              </Button>
              <Button className="flex flex-col gap-1 items-center justify-center p-0 text-[#222] bg-transparent border-0 shadow-none">
                <Image
                  src="/images/Victoria-lili.webp"
                  alt="Image"
                  className="rounded-full"
                  width="60"
                  height="60"
                />
                <div className="text-10px truncate" style={{ width: "60px" }}>
                  Dr. Victoria Saha
                </div>
              </Button>
            </div>
            <div className="card healthdatatimelile" style={{height:'calc(100vh - 240px)', overflow:'auto'}}>
              <Timeline
                value={events}
                align="left"
                className="prescription-timeline"
                marker={customizedMarker}
                content={customizedContent}
              />
              {isMobile ? (
                <>
                    <div style={{height:'75px'}}></div>
                </>
                ) : (
                <></>
                )}
            </div>
            
          </section>
          
        </div>
      </div>
    </>
  );
}
