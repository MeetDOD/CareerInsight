import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaClock, FaLanguage } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { FaHandHoldingHeart } from "react-icons/fa6";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chatSession } from '@/services/GeminiModel';
import { ImSpinner2 } from 'react-icons/im';
import getVideos from '@/services/YTModel';

const CourseLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { courseData } = location.state || {};

    if (!courseData || courseData.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-800">No course data available.</h2>
                <p className="text-gray-600 mt-2">Please create a course first.</p>
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
                const prompt = `Explain the concept in detail on topic: ${course.courseName}, chapter: ${chapter.chapterName} in JSON format with fields: title, explanation, sections (with fields: subtitle, content). Ensure the response is JSON only.`;

                try {
                    const result = await chatSession.sendMessage(prompt);
                    const data = await result.response.text();
                    const cleanedData = data.replace(/```json|```/g, '');
                    const parsedResponse = JSON.parse(cleanedData);

                    const videoResult = await getVideos(`${course.courseName}:${chapter.chapterName}`);
                    const videoId = videoResult[0]?.id?.videoId || null;

                    finalChapters.push({
                        title: parsedResponse.title,
                        explanation: parsedResponse.explanation,
                        duration: parsedResponse.duration,
                        sections: parsedResponse.sections,
                        videoId,
                    });

                    console.log(finalChapters)
                } catch (error) {
                    console.error(`Error processing chapter "${chapter.chapterName}":`, error);
                }
            }

            navigate('/finalcourse', {
                state: {
                    courseName: course.courseName,
                    chapters: finalChapters,
                },
            });
        } catch (error) {
            console.error('Error generating course content:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="relative shadow-lg bg-gradient-to-r from-indigo-500 to-purple-950 text-white rounded-xl">
                <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center justify-center">
                        <img
                            src="https://miro.medium.com/v2/resize:fit:1200/1*QJnvahq_EBdUGjYQUYrhvA.png"
                            alt="Course"
                            className="rounded-xl shadow-lg w-full max-w-sm md:max-w-full"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                            {course.courseName}
                        </h1>
                        <p className="text-lg mb-6 text-white/90">{course.description}</p>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 text-gray-800 rounded-md bg-yellow-400">
                                <FaHandHoldingHeart size={20} />
                            </div>
                            <span className="text-sm font-semibold">By Career Insight</span>
                        </div>
                        <Button onClick={generateCourseContent} className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-balance font-bold rounded-lg">
                            {loading ? (
                                <div className="flex flex-row gap-2 items-center">
                                    <ImSpinner2 size={20} className="animate-spin" /> Generating ...
                                </div>
                            ) : 'Generate Course Content'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="py-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 shadow-md rounded-lg border border-primary border-l-4 border-r-4">
                        <div className="flex flex-row items-center gap-4 text-center justify-center">
                            <div className="p-1.5 rounded-md bg-primary">
                                <MdCategory className="text-white" size={35} />
                            </div>
                            <div>
                                <span className="font-semibold text-sm">Category</span>
                                <p className="text-lg font-bold">{course.category}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 text-center justify-center">
                            <div className="p-1.5 rounded-md bg-primary">
                                <FaClock className="text-white" size={35} />
                            </div>
                            <div>
                                <span className="font-semibold text-sm">Course Level</span>
                                <p className="text-lg font-bold">{course.courseLevel}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 text-center justify-center">
                            <div className="p-1.5 rounded-md bg-primary">
                                <AiOutlineFieldTime className="text-white" size={35} />
                            </div>
                            <div>
                                <span className="font-semibold text-sm">Course Duration</span>
                                <p className="text-lg font-bold">{course.courseDuration}</p>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-4 text-center justify-center">
                            <div className="p-1.5 rounded-md bg-primary">
                                <FaLanguage className="text-white" size={35} />
                            </div>
                            <div>
                                <span className="font-semibold text-sm">Language</span>
                                <p className="text-lg font-bold">{course.language}</p>
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
                            <CardDescription className="mt-1 font-semibold">{chapter.about}</CardDescription>
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