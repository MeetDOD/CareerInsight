import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { ImSpinner2 } from "react-icons/im";
import { useSetRecoilState } from "recoil";
import { tokenState } from "@/store/auth";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();
  const [timer, setTimer] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);

  const setTokenState = useSetRecoilState(tokenState);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/login`,
        {
          email,
          password,
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setTokenState(res.data?.token);
        localStorage.setItem("token", res.data?.token || "");
        localStorage.setItem("user", JSON.stringify(res.data?.user));
        navigate("/dashboard");
      } else if (res.status === 400) {
        toast.error("User already exists");
      }
    } catch (err) {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!fullName || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/register`,
        {
          fullName,
          email,
          password,
        }
      );
      if (res.status === 200) {
        setIsOtpSent(true);
        toast.success(res.data.message);
        startTimer();
      } else if (res.status === 400) {
        toast.error("User already exists");
      }
    } catch (err) {
      toast.error(err.response.data.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const startTimer = () => {
    setTimerRunning(true);
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(intervalId);
          setTimerRunning(false);
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setVerifyLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/verify-otp`,
        {
          email,
          enteredOTP: otp,
          fullName,
          password,
        }
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setActiveTab("login");
      } else if (res.status === 400) {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Failed to verify OTP");
      console.log(err);
    } finally {
      setVerifyLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "CAREER INSIGHT | USER LOGIN / SIGNUP";
  }, []);

  return (
    <form
      className="justify-center min-h-[80vh] flex items-center flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        const activeTab = document.querySelector("[data-state='active']")
          .textContent;
        if (activeTab === "Login") {
          handleLogin(e);
        } else if (activeTab === "Sign Up") {
          handleSignup(e);
        }
      }}
    >
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-[400px]"
      >
        <TabsList
          className="grid w-full grid-cols-2"
          style={{
            backgroundColor: `var(--background-color)`,
            color: `var(--text-color)`,
          }}
        >
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card
            style={{
              backgroundColor: `var(--background-color)`,
              color: `var(--text-color)`,
              borderColor: `var(--borderColor)`,
            }}
          >
            <CardHeader>
              <CardTitle className="font-bold">
                Welcome <span className="text-primary">User</span>
              </CardTitle>
              <CardDescription>
                Ready to shape your future? Let's build your career together.
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
                    <FaEye
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-3 cursor-pointer text-sm"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-3 cursor-pointer text-sm"
                    />
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={loading} type="submit">
                {loading ? (
                  <div className="flex flex-row gap-2 items-center">
                    <ImSpinner2 className="animate-spin" /> Login you in
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card
            style={{
              backgroundColor: `var(--background-color)`,
              color: `var(--text-color)`,
              borderColor: `var(--borderColor)`,
            }}
          >
            <CardHeader>
              <CardTitle className="font-bold">
                Join <span className="text-primary">Career Insight</span>
              </CardTitle>
              <CardDescription>
                Start building your future today. Create your personalized
                career journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  className="inputField"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="inputField"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Create Password</Label>
                <div className="w-full relative">
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create Your Password"
                    className="w-full pr-10 inputField"
                    required
                  />
                  {showPassword ? (
                    <FaEye
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-3 cursor-pointer text-sm"
                    />
                  ) : (
                    <FaEyeSlash
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-3 cursor-pointer text-sm"
                    />
                  )}
                </div>
              </div>
              {isOtpSent && (
                <div className="space-y-1">
                  <Label htmlFor="otp">Enter OTP</Label>
                  <Input
                    type="number"
                    className="inputField"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP"
                    required
                  />
                  <div>
                    {timerRunning && (
                      <span className="text-sm">{`Time remaining: ${Math.floor(
                        timer / 60
                      )}:${
                        timer % 60 < 10 ? "0" + (timer % 60) : timer % 60
                      }`}</span>
                    )}
                  </div>
                  <div className="gap-2 flex items-center">
                    <Button
                      disabled={verifyLoading}
                      className="w-full mt-2"
                      type="button"
                      onClick={handleVerifyOtp}
                    >
                      {verifyLoading ? (
                        <div className="flex flex-row gap-2 items-center">
                          <ImSpinner2 className="animate-spin" /> Verifying OTP
                        </div>
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                    <Button
                      disabled={loading}
                      className="w-full border mt-2"
                      variant="ghost"
                      type="button"
                      onClick={handleSignup}
                    >
                      {loading ? (
                        <div className="flex flex-row gap-2 items-center">
                          <ImSpinner2 className="animate-spin" /> Resending OTP
                        </div>
                      ) : (
                        "Resend OTP"
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              {!isOtpSent && (
                <Button disabled={loading} className="w-full" type="submit">
                  {loading ? (
                    <div className="flex flex-row gap-2 items-center">
                      <ImSpinner2 className="animate-spin" /> Sending OTP
                    </div>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
};

export default UserLogin;
