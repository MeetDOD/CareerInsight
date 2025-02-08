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
import { FaBookmark, FaArrowRight, FaLocationDot } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";

const JobsFinder = () => {
    const user = useRecoilValue(userState);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    console.log(user.address)

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | JOB FINDER`;

        if (!user.address) {
            setError("Location not found. Please update your profile.");
            setLoading(false);
            return;
        }

        axios
            .post("http://127.0.0.1:5000/jobs", { location: user.address })
            .then((response) => {
                setJobs(response.data.jobs);
                setLoading(false);
                console.log(response)
            })
            .catch((err) => {
                console.error("Error fetching jobs:", err);
                setError("Failed to load jobs. Please try again.");
                setLoading(false);
            });
    }, [user.address]);

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
                                <div className="relative bg-white border rounded-xl p-6 shadow-sm transition-all"
                                    style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                                    key={job.job_id}
                                >
                                    <FaBookmark size={20} className="absolute right-4 cursor-pointer text-primary" />
                                    <p className="text-sm font-semibold text-gray-500 flex flex-row items-center">
                                        <FaLocationDot size={18} className="mr-1 text-primary" />
                                        {job.location}
                                    </p>
                                    <h3 className="text-2xl font-bold mt-2">{job.title}</h3>
                                    <div className="flex space-x-1 mt-3">
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between items-center mt-6">
                                        <div className="flex items-center space-x-2">
                                            <p className="font-medium">{job.company.name}</p>
                                        </div>
                                        <a
                                            href={`https://www.linkedin.com/jobs/view/${job.job_id}`}
                                            target="_blank"
                                            className="mt-3 transition group"
                                        >
                                            <Button variant="default" className="rounded-full">
                                                Apply <FaArrowRight className="group-hover:translate-x-1 transition duration-300" />
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col col-span-full min-h-[70vh] items-center justify-center">
                                <div className="text-3xl font-bold tracking-tight">
                                    No jobs found in <span className="text-red-500">{user.address}</span>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default JobsFinder;
