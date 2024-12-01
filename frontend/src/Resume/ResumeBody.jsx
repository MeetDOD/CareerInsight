import React, { useEffect, useState } from 'react'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeContext'
import dummyresume from '@/data/dummyresume'
import { getResumeData } from '@/lib/resume.helper'

const ResumeBody = () => {
    const [resumeInfo, setResumeInfo] = useState(dummyresume);
    useEffect(() => {
        const getMyResume = async () => {
            const resume = await getResumeData();



            if (resume) {
                console.log("RESUME: fetched", resume);
                setResumeInfo(resume);
            }else{
                setResumeInfo(dummyresume);
            }
        }
        getMyResume();
    }, []);
    return (
        <ResumeInfoContext.Provider value={[resumeInfo, setResumeInfo]}>
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                <ResumeForm />
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ResumeBody
