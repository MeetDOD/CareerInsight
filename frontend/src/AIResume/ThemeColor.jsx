import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { IoColorPalette } from "react-icons/io5";
import { ResumeInfoContext } from '@/context/ResumeContext';

const ThemeColor = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const colors = [
        "#000000",
        "#E74C3C",
        "#7c3aed",
        "#3498DB",
        "#2980B9",
        "#1ABC9C",
        "#16A085",
        "#27AE60",
        "#2ECC71",
        "#F39C12",
        "#D35400",
        "#9B59B6",
        "#8E44AD",
        "#FF5733",
        "#33FF57",
        "#FF33A1",
        "#33FFF5",
        "#FFD700",
        "#FF69B4",
        "#8B0000"
    ];

    const onThemeChange = (color) => {
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })
    }
    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <Button variant="secondary" size="sm" className="text-gray-200 flex gap-2 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-600 hover:bg-gradient-to-r hover:from-violet-500 hover:via-purple-600 hover:to-indigo-700"><IoColorPalette size={25} />Theme</Button>
                </PopoverTrigger>
                <PopoverContent className="border border-gray-300" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }} >
                    <h2 className='mb-3 text-sm font-bold' style={{ color: `var(--text-color)` }}>Select Theme Color</h2>
                    <div className='grid grid-cols-5 gap-3 -mr-5'>
                        {colors.map((item, index) => (
                            <div onClick={() => onThemeChange(item)} key={index} className={`h-6 w-6 rounded-full cursor-pointer border-2 hover:border-primary ${selectedColor == item && 'border-2 border-primary'}`} style={{
                                backgroundColor: item
                            }}>

                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ThemeColor
