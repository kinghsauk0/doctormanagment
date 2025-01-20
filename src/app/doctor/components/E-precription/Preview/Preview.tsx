"use client";
import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import useMobile from "@/app/hooks/isMobileHook";
import { SpeedDial } from "primereact/speeddial";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { Calendar } from "primereact/calendar";
import { Checkbox, CheckboxChangeEvent } from "primereact/checkbox";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { DropdownObject, TableRow } from "@/app/types";
import { set, ZodError } from "zod";
import { useApp } from "@/app/context/AppProvider";
import { axiosService } from "@/app/services/axios.service";
import { Nullable } from "primereact/ts-helpers";
import {
  DoctorResponse,
  MedicineData,
  MedicineDataRes,
  PrescriptionResponse,
  FollowUpType,
} from "@/app/types";
import {
  medicationSchema,
  addMedicationSchema,
  addLabTestSchema,
  addAdviceSchema,
  labTestSchema,
  adviceSchema,
  noteSchema,
  FollowUpSchema,
} from "@/app/utils/schema/ZodSchema";
import EditMedicine from "../../editMedicine/editMedicine";

type Props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

export default function Preview({ visible, setVisible, id }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isMobile = useMobile();
  const { app } = useApp();

  const [resData, setResData] = useState<DoctorResponse | null>(null);
  const [medicineNote, setMedicineNote] = useState<string>("");
  const [medicineData, setMedicineData] = useState<MedicineData[]>([]);
  const [editMedicineVisible, setEditMedicineVisible] =
    useState<boolean>(false);
  const [editData, setEditData] = useState(null);
  const [prescription, setPrescription] = useState<string | null>(null);
  const [medicineDataRes, setMedicineDataRes] = useState<MedicineDataRes[]>([]);
  const [rxDate, setRxDate] = useState(null);
  const [labTest, setLabTest] = useState<string | null>(null);
  const [labTestList, setLabTestList] = useState<string[]>([]);
  const [selectedLabTest, setSelectedLabTest] = useState<string[]>([]);
  const [selectedFollowUpList, setSelectedFollowUpList] =
    useState<FollowUpType | null>(null);
  const [advice, setAdvice] = useState<string | null>(null);
  const [adviceList, setAdviceList] = useState<string[]>([]);
  const [selectedAdviceTest, setSelectedAdviceTest] = useState<string[]>([]);
  const [note, setNote] = useState<string>("");
  const [prescriptionRes, setPrescriptionRes] =
    useState<PrescriptionResponse | null>(null);
  const [date, setDate] = useState<Nullable<Date>>(null);

  const PreviewHeader = (
    <>
      <div className="flex align-items-center gap-2 w-full">
        <div className="flex gap-4 items-center">
          <Button
            icon="pi pi-arrow-left"
            className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
            onClick={() => setVisible(false)}
          />
          <div>
            <div className="font-semibold text-base text-[#222]">Preview</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 ml-auto mr-1">
        <div>
          <Button
            className="p-sidebar-icon p-0 border-0 shadow-none text-[#222]"
            icon="pi pi-share-alt"
            size="small"
          />
        </div>
        <div>
          <Button
            className="p-sidebar-icon p-0 border-0 shadow-none text-[#222]"
            icon="pi pi-print"
            size="small"
          />
        </div>
        <div>
          <Button
            className="p-sidebar-icon p-0 border-0 shadow-none text-[#222]"
            icon="pi pi-ellipsis-v"
            size="small"
          />
        </div>
      </div>
    </>
  );

  const [followvisible, setFollowVisible] = useState(false);
  const FollowUpdateHeader = (
    <>
      <div className="flex align-items-center gap-2 w-full">
        <div className="flex gap-4 items-center">
          <Button
            icon="pi pi-arrow-left"
            className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
            onClick={() => setFollowVisible(false)}
          />
          <div>
            <div className="font-semibold text-base text-[#222]">
              Follow-up date
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const [advicevisible, setAdviceVisible] = useState(false);
  const [addadvicevisible, setAddAdviceVisible] = useState(false);
  const AddAdviceHeader = (
    <>
      <div className="flex align-items-center gap-2 w-full">
        <div className="flex gap-4 items-center">
          <Button
            icon="pi pi-arrow-left"
            className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
            onClick={() => setAdviceVisible(false)}
          />
          <div>
            <div className="font-semibold text-base text-[#222]">Advice</div>
          </div>
        </div>
      </div>
    </>
  );

  const [labtestvisible, setLabTestVisible] = useState(false);
  const [addlabtestvisible, setAddLabTestVisible] = useState(false);
  const AddLabTestHeader = (
    <>
      <div className="flex align-items-center gap-2 w-full">
        <div className="flex gap-4 items-center">
          <Button
            icon="pi pi-arrow-left"
            className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
            onClick={() => setLabTestVisible(false)}
          />
          <div>
            <div className="font-semibold text-base text-[#222]">Lab test</div>
          </div>
        </div>
      </div>
    </>
  );

  const [medicinevisible, setMedicineVisible] = useState(false);
  const [addmedicinevisible, setAddMedicineVisible] = useState(false);
  const AddMedicineHeader = (
    <>
      <div className="flex align-items-center gap-2 w-full">
        <div className="flex gap-4 items-center">
          <Button
            icon="pi pi-arrow-left"
            className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
            onClick={() => setMedicineVisible(false)}
          />
          <div>
            <div className="font-semibold text-base text-[#222]">Medicine</div>
          </div>
        </div>
      </div>
    </>
  );

  const [addnotesvisible, setAddNotesVisible] = useState(false);
  const AddNotesHeader = (
    <>
      <div className="flex align-items-center gap-2 w-full">
        <div className="flex gap-4 items-center">
          <Button
            icon="pi pi-arrow-left"
            className="p-0 bg-white border-0 shadow-none text-[#222] w-auto"
            onClick={() => setAddNotesVisible(false)}
          />
          <div>
            <div className="font-semibold text-base text-[#222]">Notes</div>
          </div>
        </div>
      </div>
    </>
  );

  const items = [
    {
      label: "Add notes",
      icon: (
        <div className="bg-white h-[40px] w-[40px] flex items-center justify-center rounded-full shadow-md ms-2">
          <img
            src="/images/AddNotes.svg"
            alt="Pencil"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      ),
      command: () => setAddNotesVisible(true),
    },
    {
      label: "Follow up date",
      icon: (
        <div className="bg-white h-[40px] w-[40px] flex items-center justify-center rounded-full shadow-md ms-2">
          <img
            src="/images/FollowUpDate.svg"
            alt="Pencil"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      ),
      command: () => setFollowVisible(true),
    },
    {
      label: "Add Advice",
      icon: (
        <div className="bg-white h-[40px] w-[40px] flex items-center justify-center rounded-full shadow-md ms-2">
          <img
            src="/images/AddAdvice.svg"
            alt="Pencil"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      ),
      command: () => setAdviceVisible(true),
    },
    {
      label: "Add lab test",
      icon: (
        <div className="bg-white h-[40px] w-[40px] flex items-center justify-center rounded-full shadow-md ms-2">
          <img
            src="/images/AddLabTest.svg"
            alt="Pencil"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      ),
      command: () => setLabTestVisible(true),
    },
    {
      label: "Add medicine",
      icon: (
        <div className="bg-white h-[40px] w-[40px] flex items-center justify-center rounded-full shadow-md ms-2">
          <img
            src="/images/AddMedicine.svg"
            alt="Pencil"
            style={{ width: "20px", height: "20px" }}
          />
        </div>
      ),
      command: () => setMedicineVisible(true),
    },
  ];

  const [datevisible, setDateVisible] = useState(false);

  const [ingredients, setIngredients] = useState<string[]>([]);

  const onIngredientsChange = (e: CheckboxChangeEvent) => {
    const { value, checked } = e;
    let _ingredients = [...ingredients];

    if (checked) {
      _ingredients.push(value);
    } else {
      _ingredients = _ingredients.filter((item) => item !== value);
    }

    setIngredients(_ingredients);
  };

  const [selectedDrugType, setSelectedDrugType] = useState<DropdownObject>({
    name: "",
  });
  const drugtypes = [
    { name: "Tablet" },
    { name: "Syrup " },
    { name: "Capsule" },
    { name: "Injection" },
  ];

  const [selectedBrand, setSelectedBrand] = useState<DropdownObject>({
    name: "",
  });
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

  const [selectedDose, setSelectedDose] = useState<DropdownObject>({
    name: "",
  });
  const doses = [
    { name: "50mg" },
    { name: "100mg " },
    { name: "250mg" },
    { name: "500mg" },
    { name: "600mg" },
  ];

  const [selectedRegimen, setSelectedRegimen] = useState<DropdownObject>({
    name: "",
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

  const [selectedConsume, setSelectedConsume] = useState<DropdownObject>({
    name: "",
  });
  const consumes = [{ name: "After meal" }, { name: "Before meal" }];

  const [selectedDuration, setSelectedDuration] = useState<DropdownObject>({
    name: "",
  });
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

  const [selectedPeriod, setSelectedPeriod] = useState<DropdownObject>({
    name: "",
  });
  const periods = [
    { name: "Days" },
    { name: "Week" },
    { name: "Month" },
    { name: "Year" },
  ];

  const [startmedication, setStartmedication] = useState("");

  const [tableData, setTableData] = useState<TableRow[]>([]);

  useEffect(() => {
    const data = [
      {
        medication: "Medicine 1",
        dosage: "300mg",
        regimen: "1-1-1",
        duration: "1 Days",
        remarks: "Five time a day",
      },
      {
        medication: "Medicine 1",
        dosage: "300mg",
        regimen: "1-1-1",
        duration: "1 Days",
        remarks: "Five time a day",
      },
      {
        medication: "Medicine 1",
        dosage: "300mg",
        regimen: "1-1-1",
        duration: "1 Days",
        remarks: "Five time a day",
      },
      {
        medication: "Medicine 1",
        dosage: "300mg",
        regimen: "1-1-1",
        duration: "1 Days",
        remarks: "Five time a day",
      },
    ];
    setTableData(data);
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getPrescription();
  }, [id]);

  const getPrescription = async () => {
    if (id) {
      try {
        const { data, status, message } = await axiosService({
          method: "GET",
          url: `/api/doctor/doctor-epescription/get-epescription-informarion?id=${id}`,
        });
        if (status < 210) {
          setPrescriptionRes(data);
          console.log("console Data ===> ", data);
          app.toastSuccess(message);
        }
      } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
          const newErrors: Record<string, string> = {};
          error.errors.forEach((err) => {
            if (err.path[0]) {
              newErrors[err.path[0] as string] = err.message;
            }
          });
          console.log(newErrors);
          setErrors(newErrors);
        } else {
          app.toastError("Server error");
        }
      }
    } else {
      return;
    }
  };
  const AddMedicine = () => {
    setErrors({});
    try {
      const newMedicine = {
        dosageType: selectedDrugType.name,
        brand: selectedBrand.name,
        dose: selectedDose.name,
        regimen: selectedRegimen.name,
        consume: selectedConsume.name,
        duration: selectedDuration.name,
        period: selectedPeriod.name,
        startMedication: startmedication,
        medicineNote: medicineNote,
      };

      const validData = medicationSchema.parse(newMedicine);
      setMedicineData((prev) => [...prev, validData]);
      setAddMedicineVisible(false);
      setSelectedDrugType({ name: "" });
      setSelectedDose({ name: "" });
      setSelectedBrand({ name: "" });
      setSelectedRegimen({ name: "" });
      setSelectedConsume({ name: "" });
      setSelectedPeriod({ name: "" });
      setSelectedDuration({ name: "" });
      setStartmedication("");
      setMedicineNote("");
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };
  const handelMedicineDelete = (index: number) => {
    setMedicineData((preComp) => preComp.filter((_, i) => i !== index));
  };
  const handelEditMedicine = (editData: any) => {
    setEditMedicineVisible(true);
    setEditData(editData);
  };

  const handelAddmedicine = async () => {
    if (medicineData.length < 0) {
      app.toastError("Medicine data not set");
    }
    try {
      if (id) {
        const validData = addMedicationSchema.parse(medicineData);
        const { message, status, data } = await axiosService({
          method: "POST",
          url: `/api/doctor/doctor-epescription/add-medicine?id=${id}`,
          body: validData,
        });
        if (status < 210) {
          app.toastSuccess(message);
          setMedicineData([]);
          setMedicineVisible(false);
          await getPrescription();
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  const handelAddLabTest = async () => {
    if (labTestList.length < 0) {
      app.toastError("Medicine data not set");
    }

    try {
      const validData = addLabTestSchema.parse(labTestList);
      if (id) {
        const { message, data, status } = await axiosService({
          method: "POST",
          url: `/api/doctor/doctor-epescription/add-lab-test?id=${id}`,
          body: validData,
        });
        if (status < 210) {
          app.toastSuccess(message);
          setLabTestList([]);
          setLabTestVisible(false);
          await getPrescription();
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  const handelAddAdvice = async () => {
    if (adviceList.length < 0) {
      app.toastError("advice data not set");
    }

    try {
      const validData = addAdviceSchema.parse(adviceList);
      if (id) {
        const { message, data, status } = await axiosService({
          method: "POST",
          url: `/api/doctor/doctor-epescription/add-advice?id=${id}`,
          body: validData,
        });
        if (status < 210) {
          app.toastSuccess(message);
          setAdviceList([]);
          setSelectedAdviceTest([]);
          setAdviceVisible(false);
          await getPrescription();
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  const addLabTest = () => {
    try {
      setErrors({});
      const validData = labTestSchema.parse(labTest);
      if (labTest !== null) {
        setLabTestList((pvr) => [...pvr, validData]);
        setLabTest("");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  const handelSelectedLabTest = (value: any) => {
    setSelectedLabTest((prev) => [...prev, value]);
  };

  const handelSelectedAdvice = (value: any) => {
    setSelectedAdviceTest((prv) => [...prv, value]);
  };

  const handelLabDelete = (index: number) => {
    setSelectedLabTest((preComp) => preComp.filter((_, i) => i !== index));
  };

  const handelAdviceDelete = (index: number) => {
    setSelectedAdviceTest((preComp) => preComp.filter((_, i) => i !== index));
  };

  const addAdvice = () => {
    try {
      setErrors({});
      const validData = adviceSchema.parse(advice);
      if (advice !== null) {
        setAdviceList((pvr) => [...pvr, validData]);
        setAdvice("");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  const addFollowUp = () => {
    console.log("add");
    const makeSting = String(date);
    try {
      if (!makeSting) {
        app.toastError("fill the date");
        return;
      }
      const validData = FollowUpSchema.safeParse({
        followUpDate: makeSting,
        ingredients: ingredients,
      });

      if (validData.success) {
        setSelectedFollowUpList(validData.data);
        setDate(null);
        setIngredients([]);
        setDateVisible(false);
      } else {
        const newErrors: Record<string, string> = {};
        validData.error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  const handelAddNote = async () => {
    try {
      const validData = noteSchema.parse(note);
      if (typeof note === "string") {
        console.log(note);
        if (id) {
          const { data, message, status } = await axiosService({
            method: "POST",
            url: `/api/doctor/doctor-epescription/add-note?id=${id}`,
            body: { note: validData },
          });
          if (status < 210) {
            app.toastSuccess(message);
            setNote("");
            setAddNotesVisible(false);
            await getPrescription();
          }
        } else {
          return;
        }
      } else {
        app.toastError("note must be a string");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  function formatDate(dateInput: Date | string | null | undefined): string {
    if (!dateInput) return "N/A";

    const date =
      typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  function calculateFutureDate(duration: any) {
    const currentDate = new Date();
    const matches = duration.match(
      /^(\d+)\s*(day|days|week|weeks|month|months|year|years)$/
    );

    if (!matches) {
      throw new Error(
        "Invalid duration format. Use '1 day', '2 days', '1 week', '2 weeks', '1 month', '2 months', '1 year', or '2 years'."
      );
    }
    const value = parseInt(matches[1], 10);
    const unit = matches[2];

    switch (unit) {
      case "day":
      case "days":
        currentDate.setDate(currentDate.getDate() + value);
        break;
      case "week":
      case "weeks":
        currentDate.setDate(currentDate.getDate() + value * 7);
        break;
      case "month":
      case "months":
        currentDate.setMonth(currentDate.getMonth() + value);
        break;
      case "year":
      case "years":
        currentDate.setFullYear(currentDate.getFullYear() + value);
        break;
      default:
        throw new Error("Invalid duration unit.");
    }
    setSelectedFollowUpList({ followUpDate: String(currentDate) });
  }

  const QuickPickDate = [
    "1 days",
    "3 days",
    "5 days",
    "1 week",
    "2 week",
    "3 week",
    "1 month",
  ];

  const handelAddFollowUp = async () => {
    console.log("add");
    try {
      if (selectedFollowUpList !== null) {
        const { message, status, data } = await axiosService({
          method: "POST",
          url: `/api/doctor/doctor-epescription/add-follow-up?id=${id}`,
          body: selectedFollowUpList,
        });

        if (status < 210) {
          app.toastSuccess(message);
          setSelectedFollowUpList(null);
          setFollowVisible(false);
          await getPrescription();
        }
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        console.log(newErrors);
        setErrors(newErrors);
      } else {
        app.toastError("Server error");
      }
    }
  };

  console.log("list", selectedFollowUpList);

  console.log("followuP", selectedFollowUpList);
  console.log("resData ===>", prescriptionRes);
  return (
    <>
      <Sidebar
        header={PreviewHeader}
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div
          className={
            isOpen
              ? "relative PreviewSidebar active"
              : "relative PreviewSidebar"
          }
          style={
            isMobile
              ? { height: "calc(100vh - 105px)", overflow: "auto" }
              : { height: "calc(100vh - 160px)", overflow: "auto" }
          }
        >
          <div className="flex justify-between items-center mb-3">
            <div className="text-3xl text-[#175CD3] font-semibold">
              <div className="text-3xl text-[#175CD3] font-semibold">
              {prescriptionRes && prescriptionRes.doctor.Clinic?.length > 0
                ? prescriptionRes.doctor.Clinic[0].clinicName
                : "N/A"}
              </div>
              <div className="text-xl text-[#175CD3] font-semibold">
              {prescriptionRes && prescriptionRes.doctor.Clinic?.length > 0
                ? prescriptionRes.doctor.Clinic[0].address
                : "N/A"}
              </div>
            </div>
            <div className="text-end">
              <div className="font-semibold text-black">
                {prescriptionRes && prescriptionRes.doctor.name
                  ? prescriptionRes.doctor.name
                  : "N/A"}
              </div>
              <div className="text-black text-xs">
                {/* {prescriptionRes && prescriptionRes.specialization?.length > 0
                  ? resData.specialization[0].specializationName
                  : "N/A"} */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-4">
                <div className="w-20">Name</div>
                <div>:</div>
                <div className="font-semibold text-black">
                  {prescriptionRes && prescriptionRes.patient
                    ? `${prescriptionRes.patient.fristName} ${prescriptionRes.patient.lastName}`
                    : "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20">Age</div>
                <div>:</div>
                <div className="font-semibold text-black">
                  {prescriptionRes && prescriptionRes.patient
                    ? prescriptionRes.patient.age
                    : "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20">Gender</div>
                <div>:</div>
                <div className="font-semibold text-black">
                  {prescriptionRes && prescriptionRes.patient
                    ? prescriptionRes.patient.gender
                    : "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20">Rx Date</div>
                <div>:</div>
                <div className="font-semibold text-black">
                  {prescriptionRes && prescriptionRes.prescribedDate
                    ? formatDate(prescriptionRes.prescribedDate)
                    : "N/A"}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20">Diagnosis</div>
                <div>:</div>
                <div className="font-semibold text-black">
                  {prescriptionRes?.diagnosis &&
                  prescriptionRes.diagnosis.length > 0
                    ? prescriptionRes.diagnosis
                        .map((ele) => ele.diagnosisName)
                        .join(", ")
                    : "N/A"}
                </div>
              </div>
            </div>
            <div>
              <div className="text-[#2563EB] font-semibold text-lg mb-1">
                RX
              </div>
              <DataTable
                className="text-xs"
                value={prescriptionRes?.medicine!}
                size="small"
                tableStyle={{ minWidth: "100%" }}
              >
                <Column field="brand" header="Medication"></Column>
                <Column field="dosegeType" header="Dosage"></Column>
                <Column field="regimen" header="Regimen"></Column>
                <Column field="duration" header="Duration"></Column>
                <Column field="MedicationNotes" header="Remarks"></Column>
              </DataTable>
            </div>
            <div>
              <div className="text-[#16A34A] font-semibold text-lg mb-1">
                Advice
              </div>
              <div className="p-3 rounded-md bg-[#DCFCE7] text-xs mb-2">
                {prescriptionRes &&
                prescriptionRes.advice &&
                prescriptionRes.advice.length > 0
                  ? prescriptionRes.advice.map((ele, index) => (
                      <div key={index}>{ele.AdviceName}</div>
                    ))
                  : "N/A"}
              </div>
              
            </div>
            <div>
              <div className="text-[#DC2626] font-semibold text-lg mb-1">
                Investigation
              </div>
              <div className="p-3 rounded-md bg-[#FEE2E2] text-xs">
                {prescriptionRes &&
                prescriptionRes.investigation &&
                prescriptionRes.investigation.length > 0
                  ? prescriptionRes.investigation.map((ele, index) => (
                      <div key={index}>{ele.investigationName}</div>
                    ))
                  : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[#CA8A04] font-semibold text-lg mb-1">
                Note
              </div>
              <div className="p-3 rounded-md bg-[#FEF9C3] text-xs">
                {prescriptionRes &&
                prescriptionRes.note &&
                prescriptionRes.note.length > 0
                  ? prescriptionRes.note.map((ele, index) => (
                      <div className="mb-2" key={index}>
                        {ele.note}
                      </div>
                    ))
                  : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[#0BA5EC] font-semibold text-lg mb-1">
                Recommended lab Test
              </div>
              <div className="p-3 rounded-md bg-[#E0F2FE] text-xs">
                {prescriptionRes &&
                prescriptionRes.labTest &&
                prescriptionRes.labTest.length > 0
                  ? prescriptionRes.labTest.map((ele, index) => (
                      <ol key={index} className="m-0 ps-3">
                        <li>{ele.labTestName}</li>
                      </ol>
                    ))
                  : "N/A"}
              </div>
            </div>
            <div>
              <div className="text-[#9333EA] font-semibold text-lg mb-1">
                Follow Up
              </div>
              <div className="p-3 rounded-md bg-[#F3E8FF] text-xs">
                <div>
                  Follow Up Date:{" "}
                  {prescriptionRes && prescriptionRes.followUp
                    ? formatDate(prescriptionRes.followUp.followUpDate)
                    : null}
                </div>
              </div>
            </div>
            <div className="text-end">
              <div className="font-semibold text-black">
                Dr.{" "}
                {prescriptionRes && prescriptionRes.doctor.name
                  ? prescriptionRes.doctor.name
                  : "N/A"}
              </div>
              <div className="text-black text-xs">drrakesh@rxp.com</div>
            </div>
          </div>
          <SpeedDial
            onShow={handleOpen}
            onHide={handleClose}
            mask
            className="speeddial-bottom-left fixed"
            model={items}
            radius={120}
            direction="up"
            buttonClassName="p-button-help"
            style={{ right: "15px", bottom: "80px" }}
          />
        </div>

        <div className="pt-4 grid grid-cols-2 gap-4">
          <div>
            <Button
              className="bg-[#EFF8FF] text-[#175CD3] text-sm border-[#EFF8FF] shadow-none w-full whitespace-nowrap"
              size="small"
              label="Save as  draft"
            />
          </div>
          <div>
            <Button
              className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none w-full"
              size="small"
              label="Finish"
            />
          </div>
        </div>
      </Sidebar>

      {/* ============================
        == Follow Update ==
        ============================ */}
      <Sidebar
        header={FollowUpdateHeader}
        visible={followvisible}
        position="right"
        onHide={() => setFollowVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div
          className="relative"
          style={
            isMobile
              ? { height: "calc(100vh - 105px)", overflow: "auto" }
              : { height: "calc(100vh - 160px)", overflow: "auto" }
          }
        >
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText placeholder="Search" className="w-full" />
          </IconField>
          <div className="mb-2 mt-4 flex items-center justify-between">
            <div className="text-[#6E7071]">Selected follow up date</div>
            <div>
              <Button
                onClick={() => setDateVisible(true)}
                className="text-[#175CD3] p-0 border-0 bg-transparent font-semibold"
                label="Custom dates"
                icon="pi pi-calendar"
                iconPos="right"
              />
            </div>
          </div>
          {selectedFollowUpList !== null ? (
            <div className="flex flex-col gap-2 mb-4">
              <div className="bg-[#EFF8FF] p-4 rounded-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="font-semibold text-black">
                    {formatDate(selectedFollowUpList.followUpDate)}
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <Button
                        onClick={() => setDateVisible(true)}
                        className="text-[#667085] p-0 border-0 bg-transparent w-auto"
                        icon="pi pi-pen-to-square"
                      />
                    </div>
                    <div>
                      <Button
                        //onClick={() =>handelDeleteFollowUp(index)}
                        className="text-[#F04438] p-0 border-0 bg-transparent w-auto"
                        icon="pi pi-trash"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {selectedFollowUpList.ingredients &&
                  selectedFollowUpList.ingredients.length > 0
                    ? selectedFollowUpList.ingredients.map((ele, index) => (
                        <div
                          key={index}
                          className="bg-[#F2F4F7] text-xs text-[#344054] px-4 py-2 rounded-full shadow-md"
                        >
                          {ele}
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          ) : null}

          <div className="text-[#6E7071] mb-3">Quick pick</div>
          <div className="grid grid-cols-1">
            {QuickPickDate.map((ele, index) => (
              <>
                <div
                  onClick={() => calculateFutureDate(ele)}
                  key={index}
                  className="text-black cursor-pointer"
                >
                  After {ele}
                </div>
                <Divider className="my-2 py-2" />
              </>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <div>
            <Button
              onClick={handelAddFollowUp}
              className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none w-full"
              size="small"
              label="Done"
            />
          </div>
        </div>
      </Sidebar>
      <Dialog
        header="Custom Follow-up"
        visible={datevisible}
        onHide={() => setDateVisible(false)}
        style={{ width: "400px" }}
      >
        <div className="text-black font-semibold mb-2">Custom dates </div>

        <div className="mb-4">
          <Calendar
            value={date}
            onChange={(e) => setDate(e.value)}
            inline
            className="w-full"
          />
        </div>
        <div className="text-black font-semibold mb-2">
          Follow-up Requirement
        </div>
        <div className="mb-4">
          <div className="card flex flex-wrap justify-content-center gap-3">
            <div className="flex align-items-center rounded-full bg-[#F2F4F7] px-4 py-2 text-sm">
              <Checkbox
                inputId="ingredient1"
                name="pizza"
                value="SOS"
                onChange={onIngredientsChange}
                checked={ingredients.includes("SOS")}
              />
              <label htmlFor="ingredient1" className="ml-2">
                SOS
              </label>
            </div>
            <div className="flex align-items-center rounded-full bg-[#F2F4F7] px-4 py-2 text-sm">
              <Checkbox
                inputId="ingredient2"
                name="pizza"
                value="WithReports"
                onChange={onIngredientsChange}
                checked={ingredients.includes("WithReports")}
              />
              <label htmlFor="ingredient2" className="ml-2">
                With reports
              </label>
            </div>
          </div>
        </div>
        <div className="w-full justify-end flex flex-col">
          <Button
            onClick={addFollowUp}
            className="bg-[#175CD3] text-[#fff]  text-sm border-[#175CD3] shadow-none px-6"
            size="small"
            label="Done"
          />
        </div>
      </Dialog>

      {/* ============================
        == Add Advice ==
        ============================ */}

      <Sidebar
        header={AddAdviceHeader}
        visible={advicevisible}
        position="right"
        onHide={() => setAdviceVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div
          className="relative"
          style={
            isMobile
              ? { height: "calc(100vh - 105px)", overflow: "auto" }
              : { height: "calc(100vh - 160px)", overflow: "auto" }
          }
        >
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText placeholder="Search" className="w-full" />
          </IconField>
          <div className="mb-2 mt-4 flex items-center justify-between">
            <div className="text-[#6E7071]">Selected Advice</div>
            <div>
              <Button
                onClick={() => setAddAdviceVisible(true)}
                className="text-[#175CD3] p-0 border-0 bg-transparent font-semibold"
                label="Add New Advice"
                icon="pi pi-plus"
                iconPos="right"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {selectedAdviceTest.length > 0
              ? selectedAdviceTest.map((ele, index) => (
                  <div key={index} className="bg-[#EFF8FF] p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-black">{ele}</div>
                      <div className="flex items-center gap-6">
                        <div>
                          <Button
                            onClick={() => setAddAdviceVisible(true)}
                            className="text-[#667085] p-0 border-0 bg-transparent w-auto"
                            icon="pi pi-pen-to-square"
                          />
                        </div>
                        <div>
                          <Button
                            onClick={() => handelAdviceDelete(index)}
                            className="text-[#F04438] p-0 border-0 bg-transparent w-auto"
                            icon="pi pi-trash"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
          <div className="text-[#6E7071] mb-3">Quick pick</div>
          <div className="grid grid-cols-1">
            {adviceList.length > 0
              ? adviceList.map((ele, index) => (
                  <>
                    <div
                      onClick={() => handelSelectedAdvice(ele)}
                      key={index}
                      className="text-black"
                    >
                      {ele}
                    </div>
                    <Divider className="my-2 py-2" />
                  </>
                ))
              : null}
          </div>
        </div>
        <div className="pt-4">
          <div>
            <Button
              onClick={handelAddAdvice}
              className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none w-full"
              size="small"
              label="Done"
            />
          </div>
        </div>
      </Sidebar>
      <Dialog
        header="Advice"
        visible={addadvicevisible}
        onHide={() => setAddAdviceVisible(false)}
        style={{ width: "400px" }}
      >
        <div className="text-black font-semibold mb-2">Add Advice</div>
        <InputTextarea
          value={advice!}
          onChange={(e) => setAdvice(e.target.value)}
          className="w-full"
          placeholder="Type here details for advice"
          rows={5}
          cols={30}
        />
        <div className="flex justify-end mt-4">
          <Button
            onClick={addAdvice}
            className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none px-6"
            size="small"
            label="Done"
          />
        </div>
      </Dialog>

      {/* ============================
        == Add Lab test ==
        ============================ */}

      <Sidebar
        header={AddLabTestHeader}
        visible={labtestvisible}
        position="right"
        onHide={() => setLabTestVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div
          className="relative"
          style={
            isMobile
              ? { height: "calc(100vh - 105px)", overflow: "auto" }
              : { height: "calc(100vh - 160px)", overflow: "auto" }
          }
        >
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText placeholder="Search" className="w-full" />
          </IconField>
          <div className="mb-2 mt-4 flex items-center justify-between">
            <div className="text-[#6E7071]">Selected Lab test</div>
            <div>
              <Button
                onClick={() => setAddLabTestVisible(true)}
                className="text-[#175CD3] p-0 border-0 bg-transparent font-semibold"
                label="Add Lab Test"
                icon="pi pi-plus"
                iconPos="right"
              />
            </div>
          </div>
          {selectedLabTest.length > 0
            ? selectedLabTest.map((ele, index) => (
                <>
                  <div key={index} className="flex flex-col gap-2 mb-4">
                    <div className="bg-[#EFF8FF] p-4 rounded-md">
                      <>
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-black">{ele}</div>
                          <div className="flex items-center gap-6">
                            <div>
                              <Button
                                className="text-[#667085] p-0 border-0 bg-transparent w-auto"
                                icon="pi pi-pen-to-square"
                              />
                            </div>
                            <div>
                              <Button
                                onClick={() => handelLabDelete(index)}
                                className="text-[#F04438] p-0 border-0 bg-transparent w-auto"
                                icon="pi pi-trash"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                </>
              ))
            : null}
          <div className="text-[#6E7071] mb-3">All test</div>
          <div className="grid grid-cols-1">
            {labTestList.length > 0
              ? labTestList.map((ele, index) => (
                  <>
                    <div
                      onClick={() => handelSelectedLabTest(ele)}
                      key={index}
                      className="text-black cursor-pointer"
                    >
                      {ele}
                    </div>
                    <Divider className="my-2 py-2" />
                  </>
                ))
              : null}
          </div>
        </div>
        <div className="pt-4">
          <div>
            <Button
              onClick={handelAddLabTest}
              className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none w-full"
              size="small"
              label="Done"
            />
          </div>
        </div>
      </Sidebar>
      <Dialog
        header="Lab test"
        visible={addlabtestvisible}
        onHide={() => setAddLabTestVisible(false)}
        style={{ width: "400px" }}
      >
        <div className="text-black font-semibold mb-2">Add Lab test</div>
        <InputText
          value={labTest}
          onChange={(e) => setLabTest(e.target.value)}
          className="w-full"
          placeholder="Type Lab test"
        />
        {errors.labTestSchema && (
          <p className="text-red-600 text-xs mt-1">{errors.labTestSchema}</p>
        )}
        <div className="flex justify-end mt-4">
          <Button
            onClick={addLabTest}
            className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none px-6"
            size="small"
            label="Done"
          />
        </div>
      </Dialog>

      {/* ============================
        == Add medicine ==
        ============================ */}

      <Sidebar
        header={AddMedicineHeader}
        visible={medicinevisible}
        position="right"
        onHide={() => setMedicineVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div
          className="relative"
          style={
            isMobile
              ? { height: "calc(100vh - 105px)", overflow: "auto" }
              : { height: "calc(100vh - 160px)", overflow: "auto" }
          }
        >
          <IconField iconPosition="left">
            <InputIcon className="pi pi-search"> </InputIcon>
            <InputText placeholder="Search" className="w-full" />
          </IconField>
          <div className="mb-2 mt-4 flex items-center justify-between">
            <div className="text-[#6E7071]">Added medicine</div>
            <div>
              <Button
                onClick={() => setAddMedicineVisible(true)}
                className="text-[#175CD3] p-0 border-0 bg-transparent font-semibold"
                label="Add New Medicine"
                icon="pi pi-plus"
                iconPos="right"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-4">
            {medicineData.length > 0 ? (
              medicineData.map((ele, index) => (
                <div key={index} className="bg-[#EFF8FF] p-4 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-black">{ele.brand}</div>
                    <div className="flex items-center gap-6">
                      <div>
                        <Button
                          onClick={() => handelEditMedicine(ele)}
                          className="text-[#667085] p-0 border-0 bg-transparent w-auto"
                          icon="pi pi-pen-to-square"
                        />
                      </div>
                      <div>
                        <Button
                          onClick={() => handelMedicineDelete(index)}
                          className="text-[#F04438] p-0 border-0 bg-transparent w-auto"
                          icon="pi pi-trash"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-black">
                      Dosage type: {ele.dosageType}
                    </div>
                    <div className="text-black">{ele.regimen}</div>
                    <div className="text-black">
                      {ele.duration} {ele.period}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div />
            )}
            {editData !== null ? (
              <EditMedicine
                visible={editMedicineVisible}
                editData={editData}
                setVisible={setEditMedicineVisible}
              />
            ) : null}
          </div>
        </div>
        <div className="pt-4">
          <div>
            <Button
              onClick={handelAddmedicine}
              className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none w-full"
              size="small"
              label="Done"
            />
          </div>
        </div>
      </Sidebar>
      <Sidebar
        header="Add Medicine"
        visible={addmedicinevisible}
        position="right"
        onHide={() => setAddMedicineVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div className="flex flex-col gap-3">
          <div>
            <div className="text-black mb-1 text-sm">Dosage type</div>
            <Dropdown
              value={selectedDrugType}
              onChange={(e) => setSelectedDrugType(e.value)}
              options={drugtypes}
              optionLabel="name"
              filter
              placeholder="Search Dosage"
              className="w-full text-sm"
            />
            {errors.dosageType && (
              <p className="text-red-600 text-xs mt-1">{errors.dosageType}</p>
            )}
          </div>
          <div>
            <div className="text-black mb-1 text-sm">Brand</div>
            <Dropdown
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.value)}
              options={brands}
              optionLabel="name"
              filter
              placeholder="Search Brand"
              className="w-full text-sm"
            />
            {errors.brand && (
              <p className="text-red-600 text-xs mt-1">{errors.brand}</p>
            )}
          </div>
          <div>
            <div className="text-black mb-1 text-sm">Choose dose</div>
            <Dropdown
              value={selectedDose}
              onChange={(e) => setSelectedDose(e.value)}
              options={doses}
              optionLabel="name"
              filter
              placeholder="Search Brand"
              className="w-full text-sm"
            />
            {errors.dose && (
              <p className="text-red-600 text-xs mt-1">{errors.dose}</p>
            )}
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
              {errors.regimen && (
                <p className="text-red-600 text-xs mt-1">{errors.regimen}</p>
              )}
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
              {errors.consume && (
                <p className="text-red-600 text-xs mt-1">{errors.consume}</p>
              )}
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
              {errors.consume && (
                <p className="text-red-600 text-xs mt-1">{errors.consume}</p>
              )}
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
              {errors.duration && (
                <p className="text-red-600 text-xs mt-1">{errors.duration}</p>
              )}
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
              {errors.startMedication && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.startMedication}
                </p>
              )}
            </div>
            <div className="">
              <div className="text-black mb-2">Medication Notes</div>
              <InputTextarea
                value={medicineNote}
                onChange={(e) => setMedicineNote(e.target.value)}
                className="w-full"
                rows={5}
                cols={30}
              />
              {errors.medicineNote && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.medicineNote}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            onClick={AddMedicine}
            className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none px-6"
            size="small"
            label="Done"
          />
        </div>
      </Sidebar>

      {/* ============================
        == Add Notes ==
        ============================ */}

      <Sidebar
        header={AddNotesHeader}
        visible={addnotesvisible}
        position="right"
        onHide={() => setAddNotesVisible(false)}
        className="w-full md:w-[500px]"
      >
        <div
          className="relative"
          style={
            isMobile
              ? { height: "calc(100vh - 105px)", overflow: "auto" }
              : { height: "calc(100vh - 160px)", overflow: "auto" }
          }
        >
          <div className="text-black mb-1">Add notes</div>
          <InputTextarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full"
            rows={5}
            cols={30}
          />
        </div>
        <div className="pt-4">
          <div>
            <Button
              onClick={handelAddNote}
              className="bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none w-full"
              size="small"
              label="Save"
            />
          </div>
        </div>
      </Sidebar>
    </>
  );
}
