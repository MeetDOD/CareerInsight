import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaClock, FaLanguage } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chatSession } from '@/services/GeminiModel';
import { ImSpinner2 } from 'react-icons/im';
import getVideos from '@/services/YTModel';
import { useRecoilState, useRecoilValue } from 'recoil';
import { finalCourseState, responseState } from '@/store/courseState';
import { Input } from '@/components/ui/input';
import learn from "../assets/learn.gif"
import { motion } from 'framer-motion';
import { BsStars } from 'react-icons/bs';
import { toast } from 'sonner';

const CourseLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const courseData = useRecoilValue(responseState);
    const [finalCourse, setFinalCourse] = useRecoilState(finalCourseState);
    const location = useLocation();
    const thumbnail = location.state?.thumbnail;
    const [customThumbnail, setCustomThumbnail] = useState('');
    const [imageURL, setImageURL] = useState(thumbnail);

    const handleThumbnailChange = (e) => {
        setCustomThumbnail(e.target.value);
    };

    const handleUseCustomThumbnail = () => {
        if (customThumbnail) {
            setImageURL(customThumbnail);
        }
    };

    const handleResetToDefaultImage = () => {
        setImageURL(thumbnail);
    };

    if (!courseData || courseData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-3xl font-bold">No course data available.</h2>
                <p className="font-semibold text-xl mt-2">Please create a course first.</p>
            </div>
        );
    }

    const course = courseData[0];

    const generateCourseContent = async () => {
        setLoading(true);
        const chapters = course.chapters || [];
        const finalChapters = [];

        try {
            for (const chapter of chapters) {
                const courseLayoutPrompt = import.meta.env.VITE_COURSELAYOUT_PROMPT;

                const prompt = courseLayoutPrompt
                    .replace("${course.courseName}", course.courseName)
                    .replace("${chapter.chapterName}", chapter.chapterName);

                const result = await chatSession.sendMessage(prompt);
                const data = await result.response.text();
                const cleanedData = data.replace(/```json|```/g, '');
                const parsedResponse = JSON.parse(cleanedData);

                try {
                    const videoResult = await getVideos(`${course.courseName} ${chapter.chapterName}`);
                    const videoId = videoResult[0]?.id?.videoId || null;

                    finalChapters.push({
                        title: parsedResponse.title,
                        explanation: parsedResponse.explanation,
                        sections: parsedResponse.sections,
                        videoId,
                        duration: chapter.duration
                    });

                } catch (error) {
                    if (error.message.includes("daily limit")) {
                        toast.error("You have reached the daily limit of course generation.");
                        navigate("/dashboard");
                        return;
                    }
                    console.error(`Error fetching video for "${chapter.chapterName}":`, error);
                }
            }

            setFinalCourse({
                courseName: course.courseName,
                chapters: finalChapters,
                thumbnail: imageURL
            });

            navigate('/finalcourse');

        } catch (error) {
            console.error('Error generating course content:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | MY COURSE LAYOUT`;
    }, []);


    return (
        <div className="min-h-screen">
            <div className="relative shadow-lg text-white rounded-xl bg-cover bg-center" style={{
                backgroundImage: `url('https://static.canva.com/web/images/e733916c4616f5baa19098cc2844369b.jpg')`,
            }}>
                <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            src={imageURL}
                            alt={course.courseName}
                            className="rounded-xl shadow-lg w-full max-w-sm md:max-w-full object-cover"
                        />
                        <div className="mt-6 w-full">
                            <Input
                                type="text"
                                placeholder="Enter image URL"
                                value={customThumbnail}
                                onChange={handleThumbnailChange}
                                className="bg-white border-black text-black"
                            />
                            <div className='flex flex-row gap-4 mt-5'>
                                <Button
                                    onClick={handleUseCustomThumbnail}
                                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-lg"
                                >
                                    Use Custom Image
                                </Button>
                                <Button
                                    onClick={handleResetToDefaultImage}
                                    className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold rounded-lg"
                                >
                                    Default Image
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                            {course.courseName}
                        </h1>
                        <p className="text-lg mb-5 text-gray-200 font-semibold tracking-tight text-justify">{course.description}</p>
                        <div className="flex flex-wrap items-center justify-between rounded-lg">
                            <div className="flex items-center gap-2 flex-wrap">
                                <img className="rounded-md w-9 h-9" src={learn} alt="Learn More" />
                                <span className="text-[17px] font-semibold text-white">
                                    {course.topic}
                                </span>
                            </div>
                        </div>
                        <motion.div
                            className="relative p-[2px] rounded-lg mt-6"
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: "200% 50%" }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            style={{
                                background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff0, #ff00ff)",
                                backgroundSize: "200% 200%",
                            }}
                        >
                            <Button
                                onClick={generateCourseContent}
                                type="button"
                                size="sm"
                                disabled={loading}
                                className="relative z-10 bg-primary hover:bg-primary/50 text-white border-none w-full flex items-center gap-2"
                            >
                                {loading ?
                                    <>
                                        <ImSpinner2 size={20} className="animate-spin" /> Generating course content from AI ...
                                    </>
                                    :
                                    <>
                                        <BsStars size={20} /> Generate course content from AI
                                    </>
                                }
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="py-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 shadow-md rounded-lg border border-primary border-l-4 border-r-4">
                        <div className="flex flex-row items-center gap-4 text-start justify-center">
                            <div className="p-1.5 rounded-md bg-primary">
                                <MdCategory className="text-white" size={35} />
                            </div>
                            <div>
                                <span className="font-semibold text-sm sm:text-xs md:text-sm lg:text-base">Category</span>
                                <p className="text-lg sm:text-sm md:text-lg lg:text-xl font-bold">{course.category}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 text-start justify-center">
                            <div className="p-1.5 rounded-md bg-primary">
                                <FaClock className="text-white" size={35} />
                            </div>
                            <div>
                                <span className="font-semibold text-sm sm:text-xs md:text-sm lg:text-base">Course Level</span>
                                <p className="text-lg sm:text-sm md:text-lg lg:text-xl font-bold">{course.courseLevel}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 text-start justify-center">
                            <div className="p-1.5 rounded-md bg-primary">
                                <AiOutlineFieldTime className="text-white" size={35} />
                            </div>
                            <div>
                                <span className="font-semibold text-sm sm:text-xs md:text-sm lg:text-base">Course Duration</span>
                                <p className="text-lg sm:text-sm md:text-lg lg:text-xl font-bold">{course.duration}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 text-start justify-center">
                            <div className="p-1.5 rounded-md bg-primary">
                                <FaLanguage className="text-white" size={35} />
                            </div>
                            <div>
                                <span className="font-semibold text-sm sm:text-xs md:text-sm lg:text-base">Language</span>
                                <p className="text-lg sm:text-sm md:text-lg lg:text-xl font-bold">{course.language}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="space-y-6">
                {course.chapters?.map((chapter, index) => (
                    <Card key={index} className="border-l-4 border-primary shadow-md" style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                {`Chapter ${index + 1}: ${chapter.chapterName}`}
                            </CardTitle>
                            <CardDescription className="mt-1 font-semibold">{chapter.aboutChapter}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-md bg-primary">
                                    <AiOutlineFieldTime className="text-white" size={20} />
                                </div>
                                <span><strong>Duration:</strong> {chapter.duration}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div >
    );
};

export default CourseLayout;