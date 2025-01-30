import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';

const SelectOptions = ({ options, setOptions }) => {
    const handleOptionChange = (key, value) => {
        setOptions(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className='my-20 px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col gap-3'>
                    <Label>Difficulty Level</Label>
                    <Select onValueChange={(value) => handleOptionChange('difficulty', value)}>
                        <SelectTrigger className="inputField">
                            <SelectValue placeholder="Select Level" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advance">Advance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-3'>
                    <Label>Course Duration</Label>
                    <Select onValueChange={(value) => handleOptionChange('duration', value)}>
                        <SelectTrigger className="inputField">
                            <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                            <SelectItem value="4 Hours">4 Hours</SelectItem>
                            <SelectItem value="6 Hours">6 Hours</SelectItem>
                            <SelectItem value="8 Hours">8 Hours</SelectItem>
                            <SelectItem value="10 Hours">10 Hours</SelectItem>
                            <SelectItem value="12 Hours">12 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-3'>
                    <Label>No. of Chapters</Label>
                    <Select onValueChange={(value) => handleOptionChange('chapters', value)}>
                        <SelectTrigger className="inputField">
                            <SelectValue placeholder="Select No. of Chapters" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                            <SelectItem value="4">4 Chapters</SelectItem>
                            <SelectItem value="8">8 Chapters</SelectItem>
                            <SelectItem value="12">12 Chapters</SelectItem>
                            <SelectItem value="16">16 Chapters</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='flex flex-col gap-3'>
                    <Label>Language</Label>
                    <Select onValueChange={(value) => handleOptionChange('language', value)}>
                        <SelectTrigger className="inputField">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Hindi">Hindi</SelectItem>
                            <SelectItem value="Marathi">Marathi</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default SelectOptions;
