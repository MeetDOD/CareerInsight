import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarRail, } from '@/components/ui/sidebar';
import { MdSpaceDashboard, MdLibraryBooks, MdCamera } from 'react-icons/md';
import { FaTools, FaLaptop } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from "../assets/image.png";
import { Separator } from "@/components/ui/separator"
import { CgWebsite } from "react-icons/cg";
import { tokenState } from '@/store/auth';
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';

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
        {
            title: 'Create Course',
            url: '/createcourse',
            icon: FaLaptop,
        },
        {
            title: 'My Portfolio',
            url: '/createportfolio',
            icon: CgWebsite,
        },
    ],
};

const AppSidebar = () => {

    const location = useLocation();
    const setTokenState = useSetRecoilState(tokenState);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setTokenState("");
        toast.success("Logged out successfully");
        navigate("/login")
    };

    return (
        <Sidebar className="w-64 min-h-screen shadow-md" style={{ color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
            <SidebarHeader className="px-4" style={{ backgroundColor: `var(--background-color)` }} >
                <div className="flex items-center gap-3">
                    {/* <img src={logo} alt="Logo" className="w-24 object-contain" /> */}
                    <span className="text-lg mx-auto pt-2 text-primary font-bold">📖 Carrer Insights</span>
                </div>
            </SidebarHeader>

            <SidebarContent className="flex flex-col px-4" style={{ backgroundColor: `var(--background-color)` }}>
                <Separator orientation="horizontal" className="my-1.5 h-[0.2px]" style={{ backgroundColor: `var(--borderColor)` }} />
                <SidebarMenu>
                    {data.navMain.map((item, index) => {
                        const isActive = location.pathname === item.url;
                        return (
                            <SidebarMenuItem key={index}>
                                <Link
                                    to={item.url}
                                    className={`flex items-center gap-3.5 px-3 py-2 my-0.5 rounded-lg text-sm font-medium transition-all duration-200
                                        hover:bg-primary hover:text-white hover:shadow-sm
                                        ${isActive ? "bg-primary shadow-md" : ''}`}
                                    style={{ color: `var(--text-color)` }}>
                                    <div className="p-1.5 rounded-md" style={{ backgroundColor: `var(--text-color)` }}>
                                        <item.icon style={{ color: `var(--background-color)` }} size={20} />
                                    </div>
                                    <div className="text-sm font-semibold">{item.title}</div>
                                </Link>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4" style={{ backgroundColor: `var(--background-color)`, color: `var(--text - color)` }}>
                <Separator orientation="horizontal" className="my-3 h-[0.2px]" style={{ backgroundColor: `var(--borderColor)` }} />
                <Button
                    variant="destructive"
                    onClick={handleLogout}
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
