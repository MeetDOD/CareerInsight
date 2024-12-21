import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { toast } from 'sonner';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/getallcourses`);
                setCourses(response.data.courses.reverse());
            } catch (err) {
                toast.error("Failed to fetch courses");
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "CAREERINSIGHT | COURSES";
    }, []);

    return (
        <div>
            <div className='flex flex-col items-center gap-2 my-10 px-4'>
                <h1 className='text-2xl md:text-3xl font-bold text-center'>
                    Latest <span className='text-primary'>Courses</span>
                </h1>
                <p className='text-center text-lg opacity-90 tracking-tight'>
                    Explore our newest courses designed to help you gain essential skills and advance your career.
                </p>
            </div>
            {loading ?
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((index) => (
                        <div
                            key={index}
                            className="p-2 shadow-md rounded-lg border border-gray-300"
                            style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                        >
                            <Skeleton className="w-full h-40 rounded-lg skle" />
                            <div className="py-4 space-y-2">
                                <div>
                                    <Skeleton className="h-6 w-3/4 mb-2 skle" />
                                </div>
                                <div className='flex justify-between'>
                                    <Skeleton className="h-4 w-1/2 skle" />
                                    <Skeleton className="h-4 w-16 skle" />
                                </div>
                                <Skeleton className="h-3 w-full skle" />
                                <Skeleton className="h-3 w-24 skle" />
                                <Skeleton className="h-3 w-60 skle" />
                            </div>
                            <Skeleton className="h-10 w-full skle" />
                        </div>
                    ))}
                </div>
                :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            to={`/viewcourse/${course._id}`}
                            className="p-2 shadow-md rounded-lg overflow-hidden border border-gray-300 transition duration-300 hover:-translate-y-2"
                            style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                        >
                            <img
                                src={course.thumbnail}
                                alt={course.courseName}
                                className="w-full rounded-lg h-40 object-cover"
                            />
                            <div className="py-4 space-y-2">
                                <div className="text-lg font-bold line-clamp-2">
                                    CareerInsight: {course.courseName}
                                </div>
                                <div className='flex justify-between'>
                                    <div className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary'>
                                        {course.category}
                                    </div>
                                    <div className='font-bold text-xs flex flex-row items-center gap-1 text-green-400'>
                                        <div className="w-2 h-2 bg-green-400 rounded-full border border-green-600"></div>
                                        {course.duration}
                                    </div>
                                </div>
                                <div className="text-xs font-semibold text-gray-500">
                                    Published At: {format(new Date(course.createdAt), 'MMMM d, yyyy')}
                                </div>
                            </div>
                            <div>
                                <Link to={`/viewcourse/${course._id}/careerinsight/${course.courseName}`}>
                                    <Button className="w-full">More Details</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
};

export default CoursesPage;
