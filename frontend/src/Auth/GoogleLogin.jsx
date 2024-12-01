import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState, tokenState } from "@/store/auth";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { googleLoginHelper } from '@/lib/auth.helper';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState, useEffect } from 'react';

const GoogleLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const setTokenState = useSetRecoilState(tokenState);
    const user = useRecoilValue(userState);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('All fields are required');
            return;
        }

        try {
        } catch (err) {
            toast.error('Invalid email or password');
        }
    };

    const responseGoogle = async (response) => {
        try {
            if (response['code']) {
                const result = await googleLoginHelper(response['code']);
                const { message, token, status } = result;
                if (status === 200) {
                    localStorage.setItem('token', token);
                    setTokenState(token);
                    navigate("/dashboard");
                } else {
                    alert(message);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    });

    useEffect(() => {
        if (user && user._id) {
            navigate("/dashboard");
        }
        window.scrollTo(0, 0);
        document.title = "SCHOLARIO | USER LOGIN";
    }, [user]);

    return (
        <div>
            <form className='min-h-[80vh] flex items-center' onSubmit={handleLogin}>
                <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-sm shadow-md border bg-white'>
                    <p className='text-2xl font-bold'>Welcome User</p>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
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
                            className="w-full pr-10"
                            required
                        />
                        {showPassword ? (
                            <FaEye onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                        ) : (
                            <FaEyeSlash onClick={togglePasswordVisibility} className="absolute right-2 top-3 cursor-pointer text-sm" />
                        )}
                    </div>

                    <Button className="w-full mt-4" type="submit">Login</Button>

                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Other log in options</span>
                    </div>
                    <Button variant="secondary" className="w-full gap-2 border " type="button" onClick={googleLogin}> <FcGoogle size={25} /> Sign In with Google</Button>
                    <Button variant="ghost" className="border w-full" onClick={() => navigate("/register")}>Register</Button>
                </div>
            </form>
        </div>
    );
};

export default GoogleLogin;
