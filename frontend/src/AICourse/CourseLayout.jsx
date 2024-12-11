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
import { useRecoilState, useRecoilValue } from 'recoil';
import { finalCourseState, responseState } from '@/store/courseState';

const CourseLayout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const courseData = useRecoilValue(responseState);
    const [finalCourse, setFinalCourse] = useRecoilState(finalCourseState);
    const location = useLocation();
    const thumbnail = location.state?.thumbnail;

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

                const prompt = `
                    Generate detailed content for a chapter of a course in JSON format. Include the following fields:

                    1. **title**: The title of the chapter.
                    2. **explanation**: A brief explanation or summary of the chapter's content.
                    3. **sections**: An array of sections within the chapter, where each section includes:
                    - **subtitle**: The title of the section.
                    - **content**: Detailed content for the section.

                    ### Chapter Details:
                    - **Course Name**: ${course.courseName}
                    - **Chapter Name**: ${chapter.chapterName}

                    ### JSON Response Structure:
                    Ensure the response strictly follows this structure:

                    \`\`\`json
                    {
                    "title": "Chapter Title",
                    "explanation": "Brief explanation of the chapter.",
                    "sections": [
                        {
                        "subtitle": "Section 1 Subtitle",
                        "content": "Detailed explanation for Section 1."
                        },
                        {
                        "subtitle": "Section 2 Subtitle",
                        "content": "Detailed explanation for Section 2."
                        }
                    ]
                    }
                    \`\`\`

                    ### Requirements:
                    1. **Mandatory Fields**: All fields must be provided with meaningful content. No field should be left empty or contain placeholder text.
                    2. **Sections**: Include at least 2 sections per chapter, each with a unique subtitle and relevant content.
                    3. **Format**: The response must be in **valid JSON format only**.
                    4. **Consistency**: Ensure the explanation and section content are relevant to the chapter and course context.
                    5. **Detailed Content**: Provide rich, educational content suitable for a course tutorial.
                    `;
                try {
                    const result = await chatSession.sendMessage(prompt);
                    const data = await result.response.text();
                    const cleanedData = data.replace(/```json|```/g, '');
                    const parsedResponse = JSON.parse(cleanedData);

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
                    console.error(`Error processing chapter "${chapter.chapterName}":`, error);
                }
            }

            setFinalCourse({
                courseName: course.courseName,
                chapters: finalChapters,
                thumbnail
            });

            navigate('/finalcourse');
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
                            src={thumbnail}
                            alt={course.courseName}
                            className="rounded-xl shadow-lg w-full max-w-sm md:max-w-full object-cover"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                            {course.courseName}
                        </h1>
                        <p className="text-lg mb-5 text-white/90 text-justify">{course.description}</p>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 text-gray-800 rounded-md bg-yellow-400">
                                <FaHandHoldingHeart size={20} />
                            </div>
                            <span className="text-sm font-semibold">{course.topic}</span>
                        </div>
                        <Button disabled={loading} onClick={generateCourseContent} className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-balance font-bold rounded-lg">
                            {loading ? (
                                <div className="flex flex-row gap-2 items-center">
                                    <ImSpinner2 size={20} className="animate-spin" /> Generating Course Content
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
                                <p className="text-lg font-bold">{course.duration}</p>
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