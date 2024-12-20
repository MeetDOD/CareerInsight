import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';
import React, { useContext, useEffect, useState } from 'react';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeContext';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    workSummary: '',
};

const ExperienceForm = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [experienceList, setExperienceList] = useState(resumeInfo.experience || [formField]);

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList,
        });
    }, [experienceList]);

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const addNewExp = () => {
        setExperienceList([...experienceList, formField]);
    };

    const removeExp = () => {
        setExperienceList(experienceList.slice(0, -1));
    };

    const handleRichChange = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    };

    return (
        <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-8">
            <h2 className="font-bold text-lg">Professional Experience</h2>
            <p>Add Your Previous Job Experience</p>
            <div>
                {experienceList.map((exp, index) => (
                    <div key={index}>
                        <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg" style={{ borderColor: `var(--borderColor)` }}>
                            <div>
                                <Label className="text-sm">Position Title</Label>
                                <Input
                                    className="inputField"
                                    placeholder="Enter your position..."
                                    name="title"
                                    value={exp.title || ''}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Company Name</Label>
                                <Input
                                    className="inputField"
                                    placeholder="Enter your company name..."
                                    name="companyName"
                                    value={exp.companyName || ''}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Company City</Label>
                                <Input
                                    className="inputField"
                                    placeholder="Enter your city..."
                                    name="city"
                                    value={exp.city || ''}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Company State</Label>
                                <Input
                                    className="inputField"
                                    placeholder="Enter your state..."
                                    name="state"
                                    value={exp.state || ''}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">Start Date</Label>
                                <Input
                                    className="inputField"
                                    type="date"
                                    name="startDate"
                                    value={exp.startDate || ''}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div>
                                <Label className="text-sm">End Date</Label>
                                <Input
                                    className="inputField"
                                    type="date"
                                    name="endDate"
                                    value={exp.endDate || ''}
                                    onChange={(e) => handleChange(index, e)}
                                    disabled={exp.currentlyWorking}
                                />
                            </div>
                            <div className="flex items-center mt-2">
                                <Checkbox
                                    id={`currently-working-${index}`}
                                    checked={exp.currentlyWorking}
                                    onCheckedChange={(checked) => {
                                        const newEntries = experienceList.slice();
                                        newEntries[index].currentlyWorking = checked;
                                        setExperienceList(newEntries);
                                    }}
                                />
                                <Label htmlFor={`currently-working-${index}`} className="ml-2 text-sm">Currently Working</Label>
                            </div>
                            <div className="col-span-2">
                                <RichTextEditor
                                    index={index}
                                    onRichTextEditorChange={(e) => handleRichChange(e, 'workSummary', index)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between my-5">
                <Button onClick={addNewExp} variant="secondary" className="gap-1.5 border">
                    <IoMdAdd size={20} /> Add More Experience
                </Button>
                <Button onClick={removeExp} variant="secondary" className="gap-1.5 border">
                    <IoMdRemove size={20} /> Remove Experience
                </Button>
            </div>
        </div>
    );
};

export default ExperienceForm;
