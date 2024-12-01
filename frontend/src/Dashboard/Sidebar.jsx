import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { tokenState, userState } from '@/store/auth';
import { BsLayoutSidebarInset, BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { Button } from '@/components/ui/button';
import { MdSpaceDashboard, MdLibraryBooks, MdCamera } from "react-icons/md";
import { FaTools } from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const setTokenState = useSetRecoilState(tokenState);
    const setUserState = useSetRecoilState(userState);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setTokenState(null);
        setUserState(null); 
        navigate('/login');
    }

    return (
        <div>
            <Button
                className="sm:hidden mb-5"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <BsLayoutSidebarInsetReverse size={20} /> : <BsLayoutSidebarInset size={20} />}
            </Button>

            <div className={`sm:rounded-lg fixed top-0 left-0 h-full w-60 bg-gray-800 shadow-lg text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 transition-transform duration-300 ease-in-out sm:relative sm:w-52`}>
                <nav className="p-2 h-full flex flex-col">
                    <Button
                        className="sm:hidden mb-5"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <BsLayoutSidebarInsetReverse size={20} /> : <BsLayoutSidebarInset size={20} />}
                    </Button>

                    <div className="flex-grow">
                        <Link to="/dashboard" className="flex items-center gap-2 my-2 py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-700">
                            <MdSpaceDashboard size={25} /> Dashboard
                        </Link>
                        <Link to="/mycourses" className="flex items-center gap-2 my-2 py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-700">
                            <MdLibraryBooks size={25} /> My Courses
                        </Link>
                        <Link to="/resumebuilder" className="flex items-center gap-3 my-2 py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-700">
                            <FaTools size={20} /> Resume Builder
                        </Link>
                        <Link to="/mockinterview" className="flex items-center gap-3 my-2 py-2.5 px-4 rounded-lg transition duration-200 hover:bg-gray-700">
                            <MdCamera size={25} />Mock Interview
                        </Link>
                    </div>

                    <div className="mt-auto">
                        <Button variant="destructive" onClick={handleLogout} className="w-full">
                            Logout
                        </Button>
                    </div>
                </nav>
            </div>

        </div>
    );
};

export default Sidebar;
