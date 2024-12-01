import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeContext';
import React, { useContext, useEffect, useState } from 'react'
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const EducationForm = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }
    ]);

    const handleChange = (index, event) => {
        const newEntries = educationalList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    }

    const addNewEdu = () => {
        setEducationalList([...educationalList, {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: ''
        }])
    }

    const removeEdu = () => {
        setEducationalList(educationalList => educationalList.slice(0, -1))
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList
        })
    }, [educationalList])
    return (
        <div className='p-5 rounded-lg shadow-lg border-t-primary border-t-8 bg-white'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your Educational Details</p>
            <div>
                {educationalList.map((edu, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <Label className="text-sm">University Name</Label>
                                <Input placeholder="Enter your universityName..." name="universityName" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <Label className="text-sm">Degree</Label>
                                <Input placeholder="Enter your degree..." name="degree" onChange={(e) => handleChange(index, e)} />
                            </div>
                            <div>
                                <Label className="text-sm">Major</Label>
                                <Input placeholder="Enter your major..." name="major" onChange={(e) => handleChange(index, e)} />
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
                                <Label className="text-sm">Description</Label>
                                <Textarea placeholder="Enter your description..." name="description" onChange={(e) => handleChange(index, e)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-2'>
                    <Button onClick={addNewEdu} variant="outline" className="gap-1.5"><IoMdAdd size={20} /> Add More Education</Button>
                    <Button onClick={removeEdu} variant="outline" className="gap-1.5"><IoMdRemove size={20} /> Remove Education</Button>
                </div>
                <Button>Save</Button>
            </div>
        </div>
    )
}

export default EducationForm
