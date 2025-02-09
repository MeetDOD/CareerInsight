import { useTheme } from '@/components/ui/themeprovider'
import Category from '@/home/Category'
import FAQ from '@/home/FAQ'
import Features from '@/home/Features'
import Hero from '@/home/Hero'
import WebDetails from '@/home/WebDetails'
import React, { useEffect } from 'react'

const Home = () => {
    const { theme } = useTheme();

    useEffect(() => {
        document.title = "CAREERINSIGHT";
    }, []);
    return (
        <div>
            {theme === 'dark' ? (
                <div className="absolute inset-0 -z-10 h-screen bg-[radial-gradient(#ffffff33_1px,#111827_1px)] bg-[size:20px_20px]"></div>
            ) : (
                <div className="absolute inset-5 -z-10 h-screen bg-[radial-gradient(#e5e7eb_1px,transparent_1.5px)] [background-size:16px_16px]"></div>
            )}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(100%_50%_at_50%_0%,rgba(37,99,235,0.25)_0,rgba(37,99,235,0)_50%,rgba(37,99,235,0)_100%)]"></div>
            <div className="absolute inset-0 -z-10 h-full w-full"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(37,99,235,0.5)] opacity-50 blur-[80px]"></div></div>

            <Hero />
            <Category />
            <Features />
            <WebDetails />
            <FAQ />
        </div>
    )
}

export default Home
