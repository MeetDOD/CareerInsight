import { Button } from '@/components/ui/button';
import React from 'react'
import { BsChevronUp } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import { FaCloudArrowUp } from "react-icons/fa6";

const PrefFooter = () => {
    return (
        <div className='flex bg-dark-layer-1 absolute bottom-0 z-10 w-full'>
            <div className='ml-6 my-[10px] flex justify-between w-full'>
                <div className='mr-2 flex flex-1 flex-nowrap items-center space-x-4'>
                    <Button variant="secondary" className="border">
                        Console
                        <BsChevronUp />
                    </Button>
                </div>
                <div className='ml-auto flex items-center space-x-4'>
                    <Button>
                        <FaPlay />
                        Run
                    </Button>
                    <Button className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-green-500 hover:bg-green-500/90 rounded-lg'>
                        <FaCloudArrowUp />
                        Submit
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default PrefFooter
