import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const UserRegister = () => {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !password) {
            toast.error('All fields are required');
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/register`, {
                firstName, lastName, email, password
            });

            if (res.status === 200) {
                setIsOtpSent(true);
                toast.success(res.data.message);
            } else if (res.status === 400) {
                toast.error("User already exists");
            }
        } catch (err) {
            toast.error('Server Error');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/user/verify-otp`, {
                email, enteredOTP: otp, firstName, lastName, password
            });

            if (res.status === 200) {
                toast.success(res.data.message);
                navigate("/login");
            } else if (res.status === 400) {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error("Failed to verify OTP");
            console.log(err);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "CAREER INSIGHT | USER REGISTER";
    }, []);

    return (
        <form className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-sm shadow-md border' style={{
                borderColor: `var(--borderColor)`,
            }}>
                <p className='text-2xl font-bold mb-2'>Join <span className='text-primary'>Career Insight</span></p>

                <Label htmlFor="lastname">Full Name</Label>
                <Input className="inputField" type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Enter your full name" required />

                <Label htmlFor="email">Email</Label>
                <Input className="inputField" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />

                <Label htmlFor="password">Create Password</Label>
                <div className="w-full relative">
                    <Input
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder="Create Your Password"
                        className="w-full pr-10 inputField"
                        required
                    />
                    {showPassword ?
                        <FaEye onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                        :
                        <FaEyeSlash onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                    }
                </div>

                {!isOtpSent && (
                    <>
                        <Button className="w-full mt-4" type="button" onClick={handleSubmit}>Register</Button>
                        <Button variant="ghost" className="border w-full" onClick={() => navigate("/login")}>Login</Button>
                    </>
                )}

                {isOtpSent && (
                    <>
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input type="number" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter the otp" required />
                        <Button className="w-full mt-4" type="button" onClick={handleVerifyOtp}>Verify OTP</Button>
                        <Button className="w-full border" variant="ghost" type="button" onClick={handleSubmit}>Resend OTP</Button>
                    </>
                )}
            </div>
        </form>
    );
};

export default UserRegister;