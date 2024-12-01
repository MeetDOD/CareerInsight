import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

const MockInterviewForm = ({ onSubmit }) => {
    const [jobRole, setJobRole] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [experience, setExperience] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ jobRole, jobDesc, experience });
    };

    return (
        <div className='flex flex-col gap-3 justify-center items-center'>
            <div className='my-5 text-center gap-2 flex flex-col'>
                <h2 className='font-bold text-2xl'>Enter Interview Details</h2>
                <p className='font-semibold text-lg'>Fill the details properly to get question as per your choice</p>
            </div>
            <form onSubmit={handleSubmit} className='md:w-1/2 sm:w-full w-full gap-3 p-5 rounded-lg shadow-lg border-t-primary border-t-8 bg-white'>
                <div className='my-3'>
                    <Label className="font-bold text-[17px]">Job Position/Role</Label>
                    <Input placeholder="Enter your job position or job role..." className="mt-2" type="text" value={jobRole} onChange={(e) => setJobRole(e.target.value)} required />
                </div>
                <div className='my-3'>
                    <Label className="font-bold text-[17px]">Job Description/Tech Stack</Label>
                    <Textarea placeholder="Enter your job description or tech stack..." className="mt-2" type="text" value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} required />
                </div>
                <div className='my-3 mb-7'>
                    <Label className="font-bold text-[17px]">Years of Experience</Label>
                    <Input placeholder="Enter your year of experience..." className="mt-2" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required />
                </div>
                <div className='flex justify-between'>
                    <Button variant="secondary" className="border" type="button" onClick={() => window.history.back()}>Cancel Interview</Button>
                    <Button type="submit">Start Interview</Button>
                </div>
            </form>
        </div>
    );
};

export default MockInterviewForm;
