import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeContext';
import { Label } from '@/components/ui/label';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: ''
}

const ExperienceForm = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [experienceList, setExperienceList] = useState([
        formField
    ])

    useEffect(() => {
        if (resumeInfo.experience) {
            for (let i = 0; i < resumeInfo.experience.length; i++) {
                const { title, companyName, city, state, startDate, endDate, workSummery } = resumeInfo.experience[i];
                const newExperience = [...experienceList];
                newExperience[i] = {
                    title,
                    companyName,
                    city,
                    state,
                    startDate,
                    endDate,
                    workSummery
                }
                setExperienceList(newExperience);
            }
        }
    }, []);

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    }

    const addNewExp = () => {
        setExperienceList([...experienceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummery: ''
        }])
    }

    const removeExp = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1))
    }

    const handleRichChange = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        })
    }, [experienceList])
    return (
        <div className='p-5 rounded-lg shadow-lg border-t-primary border-t-8 bg-white'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your Previous Job Experience</p>
            <div>
                {experienceList.map((exp, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div>
                                <Label className="text-sm">Position Title</Label>
                                <Input placeholder="Enter your position..." name="title" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <Label className="text-sm">Company Name</Label>
                                <Input placeholder="Enter your company name..." name="companyName" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <Label className="text-sm">Company City</Label>
                                <Input placeholder="Enter your city..." name="city" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <Label className="text-sm">Company State</Label>
                                <Input placeholder="Enter your state..." name="state" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <Label className="text-sm">Start Date</Label>
                                <Input type="date" placeholder="Enter your start date..." name="startDate" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <Label className="text-sm">End Date</Label>
                                <Input type="date" placeholder="Enter your end date..." name="endDate" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div className='col-span-2'>
                                <RichTextEditor index={index} onRichTextEditorChange={(e) => handleRichChange(e, 'workSummery', index)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-2'>
                    <Button onClick={addNewExp} variant="outline" className="gap-1.5"><IoMdAdd size={20} /> Add More Experience</Button>
                    <Button onClick={removeExp} variant="outline" className="gap-1.5"><IoMdRemove size={20} /> Remove Experience</Button>
                </div>
                <Button>Save</Button>
            </div>
        </div>
    )
}

export default ExperienceForm
