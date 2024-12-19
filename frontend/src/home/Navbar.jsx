import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ui/themeprovider';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import logo from "../assets/image.png"
import { loggedInState, tokenState, userState } from '@/store/auth';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isLoggedIn = useRecoilValue(loggedInState);
    const setTokenState = useSetRecoilState(tokenState);
    const user = useRecoilValue(userState);
    const [showAddDetailsDialog, setShowAddDetailsDialog] = useState(false);

    const [formData, setFormData] = useState({
        phoneno: '',
        gender: '',
        dateofbirth: '',
        collegename: '',
        university: '',
        academicyear: '',
        address: '',
        techstack: '',
    });

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        if (user && isDetailsIncomplete(user)) {
            setShowAddDetailsDialog(true);
        }
    }, [user]);

    useEffect(() => {
        setIsFormValid(!Object.values(formData).some((value) => !value));
    }, [formData]);

    const isDetailsIncomplete = (user) => {
        return Object.values({
            phoneno: user.phoneno,
            gender: user.gender,
            dateofbirth: user.dateofbirth,
            collegename: user.collegename,
            university: user.university,
            academicyear: user.academicyear,
            address: user.address,
            techstack: user.techstack,
        }).some((value) => !value);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setTokenState("");
        toast.success("Logged out successfully");
        navigate("/")
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveDetails = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/adduserdetail`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            toast.success('Details added successfully!');
            setShowAddDetailsDialog(false);
            navigate('/dashboard');
        } catch (err) {
            toast.error('Failed to add details. Please try again.');
            console.log(err)
        }
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b' style={{ borderColor: `var(--borderColor)` }}>
            <img src={logo} className='w-28 cursor-pointer' alt='TECHCARE' onClick={() => navigate("/")} />
            <ul className='hidden md:flex items-start gap-5 font-medium list-none'>
                <NavLink to="/">
                    <li className='py-1 hover:bg-primary  hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Home</li>
                </NavLink>
                <NavLink to="/courses">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Courses</li>
                </NavLink>
                <NavLink to="/about">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>About</li>
                </NavLink>
                <NavLink to="/contact">
                    <li className='py-1 hover:bg-primary hover:text-white px-2 rounded-md hover:-translate-y-1 transition duration-300'>Contact</li>
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                <Button size="sm" variant="ghost" className="border" onClick={toggleTheme} style={{
                    borderColor: `var(--borderColor)`,
                }}>
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
                            <img src={logo} onClick={() => setShowMenu(false)} className='w-28 cursor-pointer' alt='TECHCARE' />
                        </Link>
                        <button className='w-7' onClick={() => setShowMenu(false)}><IoIosCloseCircleOutline size={25} /></button>
                    </div>
                    <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium list-none'>
                        <NavLink to="/" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Home</p></NavLink>
                        <NavLink to="/courses" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Courses</p></NavLink>
                        <NavLink to="/about" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">About</p></NavLink>
                        <NavLink to="/contact" onClick={() => setShowMenu(false)}><p className="px-4 py-2 hover:text-primary transition rounded-md inline-block">Contact</p></NavLink>
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

            <Dialog open={showAddDetailsDialog} onOpenChange={() => { }} closeOnEsc={false} closeOnOutsideClick={false}>
                <DialogContent className='sm:max-w-[425px]' style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                    <DialogHeader>
                        <DialogTitle>Complete Your Profile</DialogTitle>
                        <DialogDescription>Please fill out all required fields to continue.</DialogDescription>
                    </DialogHeader>
                    <form className='grid gap-4 py-4'>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='phoneno' className='text-right'>
                                Phone Number
                            </Label>
                            <Input
                                id='phoneno'
                                name='phoneno'
                                placeholder='Enter your phone number'
                                onChange={handleChange}
                                className='col-span-3 inputField'
                                type="number"
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='gender' className='text-right'>
                                Gender
                            </Label>
                            <Input
                                id='gender'
                                name='gender'
                                placeholder='Enter your gender'
                                onChange={handleChange}
                                className='col-span-3 inputField'
                                type="text"
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='dateofbirth' className='text-right'>
                                Date of Birth
                            </Label>
                            <Input
                                id='dateofbirth'
                                name='dateofbirth'
                                placeholder='Enter your date of birth'
                                onChange={handleChange}
                                className='col-span-3 inputField'
                                type="date"
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='collegename' className='text-right'>
                                College Name
                            </Label>
                            <Input
                                id='collegename'
                                name='collegename'
                                placeholder='Enter your college name'
                                onChange={handleChange}
                                className='col-span-3 inputField'
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='university' className='text-right'>
                                University
                            </Label>
                            <Input
                                id='university'
                                name='university'
                                placeholder='Enter your university'
                                onChange={handleChange}
                                className='col-span-3 inputField'
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='academicyear' className='text-right'>
                                Academic Year
                            </Label>
                            <Input
                                id='academicyear'
                                name='academicyear'
                                placeholder='Enter your academic year'
                                onChange={handleChange}
                                className='col-span-3 inputField'
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='address' className='text-right'>
                                Address
                            </Label>
                            <Input
                                id='address'
                                name='address'
                                placeholder='Enter your address'
                                onChange={handleChange}
                                className='col-span-3 inputField'
                            />
                        </div>

                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='techstack' className='text-right'>
                                Tech Stack
                            </Label>
                            <Input
                                id='techstack'
                                name='techstack'
                                placeholder='Enter your tech stack'
                                onChange={handleChange}
                                className='col-span-3 inputField'
                            />
                        </div>

                        <DialogFooter>
                            <Button type='button' onClick={handleSaveDetails} disabled={!isFormValid}>
                                Save Details
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Navbar