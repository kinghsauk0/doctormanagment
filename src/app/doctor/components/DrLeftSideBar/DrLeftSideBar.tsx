"use client";
import useMobile from "@/app/hooks/isMobileHook";
import Link from "next/link";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import React from "react";
import "./DrLeftSideBar.scss";
import { Sidebar } from "primereact/sidebar";
import { sideBarItems } from "../SideBarItems/SideBarItems";
import { removeCookie } from "@/app/services/cookie.service";
import { usePathname } from 'next/navigation';


type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};



export default function DrLeftSideBar({ visible, setVisible }: Props) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const MobsidebarHeader = (
    <div className="flex align-items-center gap-2">
      <div className="flex gap-4 items-center">
        <Link href="/" className="hdrlogo">
          <Image src="/images/logo.webp" alt="Image" width="250" height="50" />
        </Link>
      </div>
    </div>
  );

  const handelLogout = () => {
    removeCookie("doctorId")
    removeCookie("userId")
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
      window.location.reload();
    }
  }

 
  return (
    <div className="bg-white">
      {isMobile ? (
        <>
          <Sidebar
            header={MobsidebarHeader}
            visible={visible}
            position="left"
            onHide={() => setVisible(false)}
            className="w-full md:w-[500px]"
          >
            <div className="flex flex-col justify-between">
              <div
                className="dashmnu overflow-y-auto"
                style={{ height: "calc(100vh - 155px)" }}
              >
                <ul className="flex flex-col justify-between list-none m-0 p-0">
                  {sideBarItems.length > 0
                    ? sideBarItems.map((sideBar, index) => (
                        <li key={index}>
                          <Link
                            href={sideBar.path}
                            className={`flex items-center gap-2 ${
                              pathname.includes(sideBar.path) ? 'active' : ''
                            }`}
                          >
                            {sideBar.icon}
                            <span className="text-sm">{sideBar.name}</span>
                          </Link>
                        </li>
                      ))
                    : null}
                </ul>
              </div>
              <div className="">
                <Button className="bg-[#f1f1f1] flex items-center gap-4 text-[#2280DE] w-full border-0 justify-center">
                  <i style={{ lineHeight: "0" }}>
                    <svg
                      height="16"
                      viewBox="0 0 512 512"
                      width="16"
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      fill="#2280DE"
                    >
                      <path d="m363.335 488a24 24 0 0 1 -24 24h-226.253a80.09 80.09 0 0 1 -80-80v-352a80.09 80.09 0 0 1 80-80h226.253a24 24 0 0 1 0 48h-226.253a32.035 32.035 0 0 0 -32 32v352a32.034 32.034 0 0 0 32 32h226.253a24 24 0 0 1 24 24zm108.553-248.97-114.051-114.052a24 24 0 1 0 -33.937 33.941l73.077 73.081h-188.936a24 24 0 1 0 0 48h188.935l-73.08 73.08a24 24 0 1 0 33.941 33.941l114.051-114.05a24 24 0 0 0 0-33.941z" />
                    </svg>
                  </i>
                  <span>Log out</span>
                </Button>
              </div>
            </div>
          </Sidebar>
        </>
      ) : (
        <>
          <div className="flex flex-col p-4" style={{ height: "100vh" }}>
            <Link href="/" className="hdrlogo">
              <Image
                src="/images/logo.webp"
                alt="Image"
                width="250"
                height="50"
              />
            </Link>
            <div className="dashmnu max-h-full overflow-y-auto pt-6">
            <ul className="flex flex-col justify-between list-none m-0 p-0">
                  {sideBarItems.length > 0
                    ? sideBarItems.map((sideBar, index) => (
                        <li key={index}>
                          <Link
                            href={sideBar.path}
                            className={`flex items-center gap-2 ${
                              pathname.includes(sideBar.path) ? 'active' : ''
                            }`}
                          >
                            {sideBar.icon}
                            <span className="text-sm">{sideBar.name}</span>
                          </Link>
                        </li>
                      ))
                    : null}
                </ul>
            </div>
            <div className="mt-auto">
              <Button onClick={handelLogout} className="bg-[#f1f1f1] flex items-center gap-4 text-[#2280DE] w-full border-0 justify-center">
                <i style={{ lineHeight: "0" }}>
                  <svg
                    height="16"
                    viewBox="0 0 512 512"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    fill="#2280DE"
                  >
                    <path d="m363.335 488a24 24 0 0 1 -24 24h-226.253a80.09 80.09 0 0 1 -80-80v-352a80.09 80.09 0 0 1 80-80h226.253a24 24 0 0 1 0 48h-226.253a32.035 32.035 0 0 0 -32 32v352a32.034 32.034 0 0 0 32 32h226.253a24 24 0 0 1 24 24zm108.553-248.97-114.051-114.052a24 24 0 1 0 -33.937 33.941l73.077 73.081h-188.936a24 24 0 1 0 0 48h188.935l-73.08 73.08a24 24 0 1 0 33.941 33.941l114.051-114.05a24 24 0 0 0 0-33.941z" />
                  </svg>
                </i>
                <span>Log out</span>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
