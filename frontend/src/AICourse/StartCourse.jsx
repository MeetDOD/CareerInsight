import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaClock, FaHome } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import Loader from '@/services/Loader';
import { GiPartyPopper } from "react-icons/gi";
import Confetti from 'react-confetti';
import ReactMarkdown from 'react-markdown';
import { FaBookmark, FaLocationDot } from "react-icons/fa6";
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/auth';
import { Newspaper, PartyPopper } from 'lucide-react';
import QuizDialog from './QuizDialog';

const StartCourse = () => {

    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const user = useRecoilValue(userState)
    const [isQuizOpen, setIsQuizOpen] = useState(false);

    const poperSizeDetect = () => {
        const width = document.documentElement.clientWidth;
        const height = window.innerHeight;
        setWindowSize({ width, height });
    };

    useEffect(() => {
        window.addEventListener('resize', poperSizeDetect);
        poperSizeDetect();
        return () => {
            window.removeEventListener('resize', poperSizeDetect);
        }
    }, []);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/getcourse/${id}`);
                setCourse(response.data.course);

                const savedIndex = parseInt(localStorage.getItem(`progress_${id}`), 10);
                if (!isNaN(savedIndex) && savedIndex >= 0 && savedIndex < response.data.course.chapters.length) {
                    setActiveChapterIndex(savedIndex);
                }
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    useEffect(() => {
        if (course && course.category) {
            const fetchJobsByCourse = async () => {
                try {
                    const response = await axios.post(
                        `${import.meta.env.VITE_BASE_URL}/api/user/getjobsbycourse`,
                        {
                            location: user?.address,
                            courseCategory: course?.category,
                            limit: 6
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`,
                            }
                        }
                    );
                    setJobs(response.data);
                } catch (error) {
                    console.error('Error fetching jobs:', error);
                    toast.error("Failed to fetch jobs.");
                }
            };

            fetchJobsByCourse();
        }
    }, [course]);

    const handleNavigation = (newIndex) => {
        if (newIndex >= 0 && newIndex < course.chapters.length) {
            setActiveChapterIndex(newIndex);
            localStorage.setItem(`progress_${id}`, newIndex);
            window.scrollTo(0, 0);
        }
    };

    const handleFinish = async () => {
        try {
            const totalChapters = course.chapters.length;
            await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/usercourse/updateprogress`,
                {
                    courseId: id,
                    progress: 100,
                    activeChapterIndex: totalChapters - 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            localStorage.setItem(`progress_${id}`, totalChapters - 1);
            toast.success("Congratulations! You've completed the course.");
            setShowConfetti(true);
            window.scrollTo(0, 0);
            setTimeout(() => {
                setShowConfetti(false);
                navigate("/mycourses");
            }, 5000);
        } catch (error) {
            console.error('Error updating progress to 100%:', error);
            toast.error("Failed to update progress. Please try again.");
        }
    };

    const updateUserProgress = async () => {
        try {
            const totalChapters = course.chapters.length;
            const progress = Math.round(((activeChapterIndex + 1) / totalChapters) * 100);
            await axios.put(
                `${import.meta.env.VITE_BASE_URL}/api/usercourse/updateprogress`,
                {
                    courseId: id,
                    progress: progress,
                    activeChapterIndex: activeChapterIndex
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            toast.success("Your course progress updated");
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };


    if (loading) {
        return (
            <Loader />
        );
    }

    if (!course) {
        return <p className="text-center text-xl mt-10">Course not found.</p>;
    }

    const activeChapter = course.chapters[activeChapterIndex];

    return (
        <div>
            {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
            <div className='flex flex-row gap-2 justify-between mb-5'>
                <Button size="sm" onClick={() => navigate("/mycourses")} className="flex gap-2">
                    <IoMdArrowRoundBack size={20} />My Courses
                </Button>
                <Button onClick={() => navigate("/dashboard")} size="sm" className="flex gap-2"><FaHome size={20} /></Button>
            </div>
            <div className="flex flex-col lg:flex-row min-h-screen" style={{ borderColor: `var(--borderColor)` }}>
                <div className="shadow-md border rounded-xl border-gray-300 lg:w-1/4 p-4 h-screen lg:sticky top-0 overflow-y-auto" style={{ borderColor: `var(--borderColor)` }}>
                    <h2 className="text-lg font-bold mb-4 border-b pb-4" style={{ borderColor: `var(--borderColor)` }}>{course?.courseName}</h2>
                    <ul className="space-y-2">
                        {course?.chapters.map((chapter, index) => (
                            <li
                                key={index}
                                className={`px-3 py-2 rounded-lg ${activeChapterIndex === index
                                    ? 'bg-purple-100 text-black font-semibold'
                                    : ' '
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
                            {activeChapter?.sections && activeChapter?.sections.length > 0 && (
                                <div className="space-y-5">
                                    {activeChapter.sections.map((section, secIndex) => (
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
                            <div className="flex flex-row justify-between items-center mt-5">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => handleNavigation(activeChapterIndex - 1)}
                                    className="flex gap-2 border px-4 py-2 hover:bg-gray-100 transition"
                                    disabled={activeChapterIndex === 0}
                                >
                                    <IoMdArrowRoundBack size={20} /> Previous
                                </Button>

                                <div className="flex gap-4">
                                    {activeChapterIndex === course.chapters.length - 1 && (
                                        <>
                                            <Button
                                                onClick={() => setIsQuizOpen(true)}
                                                size="sm"
                                                className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 transition"
                                            >
                                                Give Quiz <Newspaper size={20} />
                                            </Button>
                                            <QuizDialog open={isQuizOpen} onClose={() => setIsQuizOpen(false)} course={course} />
                                            <Button
                                                size="sm"
                                                onClick={handleFinish}
                                                className="bg-green-500 text-white hover:bg-green-600 flex gap-2 px-4 py-2 transition"
                                            >
                                                Finish <GiPartyPopper size={20} />
                                            </Button>
                                        </>
                                    )}

                                    {activeChapterIndex !== course.chapters.length - 1 && (
                                        <Button
                                            size="sm"
                                            onClick={() => {
                                                handleNavigation(activeChapterIndex + 1);
                                                updateUserProgress();
                                            }}
                                        >
                                            Next <IoMdArrowRoundForward size={20} />
                                        </Button>
                                    )}
                                </div>
                            </div>

                        </CardContent>
                    </Card>
                </div>
            </div>

            <h2 className="text-2xl font-bold my-10">Suggested Jobs based on <span className='font-medium text-white rounded-lg py-2 px-3 bg-primary'>{course?.category}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job, index) => (
                    <div
                        className="relative bg-white border rounded-xl p-4 shadow-sm transition-all flex flex-col justify-between h-full space-y-4"
                        style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                    >
                        <div>
                            <FaBookmark size={20} className="absolute right-4 cursor-pointer text-primary" />
                            <div className="flex items-center gap-1">
                                <FaLocationDot size={18} className="mr-1 text-primary" />
                                <h3 className="text-sm font-semibold text-gray-500 line-clamp-1">
                                    {job.location}
                                </h3>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold line-clamp-1">{job.position}</h3>
                            <div className="flex space-x-1 mt-1">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 bg-primary rounded-full"></div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                                <img
                                    src={job.companyLogo}
                                    alt={job.company}
                                    className="h-10 w-10 rounded-md object-contain"
                                />
                                <div className="">
                                    <p className="font-medium text-sm line-clamp-1">{job.company}</p>
                                    <span className="text-gray-500 text-xs">{job.date}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-row gap-2 mt-4">
                            <a href={job.jobUrl} target="_blank" rel="noopener noreferrer" className="w-full block">
                                <Button variant="default" className="w-full">
                                    Apply Now
                                </Button>
                            </a>
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(job.location)},${encodeURIComponent(job.company)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full block"
                            >
                                <Button variant="secondary" className="w-full flex items-center gap-2">
                                    View on Map
                                </Button>
                            </a>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default StartCourse
