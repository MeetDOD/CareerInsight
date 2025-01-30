import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosBulb } from "react-icons/io";
import Webcam from 'react-webcam';
import { BsFillWebcamFill } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { FaMicrophone, FaVolumeUp } from "react-icons/fa";
import { toast } from 'sonner';
import { chatSession } from '@/services/GeminiModel';
import { IoMdArrowRoundForward, IoMdArrowRoundBack } from "react-icons/io";

const InterviewQuestion = () => {
    const location = useLocation();
    const { questions } = location.state || {};
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        if (error) {
            console.error("Speech recognition error:", error);
            toast.error("Speech recognition error: " + error);
        }
    }, [error]);

    useEffect(() => {
        if (results.length > 0) {
            setUserAnswer(results.map(res => res.transcript).join(' '));
        }
    }, [results]);

    useEffect(() => {
        if (interimResult) {
            setUserAnswer(interimResult);
        }
    }, [interimResult]);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
            setUserAnswer('');
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setUserAnswer('');
        }
    };

    const saveUserAnswer = async () => {
        if (isRecording) {
            stopSpeechToText();
        } else {
            setUserAnswer('');
            startSpeechToText();
            return;
        }

        if (!userAnswer.trim()) {
            toast.error("No answer recorded.");
            return;
        }

        console.log("User Answer:", userAnswer);

        const currentQuestion = questions[currentQuestionIndex]?.question || '';
        const feedbackPrompt = `Question: ${currentQuestion}, User Answer: ${userAnswer}. ` +
            "Provide a rating in 4-6 lines and feedback in JSON format. Response must be in JSON: " +
            "{ rating: number, feedback: string }.";

        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockres = await result.response.text();
            const parsedResponse = JSON.parse(mockres.replace('```json', '').replace('```', ''));
            setFeedbacks(prev => [...prev, { question: currentQuestion, userAnswer, feedback: parsedResponse }]);
            setUserAnswer('');
        } catch (error) {
            console.error("Error fetching feedback:", error);
            toast.error("Error getting feedback.");
        }
    };

    const textToSpeach = (text) => {
        if ('speechSynthesis' in window) {
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            } else {
                const speech = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(speech);
            }
        } else {
            toast.error("Your browser doesn't support audio text-to-speech.");
        }
    };

    return (
        <div className='my-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className='p-5 border rounded-lg border-gray-300 shadow-md' style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                {questions?.length > 0 ? (
                    <div className="my-4 p-5 shadow-md rounded-lg ">
                        <div className='flex gap-2 items-center justify-between'>
                            <h3 className='bg-primary text-white p-2 px-4 border border-primary rounded-full text-xs md:text-sm text-center w-fit'>
                                Question {currentQuestionIndex + 1}
                            </h3>
                            <h2 className='text-sm font-bold my-2 mb-1 flex flex-row items-center gap-1 text-yellow-400'>
                                <div className="w-2 h-2 bg-yellow-400 rounded-full border border-yellow-600 animate-pulse"></div>
                                {questions[currentQuestionIndex].category}
                            </h2>
                        </div>
                        <h2 className='my-4 font-semibold text-md md:text-lg'>
                            {questions[currentQuestionIndex].question}
                        </h2>
                        <FaVolumeUp className='cursor-pointer' size={23} onClick={() => textToSpeach(questions[currentQuestionIndex].question)} />
                    </div>
                ) : (
                    <p>No questions available.</p>
                )}

                <div className='flex justify-between mt-7'>
                    {currentQuestionIndex > 0 && (
                        <Button onClick={handlePrevious} variant="secondary" className="border flex gap-1" size="lg">
                            <IoMdArrowRoundBack size={20} /> Previous
                        </Button>
                    )}

                    {currentQuestionIndex < questions?.length - 1 && (
                        <Button className="flex gap-1" onClick={handleNext} size="lg">
                            Next <IoMdArrowRoundForward size={20} />
                        </Button>
                    )}

                    {currentQuestionIndex === questions?.length - 1 && (
                        <Button
                            className="flex gap-1"
                            onClick={() => {
                                navigate('/interviewfeedback', { state: { feedbacks } });
                            }}
                            size="lg"
                        >
                            Submit
                        </Button>
                    )}
                </div>

                <div className='border rounded-lg p-5 bg-blue-100 mt-7'>
                    <h2 className='flex gap-2 items-center text-primary'>
                        <IoIosBulb size={25} />
                        <strong>Note: </strong>
                    </h2>
                    <p className='text-sm text-primary my-2'>
                        Click "Record Answer" to start answering. At the end, you will receive feedback and the correct answer for comparison.
                    </p>
                </div>
            </div>

            <div>
                <div className='flex flex-col justify-center items-center p-5 bg-primary rounded-lg relative'>
                    <BsFillWebcamFill className='absolute' size={250} color='white' />
                    <Webcam mirrored={true} style={{ width: "100%", borderRadius: "10px", zIndex: 10 }} />
                </div>

                <div className='my-5 flex justify-center gap-5'>
                    <Button onClick={() => window.history.back()} variant="secondary" className="border">
                        Cancel Test
                    </Button>
                    <Button onClick={saveUserAnswer}>
                        {isRecording ? (
                            <h2 className='flex gap-2 animate-pulse'><FaMicrophone size={20} /> Stop Recording...</h2>
                        ) : (
                            "Start Recording"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InterviewQuestion;
