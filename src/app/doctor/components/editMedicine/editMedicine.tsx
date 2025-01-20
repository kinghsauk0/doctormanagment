"use client";

import { DropdownObject } from '@/app/types';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown'
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Sidebar } from 'primereact/sidebar'
import React, { useState } from 'react'
import { MedicineData } from '@/app/types';


type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>,
    editData: MedicineData
}
export default function EditMedicine({ visible, setVisible , editData}: Props) {
    console.log(editData)
    const [medicineNote, setMedicineNote] = useState<string>(editData.medicineNote)
    const [selectedDrugType, setSelectedDrugType] = useState<DropdownObject>({name: editData.dosageType});
  const drugtypes = [
    { name: "Tablet" },
    { name: "Syrup " },
    { name: "Capsule" },
    { name: "Injection" },
  ];
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedBrand, setSelectedBrand] = useState<DropdownObject>({name: editData.brand});
  const brands = [
    { name: "Tylenol" },
    { name: "Advil" },
    { name: "Aspirin" },
    { name: "Lipitor" },
    { name: "Metformin" },
    { name: "Amoxicillin" },
    { name: "Crestor" },
    { name: "Zyrtec" },
    { name: "Nexium" },
    { name: "Ventolin" },
  ];

  const [selectedDose, setSelectedDose] = useState<DropdownObject>({name: editData.dose});
  const doses = [
    { name: "50mg" },
    { name: "100mg " },
    { name: "250mg" },
    { name: "500mg" },
    { name: "600mg" },
  ];

  const [selectedRegimen, setSelectedRegimen] = useState<DropdownObject>({
    name: editData.regimen
  });
  const regimens = [
    { name: "1-0-0" },
    { name: "1-0-1 " },
    { name: "0-0-1" },
    { name: "0-1-0" },
    { name: "0-1-1" },
    { name: "1-1-0" },
    { name: "1-1-1" },
  ];

  const [selectedConsume, setSelectedConsume] = useState<DropdownObject>({name: editData.consume});
  const consumes = [{ name: "After meal" }, { name: "Before meal" }];

  const [selectedDuration, setSelectedDuration] = useState<DropdownObject>({name: editData.duration});
  const durations = [
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "7" },
    { name: "8" },
    { name: "9" },
    { name: "10" },
    { name: "11" },
    { name: "12" },
  ];

  const [selectedPeriod, setSelectedPeriod] = useState<DropdownObject>({name: editData.period});
  const periods = [
    { name: "Days" },
    { name: "Week" },
    { name: "Month" },
    { name: "Year" },
  ];

  const [startmedication, setStartmedication] = useState(editData.startMedication)
  return (
    <Sidebar
    header="Edit Medicine"
    visible={visible}
    position="right"
    onHide={() => setVisible(false)}
    className="w-full md:w-[500px]"
  >
    <div className="flex flex-col gap-3">
      <div>
        <div className="text-black mb-1 text-sm">Dosage type</div>
        <Dropdown value={selectedDrugType} onChange={(e) => setSelectedDrugType(e.value)}   options={drugtypes} optionLabel="name" 
            filter placeholder="Search Dosage" className="w-full text-sm" />
            {errors.dosageType && <p className="text-red-600 text-xs mt-1">{errors.dosageType}</p>}
      </div>
      <div>
        <div className="text-black mb-1 text-sm">Brand</div>
        <Dropdown value={selectedBrand} onChange={(e) => setSelectedBrand(e.value)}   options={brands} optionLabel="name" 
            filter placeholder="Search Brand"  className="w-full text-sm" />
            {errors.brand && <p className="text-red-600 text-xs mt-1">{errors.brand}</p>}
      </div>
      <div>
        <div className="text-black mb-1 text-sm">Choose dose</div>
        <Dropdown value={selectedDose}  onChange={(e) => setSelectedDose(e.value)} options={doses} optionLabel="name" 
            filter placeholder="Search Brand"  className="w-full text-sm" />
             {errors.dose && <p className="text-red-600 text-xs mt-1">{errors.dose}</p>}
             
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-black mb-1 text-sm">Dose Regimen</div>
          <Dropdown
            value={selectedRegimen}
            onChange={(e) => setSelectedRegimen(e.value)}
            options={regimens}
            optionLabel="name"
            placeholder="Select regimen"
            className="w-full"
          />
           {errors.regimen && <p className="text-red-600 text-xs mt-1">{errors.regimen}</p>}
        </div>
        <div>
          <div className="text-black mb-1 text-sm">Dose Consume</div>
          <Dropdown
            value={selectedConsume}
            onChange={(e) => setSelectedConsume(e.value)}
            options={consumes}
            optionLabel="name"
            placeholder="Select Consume"
            className="w-full"
          />
           {errors.consume && <p className="text-red-600 text-xs mt-1">{errors.consume}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-black mb-1 text-sm">Duration</div>
          <Dropdown
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(e.value)}
            options={durations}
            optionLabel="name"
            placeholder="Select Duration"
            className="w-full"
          />
           {errors.consume && <p className="text-red-600 text-xs mt-1">{errors.consume}</p>}
        </div>
        <div>
          <div className="text-black mb-1 text-sm">Period</div>
          <Dropdown
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.value)}
            options={periods}
            optionLabel="name"
            placeholder="Select Period"
            className="w-full"
          />
           {errors.duration && <p className="text-red-600 text-xs mt-1">{errors.duration}</p>}
        </div>
      </div>
      <div className="bg-[#F2F4F7] p-3 rounded-md">
        <div className="text-black mb-2">When to start medication</div>
        <div className="flex flex-wrap gap-3 mb-3">
          <div className="flex align-items-center rounded-full bg-[#ffffff] px-4 py-2 text-sm">
            <RadioButton
              inputId="Today"
              name="startm"
              value="Today"
              onChange={(e) => setStartmedication(e.value)}
              checked={startmedication === "Today"}
            />
            
            <label htmlFor="Today" className="ml-2">
              Today
            </label>
          </div>
          <div className="flex align-items-center rounded-full bg-[#ffffff] px-4 py-2 text-sm">
            <RadioButton
              inputId="Tomorrow"
              name="startm"
              value="Tomorrow"
              onChange={(e) => setStartmedication(e.value)}
              checked={startmedication === "Tomorrow"}
            />
            <label htmlFor="Tomorrow" className="ml-2">
              Tomorrow
            </label>
          </div>
          <div className="flex align-items-center rounded-full bg-[#ffffff] px-4 py-2 text-sm">
            <RadioButton
              inputId="After3days"
              name="startm"
              value="After3days"
              onChange={(e) => setStartmedication(e.value)}
              checked={startmedication === "After3days"}
            />
            <label htmlFor="After3days" className="ml-2">
              After 3 days
            </label>
          </div>
          <div className="flex align-items-center rounded-full bg-[#ffffff] px-4 py-2 text-sm">
            <RadioButton
              inputId="After4days"
              name="startm"
              value="After4days"
              onChange={(e) => setStartmedication(e.value)}
              checked={startmedication === "After4days"}
            />
            <label htmlFor="After4days" className="ml-2">
              After 4 days
            </label>
          </div>
          <div className="flex align-items-center rounded-full bg-[#ffffff] px-4 py-2 text-sm">
            <RadioButton
              inputId="After1week"
              name="startm"
              value="After1week"
              onChange={(e) => setStartmedication(e.value)}
              checked={startmedication === "After1week"}
            />
            <label htmlFor="After1week" className="ml-2">
              After 1 week
            </label>
          </div>
          {errors.startMedication && <p className="text-red-600 text-xs mt-1">{errors.startMedication}</p>}
        </div>
        <div className="">
          <div className="text-black mb-2">Medication Notes</div>
          <InputTextarea value={medicineNote} onChange={(e) => setMedicineNote(e.target.value)} className="w-full" rows={5} cols={30} />
          {errors.medicineNote && <p className="text-red-600 text-xs mt-1">{errors.medicineNote}</p>}
        </div>
      </div>
    </div>
    <div className="flex justify-end mt-4">
      <Button
      
        className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none px-6"
        size="small"
        label="Done"
      />
    </div>
  </Sidebar>
  )
}


