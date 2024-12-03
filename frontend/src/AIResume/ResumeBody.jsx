import React, { useState } from 'react'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeContext'
import dummyresume from '@/data/dummyresume'

const ResumeBody = () => {
    const [resumeInfo, setResumeInfo] = useState(dummyresume);

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
