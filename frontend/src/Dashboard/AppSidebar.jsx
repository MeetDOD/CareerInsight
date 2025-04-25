import React from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar';
import { MdSpaceDashboard, MdLibraryBooks, MdCamera, MdInsights, MdWeb } from 'react-icons/md';
import { FaTools, FaLaptop, FaHandHoldingHeart, FaPodcast } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from "../assets/logo.png";
import { Separator } from "@/components/ui/separator"
import { tokenState, userState } from '@/store/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'sonner';
import { FaSchool } from "react-icons/fa6";
import { BsSuitcaseLgFill } from "react-icons/bs";
import { PiKanbanFill } from "react-icons/pi";
import { Crown, FileUser } from 'lucide-react';

const data = {
    navMain: [
        { title: 'Dashboard', url: '/dashboard', icon: MdSpaceDashboard },
        // { title: 'Kanban Board', url: '/kanbanboard', icon: PiKanbanFill },
        { title: 'Industry Insights', url: '/insights', icon: MdInsights },
        { title: 'Company Visits', url: '/companyvisits', icon: FaSchool },
        { title: 'Enrolled Courses', url: '/mycourses', icon: MdLibraryBooks },
        { title: 'Recommendation', url: '/courserecommendation', icon: FaHandHoldingHeart },
        { title: 'Create Course', url: '/createcourse', icon: FaLaptop },
        { title: 'Resume Builder', url: '/resumebuilder', icon: FaTools },
        { title: 'Mock Interview', url: '/mockinterview', icon: MdCamera },
        { title: 'Portfolio Builder', url: '/createportfolio', icon: MdWeb },
        { title: 'AI Podcast', url: '/podcast', icon: FaPodcast },
        { title: 'Job Finder', url: '/jobfinder', icon: BsSuitcaseLgFill },
        { title: 'Quiz Result', url: '/quizresult', icon: FileUser }
    ],
};

const AppSidebar = () => {

    const location = useLocation();
    const setTokenState = useSetRecoilState(tokenState);
    const navigate = useNavigate();
    const user = useRecoilValue(userState);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setTokenState("");
        toast.success("Logged out successfully");
        navigate("/");
    };

    const proFeatures = ['AI Podcast', 'Create Course', 'Resume Builder', 'Mock Interview', 'Portfolio Builder'];

    return (
        <Sidebar className="w-[275px] min-h-screen shadow-md" style={{ color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
            <SidebarHeader className="px-4" style={{ backgroundColor: `var(--background-color)` }}>
                <div className="flex items-center gap-3 justify-center my-1">
                    <img src={logo} onClick={() => navigate("/")} alt="Logo" className="w-auto h-9 cursor-pointer object-contain" />
                </div>
            </SidebarHeader>

            <SidebarContent className="flex flex-col px-4" style={{ backgroundColor: `var(--background-color)` }}>
                <Separator orientation="horizontal" className="my-1.5 h-[0.2px] bg-primary" />
                <SidebarMenu>
                    {data.navMain.map((item, index) => {
                        const isActive = location.pathname === item.url;
                        const isPro = proFeatures.includes(item.title);

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

                                    <div className="text-sm font-semibold flex items-center w-full">
                                        <span>{item.title}</span>
                                        {user.subscribed && isPro && (
                                            <Crown className="text-yellow-400 ml-auto" size={18} />
                                        )}
                                    </div>
                                </Link>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="p-4" style={{ backgroundColor: `var(--background-color)`, color: `var(--text - color)` }}>
                <Separator orientation="horizontal" className="my-1.5 h-[0.2px] bg-primary" />
                <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full py-2 text-sm font-medium hover:bg-red-600 hover:text-white transition"
                >
                    Logout
                </Button>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default AppSidebar;
