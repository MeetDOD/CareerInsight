import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import html2pdf from 'html2pdf.js';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeContext';

const DonwloadResume = () => {
    const [resumeInfo] = useContext(ResumeInfoContext);

    const handleSubmit = () => {
        console.log(resumeInfo)
    }
    const handleDownload = () => {
        const resume = document.getElementById('resume-preview');

        html2pdf().from(resume).set({
            margin: 1,
            filename: 'My_Resume.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { format: 'a4', orientation: 'portrait' }
        }).save();

        toast.success("Resume downloaded successfully")
    };
    return (
        <div className='p-5 rounded-lg shadow-lg border-t-primary border-t-8'>
            <div className='my-5'>
                <h2 className='text-center text-3xl font-bold'>Congrats your resume is ready</h2>
                <p className='text-center text-lg font-semibold py-3'>You can now download, save and share with potential clients and friends</p>
                <div className='flex justify-center pt-5 gap-5'>
                    <Button onClick={handleDownload} >Download</Button>
                    <Button className="px-7" onClick={handleSubmit}>Save </Button>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default DonwloadResume
