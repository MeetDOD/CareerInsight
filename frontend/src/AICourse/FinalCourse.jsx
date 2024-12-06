import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaClock } from 'react-icons/fa';
import { finalCourseState } from '@/store/courseState';
import { useRecoilValue } from 'recoil';

const FinalCourse = () => {
    const [activeChapterIndex, setActiveChapterIndex] = useState(0);
    const { courseName, chapters } = useRecoilValue(finalCourseState);

    if (chapters.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen ">
                <h2 className="text-3xl font-bold">No chapters available.</h2>
                <p className="mt-2 text-xl font-semibold">Please generate course content first.</p>
            </div>
        );
    }

    const activeChapter = chapters[activeChapterIndex];

    return (
        <div className="flex flex-col lg:flex-row min-h-screen" style={{ borderColor: `var(--borderColor)` }}>

            <div className="shadow-md border rounded-xl border-gray-300 lg:w-1/4 p-4 h-screen lg:sticky top-0 overflow-y-auto" style={{ borderColor: `var(--borderColor)` }}>
                <h2 className="text-lg font-bold mb-4 border-b pb-4">{courseName}</h2>
                <ul className="space-y-2">
                    {chapters.map((chapter, index) => (
                        <li
                            key={index}
                            onClick={() => setActiveChapterIndex(index)}
                            className={`px-3 py-2 rounded-lg cursor-pointer ${activeChapterIndex === index
                                ? 'bg-purple-100 text-black font-semibold'
                                : ' hover:bg-purple-100 hover:text-black'
                                }`}>
                            <div className='grid grid-cols-5 items-center'>
                                <div>
                                    <h2 className='p-1 bg-primary text-white rounded-full w-8 h-8 text-center'>{index + 1}</h2>
                                </div>
                                <div className='col-span-4'>
                                    <h2 className='font-medium'>{`${chapter.title}`}</h2>
                                    <h2 className="text-sm font-semibold flex gap-2 items-center text-primary py-1"><FaClock />{chapter.duration}</h2>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 overflow-y-auto lg:mt-0 mt-4">
                <Card className="shadow-md border rounded-xl border-gray-300" style={{ backgroundColor: `var(--background-color)`, color: `var(--text-color)`, borderColor: `var(--borderColor)` }}>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{activeChapter.title}</CardTitle>
                        <CardDescription className="text-lg font-semibold">{activeChapter.explanation}</CardDescription>
                    </CardHeader>
                    <CardContent>

                        {activeChapter.videoId && (
                            <div className="mb-6">
                                <iframe
                                    className='rounded-xl'
                                    width="100%"
                                    height="500"
                                    src={`https://www.youtube.com/embed/${activeChapter.videoId}`}
                                    title={`Video for ${activeChapter.title}`}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}

                        <h2 className="text-xl mb-5 font-bold">Detail Explaination</h2>
                        {activeChapter.sections && activeChapter.sections.length > 0 && (
                            <div className="space-y-5">
                                {activeChapter.sections.map((section, secIndex) => (
                                    <div
                                        key={secIndex}
                                        className='p-5 courseSection rounded-xl'
                                    >
                                        <h3 className="text-xl font-bold pb-2"><span className='text-2xl'>{secIndex + 1}.</span> {section.subtitle}</h3>
                                        <p className="font-medium text-lg">{section.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default FinalCourse;
