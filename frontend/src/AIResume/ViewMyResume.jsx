import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { format } from 'date-fns';
import Loader from '@/services/Loader';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import { FaDownload, FaShare, FaHome } from "react-icons/fa";
import html2pdf from 'html2pdf.js';
import { userState } from '@/store/auth';
import { useRecoilValue } from 'recoil';

const ViewMyResume = () => {
    const { resumeId } = useParams();
    const [resumeInfo, setResumeInfo] = useState(null);
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/userresume/getuserresumebyid/${resumeId}`);
                setResumeInfo(response.data.resume);
            } catch (error) {
                toast.error("Failed to fetch the resume");
            }
        };

        if (resumeId) {
            fetchResume();
        }

        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | ${resumeInfo?.firstName.toUpperCase()}'s RESUME`;
    }, [resumeId]);

    if (!resumeInfo) {
        return <Loader />;
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

    const handleShare = () => {
        const sharableLink = `${window.location.origin}/viewmyresume/${resumeInfo._id}/careerinsight/${user?._id}/${user?.fullName}`;

        navigator.clipboard.writeText(sharableLink)
            .then(() => {
                toast.success("Sharable link copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy the link to clipboard.");
            });
    };

    return (
        <div className='mx-auto lg:mx-60 xl:mx-60'>
            <div className="flex justify-between mb-5">
                <div className='flex flex-row gap-2'>
                    <Button
                        onClick={() => navigate("/resumebuilder")}
                        size="sm"
                        className="flex gap-1"

                    >
                        <IoMdArrowRoundBack size={20} />
                        Back
                    </Button>
                    <Button onClick={() => navigate("/dashboard")} size="sm" className="flex gap-2">
                        <FaHome size={20} />
                    </Button>
                </div>
                <div className='flex flex-row gap-2'>
                    <Button onClick={handleShare} size="sm" className="flex gap-2">
                        <FaShare size={20} />
                        Share
                    </Button>
                    <Button onClick={handleDownload} size="sm" className="flex gap-2">
                        <FaDownload size={20} />
                        Download
                    </Button>
                </div>
            </div>
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
                                <span style={{ fontFamily: resumeInfo?.fontStyle }}>{format(new Date(exp?.startDate), 'MMMM d, yyyy')} - {exp?.currentlyWorking ? 'Present' : format(new Date(exp?.endDate), 'MMMM d, yyyy')}</span></h2>
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
        </div>
    );
};

export default ViewMyResume;
