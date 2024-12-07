import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { tokenState, userState } from '@/store/atoms/userauth';
import { useSetRecoilState } from 'recoil';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
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
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('All fields are required');
            return;
        }

        // try {
        //     const res = await userlogin({ email, password });
        //     if (res.status === 200 && res.data.token) {
        //         toast.success('Login successful');
        //         localStorage.setItem('token', res.data.token);
        //         localStorage.setItem('user', JSON.stringify(res.data.user));
        //         setToken(res.data.token);
        //         setUser(res.data.user);
        //         navigate('/patientprofile');
        //     } else if (res.data.message) {
        //         toast.error(res.data.message);
        //     }
        // } catch (err) {
        //     toast.error('Invalid email or password');
        // }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "CAREER INSIGHT | USER LOGIN";
    }, []);

    return (
        <form className='justify-center min-h-[80vh] flex items-center flex-col' onSubmit={handleLogin}>
            <Tabs defaultValue="login" className="w-[400px]" >
                <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)` }}>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <Card style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                        <CardHeader>
                            <CardTitle className="font-bold" >Welcome <span className='text-primary'>User</span></CardTitle>
                            <CardDescription>
                                Lorem ipsum dolor sit amet consectetur adipisicing.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    className="inputField"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <div className="w-full relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pr-10 inputField"
                                        required
                                    />
                                    {showPassword ? (
                                        <FaEye onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                                    ) : (
                                        <FaEyeSlash onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit">Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="signup">
                    <Card style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                        <CardHeader>
                            <CardTitle className="font-bold" >Join <span className='text-primary'>Career Insight</span></CardTitle>
                            <CardDescription>
                                Lorem ipsum dolor sit amet consectetur adipisicing.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="fullname">Full Name</Label>
                                <Input className="inputField" type="text" value={lastName} onChange={(e) => setLastname(e.target.value)} placeholder="Enter your full name" required />
                            </div>
                            <div className='space-y-1'>
                                <Label htmlFor="email">Email</Label>
                                <Input className="inputField" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />

                            </div>
                            <div className="space-y-1">
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
                            </div>
                            {isOtpSent && (
                                <div className='space-y-1'>
                                    <Label htmlFor="otp">Enter OTP</Label>
                                    <Input type="number" className="inputField" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter the otp" required />
                                    <div className='gap-2 flex items-center'>
                                        <Button className="w-full mt-2" type="button" onClick={handleVerifyOtp}>Verify OTP</Button>
                                        <Button className="w-full border mt-2" variant="ghost" type="button" onClick={handleSubmit}>Resend OTP</Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            {!isOtpSent && (
                                <Button className="w-full" type="button" onClick={handleSubmit}>Sign Up</Button>
                            )}
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </form>
    );
};

export default UserLogin;