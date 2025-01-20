"use client";
import React, { useState } from "react";
import DashboardLeftBar from "../components/dashboardLeftBar/DashboardLeftBar";
import { Button } from "primereact/button";
import Link from "next/link";
import useMobile from "@/app/hooks/isMobileHook";

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
                        <svg fill="#0D52AF" enableBackground="new 0 0 512 512" height="100" viewBox="0 0 512 512" width="100" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="m286.323 29.141 30.486 22.82c8.338 6.241 17.114 9.435 27.513 10.014l38.021 2.115c22.767 1.266 41.258 16.781 46.458 38.983l8.686 37.077c2.375 10.14 7.045 18.228 14.639 25.355l27.767 26.061c16.626 15.604 20.817 39.375 10.531 59.725l-17.179 33.985c-4.698 9.295-6.32 18.492-5.084 28.833l4.52 37.812c2.706 22.641-9.363 43.544-30.323 52.521l-35.006 14.992c-9.574 4.1-16.728 10.103-22.428 18.819l-20.843 31.87c-12.48 19.083-35.162 27.338-56.988 20.742l-36.452-11.016c-9.969-3.013-19.308-3.013-29.278 0l-36.452 11.016c-21.826 6.596-44.508-1.659-56.988-20.742l-20.843-31.87c-5.701-8.716-12.855-14.719-22.428-18.819l-35.008-14.994c-20.96-8.977-33.029-29.88-30.323-52.521l4.52-37.812c1.236-10.341-.386-19.538-5.084-28.833l-17.179-33.985c-10.286-20.349-6.095-44.12 10.531-59.725l27.767-26.061c7.594-7.127 12.263-15.215 14.638-25.355l8.686-37.077c5.2-22.201 23.691-37.716 46.458-38.983l38.021-2.115c10.399-.578 19.175-3.773 27.513-10.014l30.486-22.82c18.253-13.662 42.391-13.662 60.645.002zm-49.77 239.919-33.084-33.084c-8.575-8.575-22.484-8.575-31.058 0-8.575 8.575-8.575 22.483 0 31.058l48.661 48.66c8.575 8.574 22.484 8.575 31.058 0 29.33-29.331 58.328-58.991 87.523-88.456 8.513-8.592 8.486-22.456-.095-30.989-8.582-8.535-22.486-8.511-31.008.096zm19.447-176.606c-45.161 0-86.048 18.306-115.644 47.902-29.596 29.597-47.902 70.483-47.902 115.644s18.306 86.048 47.902 115.644 70.483 47.902 115.644 47.902 86.048-18.306 115.644-47.902 47.902-70.483 47.902-115.644-18.306-86.048-47.902-115.644-70.483-47.902-115.644-47.902zm104.331 59.215c-26.7-26.7-63.587-43.215-104.331-43.215s-77.631 16.515-104.331 43.215-43.215 63.587-43.215 104.331 16.515 77.631 43.215 104.331 63.587 43.215 104.331 43.215 77.631-16.515 104.331-43.214c26.7-26.7 43.214-63.587 43.214-104.331.001-40.745-16.514-77.632-43.214-104.332z" fillRule="evenodd"/></svg>
                    </div>
                    <div className="text-[#15192C] text-3xl">Account Created!</div>
                    <div className="text-[#797979] text-sm">You’re almost good to go. <br/>you’ll set up in less than a minute!</div>
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
