import React from "react";
import { IoMdAdd, IoMdTrash } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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

const ResumeBuilder = () => {
    const dummyResumes = [
        {
            id: 1,
            title: "Software Engineer Resume",
            previewImage: "https://d.novoresume.com/images/doc/minimalist-resume-template.png",
        },
        {
            id: 2,
            title: "Project Manager Resume",
            previewImage: "https://cdn.create.microsoft.com/catalog-assets/en-us/4a338a41-94b9-4793-9854-c3ae1b34923f/thumbnails/616/modern-hospitality-resume-brown-modern-simple-1-1-a8a2b9b17cad.webp",
        },
        {
            id: 3,
            title: "Project Manager Resume",
            previewImage: "https://cdn.create.microsoft.com/catalog-assets/en-us/4a338a41-94b9-4793-9854-c3ae1b34923f/thumbnails/616/modern-hospitality-resume-brown-modern-simple-1-1-a8a2b9b17cad.webp",
        },
        {
            id: 4,
            title: "Project Manager Resume",
            previewImage: "https://cdn.create.microsoft.com/catalog-assets/en-us/4a338a41-94b9-4793-9854-c3ae1b34923f/thumbnails/616/modern-hospitality-resume-brown-modern-simple-1-1-a8a2b9b17cad.webp",
        },
    ];

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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
                        <Link
                            to="/resumebody"
                            className="p-14 py-24 items-center justify-center flex border-2 border-dashed rounded-lg h-[369px] hover:scale-95 transition-all hover:shadow-md cursor-pointer"
                        >
                            <IoMdAdd size={50} />
                        </Link>

                        {dummyResumes.map((resume) => (
                            <div
                                key={resume.id}
                                className="p-4 shadow-md rounded-lg flex flex-col border border-gray-300"
                                style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                            >
                                <img
                                    src={resume.previewImage}
                                    alt={resume.title}
                                    className="w-full h-60 object-cover rounded-lg"
                                />

                                <div className="mt-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-semibold truncate">
                                        {resume.title}
                                    </h3>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Link>
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="flex-1 flex items-center justify-center border"
                                        >
                                            <FaEye />
                                            View
                                        </Button>
                                    </Link>
                                    <Button
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
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};

export default ResumeBuilder;
