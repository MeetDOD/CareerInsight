import { ResumeInfoContext } from '@/context/ResumeContext';
import React, { useContext } from 'react'
import PersonalDetailPreview from './previewcomponents/PersonalDetailPreview';
import SummeryPreview from './previewcomponents/SummeryPreview';
import ExperiencePreview from './previewcomponents/ExperiencePreview';
import EducationalPreview from './previewcomponents/EducationalPreview';
import SkillPreview from './previewcomponents/SkillPreview';

const ResumePreview = () => {
    const [resumeInfo] = useContext(ResumeInfoContext);

    return (
        <div id="resume-preview" className='shadow-lg h-full p-7 border-t-[20px] bg-white rounded-lg'
            style={{
                borderColor: resumeInfo?.themeColor,
            }}
        >
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummeryPreview resumeInfo={resumeInfo} />
            <ExperiencePreview resumeInfo={resumeInfo} />
            <EducationalPreview resumeInfo={resumeInfo} />
            <SkillPreview resumeInfo={resumeInfo} />
        </div>
    )
}

export default ResumePreview
