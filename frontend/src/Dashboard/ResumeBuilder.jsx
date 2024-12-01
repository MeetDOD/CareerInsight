import React from 'react'
import { IoMdArrowRoundBack, IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';

const ResumeBuilder = () => {
    return (
        <div>
            <Button className="flex gap-2" onClick={() => window.history.back()} size="sm"><IoMdArrowRoundBack size={20} /> Back</Button>

            <div className="w-full p-10 my-5 rounded-lg bg-violet-700 text-center">
                <div className="my-5">
                    <h1 className="text-2xl md:text-4xl text-gray-50 font-bold leading-tight pb-2">
                        Build Your Professional Resume in Minutes
                    </h1>
                    <p className="text-lg md:text-xl text-gray-100 pb-2 mt-3">
                        Our intuitive platform helps you design and customize resumes tailored to your career goals.
                    </p>
                </div>
            </div>

            <div>
                <h2 className='font-bold text-2xl mt-5'>
                    My Resume
                </h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5'>
                <Link to="/resumebody" className='p-14 py-24 items-center bg-secondary justify-center flex border-2 border-dashed rounded-lg h-[280px] hover:scale-95 transition-all hover:shadow-md cursor-pointer'>
                    <IoMdAdd size={30} />
                </Link>
            </div>
        </div>
    )
}

export default ResumeBuilder
