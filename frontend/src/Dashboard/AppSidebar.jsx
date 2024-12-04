import React from 'react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { MdSpaceDashboard, MdLibraryBooks, MdCamera } from 'react-icons/md';
import { FaTools } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from "../assets/image.png";
import { Separator } from "@/components/ui/separator"

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: MdSpaceDashboard,
        },
        {
            title: 'My Courses',
            url: '/mycourses',
            icon: MdLibraryBooks,
        },
        {
            title: 'Resume Builder',
            url: '/resumebuilder',
            icon: FaTools,
        },
        {
            title: 'Mock Interview',
            url: '/mockinterview',
            icon: MdCamera,
        },
    ],
};

const AppSidebar = () => {

    const location = useLocation();

    return (
        <Sidebar className="w-64 min-h-screen shadow-md" style={{ color: `var(--text-color)` }}>
            <SidebarHeader className="px-4 py-4" style={{ backgroundColor: `var(--background-color)` }} >
                <div className="flex items-center gap-3">
                    <img src={logo} alt="Logo" className="w-24 object-contain" />
                    <span className="text-sm text-primary font-bold">Carrer Insights</span>
                </div>
            </SidebarHeader>

            <SidebarContent className="flex flex-col px-4" style={{ backgroundColor: `var(--background-color)` }}>
                <Separator orientation="horizontal" className="my-1.5 h-[0.2px] bg-gray-400" />
                <SidebarMenu>
                    {data.navMain.map((item, index) => {
                        const isActive = location.pathname === item.url;
                        return (
                            <SidebarMenuItem key={index}>
                                <Link
                                    to={item.url}
                                    className={`flex items-center gap-3.5 px-3 py-2 my-0.5 rounded-lg text-sm font-medium transition-all duration-200
                                        hover:bg-primary hover:text-white hover:shadow-sm
                                        ${isActive ? 'bg-primary text-white shadow-md' : ''}`}
                                >
                                    <div className="p-1.5 rounded-md" style={{ backgroundColor: `var(--text-color)` }}>
                                        <item.icon style={{ color: `var(--background-color)` }} size={22} />
                                    </div>
                                    <span className="text-base font-semibold">{item.title}</span>
                                </Link>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4" style={{ backgroundColor: `var(--background-color)`, color: `var(--text - color)` }}>
                <Separator orientation="horizontal" className="my-3 h-[0.2px] bg-gray-400" />
                <Button
                    variant="destructive"
                    className="w-full py-2 text-sm font-medium hover:bg-red-600 hover:text-white transition"
                >
                    Logout
                </Button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar >
    );
};

export default AppSidebar;
