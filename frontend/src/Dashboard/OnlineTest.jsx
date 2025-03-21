import React, { useEffect } from "react";
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

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | MOCK INTERVIEW`;
    }, []);

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
                <MockInterviewForm onSubmit={handleFormSubmit} />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default OnlineTest;
