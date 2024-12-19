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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImSpinner2 } from 'react-icons/im';

const Navbar = () => {

    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isLoggedIn = useRecoilValue(loggedInState);
    const setTokenState = useSetRecoilState(tokenState);
    const user = useRecoilValue(userState);
    const [showAddDetailsDialog, setShowAddDetailsDialog] = useState(false);
    const [loading, setLoading] = useState(false);
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSaveDetails = async (e) => {
        e.preventDefault();
        setLoading(true);
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
            navigate('/');
        } catch (err) {
            toast.error('Failed to add details. Please try again.');
        } finally {
            setLoading(false);
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
                <DialogContent
                    className='max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] p-6 rounded-lg shadow-lg border overflow-y-auto max-h-[90vh]'
                    style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, scrollY: "auto" }}>

                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold text-center">Complete Your Profile</DialogTitle>
                        <DialogDescription className="text-center text-sm">
                            Please fill out all required fields to continue with careerinsight.
                        </DialogDescription>
                    </DialogHeader>

                    <form className='grid gap-6'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col space-y-2'>
                                <Label htmlFor='phoneno' className='font-medium'>
                                    Phone Number
                                </Label>
                                <Input
                                    id='phoneno'
                                    name='phoneno'
                                    placeholder='Enter your phone number'
                                    onChange={handleChange}
                                    className='inputField'
                                    type="number"
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <Label htmlFor='gender' className='font-medium'>
                                    Gender
                                </Label>

                                <Select
                                    onValueChange={(value) => handleChange({ target: { name: 'gender', value } })}
                                    id='gender'
                                    name='gender'
                                >
                                    <SelectTrigger className="inputField">
                                        <SelectValue placeholder='Select your gender' />
                                    </SelectTrigger>

                                    <SelectContent
                                        style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}
                                    >
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Not to say">Not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col space-y-2'>
                                <Label htmlFor='dateofbirth' className='font-medium'>
                                    Date of Birth
                                </Label>
                                <Input
                                    id='dateofbirth'
                                    name='dateofbirth'
                                    onChange={handleChange}
                                    className='inputField'
                                    type="date"
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <Label htmlFor='collegename' className='font-medium'>
                                    College Name
                                </Label>
                                <Input
                                    id='collegename'
                                    name='collegename'
                                    placeholder='Enter your college name'
                                    onChange={handleChange}
                                    className='inputField'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex flex-col space-y-2'>
                                <Label htmlFor='university' className='font-medium'>
                                    University
                                </Label>
                                <Input
                                    id='university'
                                    name='university'
                                    placeholder='Enter your university'
                                    onChange={handleChange}
                                    className='inputField'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <Label htmlFor='academicyear' className='font-medium'>
                                    Academic Year
                                </Label>
                                <Input
                                    id='academicyear'
                                    name='academicyear'
                                    placeholder='Enter your academic year'
                                    onChange={handleChange}
                                    className='inputField'
                                />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                            <div className='flex flex-col space-y-2'>
                                <Label htmlFor='address' className='font-medium'>
                                    Address
                                </Label>
                                <Input
                                    id='address'
                                    name='address'
                                    placeholder='Enter your address'
                                    onChange={handleChange}
                                    className='inputField'
                                />
                            </div>
                            <div className='flex flex-col space-y-2'>
                                <Label htmlFor='techstack' className='font-medium'>
                                    Tech Stack
                                </Label>
                                <Input
                                    id='techstack'
                                    name='techstack'
                                    placeholder='Enter your tech stack'
                                    onChange={handleChange}
                                    className='inputField'
                                />
                            </div>
                        </div>

                        <DialogFooter className='flex justify-center mt-6'>
                            <Button
                                type='button'
                                onClick={handleSaveDetails}
                                disabled={!isFormValid || loading}
                                className='px-6 py-3 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'>
                                {loading ? (
                                    <div className="flex flex-row gap-2 items-center">
                                        <ImSpinner2 size={20} className="animate-spin" /> Saving your details
                                    </div>
                                ) : 'Save Details'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Navbar