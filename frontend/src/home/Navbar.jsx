import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/themeprovider';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import logo from "../assets/logo.png"
import { loggedInState, tokenState } from '@/store/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'sonner';

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isLoggedIn = useRecoilValue(loggedInState);
    const setTokenState = useSetRecoilState(tokenState);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setTokenState("");
        toast.success("Logged out successfully");
        navigate("/login")
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'q') {
                toggleTheme();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [toggleTheme]);

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-primary'>
            <img src={logo} className='w-auto h-9 cursor-pointer' alt='CAREER INSIGHT' onClick={() => navigate("/")} />
            <ul className='hidden md:flex items-center justify-center gap-5 font-medium list-none'>
                {/* <NavLink to="/">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Home</li>
                </NavLink> */}
                <NavLink to="/codingquestions">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Coding</li>
                </NavLink>
                {/* <NavLink to="/about">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>About</li>
                </NavLink> */}
                <NavLink to="/courses">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Courses</li>
                </NavLink>
                <NavLink to="/riverflow">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Riverflow</li>
                </NavLink>
                <NavLink to="/pricing">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Pricing</li>
                </NavLink>
                <NavLink to="/leaderboard">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Leaderboard</li>
                </NavLink>
            </ul>
            <div className='flex items-center gap-2'>
                <Button size="sm" variant="ghost" className="border border-primary" onClick={toggleTheme}>
                    {theme === "dark" ? <BsFillMoonStarsFill className="h-5 w-5 text-primary" /> : <BsFillSunFill className="h-5 w-5 text-primary" />}
                </Button>
                {isLoggedIn ?
                    <Link to="/dashboard">
                        <Button size="sm" className='bg-primary hover:bg-primary/90 text-white px-6 rounded-md py-2 font-semibold hidden md:block'>
                            Dashboard
                        </Button>
                    </Link>
                    :
                    <Link to="/login">
                        <Button size="sm" className='bg-primary hover:bg-primary/90 text-white px-6 rounded-md py-2 font-semibold hidden md:block'>
                            Login / Signup
                        </Button>
                    </Link>
                }

                <button onClick={() => setShowMenu(true)} className='w-6 md:hidden'><GiHamburgerMenu size={25} /></button>

                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden transition-all`} style={{ backgroundColor: `var(--background-color)` }} >
                    <div className='flex items-center justify-between px-5 py-6'>
                        <Link to='/'>
                            <img src={logo} onClick={() => setShowMenu(false)} className='w-auto h-9 cursor-pointer' alt='TECHCARE' />
                        </Link>
                        <button className='w-7' onClick={() => setShowMenu(false)}><IoIosCloseCircleOutline size={25} /></button>
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium list-none'>
                        {/* <NavLink to="/" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Home</p></NavLink> */}
                        {/* <NavLink to="/about" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">About</p></NavLink> */}
                        <NavLink to="/courses" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Courses</p></NavLink>
                        <NavLink to="/codingquestions" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Coding</p></NavLink>
                        <NavLink to="/riverflow" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Riverflow</p></NavLink>
                        <NavLink to="/pricing" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Pricing</p></NavLink>
                        <NavLink to="/leaderboard" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Leaderboard</p></NavLink>
                        {!isLoggedIn &&
                            <Button size="lg" onClick={() => { navigate("/login"), setShowMenu(false) }} className='text-lg bg-primary w-full hover:bg-primary/90 text-white px-6 rounded-md py-2 font-semibold '>
                                Login / Signup
                            </Button>
                        }
                        {isLoggedIn &&
                            <Button size="lg" onClick={() => { navigate("/dashboard"), setShowMenu(false) }} className='text-lg w-full px-6 rounded-md py-2'>
                                Dashboard
                            </Button>
                        }
                        {isLoggedIn &&
                            <Button size="lg" variant="destructive" onClick={() => { handleLogout(), setShowMenu(false) }} className='text-lg  w-full px-6 rounded-md py-2'>
                                Logout
                            </Button>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar