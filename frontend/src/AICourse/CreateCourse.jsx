import React, { useState } from 'react'
import { BiSolidCategory } from "react-icons/bi";
import { MdTopic } from "react-icons/md";
import { IoMdOptions } from "react-icons/io";
import { Button } from '@/components/ui/button';
import SelectCategory from './CreateCourseForm/SelectCategory';
import ToipcDescription from './CreateCourseForm/ToipcDescription';
import SelectOptions from './CreateCourseForm/SelectOptions';
import { chatSession } from '@/services/GeminiModel';
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { categoryState, descriptionState, optionsState, responseState, topicState } from '@/store/courseState';
import { useRecoilState } from 'recoil';
import generateThumbnail from '@/services/ThumbnailGenerator';
import fetchCourseThumbnail from '@/services/ThumbnailGenerator';
import fetchRelevantImage from '@/services/ThumbnailGenerator';

const CreateCourse = () => {
    const [activeIndex, setactiveIndex] = useState(0);
    const [category, setCategory] = useRecoilState(categoryState);
    const [topic, setTopic] = useRecoilState(topicState);
    const [description, setDescription] = useRecoilState(descriptionState);
    const [options, setOptions] = useRecoilState(optionsState);
    const [thumbnail, setThumbnail] = useState(null);
    const [response, setResponse] = useRecoilState(responseState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const stepperOptions = [
        {
            id: 1,
            nameCategory: 'Category/Domain',
            icon: <BiSolidCategory size={25} color='#101010' />
        },
        {
            id: 2,
            nameCategory: 'Topic/Description',
            icon: <MdTopic size={25} color='#101010' />
        },
        {
            id: 3,
            nameCategory: 'Options',
            icon: <IoMdOptions size={25} color='#101010' />
        },
    ]

    const handleSubmit = async () => {
        setLoading(true);
        const formData = {
            category,
            topic,
            description,
            ...options,
        };

        const prompt = `
            Generate a comprehensive course tutorial in JSON format with the following fields:

            1. **courseName**: The title of the course.
            2. **description**: A detailed description of the course.
            3. **topic**: The specific topic covered by the course.
            4. **category**: The category under which the course falls.
            5. **courseLevel**: The difficulty level of the course (e.g., Beginner, Intermediate, Advanced).
            6. **duration**: The overall duration of the course (e.g., "4 hours", "2 weeks").
            7. **language**: The language in which the course is delivered.
            8. **chapters**: An array of chapters, where each chapter includes:
            - **chapterName**: The title of the chapter.
            - **aboutChapter**: A brief description of the chapter.
            - **duration**: The estimated time to complete the chapter.

            ### Course Details:
            - **Category**: ${formData.category}
            - **Topic**: ${formData.topic}
            - **Description**: ${formData.description}
            - **Course Level**: ${formData.difficulty}
            - **Course Duration**: ${formData.duration}
            - **Number of Chapters**: ${formData.chapters}
            - **Language**: ${formData.language}

            ### JSON Response Structure:
            Ensure the response strictly follows this structure:

            \`\`\`json
            {
            "courseName": "Course Title Here",
            "description": "Detailed course description here.",
            "topic": "Specific topic here.",
            "category": "Category name here.",
            "courseLevel": "Difficulty level here.",
            "duration": "Total course duration here.",
            "language": "Language here.",
            "chapters": [
                {
                "chapterName": "Chapter 1 Title",
                "aboutChapter": "Brief description of Chapter 1.",
                "duration": "Duration of Chapter 1"
                },
                {
                "chapterName": "Chapter 2 Title",
                "aboutChapter": "Brief description of Chapter 2.",
                "duration": "Duration of Chapter 2"
                }
            ]
            }
            \`\`\`

            ### Requirements:
            1. **Mandatory Fields**: All fields listed above are required. No field should be left empty.
            2. **Consistent Format**: Ensure the response is in **valid JSON format** only.
            3. **Meaningful Content**: Provide meaningful values for all fields. Placeholder text or empty strings are not acceptable.
            4. **Chapters**: Generate exactly ${formData.chapters} chapters, each with unique and relevant details.
            `;
        try {
            const result = await chatSession.sendMessage(prompt);
            const data = await result.response.text();
            const cleanedData = data.replace(/```json|```/g, '');
            const parsedResponse = JSON.parse(`[${cleanedData}]`);

            const imageUrl = await fetchRelevantImage(formData.topic);
            setThumbnail(imageUrl);
            setResponse(parsedResponse);
            navigate("/courselayout", { state: { courseData: parsedResponse, thumbnail: imageUrl } });
        } catch (error) {
            console.error("Error generating summary: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex flex-col justify-center items-center mt-10'>
                <h2 className='text-4xl text-primary font-bold'>Create Course</h2>
                <p className='text-lg mt-2 font-semibold'>Enter the details properly and accurate to get the desire response from AI</p>
                <div className='flex mt-20'>
                    {stepperOptions.map((item, index) => (
                        <div className='flex items-center'>
                            <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                <div className={`bg-gray-200 p-3 rounded-full ${activeIndex >= index && 'bg-primary'}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h2 className='hidden font-bold md:block md:text-sm'>{item.nameCategory}</h2>
                                </div>
                            </div>

                            {index != stepperOptions?.length - 1 &&
                                <div className={`h-1 mb-0 md:mb-5 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index && 'bg-violet-600'}`}></div>
                            }
                        </div>
                    ))}
                </div>
            </div>

            {
                activeIndex == 0 ?
                    <SelectCategory
                        category={category}
                        setCategory={setCategory} /> :
                    activeIndex == 1 ?
                        <ToipcDescription
                            topic={topic}
                            setTopic={setTopic}
                            description={description}
                            setDescription={setDescription} /> :
                        activeIndex == 2 ?
                            <SelectOptions
                                options={options}
                                setOptions={setOptions} /> : null
            }

            <div className='px-10 md:px-20 lg:px-44 mt-20'>
                <div className='flex justify-between mt-10'>
                    <Button
                        className="border"
                        variant="secondary"
                        size="lg"
                        disabled={activeIndex == 0}
                        onClick={() => setactiveIndex(activeIndex - 1)}
                    >
                        Previous
                    </Button>

                    {activeIndex < 2 && (
                        <Button
                            size="lg"
                            onClick={() => setactiveIndex(activeIndex + 1)}
                            disabled={(activeIndex === 0 && !category) ||
                                (activeIndex === 1 && (!topic || !description)) ||
                                (activeIndex === 2)}
                        >
                            Next
                        </Button>
                    )}

                    {activeIndex === 2 && (
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <div className='flex flex-row gap-2 items-center'>
                                    <ImSpinner2 className='animate-spin' /> Generating ...
                                </div>
                            ) : 'Generate Layout'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateCourse
