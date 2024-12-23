import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from 'date-fns';

const MyCourses = () => {

    const [course, setCourse] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const totalPages = Math.ceil(course.length / itemsPerPage);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/usercourse/mycourses`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                setCourse(response.data.enrolledCourses);
            } catch (error) {
                toast.error("Failed to load courses.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handlePageClick = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    const paginatedCourses = course?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | MY COURSES`;
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
                                    My Courses
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {loading &&
                    <div className="grid grid-cols-1 mt-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {paginatedCourses?.length <= 0 ?
                    <div className="flex flex-col space-y-5 min-h-[70vh] items-center justify-center">
                        <div className="text-3xl font-bold tracking-tight">
                            Check out the latest courses to enroll
                        </div>
                        <Link to="/courses">
                            <Button size="lg">View Courses</Button>
                        </Link>
                    </div>
                    :
                    <div className="grid grid-cols-1 mt-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedCourses?.map((course) => (
                            <div
                                key={course.id}
                                className="p-2 shadow-md rounded-lg overflow-hidden border transition duration-300 hover:-translate-y-2"
                                style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                            >
                                <img
                                    src={course.course.thumbnail}
                                    alt={course.course.courseName}
                                    className="w-full rounded-lg  h-40 object-cover"
                                />

                                <div className="py-4 space-y-2">
                                    <div className="text-lg font-bold line-clamp-1">
                                        CareerInsight: {course.course.courseName}
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='text-[10px] p-1 bg-blue-100 rounded-full px-2 text-primary'>
                                            {course.course.category}
                                        </div>
                                        <div className='font-bold text-xs flex flex-row items-center gap-1 text-green-400'>
                                            <div className="w-2 h-2 bg-green-400 rounded-full border border-green-600"></div>
                                            {course.course.duration}
                                        </div>
                                    </div>

                                    <div className="pt-1">
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full"
                                                style={{ width: `${course.progress}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-xs mt-1 font-semibold tracking-tight">
                                            My Progress {course.progress}%
                                        </p>
                                    </div>

                                    <div className="text-xs font-semibold text-gray-500">
                                        Enrolled At: {format(new Date(course.enrolledAt), 'MMMM d, yyyy, h:mm a')}
                                    </div>
                                </div>

                                <div>
                                    <Link to={`/startcourse/${course.course._id}`}>
                                        <Button className="w-full">View Course</Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                }

                {course?.length > 6 &&
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
            </SidebarInset>
        </SidebarProvider>
    );
};



export default MyCourses;
