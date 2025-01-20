"use client";
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Link from "next/link";

type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Payment({visible, setVisible}:Props) {
  return (
    <>
        <Dialog header="Chose your Payment Options" visible={visible} className="md:w-[400px] w-[320px]" onHide={() => {if (!visible) return; setVisible(false); }}>
            <div className="flex flex-col gap-3">
                <Link href="/thankyou">
                    <Button className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full" label="Pay Online"/>
                </Link>
                <Link href="/thankyou">
                    <Button className="bg-[#fff] text-[#0D52AF] text-sm border-[#0D52AF] w-full" label="Pay Cash On counter"/>
                </Link>
            </div>
        </Dialog> 
    </>
  )
}
