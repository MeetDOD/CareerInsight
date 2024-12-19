import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeContext';
import React, { useContext, useEffect, useState } from 'react';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const initialEducation = {
    universityName: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: '',
};

const EducationForm = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [educationalList, setEducationalList] = useState(resumeInfo.education || [initialEducation]);

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList,
        });
    }, [educationalList]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = educationalList.slice();
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    };

    const addNewEdu = () => {
        setEducationalList([...educationalList, { ...initialEducation }]);
    };

    const removeEdu = () => {
        if (educationalList.length > 1) {
            setEducationalList(educationalList.slice(0, -1));
        }
    };

    return (
        <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-8">
            <h2 className="font-bold text-lg">Education</h2>
            <p>Add Your Educational Details</p>
            <div>
                {educationalList.map((edu, index) => (
                    <div key={index}>
                        <div
                            className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg border-gray-300"
                            style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                        >
                            <div className="col-span-2">
                                <Label className="text-sm">University Name</Label>
                                <Input
                                    className="inputField"
                                    placeholder="Enter your university name..."
                                    name="universityName"
                                    value={edu.universityName}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Degree</Label>
                                <Input
                                    className="inputField"
                                    placeholder="Enter your degree..."
                                    name="degree"
                                    value={edu.degree}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Major</Label>
                                <Input
                                    className="inputField"
                                    placeholder="Enter your major..."
                                    name="major"
                                    value={edu.major}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Start Date</Label>
                                <Input
                                    className="inputField"
                                    type="date"
                                    name="startDate"
                                    value={edu.startDate}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">End Date</Label>
                                <Input
                                    className="inputField"
                                    type="date"
                                    name="endDate"
                                    value={edu.endDate}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="col-span-2">
                                <Label className="text-sm">Description</Label>
                                <Textarea
                                    className="inputField"
                                    placeholder="Enter your description..."
                                    name="description"
                                    value={edu.description}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between my-5">
                <Button onClick={addNewEdu} variant="secondary" className="gap-1.5 border">
                    <IoMdAdd size={20} /> Add More Education
                </Button>
                <Button onClick={removeEdu} variant="secondary" className="gap-1.5 border">
                    <IoMdRemove size={20} /> Remove Education
                </Button>
            </div>
        </div>
    );
};

export default EducationForm;
