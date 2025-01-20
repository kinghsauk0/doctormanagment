"use client";
import React, {  useEffect, useState } from "react";
import "./doctor.scss";
import { Image } from "primereact/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import Header from "./components/Header/Header";
import { Carousel } from "primereact/carousel";
import { FloatLabel } from "primereact/floatlabel";
import Footer from "./components/Footer/Footer";
import { getCookie } from "@/app/services/cookie.service";
import { useApp } from "../context/AppProvider";
import { Routes } from "@/app/routes";
export default function Page() {
  const {app} = useApp()
  useEffect(() => {
    const token = getCookie("doctorId")
    if(!token){
      null
    }else{
      app.goTo(Routes.doctorDashboard())
    }
  },[])
  
  const testimony = [
    {
      id: "1",
      name: "Jane Cooper",
      date: "12/4/17",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus.",
      image: "/images/rvw1.webp",
    },
    {
      id: "2",
      name: "Jane Cooper",
      date: "12/4/17",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus.",
      image: "/images/rvw2.webp",
    },
    {
      id: "3",
      name: "Jane Cooper",
      date: "12/4/17",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus.",
      image: "/images/rvw3.webp",
    },
    {
      id: "4",
      name: "Jane Cooper",
      date: "12/4/17",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem velit viverra amet faucibus.",
      image: "/images/rvw4.webp",
    },
  ];
  const responsiveTestiOptions = [
    {
      breakpoint: "1400px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 1,
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
  const testiTemplate = (testi:any) => {
    
    return (
      <div className="p-10 bg-white rounded-2xl shadow-md m-2">
        <div className="md:flex justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="">
              <Image
                src={testi.image}
                alt="Image"
                className="rounded-full"
                width="50"
                height="50"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h5 className="m-0">{testi.name}</h5>
              <div className="text-xs text-[#6E7071]">{testi.date}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 testirvw md:mt-0 mt-2">
            <svg
              width="34"
              height="32"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                fill="#F5BF00"
              />
            </svg>
            <svg
              width="34"
              height="32"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                fill="#F5BF00"
              />
            </svg>
            <svg
              width="34"
              height="32"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                fill="#F5BF00"
              />
            </svg>
            <svg
              width="34"
              height="32"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                fill="#F5BF00"
              />
            </svg>
            <svg
              width="34"
              height="32"
              viewBox="0 0 34 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.1631 1.26548C15.8573 -0.346443 18.1427 -0.346442 18.8369 1.26548L21.9379 8.46632C22.2275 9.13867 22.8612 9.59911 23.5901 9.66672L31.3968 10.3908C33.1443 10.5528 33.8506 12.7265 32.532 13.8848L26.6419 19.0592C26.0919 19.5423 25.8499 20.2873 26.0108 21.0015L27.7346 28.6498C28.1205 30.3619 26.2715 31.7053 24.7624 30.8092L18.0211 26.8063C17.3917 26.4326 16.6083 26.4326 15.9789 26.8063L9.23757 30.8092C7.72851 31.7053 5.87952 30.3619 6.26539 28.6498L7.98918 21.0015C8.15013 20.2873 7.90806 19.5423 7.35809 19.0592L1.46795 13.8848C0.149427 12.7265 0.85568 10.5528 2.60322 10.3908L10.4099 9.66672C11.1388 9.59911 11.7725 9.13867 12.0621 8.46632L15.1631 1.26548Z"
                fill="#F5BF00"
              />
            </svg>
          </div>
        </div>
        <div className="mt-5 md:mt-10 leading-7">{testi.text}</div>
      </div>
    );
  };
  return (
    <>
      <Header />
      <section className="lg:py-20 pb-10 pt-20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-8 lg:gap-10 gap-4 items-center">
            <div className="md:col-span-3 col-span-4">
              <div
                className="text-[#1849A9] font-light text-base lg:text-6xl md:text-xl mb-4 lg:mb-6"
                style={{ lineHeight: "1.3" }}
              >
                Effortlessly Manage Patients & Prescriptions with V CURE
              </div>
              <div
                className="mb-4 lg:mb-6 lg:text-xl text-xs"
                style={{ lineHeight: "1.6" }}
              >
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </div>
              <Link href="/doctor/sign-in">
                <Button
                    icon="pi pi-arrow-right"
                    iconPos="right"
                    className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none"
                    size="small"
                    label="Get Started"
                />
              </Link>
            </div>
            <div className="md:col-span-2 md:block hidden"></div>
            <div className="md:col-span-3 col-span-4">
              <Image
                src="/images/Illustration.webp"
                className="w-full h-auto"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="lg:py-14 py-10 bg-white text-center">
        <div className="container px-4 mx-auto">
          <div className="grid md:grid-cols-3 grid-cols-1 lg:gap-10 md:gap-6 gap-4">
            <div className="lg:p-10 p-6 shadow-md rounded-lg">
              <div className="mb-4 h-[80px] w-[80px] rounded-full flex items-center justify-center bg-[#1849A9] mx-auto">
                <Image
                  src="/images/easy.svg"
                  alt=""
                  height="60px"
                  width="60px"
                />
              </div>
              <div className="text-[#000] text-lg font-semibold mb-2">
                Easy Patient Management
              </div>
              <div className="text-[#667085] text-md">
                Quickly access patient records, consultation history, and more.
              </div>
            </div>
            <div className="lg:p-10 p-6 shadow-md rounded-lg">
              <div className="mb-4 h-[80px] w-[80px] rounded-full flex items-center justify-center bg-[#1849A9] mx-auto">
                <Image
                  src="/images/E-pre.svg"
                  alt=""
                  height="60px"
                  width="60px"
                />
              </div>
              <div className="text-[#000] text-lg font-semibold mb-2">
                E-Prescriptions in Seconds
              </div>
              <div className="text-[#667085] text-md">
                Generate and send prescriptions digitally, minimizing paperwork.
              </div>
            </div>
            <div className="lg:p-10 p-6 shadow-md rounded-lg">
              <div className="mb-4 h-[80px] w-[80px] rounded-full flex items-center justify-center bg-[#1849A9] mx-auto">
                <Image
                  src="/images/cons.svg"
                  alt=""
                  height="60px"
                  width="60px"
                />
              </div>
              <div className="text-[#000] text-lg font-semibold mb-2">
                Consultation Tracking
              </div>
              <div className="text-[#667085] text-md">
                Keep track of past consultations and upcoming appointments.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="lg:py-14 py-10 bg-[#F5FAFF]">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-8 lg:gap-10 gap-4 items-center">
            <div className="md:col-span-3 col-span-4">
              <div
                className="text-[#1849A9] font-light text-base lg:text-6xl md:text-xl mb-4 lg:mb-6"
                style={{ lineHeight: "1.3" }}
              >
                Benefits
              </div>
              <div
                className="mb-4 lg:mb-6 lg:text-xl text-xs"
                style={{ lineHeight: "1.6" }}
              >
               A Doctor Management System improves efficiency, streamlines appointments, enhances patient care, ensures accurate records, and boosts overall practice productivity.
              </div>
            </div>
            <div className="md:col-span-2 md:block hidden"></div>
            <div className="md:col-span-3 col-span-4">
              <Image
                src="/images/Benefits.webp"
                className="w-full h-auto"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section className="lg:py-14 py-10 bg-[#fff]">
        <div className="container px-4 mx-auto">
          <div className="md:p-10 p-6 bg-[#175CD3] rounded-lg grid grid-cols-8 lg:gap-10 gap-4 items-center text-white">
            <div className="md:col-span-3 col-span-8">
              <div
                className="font-light lg:text-6xl md:text-2xl text-2xl mb-4"
                style={{ lineHeight: "1.3" }}
              >
                How It Works
              </div>
              <div className="md:text-lg text-base" style={{ lineHeight: "1.6" }}>
              Sign up, add patients to your profile, and start prescribing medications efficiently, enhancing patient care and streamlining the treatment process.
              </div>
            </div>
            <div className="md:col-span-2 md:block hidden"></div>
            <div className="md:col-span-3 col-span-8">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4 border border-solid border-[#fff] rounded-md p-3 items-center">
                  <div>
                    <div className="md:h-[100px] md:w-[100px] h-[70px] w-[70px] bg-white flex items-center justify-center text-[#000] font-bold lg:text-6xl text-4xl">
                      1
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-semibold md:text-2xl text-lg">Sign Up</div>
                    <div className="md:text-base text-md">Create your account in minutes.</div>
                  </div>
                </div>
                <div className="flex gap-3 border border-solid border-[#fff] rounded-md p-3 items-center">
                  <div>
                    <div className="md:h-[100px] md:w-[100px] h-[70px] w-[70px] bg-white flex items-center justify-center text-[#000] font-bold lg:text-6xl text-4xl">
                      2
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-semibold md:text-2xl text-lg">
                      Add Patients
                    </div>
                    <div className="md:text-base text-md">
                      Import or manually add patient details.
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 border border-solid border-[#fff] rounded-md p-3 items-center">
                  <div>
                    <div className="md:h-[100px] md:w-[100px] h-[70px] w-[70px] bg-white flex items-center justify-center text-[#000] font-bold lg:text-6xl text-4xl">
                      3
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-semibold md:text-2xl text-lg">
                      Start Prescribing
                    </div>
                    <div className="md:text-base text-md">
                      Generate e-prescriptions and manage patient data with
                      ease.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 bg-[#F1F9FE]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-20 gap-y-10 items-center">
            <div>
              <div className="max-w-[450px]">
                <div className="uppercase text-xs text-[#0D52AF] font-bold mb-5">
                  Patient Reviews
                </div>
                <h2 className="mb-6 font-normal text-2xl md:text-4xl">
                  What <span className="text-[#0D52AF]">Our Patient’s</span>{" "}
                  Saying About Us
                </h2>
                <div className="text-sm mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sem
                  velit viverra amet faucibus.
                </div>
                <div className="flex items-center rvw100rvw">
                  <div className="flex items-center">
                    <div className="">
                      <Image
                        src="/images/rvw1.webp"
                        alt="Image"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="relative left-[-10px]">
                      <Image
                        src="/images/rvw2.webp"
                        alt="Image"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="relative left-[-20px]">
                      <Image
                        src="/images/rvw3.webp"
                        alt="Image"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="relative left-[-30px]">
                      <Image
                        src="/images/rvw4.webp"
                        alt="Image"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="relative left-[-40px]">
                      <Image
                        src="/images/rvw5.webp"
                        alt="Image"
                        width="50"
                        height="50"
                      />
                    </div>
                    <div className="relative left-[-50px]">
                      <Image
                        src="/images/rvw6.webp"
                        alt="Image"
                        width="50"
                        height="50"
                      />
                    </div>
                  </div>
                  <Link href="" className="text-[#1E1E1E]">
                    100+ Reviews
                  </Link>
                </div>
              </div>
            </div>
            <div>
              <div className="testislide">
                <Carousel
                  value={testimony}
                  responsiveOptions={responsiveTestiOptions}
                  numVisible={1}
                  numScroll={1}
                  className="custom-carousel"
                  circular
                  autoplayInterval={3000}
                  itemTemplate={testiTemplate}
                  showIndicators={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="lg:py-14 py-10 bg-[#fff]">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-6">
            <div
                className="font-light text-4xl mb-4"
                style={{ lineHeight: "1.3" }}
              >
                Affordable Plans for Every Practice
              </div>
              <div className="text-lg" style={{ lineHeight: "1.6" }}>Choose a plan that suits your practice needs</div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4 max-w-[900px] mx-auto mb-6">
            <div className="">
                <FloatLabel>
                    <InputText id="username" className="w-full" />
                    <label htmlFor="username">Name</label>
                </FloatLabel>
            </div>
            <div className="">
                <FloatLabel>
                    <InputText id="email" className="w-full" />
                    <label htmlFor="email">Email</label>
                </FloatLabel>
            </div>
          </div>
          <div className="text-center">
            <Button className="bg-[#1D4ED8] text-[#fff] border-[#1D4ED8] shadow-none px-10" label="Submit Now" size="small"/>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}
