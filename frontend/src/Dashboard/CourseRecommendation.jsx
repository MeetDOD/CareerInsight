import axios from 'axios';
import { userState } from '@/store/auth';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import AppSidebar from './AppSidebar';
import { FaEdit } from 'react-icons/fa';

const CourseRecommendation = () => {
    const user = useRecoilValue(userState);
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(recommendedCourses.length / itemsPerPage);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/recommendations`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRecommendedCourses(response.data.recommendedCourses);
            } catch (err) {
                console.error('Error fetching recommended courses:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [user]);

    const handlePageClick = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    const paginatedCourses = recommendedCourses?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | COURSE RECOMMENDATION`;
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
                <div className="flex items-center gap-2 mb-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block font-semibold">
                                Dashboard
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage
                                    className="font-semibold"
                                    style={{ color: `var(--text-color)` }}
                                >
                                    Courses Recommendation
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div>
                    <div className="flex flex-wrap gap-3 mb-6 items-center">
                        {user?.techstack && user?.techstack.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user?.techstack.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full shadow-md border border-blue-300 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No tech stack information available.</p>
                        )}
                        <Link to="/dashboard">
                            <Button size="sm">
                                <FaEdit />
                            </Button>
                        </Link>
                    </div>


                    {loading &&
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginatedCourses?.map(course => (
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
                    {recommendedCourses?.length > 6 &&
                        <div className="flex justify-center items-center mt-6 gap-2">
                            <Button
                                onClick={() => handlePageClick(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-4 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Previous
                            </Button>
                            {Array.from({ length: totalPages }).map((_, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handlePageClick(index + 1)}
                                    className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button
                                onClick={() => handlePageClick(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-4 py-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                Next
                            </Button>
                        </div>
                    }
                </div>
            </SidebarInset>
        </SidebarProvider >
    );
};

export default CourseRecommendation;
