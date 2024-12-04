import React from 'react';
import Profile from './Profile';
import AppSidebar from './AppSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from '@/components/ui/separator';

const Dashboard = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb >
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block font-semibold">
                                Dashboard
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-semibold" style={{ color: `var(--text-color)` }}>My Profile</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <Profile />
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Dashboard;
