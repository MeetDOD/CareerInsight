import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { format } from 'date-fns';

const ViewMyResume = () => {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/userresume/getuserresumebyid/${resumeId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setResumeInfo(response.data.resume);
            } catch (error) {
                toast.error("Failed to fetch the resume");
            }
        };

        if (resumeId) {
            fetchResume();
        }
    }, [resumeId]);

    if (!resumeInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div id="resume-preview" className='shadow-lg h-full p-7 border-t-[20px] bg-white rounded-lg'
            style={{
                borderColor: resumeInfo?.themeColor,
            }}>
            <div>
                <h2 className='font-bold text-xl text-center'
                    style={{
                        color: resumeInfo?.themeColor,
                        fontFamily: resumeInfo?.fontStyle
                    }}>
                    {resumeInfo?.firstName} {resumeInfo?.lastName}
                </h2>
                <h2 className='text-center font-medium text-sm text-black' style={{
                    fontFamily: resumeInfo?.fontStyle
                }}>
                    {resumeInfo?.jobTitle}
                </h2>
                <h2 className='text-center font-normal text-xs'
                    style={{
                        color: resumeInfo?.themeColor,
                        fontFamily: resumeInfo?.fontStyle
                    }}>
                    {resumeInfo?.address}
                </h2>

                <div className='flex justify-between'>
                    <h2 className='font-normal text-xs'
                        style={{
                            color: resumeInfo?.themeColor,
                            fontFamily: resumeInfo?.fontStyle
                        }}>{resumeInfo?.phone}
                    </h2>
                    <h2 className='font-normal text-xs'
                        style={{
                            color: resumeInfo?.themeColor,
                            fontFamily: resumeInfo?.fontStyle
                        }}>{resumeInfo?.email}</h2>
                </div>

                <hr className='border-[1.5px] my-2'
                    style={{
                        borderColor: resumeInfo?.themeColor
                    }}
                />
            </div>

            <p className='text-xs text-black' style={{ fontFamily: resumeInfo?.fontStyle }}>
                {resumeInfo?.summary}
            </p>

            <div className='my-6'>
                <h2 className='text-center font-bold text-sm mb-2'
                    style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}
                >Professional Experience</h2>
                <hr style={{ borderColor: resumeInfo?.themeColor }} />
                {resumeInfo?.experience.map((exp, index) => (
                    <div key={index} className='my-5'>
                        <h2 className='text-[15px] font-bold' style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}>{exp?.title}</h2>
                        <h2 className='text-xs flex justify-between text-black' style={{ fontFamily: resumeInfo?.fontStyle }}>{exp?.companyName}, {exp?.city}, {exp?.state}
                            <span style={{ fontFamily: resumeInfo?.fontStyle }}>{format(new Date(exp?.startDate), 'MMMM d, yyyy')} - {format(new Date(exp?.endDate), 'MMMM d, yyyy')}</span></h2>
                        <div className='text-xs my-2 previewStyle text-black' style={{ fontFamily: resumeInfo?.fontStyle }} dangerouslySetInnerHTML={{ __html: exp.workSummary }} />
                    </div>
                ))}
            </div>

            <div>
                <h2 className='text-center font-bold text-sm mb-2'
                    style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}
                >Education</h2>
                <hr style={{ borderColor: resumeInfo?.themeColor }} />
                {resumeInfo?.education.map((edu, index) => (
                    <div key={index} className='my-5'>
                        <h2 className='text-[15px] font-bold' style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}>{edu?.universityName}</h2>
                        <h2 className='text-xs flex justify-between text-black' style={{ fontFamily: resumeInfo?.fontStyle }}>{edu?.degree} in {edu?.major} <span style={{ fontFamily: resumeInfo?.fontStyle }}>{format(new Date(edu?.startDate), 'MMMM d, yyyy')} - {format(new Date(edu?.endDate), 'MMMM d, yyyy')}</span></h2>
                        <p className='text-xs my-2 text-black' style={{ fontFamily: resumeInfo?.fontStyle }}>{edu?.description}</p>
                    </div>
                ))}
            </div>

            <div>
                <h2 className='text-center font-bold text-sm mb-2'
                    style={{ color: resumeInfo?.themeColor, fontFamily: resumeInfo?.fontStyle }}
                >Skills</h2>
                <hr style={{ borderColor: resumeInfo?.themeColor }} />
                <div className='grid grid-cols-2 gap-3 my-4'>
                    {resumeInfo?.skills.map((skill, index) => (
                        <div key={index} className='flex items-center justify-between'>
                            <h2 className='text-xs text-black' style={{ fontFamily: resumeInfo?.fontStyle }}>{skill?.name}</h2>
                            <div className='h-2 bg-gray-200 w-[120px]'>
                                <div className='h-2' style={{ backgroundColor: resumeInfo?.themeColor, width: skill.rating * 20 + '%' }}>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewMyResume;
