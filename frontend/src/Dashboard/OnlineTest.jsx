import MockInterviewForm from '@/AIInterview/MockInterviewForm';
import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const OnlineTest = () => {
    const navigate = useNavigate();

    const handleFormSubmit = (formData) => {
        navigate('/interviewsession', { state: { formData } });
    };
    return (
        <div>
            <button
                onClick={() => window.history.back()}
                className="px-2 py-1 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded"
            >
                <IoMdArrowRoundBack size={20} />
            </button>

            <div className="w-full p-10 my-5 rounded-lg bg-violet-700 text-center">
                <div className="my-5">
                    <h1 className="text-2xl md:text-4xl text-gray-50 font-bold leading-tight pb-2">
                        Build Your Professional Resume in Minutes
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100 pb-2 mt-3">
                        Our intuitive platform helps you design and customize resumes tailored to your career goals.
                    </p>
                </div>
            </div>

            <div>
                <MockInterviewForm onSubmit={handleFormSubmit} />
            </div>
        </div>
    )
}

export default OnlineTest
