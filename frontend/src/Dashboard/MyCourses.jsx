import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { FaUser } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";

const MyCourses = () => {
    const dummyCourses = [
        {
            id: 1,
            image: "https://media.licdn.com/dms/image/D4D12AQF26-NZ279EaA/article-cover_image-shrink_600_2000/0/1688018102545?e=2147483647&v=beta&t=Q9aUSt_UHzSqZYyDycri3s2kqVDlPc-YM0ZzlH2yfYc",
            title: "React Js for Beginners",
            instructor: "John Doe",
            date: "Dec 1, 2024",
            progress: "50%",
        },
        {
            id: 2,
            image: "https://miro.medium.com/v2/resize:fit:1400/0*ZpjhBs0gR5oSd3Il",
            title: "Mastering C++",
            instructor: "Jane Smith",
            date: "Nov 20, 2024",
            progress: "30%",
        },
        {
            id: 3,
            image: "https://miro.medium.com/v2/resize:fit:1200/1*QJnvahq_EBdUGjYQUYrhvA.png",
            title: "MongoDB Certification Prep",
            instructor: "Alice Johnson",
            date: "Nov 15, 2024",
            progress: "75%",
        },
        {
            id: 3,
            image: "https://miro.medium.com/v2/resize:fit:1200/1*QJnvahq_EBdUGjYQUYrhvA.png",
            title: "MongoDB Certification Prep",
            instructor: "Alice Johnson",
            date: "Nov 15, 2024",
            progress: "99%",
        },
    ];

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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {dummyCourses.map((course) => (
                        <Link
                            key={course.id}
                            className="p-4 shadow-md rounded-lg overflow-hidden border border-gray-300 hover:scale-95 transition-all hover:shadow-lg"
                            style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full rounded-lg  h-40 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="text-lg font-bold truncate">
                                    {course.title}
                                </h3>
                                <p className="text-sm font-semibold flex items-center mt-2">
                                    <FaUser size={15} className="mr-2" />
                                    {course.instructor}
                                </p>

                                <div className="mt-3">
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full"
                                            style={{ width: course.progress }}
                                        ></div>
                                    </div>
                                    <p className="text-sm mt-1">
                                        Progress: {course.progress}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};



export default MyCourses;
