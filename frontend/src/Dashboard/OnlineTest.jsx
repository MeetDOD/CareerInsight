import React from "react";
import { useNavigate } from "react-router-dom";
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
import MockInterviewForm from "@/AIInterview/MockInterviewForm";

const OnlineTest = () => {
    const navigate = useNavigate();

    const handleFormSubmit = (formData) => {
        navigate("/interviewsession", { state: { formData } });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
                <div className="flex items-center gap-2 mb-6">
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
                                    Mock Interview
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="text-center mt-3 mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary">
                        Prepare for Your Next Interview
                    </h1>
                    <p className="text-lg font-semibold  my-3">
                        Practice your interview skills by simulating real-world questions
                        tailored to your job role and experience level.
                    </p>
                </div>

                <MockInterviewForm onSubmit={handleFormSubmit} />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default OnlineTest;
