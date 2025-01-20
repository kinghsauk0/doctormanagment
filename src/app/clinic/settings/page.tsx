"use client";
import React, { useEffect, useRef, useState } from "react";
import "../clinic.scss";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
export default function page() {
    const isMobile = useMobile();
    return <>
        {isMobile ? <></> : <></>}

        <div>Settings</div>
    </>;
}