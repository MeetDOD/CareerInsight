import { Button } from '@/components/ui/button';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import hero from '../assets/hero.png';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loggedInState } from '@/store/auth';
import { AnimatedShinyText } from '@/components/magicui/animated-shiny-text';

const Hero = () => {
    const navigate = useNavigate();
    const isLoggedIn = useRecoilValue(loggedInState);

    function handleExplore() {
        if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    }

    function handleCourse() {
        navigate("/courses");
    }

    return (
        <div className="overflow-hidden my-20 mb-28">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(100%_50%_at_50%_0%,rgba(124,58,237,0.25)_0,rgba(124,58,237,0)_50%,rgba(124,58,237,0)_100%)]"></div>
            <div className="absolute inset-0 -z-10 h-full w-full">
                <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(124,58,237,0.5)] opacity-50 blur-[80px]"></div>
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                        <div className="flex my-5 gap-2 items-center border border-yellow-300 bg-yellow-50 rounded-full px-3 py-1 w-fit shadow-md hover:shadow-lg hover:-translate-y-1 transition group">
                            <AnimatedShinyText className={`flex gap-2 items-center`}>
                                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full border border-yellow-600 animate-pulse"></div>
                                <p className="text-sm text-yellow-600">Introducing Career Insight</p>
                                <FaArrowRight color="#ca8a04" className="group-hover:translate-x-1 transition duration-300" />
                            </AnimatedShinyText>
                        </div>

                        <div className="hidden lg:flex gap-5 py-5">
                            <div className="flex justify-center gap-2 items-center opacity-90 text-sm">
                                <FaArrowRight className="opacity-90 -mr-1" /> AI Industry Insights
                            </div>
                            <div className="flex justify-center gap-2 items-center opacity-90 text-sm">
                                <FaArrowRight className="opacity-90 -mr-1" /> AI Mock Interview
                            </div>
                            <div className="flex justify-center gap-2 items-center opacity-90 text-sm">
                                <FaArrowRight className="opacity-90 -mr-1" /> AI Resume Builder
                            </div>
                        </div>

                        <div className="pt-5">
                            <h1 className="pb-4 font-bold tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl sm:leading-snug leading-normal">
                                Unlock Your Potential with <span className='text-primary font-extrabold'>Career Insight</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-lg lg:text-xl mt-4 font-semibold opacity-95">
                                Build your skills, create stunning portfolios, and prepare for your future.
                            </p>
                        </div>

                        <div className="pt-10 flex flex-col gap-5 sm:flex-row">
                            <Button onClick={handleExplore} className="px-8 py-6 shadow-md">
                                Get Started
                            </Button>
                            <Button onClick={handleCourse} variant="ghost" className="px-8 py-6 border shadow-sm">
                                Explore Courses
                            </Button>
                        </div>
                    </div>

                    <div className="hidden md:block -ml-16 header-img-section">
                        <img src={hero} alt="Career Insight" className="w-full h-auto" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Hero;