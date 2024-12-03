import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { ResumeInfoContext } from '@/context/ResumeContext'
import { Button } from '@/components/ui/button'
import { IoMdAdd, IoMdRemove } from "react-icons/io";

const SkillForm = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }])

    useEffect(() => {
        if (resumeInfo.skills) {
            for (let i = 0; i < resumeInfo.skills.length; i++) {
                
                const { name, rating } = resumeInfo.skills[i];
                const newSkills = [...skillsList];
                newSkills[i] = {
                    name,
                    rating
                }
                setSkillsList(newSkills);
            }
        }
    }, []);

    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const addNewSkill = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0
        }])
    }

    const removeSkill = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1))
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList]);

    return (
        <div className='p-5 rounded-lg shadow-lg border-t-primary border-t-8 bg-white'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your Top Professional Skills</p>
            <div>
                {skillsList.map((skill, index) => (
                    <div>
                        <div key={index}>
                            <div className='flex justify-between items-center gap-3 border p-3 my-5 rounded-lg'>
                                <div className='w-1/2'>
                                    <Label className="text-sm">Skill Name</Label>
                                    <Input placeholder="Enter your skill name..." name="name" onChange={(e) => handleChange(index, 'name', e.target.value)} />
                                </div>
                                <div>
                                    <Rating style={{ maxWidth: 120 }} name="rating" value={skill.rating} onChange={(e) => handleChange(index, 'rating', e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex justify-between my-5'>
                <div className='flex gap-2'>
                    <Button onClick={addNewSkill} variant="outline" className="gap-1.5"><IoMdAdd size={20} /> Add More Skill</Button>
                    <Button onClick={removeSkill} variant="outline" className="gap-1.5"><IoMdRemove size={20} /> Remove Skill</Button>
                </div>
                <Button>Save</Button>
            </div>
        </div>
    )
}

export default SkillForm
