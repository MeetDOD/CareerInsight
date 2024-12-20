import { Button } from '@/components/ui/button'
import React, { useContext, useState } from 'react'
import html2pdf from 'html2pdf.js';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeContext';
import { userState } from '@/store/auth';
import { useRecoilValue } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImSpinner2 } from 'react-icons/im';

const DonwloadResume = () => {
    const [resumeInfo] = useContext(ResumeInfoContext);
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    console.log(resumeInfo)

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/userresume/savemyresume`, {
                userId: user._id,
                resumeInfo,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success(response.data.message);
            navigate("/resumebuilder")
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving resume');
        } finally {
            setLoading(false);
        }
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
                    <Button className="px-7" onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <div className='flex flex-row gap-2 items-center'>
                                <ImSpinner2 className='animate-spin' /> Saving  your resume
                            </div>
                        ) : 'Save resume'}
                    </Button>
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default DonwloadResume
