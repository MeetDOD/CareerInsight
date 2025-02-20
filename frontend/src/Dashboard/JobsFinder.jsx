import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaLocationDot } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";

const JobsFinder = () => {
    const user = useRecoilValue(userState);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | JOB FINDER`;

        if (!user.address) {
            setError("Location not found. Please update your profile.");
            setLoading(false);
            return;
        }

        axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/getnearestjobs`,
            { location: user.address },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response) => {
                setJobs(response.data);
                setLoading(false);
                console.log(response.data)
            })
            .catch((err) => {
                setError("Failed to load jobs. Please try again.");
                setLoading(false);
            });
    }, [user.address]);

    const handlePageClick = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    const paginatedJobs = jobs?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                                <BreadcrumbPage className="font-semibold" style={{ color: `var(--text-color)` }}>
                                    Job Finder
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="relative border rounded-xl p-6 shadow-sm transition-all" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                                <Skeleton className="absolute right-4 w-6 h-6 rounded-full skle" />
                                <div className="flex items-center space-x-2">
                                    <Skeleton className="w-5 h-5 skle" />
                                    <Skeleton className="w-24 h-4 skle" />
                                </div>
                                <Skeleton className="h-6 w-3/4 mt-2 skle" />
                                <div className="flex space-x-1 mt-3">
                                    {[...Array(4)].map((_, i) => (
                                        <Skeleton key={i} className="w-2 h-2 rounded-full skle" />
                                    ))}
                                </div>
                                <div className="flex justify-between items-center mt-6">
                                    <Skeleton className="w-32 h-5 skle" />
                                    <Skeleton className="w-20 h-9 rounded-full skle" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {paginatedJobs.map((job) => (
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
                )}

                {jobs?.length > 9 &&
                    <div className="flex justify-center items-center mt-6 gap-1">
                        <Button
                            onClick={() => handlePageClick(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            size="icon"
                        >
                            <GrFormPreviousLink />
                        </Button>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <Button
                                key={index}
                                onClick={() => handlePageClick(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-violet-900 text-white' : ''}`}
                            >
                                {index + 1}
                            </Button>
                        ))}
                        <Button
                            onClick={() => handlePageClick(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            size="icon"
                            className={`${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <GrFormNextLink />
                        </Button>
                    </div>
                }
            </SidebarInset>
        </SidebarProvider>
    );
};

export default JobsFinder;
