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

const CreateCourse = () => {
    const [activeIndex, setactiveIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [category, setCategory] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState({
        difficulty: '',
        duration: '',
        chapters: '',
        language: '',
    });

    const stepperOptions = [
        {
            id: 1,
            nameCategory: 'Category/Domain',
            icon: <BiSolidCategory size={25} />
        },
        {
            id: 2,
            nameCategory: 'Topic/Description',
            icon: <MdTopic size={25} />
        },
        {
            id: 3,
            nameCategory: 'Options',
            icon: <IoMdOptions size={25} />
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
        const prompt = `Generate A course tutorial on following detail with field as Course Name, Description, Along with Chapter Name, about, Duration. 
        Details are as follow: Categor: ${formData.category}, Topic: ${formData.topic} and Description: ${formData.description}, Course Level: ${formData.difficulty}, Course Duration: ${formData.duration}, Number of chapters to include in the course: ${formData.chapters} and finally The language for the course should be ${formData.language}. 
        Give the response in JSON FORMAT ONLY. 
        It very Important to give response in JSON Only NOTE that`;
        try {
            const result = await chatSession.sendMessage(prompt);
            const data = await result.response.text();
            const cleanedData = data.replace(/```json|```/g, '');
            const parsedResponse = JSON.parse(`[${cleanedData}]`);
            setResponse(parsedResponse);
            console.log(parsedResponse);
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
                <p className='text-lg mt-2 text-gray-600 font-semibold'>Enter the details properly and accurate to get the desire response from AI</p>
                <div className='flex mt-20'>
                    {stepperOptions.map((item, index) => (
                        <div className='flex items-center'>
                            <div className='flex flex-col items-center w-[50px] md:w-[100px]'>
                                <div className={`bg-gray-200 p-3 rounded-full text-white ${activeIndex >= index && 'bg-primary'}`}>
                                    {item.icon}
                                </div>
                                <div>
                                    <h2 className='hidden font-bold md:block md:text-sm'>{item.nameCategory}</h2>
                                </div>
                            </div>

                            {index != stepperOptions?.length - 1 &&
                                <div className={`h-1 mb-0 md:mb-5 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex - 1 >= index && 'bg-violet-600'}`}>

                                </div>
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
                    <Button className="border" variant="secondary" size="lg" disabled={activeIndex == 0} onClick={() => setactiveIndex(activeIndex - 1)} >Previous</Button>
                    {activeIndex < 2 && <Button size="lg" onClick={() => setactiveIndex(activeIndex + 1)} >Next</Button>}
                    {activeIndex == 2 &&
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? <div className='flex flex-row gap-2'><ImSpinner2 size={20} className='animate-spin' /> Generating</div> : 'Generate Layout'}
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateCourse
