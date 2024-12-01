import { Button } from '@/components/ui/button';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { HiChevronUpDown } from "react-icons/hi2";

const InterviewFeedback = () => {
    const location = useLocation();
    const { feedbacks } = location.state || {};
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/mockinterview");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-green-500 mb-2 text-center mt-10">
                Congratulations on Completing the Interview!
            </h1>
            <h2 className='font-bold text-2xl mb-10 text-center'>
                Here is your interview feedback from A.I
            </h2>
            {feedbacks?.length > 0 ? (
                feedbacks.map((feedback, index) => (
                    <div key={index} className="mb-7 p-5 border rounded-lg bg-white shadow-md">
                        <p className='text-yellow-400 text-lg my-2'>
                            Rating for Question {index + 1}: <strong>{feedback.feedback.rating}</strong>
                        </p>
                        <h2 className='text-[15px] my-2 text-gray-800'>
                            Find below the interview question, your answer, and the correct AI feedback for comparison and improvement.
                        </h2>
                        <Collapsible>
                            <CollapsibleTrigger className='p-4 bg-violet-50 text-primary rounded-lg my-2 text-left flex justify-between gap-7 items-center'>
                                {feedback.question}<HiChevronUpDown size={22} />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='p-4 border rounded-lg bg-blue-100 text-blue-800'>
                                        <strong>Your Answer: </strong>
                                        {feedback.userAnswer}
                                    </h2>
                                    <h2 className='p-4 border rounded-lg bg-green-100 text-green-800'>
                                        <strong>Correct Answer: </strong>
                                        {feedback.feedback.feedback}
                                    </h2>
                                </div>
                            </CollapsibleContent>
                        </Collapsible>
                    </div>
                ))
            ) : (
                <div className='flex flex-col justify-center text-center items-center gap-5'>
                    <p className='font-bold text-xl'>No feedback available. Please give the mock interview again.</p>
                    <Button onClick={handleNavigate} className="w-fit" size="lg">Give Interview</Button>
                </div>
            )}
        </div>
    );
};

export default InterviewFeedback;
