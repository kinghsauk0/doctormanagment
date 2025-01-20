"use client";
import React, { useEffect, useRef, useState } from "react";
import "../clinic.scss";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { Image } from "primereact/image";
import LeftSideBar from "../components/LeftSideBar/LeftSideBar";
import Link from "next/link";
import { Calendar } from "primereact/calendar";
import { Chart } from "primereact/chart";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import * as d3 from 'd3';
import AddAppointment from "../components/AddAppointment/AddAppointment";
export default function Page() {
    const isMobile = useMobile();
    const[sidebarVisible, setSidebarVisible]=useState(false);
    const [date, setDate] = useState(new Date());

    const[appointmentVisible, setAppointmentVisible]=useState(false);

      const staticData = [
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
        { name: 'Sumit roy', contact: '000050065', number: '25', date: '20/10/23', time:'9:30AM - 10:30AM', condition:'Cold Fever', fees:'₹2000', payment:'Online' },
    ];
    
    const editButtonBody = () => {
        return (
            <>
                <div className="flex items-center justify-end gap-4">
                    <Button className="p-0 border-0 shadow-none bg-transparent text-[#222] w-auto" icon="pi pi-pen-to-square" />
                    <Button className="p-0 border-0 shadow-none bg-transparent text-[#f00] w-auto" icon="pi pi-trash" />
                </div>
            </>
        );
    };

    const op = useRef(null);

    useEffect(() => {
        d3.select('.piechart').selectAll('*').remove();
        const pieData = [
          { name: 'Cardiology', value: 36, color: '#4E22FD' },
          { name: 'General', value: 38, color: '#00B7FE' },
          { name: 'Neurology', value: 26, color: '#D0D2DA' },
        ];
        bakeDonut(pieData);
        function bakeDonut(data) {
          let activeSegment: any;
          const sortedData = data.sort((a, b) => b['value'] - a['value']),
            viewWidth = 400,
            viewHeight = 150,
            svgWidth = viewHeight,
            svgHeight = viewHeight,
            thickness = 15,
            colorArray = sortedData.map((k) => k.color),
            el = d3.select('.piechart'),
            radius = Math.min(svgWidth, svgHeight) / 2,
            color = d3.scaleOrdinal().range(colorArray);
          const max = d3.max(sortedData, (d) => d.value);
          const svg = el
            .append('svg')
            .attr('viewBox', `0 0 ${viewWidth + thickness} ${viewHeight + thickness}`)
            .attr('class', 'pie')
            .attr('width', viewWidth)
            .attr('height', svgHeight);
          const g = svg
            .append('g')
            .attr('transform', `translate( ${svgWidth / 2 + thickness / 2}, ${svgHeight / 2 + thickness / 2})`);
          const arc = d3.arc().innerRadius(radius - thickness).outerRadius(radius);
          const arcHover = d3.arc().innerRadius(radius - (thickness + 5)).outerRadius(radius + 8);
          const pie = d3.pie().value(function (pieData) {
            return pieData.value;
          });
          const path = g
            .selectAll('path')
            .attr('class', 'data-path')
            .data(pie(sortedData))
            .enter()
            .append('g')
            .attr('class', 'data-group')
            .each(function (pathData) {
              const group = d3.select(this);
              const percentage = ((pathData.endAngle - pathData.startAngle) / (2 * Math.PI)) * 100;
              group
                .append('text')
                .text(`${percentage.toFixed(1)}%`)
                .attr('class', 'data-text data-text__value')
                .attr('text-anchor', 'middle')
                .attr('dy', '1.5rem');
              group
                .append('text')
                .text(`${pathData.data.name}`)
                .attr('class', 'data-text data-text__name')
                .attr('text-anchor', 'middle')
                .attr('dy', '3rem');
              if (pathData.value === max) {
                d3.select(this).select('.data-text__value').classed('data-text--show', true);
                d3.select(this).select('.data-text__name').classed('data-text--show', true);
              }
            })
            .append('path')
            .attr('d', arc)
            .attr('fill', (fillData) => color(fillData.data.name))
            .attr('class', 'data-path')
            .on('mouseover', function () {
              const _thisPath = this,
                parentNode = _thisPath.parentNode;
              if (_thisPath !== activeSegment) {
                activeSegment = _thisPath;
                d3.selectAll('.data-text').classed('data-text--show', false);
                d3.selectAll('.data-path').transition().duration(250).attr('d', arc);
                d3.select(_thisPath).transition().duration(250).attr('d', arcHover);
                d3.select(parentNode).select('.data-text__value').classed('data-text--show', true);
                d3.select(parentNode).select('.data-text__name').classed('data-text--show', true);
              }
            })
            .each(function (v) {
              if (v.value === max) {
                d3.select(this).attr('d', arcHover);
                activeSegment = this;
              }
            });
          const legendRectSize = 15;
          const legendSpacing = 10;
          const legend = svg
            .selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function (_, i) {
              const itemHeight = legendRectSize + legendSpacing;
              const offset = legendRectSize * color.domain().length;
              const horz = svgWidth + 80;
              const vert = i * itemHeight + legendRectSize + (svgHeight - offset) / 2;
              return `translate(${horz}, ${vert})`;
            });
          legend.append('circle').attr('r', legendRectSize / 2).style('fill', color);
          legend.append('text').attr('x', legendRectSize + legendSpacing).attr('y', legendRectSize - legendSpacing).attr('class', 'legend-text').text((legendData) => legendData);
        }
      }, []);


      




      const [chartData, setChartData] = useState({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: 'Visits',
          data: [20, 40, 60, 10, 90, 24, 80],
          backgroundColor: getBackgroundColorArray([20, 40, 60, 10, 90, 24, 80])
        }]
      });
    
      const weeklyData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
          label: 'Visits',
          data: [20, 40, 60, 10, 90, 24, 80],
          backgroundColor: getBackgroundColorArray([20, 40, 60, 10, 90, 24, 80])
        }]
      };
    
      const monthlyData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [{
          label: 'Visits',
          data: [80, 45, 60, 30],
          backgroundColor: getBackgroundColorArray([80, 45, 60, 30])
        }]
      };
    
      function getBackgroundColorArray(dataArray) {
        return dataArray.map(value => value >= 50 ? "rgba(255, 0, 0, 1)" : "#FBB7B7");
      }
    
      const updateChart = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "weekly") {
          setChartData(weeklyData);
        } else if (selectedValue === "monthly") {
          setChartData(monthlyData);
        }
      };


    return <>
        {isMobile ? <></> : <></>}

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5">
            <div>
              <LeftSideBar visible={sidebarVisible} setVisible={setSidebarVisible} />
            </div>
            <div className="col-span-3 lg:col-span-4">
                <section className="pageheader flex items-center py-4 lg:px-10 md:px-6 px-4 bg-white gap-4">
                    <Button icon="pi pi-bars" className="md:hidden bg-transparent p-0 shadow-none border-0 w-auto text-[#222]" onClick={()=> setSidebarVisible(true)}/>
                    <div className="text-[#15192C] font-semibold md:text-2xl text-xl">
                        Dashboard
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
                </section>
                <section className="py-4 lg:px-10 md:px-6 px-4">
                    <div className="flex justify-between md:justify-end items-center md:gap-4 gap-3">
                        <div className="headercalender">
                            <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon iconPos="left" />
                        </div>
                        <Button icon="pi pi-plus" label="Add Appointment" className="bg-[#0D52AF] text-[#fff] text-sm border-[#0D52AF] py-3 h-[40px]" onClick={()=> setAppointmentVisible(true)}  />
                    </div>
                </section>
                <div style={{height:'calc(100vh - 145px)', overflow:'auto'}}>
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 lg:px-10 md:px-6 px-4">
                        <div className="col-span-4 flex flex-col gap-4">
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                <div className="p-4 bg-white rounded-md">
                                    <div className="mb-4 font-semibold"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#4BAC3B] pr-2">Activity Overview</span></div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="border border-solid border-[#ccc] rounded-md p-2">
                                            <div className="flex gap-3 items-center">
                                                <div className="h-[45px] w-[45px] rounded-md flex justify-center items-center bg-[#1E61C0]">
                                                    <svg width="24" height="24" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M1.83326 8.27572H18.1666V5.35903C18.1666 5.26927 18.1292 5.18699 18.0544 5.11219C17.9796 5.03741 17.8973 5.00001 17.8076 5.00001H2.19227C2.10252 5.00001 2.02024 5.03741 1.94544 5.11219C1.87065 5.18699 1.83326 5.26927 1.83326 5.35903V8.27572ZM2.19227 23.0833C1.60295 23.0833 1.10412 22.8792 0.69579 22.4708C0.287457 22.0625 0.0832901 21.5637 0.0832901 20.9743V5.35903C0.0832901 4.7697 0.287457 4.27087 0.69579 3.86254C1.10412 3.45421 1.60295 3.25004 2.19227 3.25004H3.80767V0.782104H5.6025V3.25004H14.4422V0.782104H16.1922V3.25004H17.8076C18.3969 3.25004 18.8957 3.45421 19.3041 3.86254C19.7124 4.27087 19.9166 4.7697 19.9166 5.35903V11.733C19.6369 11.6104 19.3512 11.5113 19.0595 11.4358C18.7679 11.3602 18.4702 11.3008 18.1666 11.2574V10.0257H1.83326V20.9743C1.83326 21.0641 1.87065 21.1464 1.94544 21.2212C2.02024 21.296 2.10252 21.3333 2.19227 21.3333H9.77785C9.87657 21.6564 9.99585 21.9619 10.1357 22.2498C10.2755 22.5378 10.4345 22.8156 10.6125 23.0833H2.19227ZM17.2243 24.25C15.7675 24.25 14.5283 23.7392 13.5067 22.7176C12.4851 21.696 11.9743 20.4568 11.9743 19C11.9743 17.5432 12.4851 16.304 13.5067 15.2824C14.5283 14.2608 15.7675 13.75 17.2243 13.75C18.6811 13.75 19.9203 14.2608 20.9419 15.2824C21.9635 16.304 22.4742 17.5432 22.4742 19C22.4742 20.4568 21.9635 21.696 20.9419 22.7176C19.9203 23.7392 18.6811 24.25 17.2243 24.25ZM19.1672 21.6699L19.8942 20.9429L17.7403 18.7891V15.5673H16.7083V19.2109L19.1672 21.6699Z" fill="#fff"/>
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-xl font-bold text-[#000]">200</div>
                                                    <div className="text-[#848484] text-xs">Appointments</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-solid border-[#ccc] rounded-md p-2">
                                            <div className="flex gap-3 items-center">
                                                <div className="h-[45px] w-[45px] rounded-md flex justify-center items-center bg-[#4BAC3B]">
                                                    <svg enableBackground="new 0 0 510 510" height="24" viewBox="0 0 510 510" width="24" xmlns="http://www.w3.org/2000/svg"><g><path fill="#fff" d="m341.459 165h-8.541c7.68-13.246 12.082-28.618 12.082-45v-30c0-49.626-40.374-90-90-90s-90 40.374-90 90v30c0 16.382 4.402 31.754 12.082 45h-8.541c-14.446 0-28.912 3.415-41.833 9.875-31.895 15.947-51.708 48.006-51.708 83.666v176.459c0 24.814 20.186 45 45 45h15v30h240v-90c33.084 0 60-26.916 60-60v-101.459c0-52.569-42.622-93.541-93.541-93.541zm3.541 30.105v194.895h-57.867l26.001-195c29.343.036 28.603-.08 31.866.105zm-150-105.105c0-33.084 26.916-60 60-60s60 26.916 60 60v30c0 33.084-26.916 60-60 60s-60-26.916-60-60zm150 390h-180c0-8.081 0-217.671 0-225h-30v195h-15c-8.272 0-15-6.728-15-15v-176.459c0-35.71 28.952-63.541 63.541-63.541h36.769c23.039 15.315 51.087 18.731 76.086 11.048l-16.529 123.952h-24.867c-24.814 0-45 20.186-45 45s20.186 45 45 45h105zm-88.133-90h-16.867c-8.272 0-15-6.728-15-15s6.728-15 15-15h20.867zm148.133-30c0 16.542-13.458 30-30 30v-185.423c18.639 11.536 30 31.714 30 53.964z"/></g></svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-xl font-bold text-[#000]">125</div>
                                                    <div className="text-[#848484] text-xs">New Patients</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-solid border-[#ccc] rounded-md p-2">
                                            <div className="flex gap-3 items-center">
                                                <div className="h-[45px] w-[45px] rounded-md flex justify-center items-center bg-[#BE4A8C]">
                                                    <svg width="20" height="20" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512">
                                                        <path fill="#fff" d="M496,319.996c-8.832,0-16,7.168-16,16v112H32v-192h176c8.832,0,16-7.168,16-16c0-8.832-7.168-16-16-16H32v-64h176
                                                            c8.832,0,16-7.168,16-16c0-8.832-7.168-16-16-16H32c-17.664,0-32,14.336-32,32v288c0,17.664,14.336,32,32,32h448
                                                            c17.664,0,32-14.336,32-32v-112C512,327.164,504.832,319.996,496,319.996z"/>
                                                        <path fill="#fff" d="M144,319.996H80c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h64c8.832,0,16-7.168,16-16
                                                            C160,327.164,152.832,319.996,144,319.996z"/>
                                                        <path fill="#fff" d="M502.304,81.276l-112-48c-4.064-1.696-8.576-1.696-12.64,0l-112,48c-5.856,2.528-9.664,8.32-9.664,14.72v64
                                                            c0,88.032,32.544,139.488,120.032,189.888c2.464,1.408,5.216,2.112,7.968,2.112s5.504-0.704,7.968-2.112
                                                            C479.456,299.612,512,248.156,512,159.996v-64C512,89.596,508.192,83.804,502.304,81.276z M480,159.996
                                                            c0,73.888-24.448,114.56-96,157.44c-71.552-42.976-96-83.648-96-157.44v-53.44l96-41.152l96,41.152V159.996z"/>
                                                        <path fill="#fff" d="M442.016,131.484c-6.88-5.44-16.928-4.384-22.496,2.496l-50.304,62.912l-19.904-29.76
                                                            c-4.96-7.36-14.912-9.312-22.176-4.448c-7.328,4.896-9.344,14.848-4.448,22.176l32,48c2.848,4.256,7.52,6.88,12.64,7.136
                                                            c0.224,0,0.48,0,0.672,0c4.832,0,9.44-2.176,12.512-6.016l64-80C450.016,147.068,448.928,137.02,442.016,131.484z"/>
                                                    </svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-xl font-bold text-[#000]">₹2000</div>
                                                    <div className="text-[#848484] text-xs">Earning Total</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="border border-solid border-[#ccc] rounded-md p-2">
                                            <div className="flex gap-3 items-center">
                                                <div className="h-[45px] w-[45px] rounded-md flex justify-center items-center bg-[#FF5437]">
                                                    <svg enableBackground="new 0 0 510 510" height="24" viewBox="0 0 510 510" width="24" xmlns="http://www.w3.org/2000/svg"><g><path fill="#fff" d="m341.459 165h-8.541c7.68-13.246 12.082-28.618 12.082-45v-30c0-49.626-40.374-90-90-90s-90 40.374-90 90v30c0 16.382 4.402 31.754 12.082 45h-8.541c-14.446 0-28.912 3.415-41.833 9.875-31.895 15.947-51.708 48.006-51.708 83.666v176.459c0 24.814 20.186 45 45 45h15v30h240v-90c33.084 0 60-26.916 60-60v-101.459c0-52.569-42.622-93.541-93.541-93.541zm3.541 30.105v194.895h-57.867l26.001-195c29.343.036 28.603-.08 31.866.105zm-150-105.105c0-33.084 26.916-60 60-60s60 26.916 60 60v30c0 33.084-26.916 60-60 60s-60-26.916-60-60zm150 390h-180c0-8.081 0-217.671 0-225h-30v195h-15c-8.272 0-15-6.728-15-15v-176.459c0-35.71 28.952-63.541 63.541-63.541h36.769c23.039 15.315 51.087 18.731 76.086 11.048l-16.529 123.952h-24.867c-24.814 0-45 20.186-45 45s20.186 45 45 45h105zm-88.133-90h-16.867c-8.272 0-15-6.728-15-15s6.728-15 15-15h20.867zm148.133-30c0 16.542-13.458 30-30 30v-185.423c18.639 11.536 30 31.714 30 53.964z"/></g></svg>
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="text-xl font-bold text-[#000]">135</div>
                                                    <div className="text-[#848484] text-xs">Visit</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-md">
                                    <div className="mb-4 font-semibold"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#4BAC3B] pr-2">Patients Visit By Department</span></div>
                                    <div className="piechart"></div>
                                </div>
                            </div>
                            <div className="p-4 bg-white rounded-md">
                                <div className="mb-4 font-semibold"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#4BAC3B] pr-2">Appointment Activity</span></div>
                                <DataTable paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]}  value={staticData} stripedRows className="text-sm" tableStyle={{ minWidth: '50rem' }}>
                                    <Column field="name" header="Name" className="text-nowrap"></Column>
                                    <Column field="contact" header="Contact" className="text-nowrap"></Column>
                                    <Column field="number" header="Number" className="text-nowrap"></Column>
                                    <Column field="date" header="Date" className="text-nowrap"></Column>
                                    <Column field="time" header="Time" className="text-nowrap"></Column>
                                    <Column field="condition" header="Condition" className="text-nowrap"></Column>
                                    <Column field="fees" header="Fees" className="text-nowrap"></Column>
                                    <Column field="payment" header="Payment" className="text-nowrap"></Column>
                                    <Column body={editButtonBody} header=""></Column>
                                </DataTable>
                            </div>
                        </div>
                        <div className="md:col-span-2 col-span-4">
                            <div className="flex flex-col gap-4">
                                <div className="p-4 bg-[#2280DE] rounded-md">
                                    <div className="mb-4 font-semibold text-[#fff]"><span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#fff] pr-2">Doctor List</span></div>
                                    <div className="flex justify-between items-center text-10px text-[#fff] uppercase mb-3">
                                        <span>Doctor name</span>
                                        <span>Status</span>
                                    </div>
                                    <div className="flex flex-col dashdoclist">
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#f00] text-10px font-bold">Absent</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#6ACB6A] text-10px font-bold">Available</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#6ACB6A] text-10px font-bold">Available</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#f00] text-10px font-bold">Absent</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#6ACB6A] text-10px font-bold">Available</div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-t-0 border-l-0 border-r-0 border-solid border-[#62affc]">
                                            <div className="flex items-center gap-3">
                                                <div className="">
                                                    <div className="h-[40px] w-[40px] rounded-md overflow-hidden">
                                                        <Image
                                                            src="/images/doc1.webp"
                                                            alt="Image"
                                                            className="w-full h-auto"
                                                            width="40"
                                                            height="40"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-white text-sm">Thomas D</div>
                                            </div>
                                            <div className="rounded-full bg-white px-3 py-1 text-[#f00] text-10px font-bold">Absent</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-md">
                                    <div className="mb-4 font-semibold flex justify-between items-center">
                                        <span className="border-r-4 border-solid border-l-0 border-b-0 border-t-0 border-[#4BAC3B] pr-2">Patient Visits</span>
                                        <select id="viewType" onChange={updateChart}>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                    <Chart type="bar" data={chartData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <AddAppointment visible={appointmentVisible} setVisible={setAppointmentVisible} />
    </>
}