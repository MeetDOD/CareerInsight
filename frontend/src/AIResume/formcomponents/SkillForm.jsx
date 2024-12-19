import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useContext, useEffect, useState } from 'react';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { ResumeInfoContext } from '@/context/ResumeContext';
import { Button } from '@/components/ui/button';
import { IoMdAdd, IoMdRemove } from 'react-icons/io';

const SkillForm = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [skillsList, setSkillsList] = useState([
        {
            name: '',
            rating: 0,
        },
    ]);

    useEffect(() => {
        if (resumeInfo.skills && Array.isArray(resumeInfo.skills)) {
            const newSkills = resumeInfo.skills.map((skill) => ({
                name: skill.name || '',
                rating: skill.rating || 0,
            }));
            setSkillsList(newSkills.length > 0 ? newSkills : [{ name: '', rating: 0 }]);
        }
    }, []);

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const addNewSkill = () => {
        setSkillsList([
            ...skillsList,
            {
                name: '',
                rating: 0,
            },
        ]);
    };

    const removeSkill = () => {
        if (skillsList.length > 1) {
            setSkillsList((skillsList) => skillsList.slice(0, -1));
        }
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList,
        });
    }, [skillsList]);

    return (
        <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-8">
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add Your Top Professional Skills</p>
            <div>
                {skillsList.map((skill, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center gap-3 border p-3 my-5 rounded-lg border-gray-300" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                            <div className="w-1/2">
                                <Label className="text-sm">Skill Name</Label>
                                <Input className="inputField" placeholder="Enter your skill name..." value={skill.name} name="name" onChange={(e) => handleChange(index, 'name', e.target.value)} />
                            </div>
                            <div>
                                <Rating style={{ maxWidth: 120 }} name="rating" value={skill.rating} onChange={(value) => handleChange(index, 'rating', value)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between my-5">
                <Button onClick={addNewSkill} variant="secondary" className="gap-1.5 border">
                    <IoMdAdd size={20} /> Add More Skill
                </Button>
                <Button onClick={removeSkill} variant="secondary" className="gap-1.5 border">
                    <IoMdRemove size={20} /> Remove Skill
                </Button>
            </div>
        </div>
    );
};

export default SkillForm;
