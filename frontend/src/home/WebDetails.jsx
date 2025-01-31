import React from 'react';
import laptop from '../assets/laptop.png';
import dashboard from '../assets/UserDashboard.png';
import { FaCheckCircle } from "react-icons/fa";

const WebDetails = () => {
    return (
        <div
            className="bg-primary p-6 md:p-10 py-12 md:py-16 rounded-2xl mt-14 shadow-xl bg-cover bg-center"
            style={{
                backgroundImage: `url('https://static.canva.com/web/images/e733916c4616f5baa19098cc2844369b.jpg')`,
            }}
        >
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
                <div className="relative w-full lg:w-1/2 max-w-xl mx-auto lg:mx-0">
                    <img src={laptop} alt="Laptop" className="w-full" />
                    <img
                        src={dashboard}
                        alt="Dashboard inside Laptop"
                        className="absolute top-[4%] left-[11%] w-[78%] h-[85%] rounded-lg"
                    />
                </div>

                <div className="w-full lg:w-1/2 text-white text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                        Explore Career Opportunities with <span className="italic">Career Insight</span>
                    </h2>
                    <p className="mt-4 text-base sm:text-lg font-medium">
                        CareerInsight provides a platform to explore and plan your career path efficiently. Our user-friendly
                        dashboard helps you track progress, gain insights, and make informed decisions to achieve your goals.
                    </p>

                    <ul className="mt-6 space-y-3">
                        <li className="flex items-center">
                            <span className="text-green-400 rounded-full border-2 border-green-600 text-xl mr-3 animate-pulse"><FaCheckCircle /></span>
                            <span className="text-base sm:text-lg font-medium">AI-powered industry insights to guide your journey</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-400 rounded-full border-2 border-green-600 text-xl mr-3 animate-pulse"><FaCheckCircle /></span>
                            <span className="text-base sm:text-lg font-medium">Personalized dashboards for tracking your progress</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-400 rounded-full border-2 border-green-600 text-xl mr-3 animate-pulse"><FaCheckCircle /></span>
                            <span className="text-base sm:text-lg font-medium">Interactive tools for resume building and assessments</span>
                        </li>
                        <li className="flex items-center">
                            <span className="text-green-400 rounded-full border-2 border-green-600 text-xl mr-3 animate-pulse"><FaCheckCircle /></span>
                            <span className="text-base sm:text-lg font-medium">Discover career paths tailored to your skills and goals</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WebDetails;