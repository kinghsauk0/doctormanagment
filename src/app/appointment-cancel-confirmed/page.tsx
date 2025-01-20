"use client";
import React, { useState } from "react";
import DashboardLeftBar from "../components/dashboardLeftBar/DashboardLeftBar";
import { Button } from "primereact/button";
import Link from "next/link";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";

export default function Page() {
    const isMobile = useMobile();
  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            <div>
                <DashboardLeftBar />
            </div>
            <div className="col-span-3 lg:col-span-4 lg:px-10 md:px-6 px-4 flex items-center justify-center h-[100vh] flex-col">
                <div className="p-10 rounded-md bg-white shadow-md w-full md:max-w-[600px] max-w-[320px] flex flex-col gap-6 text-center">
                    <div className="">
                        <Image
                            src="/images/raffggiki.webp"
                            alt="Image"
                            className="rounded-full"
                            width="192"
                            height="148"
                        />
                    </div>
                    <div className="text-[#15192C] text-3xl">Sorry to see you Go</div>
                    <div className="text-[#797979] text-sm">Your Appointment cancellation <br/>has been confirmed. </div>
                    <Link href="/dashboard">
                        <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF]" label="Back to Dashboard"/>
                    </Link>
                </div>
                {isMobile ? (
                    <>
                        <div style={{height:'75px'}}></div>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    </>
  )
}
