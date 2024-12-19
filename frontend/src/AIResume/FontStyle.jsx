import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button';
import { FaFont } from "react-icons/fa";
import { ResumeInfoContext } from '@/context/ResumeContext';

const FontStyle = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [selectedFont, setSelectedFont] = useState();

    const fonts = [
        'Arial',
        'Verdana',
        'Tahoma',
        'Georgia',
        'Times New',
        'Courier',
        'Lucida'
    ];

    const onFontChange = (font) => {
        setSelectedFont(font)
        setResumeInfo({
            ...resumeInfo,
            fontStyle: font
        })
    }

    return (
        <div>
            <Popover>
                <PopoverTrigger>
                    <Button variant="secondary" size="sm" className="flex gap-2 border">
                        <FaFont size={20} />Font Style
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="border border-gray-300" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }} >
                    <h2 className='mb-3 text-sm font-bold' style={{ color: `var(--text-color)` }}>Select Font Style</h2>
                    <div className='grid grid-cols-2 gap-3'>
                        {fonts.map((font, index) => (
                            <div
                                key={index}
                                onClick={() => onFontChange(font)}
                                className={`p-2 rounded-md cursor-pointer hover:bg-primary ${selectedFont === font ? 'bg-primary text-white' : ''}`}
                                style={{ fontFamily: font, color: `var(--text-color)` }}
                            >
                                {font}
                            </div>
                        ))}
                    </div>
                </PopoverContent>

            </Popover>
        </div>
    )
}

export default FontStyle