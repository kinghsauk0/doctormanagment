"use client";
import React, { useState } from "react";
import "./profile.scss";
import DashboardLeftBar from "../components/dashboardLeftBar/DashboardLeftBar";
import { Image } from "primereact/image";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Sidebar } from "primereact/sidebar";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";

export default function Page() {
  const [checked, setChecked] = useState(false);

  const [date, setDate] = useState(null);

  const [selectedGander, setSelectedGander] = useState(null);
  const ganders = [{ name: "Male" }, { name: "Female" }, { name: "Others" }];
  const [selectedState, setSelectedState] = useState(null);
  const states = [
    { name: "West Bengal" },
    { name: "Delhi" },
    { name: "Bihar" },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const languages = [
    { name: "English" },
    { name: "Hindi" },
    { name: "Bangla" },
  ];

  const [editprofilevisible, setEditProfileVisible] = useState(false);
  const EditProfileHeader = (
    <div className="flex align-items-center gap-2">
      <div className="flex gap-4 items-center">
        <Button
          icon="pi pi-arrow-left"
          className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
          onClick={() => setEditProfileVisible(false)}
        />
        <div className="font-semibold text-base text-[#222]">Edit Profile</div>
      </div>
    </div>
  );

  const [languagevisible, setLanguageVisible] = useState(false);
  const LanguageHeader = (
    <div className="flex align-items-center gap-2">
      <div className="flex gap-4 items-center">
        <Button
          icon="pi pi-arrow-left"
          className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
          onClick={() => setLanguageVisible(false)}
        />
        <div className="font-semibold text-base text-[#222]">Language</div>
      </div>
    </div>
  );

  const [aboutvisible, setAboutVisible] = useState(false);
  const AboutHeader = (
    <div className="flex align-items-center gap-2">
      <div className="flex gap-4 items-center">
        <Button
          icon="pi pi-arrow-left"
          className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
          onClick={() => setAboutVisible(false)}
        />
        <div className="font-semibold text-base text-[#222]">About</div>
      </div>
    </div>
  );

  const [helpvisible, setHelpVisible] = useState(false);
  const HelpHeader = (
    <div className="flex align-items-center gap-2">
      <div className="flex gap-4 items-center">
        <Button
          icon="pi pi-arrow-left"
          className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
          onClick={() => setAboutVisible(false)}
        />
        <div className="font-semibold text-base text-[#222]">
          Help & Support
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
        <div>
          <DashboardLeftBar />
        </div>
        <div className="col-span-3 lg:col-span-4">
          <section className="pageheader flex items-center justify-between py-4 lg:px-10 md:px-6 px-4 bg-white">
            <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
              My Profile
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
              <div>Ron john</div>
            </Link>
          </section>
          <section className="py-4 lg:px-10 md:px-6 px-4">
            <div className="max-w-[500px] mx-auto flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                <div className="flex gap-2 items-center p-3 rounded-md bg-white">
                  <div style={{ marginTop: "5px" }}>
                    <Image
                      src="/images/Victoria-lili.webp"
                      alt="Image"
                      className="rounded-full"
                      width="50"
                      height="50"
                    />
                  </div>
                  <div className="">
                    <div className="text-lg text-[#222] font-semibold">
                      Steven Jobs
                    </div>
                    <div className="text-xs text-[#848484]">St@email.com</div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-3 rounded-md bg-white">
                  <div className="text-lg text-[#222]">Settings</div>
                  <Button
                    className="flex items-center gap-2 bg-[#F1F9FE] text-[#222] border-[#F1F9FE] py-4 shadow-none"
                    onClick={() => setEditProfileVisible(true)}
                  >
                    <i style={{ lineHeight: "0" }}>
                      <svg
                        clipRule="evenodd"
                        fillRule="evenodd"
                        height="18"
                        strokeLinejoin="round"
                        strokeMiterlimit="2"
                        viewBox="0 0 24 24"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Icon">
                          <path d="m22.257 15.989c.196-.421.217-.902.059-1.339-.159-.436-.485-.791-.905-.987-.642-.299-1.5-.7-2.143-.999-.42-.196-.901-.217-1.338-.058-.436.158-.791.484-.987.905-.624 1.338-1.763 3.781-2.183 4.681-.181.388-.213.83-.091 1.24.248.829.831 2.783.831 2.783.062.205.208.374.402.465.194.09.418.093.614.008 0 0 1.872-.808 2.666-1.151.394-.17.711-.479.892-.867zm-1.359-.634-2.183 4.681c-.026.055-.071.1-.128.124l-1.891.817s-.59-1.974-.59-1.974c-.017-.059-.012-.122.013-.177l2.183-4.682c.028-.06.079-.106.141-.129.063-.023.131-.02.192.009l2.142.998c.06.028.106.079.129.141.023.063.02.132-.008.192z" />
                          <path d="m13.5 20.75h-10.55c-.053 0-.104-.021-.141-.059-.038-.037-.059-.088-.059-.141v-1.45c0-.831.593-1.562 1.507-2.185 1.632-1.113 4.273-1.815 7.243-1.815.83 0 1.634.055 2.399.16.41.055.788-.232.844-.642s-.232-.789-.642-.845c-.829-.113-1.701-.173-2.601-.173-3.322 0-6.263.831-8.089 2.076-1.393.95-2.161 2.157-2.161 3.424v1.45c0 .451.179.883.498 1.202s.751.498 1.202.498h10.55c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z" />
                          <path d="m11.5 1.737c-3.036 0-5.5 2.465-5.5 5.5 0 3.036 2.464 5.5 5.5 5.5s5.5-2.464 5.5-5.5c0-3.035-2.464-5.5-5.5-5.5zm0 1.5c2.208 0 4 1.793 4 4 0 2.208-1.792 4-4 4s-4-1.792-4-4c0-2.207 1.792-4 4-4z" />
                        </g>
                      </svg>
                    </i>
                    <span>Edit profile</span>
                    <i className="ml-auto" style={{ lineHeight: "0" }}>
                      <svg
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m22.707 11.293-7-7a1 1 0 0 0 -1.414 1.414l5.293 5.293h-17.586a1 1 0 0 0 0 2h17.586l-5.293 5.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414z" />
                      </svg>
                    </i>
                  </Button>
                  <Button
                    className="flex items-center gap-2 bg-[#F1F9FE] text-[#222] border-[#F1F9FE] py-4 shadow-none"
                    onClick={() => setLanguageVisible(true)}
                  >
                    <i style={{ lineHeight: "0" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        width="18"
                        height="18"
                      >
                        <g id="Layer_2" data-name="Layer 2">
                          <path d="M87.95636,73.23224a44.29242,44.29242,0,0,0,6.54358-23.23145L94.5,50l-.00006-.00079a44.2927,44.2927,0,0,0-6.54376-23.23169l-.02442-.03815a44.5022,44.5022,0,0,0-75.8634-.00031l-.02472.03864a44.51347,44.51347,0,0,0-.00018,46.46436l.02514.03918a44.50213,44.50213,0,0,0,75.86292-.00037Zm-32.26825,13.641a10.81448,10.81448,0,0,1-2.8894,1.99561,6.52134,6.52134,0,0,1-5.59748,0,13.62135,13.62135,0,0,1-5.04809-4.44233,39.77474,39.77474,0,0,1-5.74762-12.47064Q43.19588,71.538,50,71.53021q6.80127,0,13.59521.42572a50.19826,50.19826,0,0,1-2.438,6.71222A25.80323,25.80323,0,0,1,55.68811,86.87329ZM10.587,52.5H28.536a88.30459,88.30459,0,0,0,1.62274,14.91418q-7.35983.64766-14.68207,1.779A39.23059,39.23059,0,0,1,10.587,52.5Zm4.88964-21.69324Q22.796,31.941,30.16388,32.58618A88.15014,88.15014,0,0,0,28.5376,47.5H10.587A39.2306,39.2306,0,0,1,15.47662,30.80676ZM44.31183,13.12665a10.81146,10.81146,0,0,1,2.8894-1.99561,6.52134,6.52134,0,0,1,5.59748,0,13.62131,13.62131,0,0,1,5.04809,4.44232A39.77482,39.77482,0,0,1,63.59436,28.044Q56.804,28.46185,50,28.46973q-6.80127-.00009-13.59528-.42578a50.18985,50.18985,0,0,1,2.43805-6.71216A25.80254,25.80254,0,0,1,44.31183,13.12665ZM89.413,47.5H71.464a88.31173,88.31173,0,0,0-1.62274-14.91425q7.35992-.64764,14.68207-1.779A39.2306,39.2306,0,0,1,89.413,47.5ZM35.18756,67.02545A82.69645,82.69645,0,0,1,33.53729,52.5H66.4632a82.67828,82.67828,0,0,1-1.64728,14.52563Q57.41607,66.54,50,66.53027,42.58927,66.53018,35.18756,67.02545Zm29.62482-34.051A82.70224,82.70224,0,0,1,66.46259,47.5H33.53674A82.67914,82.67914,0,0,1,35.184,32.97424q7.39985.4855,14.816.49543Q57.41074,33.46967,64.81238,32.97449ZM71.46228,52.5H89.413a39.23052,39.23052,0,0,1-4.88971,16.69318q-7.31936-1.13435-14.68719-1.77942A88.14559,88.14559,0,0,0,71.46228,52.5ZM81.52539,26.20477q-6.39945.92331-12.83734,1.462a57.01792,57.01792,0,0,0-2.9754-8.39581,35.48007,35.48007,0,0,0-4.13984-7.04529A39.49152,39.49152,0,0,1,81.52539,26.20477ZM22.06915,22.06915a39.48682,39.48682,0,0,1,16.3559-9.84289c-.09369.12134-.19006.2373-.28241.36114A45.64338,45.64338,0,0,0,31.321,27.66754q-6.43816-.54528-12.84643-1.46277A39.82535,39.82535,0,0,1,22.06915,22.06915Zm-3.5946,51.726q6.39943-.9234,12.83728-1.462A57.01789,57.01789,0,0,0,34.28729,80.729a35.48425,35.48425,0,0,0,4.13983,7.04529A39.49154,39.49154,0,0,1,18.47455,73.79517Zm59.45624,4.13562a39.48587,39.48587,0,0,1-16.3559,9.84289c.09369-.12134.19-.2373.28241-.36114A45.64338,45.64338,0,0,0,68.679,72.3324q6.43816.54528,12.84643,1.46277A39.82535,39.82535,0,0,1,77.93079,77.93079Z" />
                        </g>
                      </svg>
                    </i>
                    <span>Languages</span>
                    <i className="ml-auto" style={{ lineHeight: "0" }}>
                      <svg
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m22.707 11.293-7-7a1 1 0 0 0 -1.414 1.414l5.293 5.293h-17.586a1 1 0 0 0 0 2h17.586l-5.293 5.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414z" />
                      </svg>
                    </i>
                  </Button>
                  <Button className="flex items-center gap-2 bg-[#F1F9FE] text-[#222] border-[#F1F9FE] shadow-none">
                    <i style={{ lineHeight: "0" }}>
                      <svg
                        enableBackground="new 0 0 512 512"
                        height="18"
                        viewBox="0 0 512 512"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="m411 262.862v-47.862c0-69.822-46.411-129.001-110-148.33v-21.67c0-24.813-20.187-45-45-45s-45 20.187-45 45v21.67c-63.59 19.329-110 78.507-110 148.33v47.862c0 61.332-23.378 119.488-65.827 163.756-4.16 4.338-5.329 10.739-2.971 16.267s7.788 9.115 13.798 9.115h136.509c6.968 34.192 37.272 60 73.491 60 36.22 0 66.522-25.808 73.491-60h136.509c6.01 0 11.439-3.587 13.797-9.115s1.189-11.929-2.97-16.267c-42.449-44.268-65.827-102.425-65.827-163.756zm-170-217.862c0-8.271 6.729-15 15-15s15 6.729 15 15v15.728c-4.937-.476-9.94-.728-15-.728s-10.063.252-15 .728zm15 437c-19.555 0-36.228-12.541-42.42-30h84.84c-6.192 17.459-22.865 30-42.42 30zm-177.67-60c34.161-45.792 52.67-101.208 52.67-159.138v-47.862c0-68.925 56.075-125 125-125s125 56.075 125 125v47.862c0 57.93 18.509 113.346 52.671 159.138z" />
                          <path d="m451 215c0 8.284 6.716 15 15 15s15-6.716 15-15c0-60.1-23.404-116.603-65.901-159.1-5.857-5.857-15.355-5.858-21.213 0s-5.858 15.355 0 21.213c36.831 36.831 57.114 85.8 57.114 137.887z" />
                          <path d="m46 230c8.284 0 15-6.716 15-15 0-52.086 20.284-101.055 57.114-137.886 5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0-42.497 42.497-65.901 98.999-65.901 159.099 0 8.284 6.716 15 15 15z" />
                        </g>
                      </svg>
                    </i>
                    <span>Notifications</span>
                    <i className="ml-auto" style={{ lineHeight: "0" }}>
                      <InputSwitch
                        checked={checked}
                        onChange={(e) => setChecked(e.value)}
                      />
                    </i>
                  </Button>
                </div>
                <div className="flex flex-col gap-3 p-3 rounded-md bg-white">
                  <div className="text-lg text-[#222]">Others</div>
                  <Button
                    className="flex items-center gap-2 bg-[#F1F9FE] text-[#222] border-[#F1F9FE] py-4 shadow-none"
                    onClick={() => setAboutVisible(true)}
                  >
                    <i style={{ lineHeight: "0" }}>
                      <svg
                        height="18"
                        viewBox="0 0 24 24"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 1"
                      >
                        <g fill="rgb(0,0,0)">
                          <path d="m12 0a12 12 0 1 0 12 12 12.013 12.013 0 0 0 -12-12zm0 22a10 10 0 1 1 10-10 10.011 10.011 0 0 1 -10 10z" />
                          <path d="m12 9a1 1 0 0 0 -1 1v8a1 1 0 0 0 2 0v-8a1 1 0 0 0 -1-1z" />
                          <circle cx="12" cy="6" r="1" />
                        </g>
                      </svg>
                    </i>
                    <span>About Us</span>
                    <i className="ml-auto" style={{ lineHeight: "0" }}>
                      <svg
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m22.707 11.293-7-7a1 1 0 0 0 -1.414 1.414l5.293 5.293h-17.586a1 1 0 0 0 0 2h17.586l-5.293 5.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414z" />
                      </svg>
                    </i>
                  </Button>
                  <Button
                    className="flex items-center gap-2 bg-[#F1F9FE] text-[#222] border-[#F1F9FE] py-4 shadow-none"
                    onClick={() => setHelpVisible(true)}
                  >
                    <i style={{ lineHeight: "0" }}>
                      <svg
                        height="18"
                        viewBox="0 0 27.999222 27.99642"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <linearGradient id="linearGradient4749">
                          <stop id="stop4747" offset="0" />
                        </linearGradient>
                        <g id="layer2" transform="translate(-224 -224.004)">
                          <g
                            id="g38415"
                            fill="none"
                            transform="matrix(2 0 0 2 224 224.001)"
                          >
                            <g
                              id="customer-support-1--customer-headset-help-microphone-phone-support"
                              fill="rgb(0,0,0)"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                id="path669"
                                d="m7 .00195313c-.579314-.00907217-1.1562323.09414438-1.6953125.30664062-.5422038.2137242-1.0362274.53226601-1.4550781.93749995-.4188455.4052402-.7548166.8889777-.9863281 1.4238282-.2315185.5348517-.3544778 1.1106232-.3632813 1.6933593a.50006502.50006502 0 0 0 0 .00586v2.6308588a.50001502.50001502 0 0 0 .5.5.50001502.50001502 0 0 0 .5-.5v-2.6230469c.0068164-.4512028.1019889-.8964195.28125-1.3105468.1792481-.4141086.4393581-.7877835.7636719-1.1015626.3243085-.3137652.7071379-.561081 1.1269531-.7265625.4198031-.1654792.8671855-.24637011 1.3183594-.2382812a.50006502.50006502 0 0 0 .019531 0c.4511739-.008089.8985563.072802 1.3183594.2382812.4198152.1654815.8026446.4127973 1.1269531.7265625.3243275.3137755.5844011.6874414.7636721 1.1015626.179214.4142.274443.8593891.28125 1.3105468v2.6230469a.50001502.50001502 0 0 0 .5.5.50001502.50001502 0 0 0 .5-.5v-2.6308594a.50006502.50006502 0 0 0 0-.00586c-.008793-.5827806-.131896-1.1585797-.363281-1.6933587-.231529-.5348379-.567457-1.0185843-.986328-1.4238282-.4188511-.40523394-.9128747-.72377575-1.4550785-.93749995-.5390802-.21249624-1.1159985-.31571279-1.6953125-.30664062z"
                              />
                              <path
                                id="path668"
                                d="m1.5 5c-.3976419 0-.77938046.1582972-1.06054687.4394531-.28116412.2811701-.43945313.6629087-.43945313 1.0605469v2c0 .3976382.15828901.7793768.43945313 1.0605469.28116641.2811559.66290497.4394531 1.06054687.4394531h1c.2650321 0 .5196242-.1055417.7070313-.2929687.187427-.1874071.2929687-.4419992.2929687-.7070313v-3c0-.2650321-.1055417-.5196242-.2929687-.7070313-.1874071-.187427-.4419992-.2929687-.7070313-.2929687zm0 1h1v3h-1c-.1327975 0-.2596084-.0525807-.3535156-.1464844-.0939075-.0939095-.1464844-.2207143-.1464844-.3535156v-2c0-.1328013.0525769-.2596061.1464844-.3535156.0939072-.0939037.2207181-.1464844.3535156-.1464844z"
                              />
                              <path
                                id="path667"
                                d="m11.5 5c-.265032 0-.519607.1056047-.707031.2929687-.187248.1873674-.292969.4419489-.292969.7070313v3c0 .2650824.105721.5196639.292969.7070313.187424.187364.441999.2929687.707031.2929687h1c.397632 0 .779364-.158225 1.060547-.4394531.281079-.2811394.439453-.6628547.439453-1.0605469v-2c0-.3976922-.158374-.7794075-.439453-1.0605469-.281183-.2812281-.662915-.4394531-1.060547-.4394531zm0 1h1c.132768 0 .259699.052653.353516.1464844.09392.0939403.146484.2207684.146484.3535156v2c0 .1327472-.052564.2595753-.146484.3535156-.093817.0938315-.220748.1464844-.353516.1464844h-1z"
                              />
                              <path
                                id="path666"
                                d="m11 7.5a.50001502.50001502 0 0 0 -.5.5v2.25c0 .39798-.157984.779077-.439453 1.060547-.2814791.281479-.6625297.439453-1.060547.439453a.50001502.50001502 0 0 0 -.5.5.50001502.50001502 0 0 0 .5.5c.6628416 0 1.298858-.263702 1.767578-.732422.46873-.46873.732422-1.104759.732422-1.767578v-2.25a.50001502.50001502 0 0 0 -.5-.5z"
                              />
                              <path
                                id="path665"
                                d="m6.25 10.5c-.4639439 0-.9102311.183697-1.2382813.511719-.3280996.328071-.5117187.774349-.5117187 1.238281s.1836191.91021.5117187 1.238281c.3280502.328022.7743374.511719 1.2382813.511719h1.5c.4639439 0 .9102311-.183697 1.2382813-.511719.3280996-.328071.5117187-.774349.5117187-1.238281s-.1836191-.91021-.5117187-1.238281c-.3280502-.328022-.7743374-.511719-1.2382813-.511719zm0 1h1.5c.1990955 0 .3904607.07797.53125.21875.1407399.140728.21875.332183.21875.53125s-.07801.390522-.21875.53125c-.1407893.140777-.3321545.21875-.53125.21875h-1.5c-.1990955 0-.3904607-.077973-.53125-.21875-.1407399-.140728-.21875-.332183-.21875-.53125s.0780101-.390522.21875-.53125c.1407893-.140777.3321545-.21875.53125-.21875z"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </i>
                    <span>Help & Support</span>
                    <i className="ml-auto" style={{ lineHeight: "0" }}>
                      <svg
                        height="16"
                        viewBox="0 0 24 24"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m22.707 11.293-7-7a1 1 0 0 0 -1.414 1.414l5.293 5.293h-17.586a1 1 0 0 0 0 2h17.586l-5.293 5.293a1 1 0 1 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414z" />
                      </svg>
                    </i>
                  </Button>
                  <Button className="flex items-center gap-2 bg-[#F1F9FE] text-[#222] border-[#F1F9FE] py-4 shadow-none">
                    <i style={{ lineHeight: "0" }}>
                      <svg
                        height="18"
                        viewBox="0 0 100 100"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m50 99a44.33 44.33 0 0 1 -25.54-80.55 4 4 0 1 1 4.62 6.55 36.32 36.32 0 1 0 41.84 0 4 4 0 1 1 4.62-6.53 44.33 44.33 0 0 1 -25.54 80.53zm0-40.32a4 4 0 0 1 -4-4v-49.68a4 4 0 0 1 8 0v49.68a4 4 0 0 1 -4 4z" />
                      </svg>
                    </i>
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Sidebar
        header={EditProfileHeader}
        visible={editprofilevisible}
        position="right"
        onHide={() => setEditProfileVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div className="flex flex-col h-full text-center">
          <div className="flex flex-col gap-3 mb-3">
            <div className="">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-user"> </InputIcon>
                <InputText
                  v-model="value1"
                  className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none"
                  placeholder="First Name"
                />
              </IconField>
            </div>
            <div className="">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-user"> </InputIcon>
                <InputText
                  v-model="value1"
                  className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none"
                  placeholder="Last Name"
                />
              </IconField>
            </div>
            <div className="mobileicontext bg-[#F3F3F5] border-[#F3F3F5] border-solid rounded-md">
              <InputIcon className="pi pi-mobile"> </InputIcon>
              <InputNumber
                v-model="value1"
                className="w-full shadow-none"
                placeholder="Mobile Number"
              />
            </div>
            <div className="">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-envelope"> </InputIcon>
                <InputText
                  v-model="value1"
                  className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none"
                  placeholder="Email Address"
                />
              </IconField>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="icocalender">
                <Calendar
                  iconPos="left"
                  showIcon
                  value={date}
                  onChange={(e) => setDate(e.value)}
                  className="rounded-md w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none"
                  placeholder="Date of Birth"
                />
              </div>
              <div className="">
                <Dropdown
                  value={selectedGander}
                  onChange={(e) => setSelectedGander(e.value)}
                  options={ganders}
                  optionLabel="name"
                  placeholder="Select Gander"
                  className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none text-left"
                />
              </div>
            </div>
            <div className="">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-map-marker"> </InputIcon>
                <InputText
                  v-model="value1"
                  className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none"
                  placeholder="Address"
                />
              </IconField>
            </div>
            <div className="">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-map"> </InputIcon>
                <InputText
                  v-model="value1"
                  className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none"
                  placeholder="City"
                />
              </IconField>
            </div>
            <div className="">
              <Dropdown
                value={selectedState}
                onChange={(e) => setSelectedState(e.value)}
                options={states}
                optionLabel="name"
                placeholder="Select State"
                className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none text-left"
              />
            </div>
            <div className="mobileicontext bg-[#F3F3F5] border-[#F3F3F5] border-solid rounded-md">
              <InputIcon className="pi pi-thumbtack"> </InputIcon>
              <InputNumber
                v-model="value1"
                className="w-full shadow-none"
                placeholder="Pincode"
              />
            </div>
            <div className="">
              <IconField iconPosition="left">
                <InputIcon className="pi pi-map"> </InputIcon>
                <InputText
                  v-model="value1"
                  className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none"
                  placeholder="Landmark"
                />
              </IconField>
            </div>
          </div>
          <div className="mt-auto">
            <Link href="/account-created">
              <Button
                className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full"
                label="Save"
              />
            </Link>
          </div>
        </div>
      </Sidebar>
      <Sidebar
        header={LanguageHeader}
        visible={languagevisible}
        position="right"
        onHide={() => setLanguageVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div className="flex flex-col h-full text-center">
          <div className="flex flex-col gap-3">
            <div className="">
              <Dropdown
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.value)}
                options={languages}
                optionLabel="name"
                placeholder="Select Language"
                className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none text-left"
              />
            </div>
          </div>
          <div className="mt-auto">
            <Button
              className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full"
              label="Save"
            />
          </div>
        </div>
      </Sidebar>
      <Sidebar
        header={AboutHeader}
        visible={aboutvisible}
        position="right"
        onHide={() => setAboutVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div className="flex flex-col h-full text-center">
          <div className="flex flex-col gap-3">
            <div className="">
              <InputTextarea
                rows={6}
                v-model="value1"
                className="w-full bg-[#F3F3F5] border-[#F3F3F5] shadow-none"
                placeholder="Type About Details"
              />
            </div>
          </div>
          <div className="mt-auto">
            <Button
              className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] w-full"
              label="Save"
            />
          </div>
        </div>
      </Sidebar>
      <Sidebar
        header={HelpHeader}
        visible={helpvisible}
        position="right"
        onHide={() => setHelpVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div className="flex flex-col h-full">
          <div className="text-lg mb-2">demomail@mail.com</div>
          <div className="">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the  standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.{" "}
          </div>
        </div>
      </Sidebar>
    </>
  );
}
