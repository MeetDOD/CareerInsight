import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHandHoldingHeart, FaClock, FaLanguage } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { ImSpinner2 } from 'react-icons/im';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ViewCourseLayout = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/getcourse/${id}`);
                setCourse(response.data.course);
                console.log(response.data.course)
            } catch (error) {
                console.error('Error fetching course:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ImSpinner2 size={50} className="animate-spin" />
            </div>
        );
    }

    if (!course) {
        return <p className="text-center mt-10">Course not found.</p>;
    }

    return (
        <div className="min-h-screen">
            <div className="relative shadow-lg bg-gradient-to-r from-indigo-500 to-purple-950 text-white rounded-xl">
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
                        <p className="text-lg mb-5 text-white/90 text-justify">{course.description}</p>
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 text-gray-800 rounded-md bg-yellow-400">
                                <FaHandHoldingHeart size={20} />
                            </div>
                            <span className="text-sm font-semibold">{course.topic}</span>
                        </div>
                        <Link to={`/startcourse/${course._id}`} >
                            <Button disabled={loading} className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 text-balance font-bold rounded-lg">
                                {loading ? (
                                    <div className="flex flex-row gap-2 items-center">
                                        <ImSpinner2 size={20} className="animate-spin" /> Start Learning
                                    </div>
                                ) : 'Start Learning'}
                            </Button>
                        </Link>
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
        </div >
    );
};


export default ViewCourseLayout;
