import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { tokenState, userState } from '@/store/atoms/userauth';
import { useSetRecoilState } from 'recoil';

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    // const setToken = useSetRecoilState(tokenState);
    // const setUser = useSetRecoilState(userState);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
        document.title = "TECHCARE | USER LOGIN";
    }, []);

    return (
        <form className='min-h-[80vh] flex items-center' onSubmit={handleLogin}>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-sm shadow-md border' style={{
                borderColor: `var(--borderColor)`,
            }} >
                <p className='text-2xl font-bold mb-2'>Welcome <span className='text-primary'>User</span></p>

                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    className="inputField"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

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

                <Button className="w-full mt-4" type="submit">Login</Button>
                <Button variant="ghost" className="border w-full" onClick={() => navigate("/register")}>Register</Button>
            </div>
        </form>
    );
};

export default UserLogin;