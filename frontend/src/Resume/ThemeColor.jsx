import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { IoIosColorPalette } from "react-icons/io";
import { ResumeInfoContext } from '@/context/ResumeContext';

const ThemeColor = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState();
    const colors = [
        "#000000",
        "#E74C3C",
        "#C0392B",
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
                    <Button variant="outline" size="sm" className="flex gap-2"><IoIosColorPalette size={20} />Theme</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <h2 className='mb-3 text-sm font-bold'>Select Theme Color</h2>
                    <div className=' grid grid-cols-5 gap-3 -mr-5'>
                        {colors.map((item, index) => (
                            <div onClick={() => onThemeChange(item)} className={`h-6 w-6 rounded-full cursor-pointer border-2 hover:border-black ${selectedColor == item && 'border-2 border-black'}`} style={{
                                background: item
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
