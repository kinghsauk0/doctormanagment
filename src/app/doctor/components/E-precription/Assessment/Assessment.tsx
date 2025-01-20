
"use client";
import React, { useRef, useState } from 'react';
import { MultiSelect } from "primereact/multiselect";
import { Sidebar } from "primereact/sidebar";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import useMobile from '@/app/hooks/isMobileHook';
import Preview from '../Preview/Preview';
import { Dropdown } from 'primereact/dropdown';
import { DropdownObject } from '@/app/types';
import { Toast } from 'primereact/toast';
import { Finding , Investigationtype, DiagnosisType} from '@/app/types';
import { useApp } from '@/app/context/AppProvider';
import { ZodError } from 'zod';
import { axiosService } from '@/app/services/axios.service';

type Props={
    visible:boolean, setVisible:React.Dispatch<React.SetStateAction<boolean>>, prescriptionIdId: string
}

export default function Assessment({visible, setVisible,prescriptionIdId}:Props) {
    console.log("prescription",prescriptionIdId)
    const isMobile = useMobile();
    const [selectFindingsItemList,setSelectFindingsItemList] = useState<DropdownObject[]>([])
    const [selectFinding, setSelectFinding] = useState<DropdownObject>({name: ''})
    const [selectInvestigation, setSelectInvestigation] = useState<DropdownObject>({name: ''})
    const [selectDiagnosis, setSelectDiagnosis] = useState<DropdownObject>({name: ''})
    const [selectInvestigationItemList,setSelectInvestigationItemList] = useState<DropdownObject[]>([])
    const [selectItemDiagnosisList,setSelectItemDiagnosisList] = useState<DropdownObject[]>([])
    const [investigationReading, setInvestigationReading] = useState<string[]>([])
    const [diagnosisReading,setDiagnosisReading] = useState<string[]>([])
    const [reading, setReading] = useState<string[]>([])
    const [findingList, setFindingList] = useState<Finding[]>([])
    const [investigationList, setInvestigationList] = useState<Investigationtype[]>([])
    const [diagnosisList,setDiagnosisList] = useState<DiagnosisType[]>([])
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [newPrescriptionId, setNewPrescription] = useState<string | null>(null)
    const {app} = useApp()
    const AssessmentHeader = (
        <div className="flex align-items-center gap-2">
            <div className='flex gap-4 items-center'>
                <Button icon="pi pi-arrow-left" className='p-0 bg-white border-0 shadow-none text-[#222] w-auto' onClick={() => setVisible(false)} />
                <div>
                    <div className='font-semibold text-base text-[#222]'>Additional assessment</div> 
                </div>
            </div>
        </div>
    );
    const toast = useRef<Toast>(null);
    
    const [findingsvisible, setFindingsVisible] = useState(false);
    const [investigationvisible, setInvestigationVisible] = useState(false);
    const [diagnosisvisible, setDiagnosisVisible] = useState(false);
    
    const finding = [
        
        { name: "Common Cold" },
        { name: "Flu (Influenza)" },
        { name: "Bronchitis" },
        { name: "Asthma" },
        { name: "Pneumonia" },
        { name: "Chronic Obstructive Pulmonary Disease (COPD)" },
        { name: "Sinusitis" },
      
        // Cardiovascular Diseases
        { name: "Hypertension (High Blood Pressure)" },
        { name: "Coronary Artery Disease (CAD)" },
        { name: "Heart Failure" },
        { name: "Arrhythmia" },
        { name: "Peripheral Artery Disease (PAD)" },
      
        // Gastrointestinal Disorders
        { name: "Gastroesophageal Reflux Disease (GERD)" },
        { name: "Irritable Bowel Syndrome (IBS)" },
        { name: "Gastritis" },
        { name: "Constipation" },
        { name: "Diarrhea" },
        { name: "Peptic Ulcer Disease" },
      
        // Musculoskeletal Disorders
        { name: "Osteoarthritis" },
        { name: "Rheumatoid Arthritis" },
        { name: "Gout" },
        { name: "Back Pain" },
        { name: "Tendonitis" },
        { name: "Fibromyalgia" },
      
        // Endocrine Disorders
        { name: "Diabetes Mellitus (Type 1 & Type 2)" },
        { name: "Hypothyroidism" },
        { name: "Hyperthyroidism" },
        { name: "Polycystic Ovary Syndrome (PCOS)" },
      
        // Skin Conditions
        { name: "Acne" },
        { name: "Eczema" },
        { name: "Psoriasis" },
        { name: "Dermatitis" },
        { name: "Fungal Infections (e.g., Athlete's Foot, Ringworm)" },
      
        // Neurological Disorders
        { name: "Migraine" },
        { name: "Tension Headache" },
        { name: "Epilepsy" },
        { name: "Parkinson’s Disease" },
        { name: "Stroke" },
      
        // Mental Health Conditions
        { name: "Anxiety Disorders" },
        { name: "Depression" },
        { name: "Bipolar Disorder" },
        { name: "Obsessive-Compulsive Disorder (OCD)" },
        { name: "Post-Traumatic Stress Disorder (PTSD)" },
      
        // Infectious Diseases
        { name: "Tuberculosis (TB)" },
        { name: "Malaria" },
        { name: "Dengue Fever" },
        { name: "Chickenpox" },
        { name: "Urinary Tract Infections (UTIs)" },
      
        // Genitourinary Disorders
        { name: "Kidney Stones" },
        { name: "Urinary Incontinence" },
        { name: "Benign Prostatic Hyperplasia (BPH)" },
        { name: "Urinary Tract Infection (UTI)" },
      
        // Allergies and Immune Disorders
        { name: "Seasonal Allergies (e.g., Hay Fever)" },
        { name: "Food Allergies (e.g., Nut Allergy, Lactose Intolerance)" },
        { name: "Autoimmune Diseases (e.g., Lupus, Rheumatoid Arthritis)" },
        { name: "Anaphylaxis" },
      
        // Eye and Ear Conditions
        { name: "Conjunctivitis (Pink Eye)" },
        { name: "Glaucoma" },
        { name: "Cataracts" },
        { name: "Otitis Media (Ear Infection)" },
        { name: "Hearing Loss" }
      ];



      const investigation = [
        { name: "Conjunctivitis (Pink Eye)" },
        { name: "Glaucoma" },
        { name: "Cataracts" },
        { name: "Otitis Media (Ear Infection)" },
        { name: "Hearing Loss" },
      ]

      const  diagnosis= [
        { name: "Conjunctivitis (Pink Eye)" },
        { name: "Glaucoma" },
        { name: "Cataracts" },
        { name: "Otitis Media (Ear Infection)" },
        { name: "Hearing Loss" },
      ]

    const [previewVisible, setPreviewVisible] = useState(false);

  const  handelFindingOnChange = (value: { name: string }) => {
       setSelectFindingsItemList((pvr) => [...pvr,value])
  }
  const handelFindingDelete = (index: number) => {
    setSelectFindingsItemList((pre) => pre.filter((_, i) => i !== index));
  };

  const handleReadingOnChange = (value: string, index: number) => {
    const updatedReading = [...reading];
    updatedReading[index] = value 
   setReading(updatedReading);
  };

const handelFindingSave = (name: string, index: number) => {
   const readingValue =  reading[index]

   if (!readingValue) {
    app.toastError("Please select reading before saving.");
    return;
  }
    setFindingList((prv) => [
        ...prv,
        {findingName: name, reading: readingValue}
    ])

    handelFindingDelete(index)
    setReading([])
}
  
const handelFindingListDelete = (index: number) => {
    setFindingList((pre) => pre.filter((_, i) => i !== index));
  };
 

const handelInvestigationOnChange = (value: { name: string }) => {
   setSelectInvestigationItemList((prv) => [...prv,value])
}


const handleInvestigationReadingOnChange = (value: string, index: number) => {
    const updatedReading = [...reading];
    updatedReading[index] = value 
   setInvestigationReading(updatedReading);
  };
  

  const handelInvestigationItemListDelete = (index: number) => {
      setSelectInvestigationItemList((pre) => pre.filter((_, i) => i !== index))
  }
 const  handelInvestigationSaveList = (name: string, index: number) => {

    const investigationReadingValue =  investigationReading[index]
    if (!investigationReadingValue) {
        app.toastError("Please select reading before saving.");
        return;
      }
    setInvestigationList((prv) => [
        ...prv,
        {investigationName: name, reading: investigationReadingValue}
    ])
   
    handelInvestigationItemListDelete(index)
    setInvestigationReading([])
 }

 

 const handelInvestigationListDelete = (index: number) => {
    setInvestigationList((pre) => pre.filter((_, i) => i !== index))
 }

 const handelDiagnosisOnChange = (value: { name: string }) => {
      setSelectItemDiagnosisList((prv) => [...prv, value])
 }

 const handleDiagnosisReadingOnChange = (value: string, index: number) => {
    const updatedReading = [...diagnosisReading];
    updatedReading[index] = value 
  setDiagnosisReading(updatedReading);
 }
console.log()
 const handelDiagnosisItemListDelete = (index: number) => {
    setSelectItemDiagnosisList((pre) => pre.filter((_, i) => i !== index))
}

const  handleDiagnosisSaveList = (name: string, index: number) => {

    const diagnosisReadingValue =  diagnosisReading[index]
    if (!diagnosisReadingValue) {
        app.toastError("Please select reading before saving.");
        return;
      }
    setDiagnosisList((prv) => [
        ...prv,
        {diagnosisName: name, reading: diagnosisReadingValue}
    ])
   
   handelDiagnosisItemListDelete(index)
    setDiagnosisReading([])
 }

const handelDiagnosisListDelete = (index: number) => {
    setDiagnosisList((pre) => pre.filter((_, i) => i !== index))
}

const handelGenerate = async () => {
    try {
        if(findingList.length <= 0){
            app.toastError("please select finding")
        }
        else if(investigationList.length <= 0){
            app.toastError("please select investigation")
        }
        else if(diagnosisList.length <= 0){
            app.toastError("please select diagnosis")
        }else{
           const {message, status, data} = await axiosService({
            method: 'POST',
            url: '/api/doctor/doctor-epescription/add-assessment',
            body: {
                prescriptionIdId : prescriptionIdId
                ,findingList: findingList
                ,investigationList: investigationList
                ,diagnosisList: diagnosisList
            }
           })

           if(status < 210){
             app.toastSuccess(message)
             setVisible(false)
             setNewPrescription(data)
             setPreviewVisible(true)
             setFindingList([])
             setDiagnosisList([])
             setInvestigationList([])
           }
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
}

  return (
    <>
        <Sidebar header={AssessmentHeader} visible={visible} position="right" onHide={() => setVisible(false)} className="w-full md:w-[500px]">
            <div style={isMobile?{height:'calc(100vh - 105px)', overflow:'auto'}:{height:'calc(100vh - 160px)', overflow:'auto'}}>
                <div className='flex flex-col gap-3'>
                    <div className='p-2 rounded-lg border border-solid border-[#EAECF0]'>
                        <div className='flex items-center gap-3'>
                            <div>
                                <div className='h-[40px] w-[40px] rounded-md flex justify-center items-center bg-[#F4EBFF] text-[#175CD3]'>
                                    <i className='pi pi-search text-[#175CD3]'></i>
                                </div>
                            </div>
                            <div className='text-[#000] font-semibold'>Findings</div>
                            <div className='ml-auto'>
                                <Button onClick={() => setFindingsVisible(true)} className='text-[#175CD3] bg-[#EFF8FF] rounded-full py-1 px-2 text-xs border-0 shadow-none' size='small' label='Select' icon="pi pi-arrow-right" iconPos='right'/>
                            </div>
                        </div>
                        <div className='bg-[#EFF8FF] rounded-md mt-3'>
                            {
                                findingList.length> 0 ? 
                                findingList.map((ele, index) => (
                                    <div key={index} className='py-3 px-4 flex justify-between text-sm items-center border-b border-t-0 border-l-0 border-r-0 border-solid border-[#fff]'>
                                <div className='font-semibold text-[#000]'>{ele.findingName}</div>
                                <div className='text-[#666666]'>Today’s reading: <span className='font-semibold text-[#000]'>{index}</span> </div>
                                <div><Button onClick={() => handelFindingListDelete(index)} className='text-[#f00] p-0 bg-transparent border-0 shadow-none w-auto' icon="pi pi-times"/></div>
                            </div>
                                ))
                                : null
                            }
                        </div>
                    </div>
                    <div className='p-2 rounded-lg border border-solid border-[#EAECF0]'>
                        <div className='flex items-center gap-3'>
                            <div>
                                <div className='h-[40px] w-[40px] rounded-md flex justify-center items-center bg-[#FEF0C7] text-[#DC6803]'>
                                    <i className='pi pi-file-plus text-[#DC6803]'></i>
                                </div>
                            </div>
                            <div className='text-[#000] font-semibold'>Investigation</div>
                            <div className='ml-auto'>
                                <Button onClick={() => setInvestigationVisible(true)} className='text-[#175CD3] bg-[#EFF8FF] rounded-full py-1 px-2 text-xs border-0 shadow-none' size='small' label='Select' icon="pi pi-arrow-right" iconPos='right'/>
                            </div>
                        </div>
                        <div className='bg-[#EFF8FF] rounded-md mt-3'>
                            {
                               investigationList.length> 0 ? 
                                investigationList.map((ele, index) => (
                                    <div key={index} className='py-3 px-4 flex justify-between text-sm items-center border-b border-t-0 border-l-0 border-r-0 border-solid border-[#fff]'>
                                <div className='font-semibold text-[#000]'>{ele.investigationName}</div>
                                <div className='text-[#666666]'>Today’s reading: <span className='font-semibold text-[#000]'>{index}</span> </div>
                                <div><Button onClick={() => handelInvestigationListDelete(index)
                                } className='text-[#f00] p-0 bg-transparent border-0 shadow-none w-auto' icon="pi pi-times"/></div>
                            </div>
                                ))
                                : null
                            }
                        </div>
                    </div>
                    <div className='p-2 rounded-lg border border-solid border-[#EAECF0]'>
                        <div className='flex items-center gap-3'>
                            <div>
                                <div className='h-[40px] w-[40px] rounded-md flex justify-center items-center bg-[#FEE4E2] text-[#D92D20]'>
                                    <i className='pi pi-file-plus text-[#D92D20]'></i>
                                </div>
                            </div>
                            <div className='text-[#000] font-semibold'>Diagnosis</div>
                            <div className='ml-auto'>
                                <Button onClick={() => setDiagnosisVisible(true)} className='text-[#175CD3] bg-[#EFF8FF] rounded-full py-1 px-2 text-xs border-0 shadow-none' size='small' label='Select' icon="pi pi-arrow-right" iconPos='right'/>
                            </div>
                        </div>
                        <div className='bg-[#EFF8FF] rounded-md mt-3'>
                            {
                               diagnosisList.length> 0 ? 
                                diagnosisList.map((ele, index) => (
                                    <div key={index} className='py-3 px-4 flex justify-between text-sm items-center border-b border-t-0 border-l-0 border-r-0 border-solid border-[#fff]'>
                                <div className='font-semibold text-[#000]'>{ele.diagnosisName}</div>
                                <div className='text-[#666666]'>Today’s reading: <span className='font-semibold text-[#000]'>{index}</span> </div>
                                <div><Button onClick={() => handelDiagnosisListDelete(index)
                                } className='text-[#f00] p-0 bg-transparent border-0 shadow-none w-auto' icon="pi pi-times"/></div>
                            </div>
                                ))
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-4 grid grid-cols-3 gap-4'>
                <div><Button onClick={() => setVisible(false)} className='bg-[#fff] text-[#175CD3] text-sm border-[#175CD3] shadow-none w-full' size='small' label="Cancel"/></div>
                <div><Button className='bg-[#EFF8FF] text-[#175CD3] text-sm border-[#EFF8FF] shadow-none w-full whitespace-nowrap' size='small' label="Save as  draft"/></div>
                <div><Button onClick={handelGenerate} className='bg-[#175CD3] text-[#fff] text-sm border-[#175CD3] shadow-none w-full' size='small' label="Generate"/></div>
            </div>
        </Sidebar>
        <Dialog header="Findings" visible={findingsvisible} onHide={() => setFindingsVisible(false)}
            style={{ width: '500px' }} breakpoints={{ '960px': '500px', '641px': '100vw' }}>
            <div>
                <Dropdown  value={selectFinding.name} onChange={(e) => handelFindingOnChange(e.value)} options={finding} optionLabel="name" 
                            filter placeholder="Search Chief complaints" className="w-full text-sm" />
                <div className='mt-2'>
                    <div className='text-sm text-[#667085] mb-2'>Selected findings</div>
                    {
                        selectFindingsItemList.length > 0 ?
                         selectFindingsItemList.map((ele, index) => (
                            <div key={index} className='flex flex-col gap-4'>
                        <div className='p-3 rounded-lg bg-[#EFF8FF]'>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#000] font-semibold'>{ele.name}</div>
                                <div>
                                <Button onClick={() => handelFindingDelete(index)} icon="pi pi-trash" className='bg-transparent p-0 border-0 shadow-none text-[#f00] w-auto'/> 
                                </div>
                            </div>
                            <div className='mt-2 grid grid-cols-2 gap-4'>
                                <div className=''>
                                    <div className='text-[#98A2B3] text-xs mb-1'>Reading:</div>
                                    <div>
                                        <InputText value={reading[index]} onChange={(e) => handleReadingOnChange(e.target.value, index)} className='text-sm w-full' placeholder='Enter today’s reading' />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='text-[#98A2B3] text-xs mb-1'>Attachment:</div>
                                    <div className='whiteupload'>
                                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*"  />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button className='bg-[#175CD3] border-[#175CD3]' onClick={() => handelFindingSave(ele.name, index)} label='Save' size='small'/>
                            </div>
                        </div>
                    </div>
                         ))
                        : null
                    }
                </div>
            </div>
        </Dialog>
        <Dialog header="Investigation" visible={investigationvisible} onHide={() => setInvestigationVisible(false)}
            style={{ width: '500px' }} breakpoints={{ '960px': '500px', '641px': '100vw' }}>
            <div>
                <Dropdown value={selectInvestigation.name} onChange={(e) => handelInvestigationOnChange(e.value)} options={investigation}  optionLabel="name" 
                            filter placeholder="Search Chief complaints" className="w-full text-sm" />
                <div className='mt-2'>
                    <div className='text-sm text-[#667085] mb-2'>Selected Investigation</div>
                    {
                        selectInvestigationItemList.length > 0 ? 
                        selectInvestigationItemList.map((ele, index) => (
                            <div key={index} className='flex flex-col gap-4'>
                        <div className='p-3 rounded-lg bg-[#EFF8FF]'>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#000] font-semibold'>{ele.name}</div>
                                <div>
                                <Button onClick={() => handelInvestigationItemListDelete(index)} icon="pi pi-trash" className='bg-transparent p-0 border-0 shadow-none text-[#f00] w-auto'/> 
                                </div>
                            </div>
                            <div className='mt-2 grid grid-cols-2 gap-4'>
                                <div className=''>
                                    <div className='text-[#98A2B3] text-xs mb-1'>Reading:</div>
                                    <div>
                                        <InputText value={investigationReading[index]} onChange={(e) =>handleInvestigationReadingOnChange(e.target.value, index) } className='text-sm w-full' placeholder='Enter today’s reading' />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='text-[#98A2B3] text-xs mb-1'>Attachment:</div>
                                    <div className='whiteupload'>
                                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button onClick={() => handelInvestigationSaveList(ele.name, index)} className='bg-[#175CD3] border-[#175CD3]' label='Save' size='small'/>
                            </div>
                        </div>
                    </div>
                        ))
                        : null
                    }
                </div>
            </div>
        </Dialog>
        <Dialog header="Diagnosis" visible={diagnosisvisible} onHide={() => setDiagnosisVisible(false)}
            style={{ width: '500px' }} breakpoints={{ '960px': '500px', '641px': '100vw' }}>
            <div>
                <Dropdown value={selectDiagnosis.name} onChange={(e) => handelDiagnosisOnChange(e.value)} options={diagnosis}  optionLabel="name" 
                            filter placeholder="Search Chief complaints"  className="w-full text-sm" />
                <div className='mt-2'>
                    <div className='text-sm text-[#667085] mb-2'>Selected Diagnosis</div>
                    {
                        selectItemDiagnosisList.length > 0 ? 
                        selectItemDiagnosisList.map((ele, index) => (
                            <div key={index} className='flex flex-col gap-4'>
                        <div className='p-3 rounded-lg bg-[#EFF8FF]'>
                            <div className='flex items-center justify-between'>
                                <div className='text-[#000] font-semibold'>{ele.name}</div>
                                <div>
                                <Button onClick={() => handelDiagnosisItemListDelete(index)} icon="pi pi-trash" className='bg-transparent p-0 border-0 shadow-none text-[#f00] w-auto'/> 
                                </div>
                            </div>
                            <div className='mt-2 grid grid-cols-2 gap-4'>
                                <div className=''>
                                    <div className='text-[#98A2B3] text-xs mb-1'>Reading:</div>
                                    <div>
                                        <InputText value={diagnosisReading[index]} onChange={(e) => handleDiagnosisReadingOnChange(e.target.value, index)} className='text-sm w-full' placeholder='Enter today’s reading' />
                                    </div>
                                </div>
                                <div className=''>
                                    <div className='text-[#98A2B3] text-xs mb-1'>Attachment:</div>
                                    <div className='whiteupload'>
                                        <FileUpload mode="basic" name="demo[]" url="/api/upload" accept="image/*" />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button onClick={() =>handleDiagnosisSaveList(ele.name,index) } className='bg-[#175CD3] border-[#175CD3]' label='Save' size='small'/>
                            </div>
                        </div>
                    </div>
                        ))
                        : null
                    }
                </div>
            </div>
        </Dialog>
        <Preview visible={previewVisible} setVisible={setPreviewVisible} id={newPrescriptionId!}/>
    </>
  )
}

