import { Button } from '@/components/ui/button';
import { chatSession } from '@/services/GeminiModel';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BsFillWebcamFill } from "react-icons/bs";
import Webcam from "react-webcam";
import { IoIosBulb } from "react-icons/io";
import { ImSpinner2 } from "react-icons/im";

const InterviewSession = () => {
    const location = useLocation();
    const { formData } = location.state || {};
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [webCamEnabled, setWebCamEnabled] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = (questions) => {
        navigate("/interviewstarts", { state: { formData, questions } });
    }

    const summeryGenerater = async () => {
        setLoading(true);
        const prompt = `Job Role: ${formData?.jobRole}, Job Description: ${formData?.jobDesc}, Years of Experience: ${formData?.experience}. 
        Based on this information, generate 5 interview questions tailored to the job role and the candidate's experience. 
        Ensure that the questions cover both technical skills and behavioral aspects. 
        Note: Give response in JSON only.
        Provide the response in JSON format like this:
        [
        {
            "question": "Question 1",
            "category": "Technical/Behavioral"
        },
        {
            "question": "Question 2",
            "category": "Technical/Behavioral"
        },
        {
            "question": "Question 3",
            "category": "Technical/Behavioral"
        },
        {
            "question": "Question 4",
            "category": "Technical/Behavioral"
        },
        {
            "question": "Question 5",
            "category": "Technical/Behavioral"
        }
        ]`;

        try {
            const result = await chatSession.sendMessage(prompt);
            const res = await result.response.text();
            const parsedResponse = JSON.parse(res.replace('```json', '').replace('```', ''));
            setResponse(parsedResponse);
            setLoading(false);
            handleNavigate(parsedResponse);
        } catch (error) {
            console.error("Error generating questions: ", error);
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='flex flex-col gap-5 '>
                    <div className='flex flex-col p-5 gap-5 rounded-lg border border-gray-300 shadow-md' style={{ backgroundColor: `var(--background-color)`, borderColor: `var(--borderColor)` }}>
                        <h2 className='text-lg'><strong>Job Role/Job Position: </strong>{formData?.jobRole}</h2>
                        <h2 className='text-lg'><strong>Job Description/Tech Stack: </strong>{formData?.jobDesc}</h2>
                        <h2 className='text-lg'><strong>Years of Experience: </strong>{formData?.experience}</h2>
                    </div>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='text-lg font-bold flex gap-1 items-center text-yellow-500'><IoIosBulb size={25} /><strong>Information</strong></h2>
                        <h2 className='gap-1 mt-3 text-yellow-500 font-medium'>
                            Please enable your webcam and microphone to begin the AI-powered mock interview. The session consists of 5 tailored questions, designed to assess both your technical skills and behavioral responses. Upon completion, you will receive a detailed report based on your answers, providing valuable feedback for your interview preparation.
                            <br /><br />
                            <strong>Note:</strong> Your privacy is important to us. We do not record or store any video footage from the webcam. You are free to disable webcam and microphone access at any time.
                        </h2>
                    </div>
                </div>
                <div>
                    {webCamEnabled ? (
                        <Webcam
                            onUserMedia={() => setWebCamEnabled(true)}
                            onUserMediaError={() => setWebCamEnabled(false)}
                            mirrored={true}
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    ) : (
                        <div className='items-center flex flex-col'>
                            <BsFillWebcamFill className='border  border-gray-300 p-20 h-96 w-full rounded-lg shadow-md' style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }} />
                            <Button variant="ghost" className="border w-full my-5 text-[17px]" size="lg" onClick={() => setWebCamEnabled(true)}>
                                Please Enable WebCam/MicroPhone
                            </Button>
                        </div>
                    )}
                    <div className='flex justify-between my-5'>
                        <Button onClick={() => window.history.back()} variant="secondary" className="border" size="lg">Cancel</Button>
                        <Button
                            onClick={() => summeryGenerater()}
                            size="lg"
                            disabled={loading}
                        >
                            {loading ? <div className='flex flex-row gap-2'><ImSpinner2 size={20} className='animate-spin' /> Starting...</div> : "Start Now"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InterviewSession;
