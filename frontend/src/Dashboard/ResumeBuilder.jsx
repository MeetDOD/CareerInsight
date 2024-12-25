import React, { useEffect, useState } from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";
import axios from "axios";
import { toast } from "sonner";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const ResumeBuilder = () => {
    const [resumes, setResumes] = useState([]);
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(resumes.length / itemsPerPage);

    useEffect(() => {
        const fetchResumes = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/userresume/getalluserresume/${user?._id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );
                setResumes(response.data.resumes);
                console.log(response.data)
            } catch (error) {
                toast.error("Failed to fetch resumes");
            } finally {
                setLoading(false);
            }
        };

        if (user?._id) {
            fetchResumes();
        }
    }, [user?._id]);

    const handleDelete = async (resumeId) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/api/userresume/deleteuserresume/${resumeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            toast.success("Resume deleted successfully");
            setResumes((prevResumes) =>
                prevResumes.filter((resume) => resume?._id !== resumeId)
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete resume");
        }
    };

    const handlePageClick = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    const paginatedResumes = resumes?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | MY RESUMES`;
    }, []);

    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
                    <div className="flex items-center gap-2">
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
                                        My Resumes
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                        <Link
                            to="/resumebody"
                            className="p-14 py-24 items-center justify-center flex border-2 border-dashed rounded-lg h-[385px] hover:scale-95 transition-all hover:shadow-md cursor-pointer"
                            style={{ borderColor: `var(--borderColor)` }}
                        >
                            <IoMdAdd size={50} />
                        </Link>

                        {loading
                            ? Array.from({ length: 5 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="p-4 shadow-md rounded-lg flex flex-col border"
                                    style={{
                                        borderColor: `var(--borderColor)`,
                                    }}
                                >
                                    <Skeleton className="w-full h-56 rounded-lg skle" />
                                    <Skeleton className="h-6 w-3/4 mt-4 skle" />
                                    <Skeleton className="h-4 w-1/2 mt-2 skle" />
                                    <div className="flex gap-2 mt-4">
                                        <Skeleton className="h-10 w-full skle" />
                                        <Skeleton className="h-10 w-full skle" />
                                    </div>
                                </div>
                            ))
                            : paginatedResumes.map((resume) => (
                                <div
                                    key={resume?._id}
                                    className="p-4 shadow-md rounded-lg flex flex-col border transition duration-300 hover:-translate-y-2"
                                    style={{
                                        borderColor: `var(--borderColor)`,
                                        backgroundColor: `var(--background-color)`,
                                    }}
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            resume?.jobTitle
                                        )}&size=150&background=${resume?.themeColor.replace(
                                            "#",
                                            ""
                                        )}&color=fff`}
                                        alt={resume?.jobTitle}
                                        className="w-full h-60 object-cover rounded-lg"
                                    />
                                    <div className="mt-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold truncate line-clamp-1" style={{ fontFamily: resume?.fontStyle }}>
                                            {resume?.jobTitle}
                                        </h3>
                                    </div>
                                    <div className="text-xs font-semibold text-gray-500">
                                        Created At:{" "}
                                        {format(new Date(resume?.createdAt), "MMMM d, yyyy")}
                                    </div>

                                    <div className="mt-4 flex gap-2">
                                        <Button
                                            onClick={() => navigate(`/viewmyresume/${resume?._id}/careerinsight/${user._id}/${user.fullName}`)}
                                            variant="secondary"
                                            size="sm"
                                            className="flex-1 flex items-center justify-center border"
                                        >
                                            <FaEye />
                                            View
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(resume?._id)}
                                            variant="destructive"
                                            size="sm"
                                            className="flex-1 flex items-center justify-center"
                                        >
                                            <IoMdTrash />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                    </div>
                    {resumes?.length > 5 &&
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
        </div>
    );
};

export default ResumeBuilder;
