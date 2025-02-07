import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarRail, } from '@/components/ui/sidebar';
import { MdSpaceDashboard, MdLibraryBooks, MdCamera, MdInsights } from 'react-icons/md';
import { FaTools, FaLaptop, FaHandHoldingHeart } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from "../assets/logo.png";
import { Separator } from "@/components/ui/separator"
import { CgWebsite } from "react-icons/cg";
import { tokenState } from '@/store/auth';
import { useSetRecoilState } from 'recoil';
import { toast } from 'sonner';
import { FaSchool } from "react-icons/fa6";

const data = {
    navMain: [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: MdSpaceDashboard,
        },
        {
            title: 'Insights',
            url: '/insights',
            icon: MdInsights,
        },
        {
            title: 'My Courses',
            url: '/mycourses',
            icon: MdLibraryBooks,
        },
        {
            title: 'Create Course',
            url: '/createcourse',
            icon: FaLaptop,
        },
        {
            title: 'Recommendation',
            url: '/courserecommendation',
            icon: FaHandHoldingHeart,
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
            title: 'Portfolio Builder',
            url: '/createportfolio',
            icon: CgWebsite,
        },
        {
            title: 'Company Visits',
            url: '/companyvisits',
            icon: FaSchool,
        }
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
        navigate("/")
    };

    return (
        <Sidebar className="w-64 min-h-screen shadow-md" style={{ color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
            <SidebarHeader className="px-4" style={{ backgroundColor: `var(--background-color)` }} >
                <div className="flex items-center gap-3 justify-center my-1">
                    <img src={logo} onClick={() => navigate("/")} alt="Logo" className="w-36 cursor-pointer object-contain" />
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