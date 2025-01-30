import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaClock, FaUpload } from 'react-icons/fa';
import { finalCourseState, responseState } from '@/store/courseState';
import { useRecoilValue } from 'recoil';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { IoIosHome, IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import { ImSpinner2 } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import Loader from '@/services/Loader';
import ReactMarkdown from 'react-markdown';

const FinalCourse = () => {
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);
    const { courseName, chapters, thumbnail } = useRecoilValue(finalCourseState);
    const courseData = useRecoilValue(responseState);

    if (!courseData || courseData?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Loader />
            </div>
        );
    }

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const category = courseData[0]?.category || null;
    const courseLevel = courseData[0]?.courseLevel || null;
    const duration = courseData[0]?.duration || null;
    const language = courseData[0]?.language || null;
    const topic = courseData[0]?.topic || null;
    const description = courseData[0]?.description || null;

    const handlePublish = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/usercourse/publishcourse`, {
                thumbnail,
                courseName,
                chapters,
                category,
                courseLevel,
                duration,
                language,
                topic,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            toast.success(response.data.message);
            navigate("/courses")
        } catch (error) {
            console.error('Error publishing course:', error);
            toast.error('Failed to publish the course');
        } finally {
            setLoading(false);
        }
    };

    if (chapters?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen ">
                <h2 className="text-3xl font-bold">No chapters available.</h2>
                <p className="mt-2 text-xl font-semibold">Please generate course content first.</p>
            </div>
        );
    }

    const activeChapter = chapters[activeChapterIndex];

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | FINAL COURSE STRUCTURE`;
    }, []);

    return (
        <div>
            <div className='flex justify-between mb-5'>
                <div className='flex flex-row gap-2'>
                    <Button size="sm" onClick={() => navigate(-1)} className="flex gap-2">
                        <IoMdArrowRoundBack size={20} />Back
                    </Button>
                    <Button onClick={() => navigate("/dashboard")} size="sm" className="flex gap-2"><IoIosHome size={20} /></Button>
                </div>
                <Button disabled={loading} onClick={handlePublish}>
                    {loading ? (
                        <div className="flex flex-row gap-2 items-center">
                            <ImSpinner2 size={20} className="animate-spin" /> Publishing this course
                        </div>
                    ) : (<div className="flex gap-2">
                        <FaUpload /> Publish this course
                    </div>)}
                </Button>
            </div>
            <div className="flex flex-col lg:flex-row min-h-screen" style={{ borderColor: `var(--borderColor)` }}>
                <div className="shadow-md border rounded-xl border-gray-300 lg:w-1/4 p-4 h-screen lg:sticky top-0 overflow-y-auto" style={{ borderColor: `var(--borderColor)` }}>
                    <h2 className="text-lg font-bold mb-4 border-b pb-4" style={{ borderColor: `var(--borderColor)` }}>{courseName}</h2>
                    <ul className="space-y-2">
                        {chapters?.map((chapter, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveChapterIndex(index)}
                                className={`px-3 py-2 rounded-lg cursor-pointer ${activeChapterIndex === index
                                    ? 'bg-purple-100 text-black font-semibold'
                                    : ' hover:bg-purple-100 hover:text-black'
                                    }`}>
                                <div className='grid grid-cols-5 items-center'>
                                    <div>
                                        <h2 className='p-1 bg-primary text-white rounded-full w-8 h-8 text-center'>{index + 1}</h2>
                                    </div>
                                    <div className='col-span-4'>
                                        <h2 className='font-medium'>{`${chapter?.title}`}</h2>
                                        <h2 className="text-sm font-semibold flex gap-2 items-center text-primary py-1"><FaClock />{chapter?.duration}</h2>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-1 overflow-y-auto lg:mt-0 mt-4">
                    <Card className="shadow-md border rounded-xl border-gray-300" style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Chapter {activeChapterIndex + 1}: {activeChapter?.title}</CardTitle>
                            <CardDescription className="text-lg text-justify font-semibold">{activeChapter?.explanation}</CardDescription>
                        </CardHeader>
                        <CardContent>

                            {activeChapter?.videoId && (
                                <div className="mb-6">
                                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                                            src={`https://www.youtube.com/embed/${activeChapter?.videoId}`}
                                            title={`Video for ${activeChapter?.title}`}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>

                            )}

                            <h2 className="text-xl mb-5 font-bold">Detailed <span className='text-primary'>Explaination</span></h2>
                            {activeChapter?.sections && activeChapter?.sections?.length > 0 && (
                                <div className="space-y-5">
                                    {activeChapter?.sections.map((section, secIndex) => (
                                        <div
                                            key={secIndex}
                                            className='p-5 courseSection rounded-xl'
                                        >
                                            <h3 className="text-xl font-bold pb-2"><span className='text-2xl'>{secIndex + 1}.</span> {section?.subtitle}</h3>
                                            <ReactMarkdown className="font-medium text-lg text-justify tracking-tight">{section?.content}</ReactMarkdown>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FinalCourse;
