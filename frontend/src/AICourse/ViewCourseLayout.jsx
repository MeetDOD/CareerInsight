import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaClock, FaLanguage } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { loggedInState } from '@/store/auth';
import { useRecoilValue } from 'recoil';
import { toast } from 'sonner';
import learn from "../assets/learn.gif"
import { format } from 'date-fns';

const ViewCourseLayout = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useRecoilValue(loggedInState);
    const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/getcourse/${id}`);
                setCourse(response.data.course);

                if (isLoggedIn) {
                    const enrolledResponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/enrolled`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    });
                    const enrolledCourses = enrolledResponse.data.enrolledCourses;
                    setIsEnrolled(enrolledCourses.some((enrolled) => enrolled.course._id === response.data.course._id));
                }
            } catch (error) {
                setLoading(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleStart = async () => {
        if (!isLoggedIn) {
            toast.error("Please login to access this course.");
            navigate("/login");
            return;
        }

        if (isEnrolled) {
            navigate(`/startcourse/${course._id}`);
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/usercourse/enroll`,
                { courseId: course._id },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Happy Learning 😊");
                setIsEnrolled(true);
                navigate(`/startcourse/${course._id}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to start the course.");
        }
    };

    const handleShare = () => {
        const sharableLink = `${window.location.origin}/viewcourse/${course._id}/careerinsight/${course.courseName}`;

        navigator.clipboard.writeText(sharableLink)
            .then(() => {
                toast.success("Sharable link copied to clipboard!");
            })
            .catch(() => {
                toast.error("Failed to copy the link to clipboard.");
            });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "CAREERINSIGHT | VIEW COURSE";
    }, []);

    return (
        <div className="min-h-screen">
            {loading && !course ?
                <div>
                    <div className="relative shadow-lg bg-gradient-to-r from-indigo-500 to-purple-950 text-white rounded-xl p-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Skeleton className="w-full h-64 rounded-xl skle my-5" />
                            <div className="space-y-4">
                                <Skeleton className="h-8 w-full skle" />
                                <Skeleton className="h-36 w-full skle" />
                                <Skeleton className="h-8 w-32 skle" />
                                <Skeleton className="h-11 w-full skle" />
                            </div>
                        </div>
                    </div>

                    <div className="py-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 shadow-md rounded-lg border border-primary border-l-4 border-r-4">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <Skeleton className="h-16 w-16 rounded-md skle" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-20 skle" />
                                        <Skeleton className="h-6 w-32 skle" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Card key={index} className="border-l-4 border-primary shadow-md" style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                                <CardHeader>
                                    <CardTitle className="text-xl font-semibold"><Skeleton className="px-5 h-6 w-full mb-2 skle" /></CardTitle>
                                    <CardDescription className="mt-1 font-semibold"><Skeleton className="px-5 h-28 w-full skle" /></CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-8 w-8 rounded-md skle" />
                                        <Skeleton className="h-5 w-24 skle" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                :
                <div>
                    <div className="relative shadow-lg text-white rounded-xl bg-cover bg-center" style={{
                        backgroundImage: `url('https://static.canva.com/web/images/e733916c4616f5baa19098cc2844369b.jpg')`,
                    }}>
                        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex items-center justify-center">
                                <img
                                    src={course.thumbnail}
                                    alt={course.courseName}
                                    className="rounded-xl shadow-lg w-full max-w-sm md:max-w-full object-cover"
                                />
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                                    {course.courseName}
                                </h1>
                                <p className="text-lg mb-4 text-gray-200 tracking-tight">{course.description}</p>

                                <div className="flex flex-wrap items-center justify-between rounded-lg">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <img className="rounded-md w-9 h-9" src={learn} alt="Learn More" />
                                        <span className="text-[17px] font-semibold text-white">
                                            {course.topic}
                                        </span>
                                    </div>
                                    <div className="text-gray-200">
                                        {format(new Date(course.createdAt), 'MMMM d, yyyy')}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 mt-4">
                                    <div className="flex-1">
                                        {isEnrolled ? (
                                            <Button
                                                size="lg"
                                                onClick={handleStart}
                                                className="w-full text-[16px] bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md "
                                            >
                                                Explore this course
                                            </Button>
                                        ) : (
                                            <Button
                                                size="lg"
                                                onClick={handleStart}
                                                className="w-full text-[16px] bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg shadow-md"
                                            >
                                                Enroll in this course
                                            </Button>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <Button
                                            size="lg"
                                            onClick={handleShare}
                                            className="w-full text-[16px] bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md"
                                        >
                                            Share this course
                                        </Button>
                                    </div>
                                </div>

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
                                        {`Chapter ${index + 1}: ${chapter.title}`}
                                    </CardTitle>
                                    <CardDescription className="mt-1 font-semibold">{chapter.explanation}</CardDescription>
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
                </div>
            }
        </div>
    );
};

export default ViewCourseLayout;
