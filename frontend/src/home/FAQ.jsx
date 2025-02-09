import React, { useState } from 'react';

const FAQ = () => {
    const [activeIndexLeft, setActiveIndexLeft] = useState(null);
    const [activeIndexRight, setActiveIndexRight] = useState(null);

    const toggleQuestionLeft = (index) => {
        setActiveIndexLeft(activeIndexLeft === index ? null : index);
        if (activeIndexRight !== null) {
            setActiveIndexRight(null);
        }
    };

    const toggleQuestionRight = (index) => {
        setActiveIndexRight(activeIndexRight === index ? null : index);
        if (activeIndexLeft !== null) {
            setActiveIndexLeft(null);
        }
    };

    const questionsLeft = [
        {
            id: 1,
            question: 'What is Career Insight?',
            answer: 'Career Insight is a web app designed to help 2nd and 3rd-year students stay ahead in the tech world by providing insights into trending technologies, tools, and frameworks.',
        },
        {
            id: 2,
            question: 'How do I sign up for Career Insight?',
            answer: 'You can sign up by clicking the "Sign Up" button on the homepage and providing your name, email address, and a password.',
        },
        {
            id: 3,
            question: 'What kind of technology trends does Career Insight cover?',
            answer: 'Career Insight covers trends in software development, data science, artificial intelligence, cloud computing, and other emerging tech fields.',
        },
        {
            id: 4,
            question: 'Is Career Insight free to use?',
            answer: 'Yes, Career Insight offers a free plan for students. Some advanced features might be available through a premium subscription.',
        },
    ];

    const questionsRight = [
        {
            id: 5,
            question: 'How are the technology trends curated?',
            answer: 'We scrape data from multiple trusted sources, including blogs, articles, and tutorials, to bring you the latest and most relevant trends.',
        },
        {
            id: 6,
            question: 'Can I customize the technology suggestions?',
            answer: 'Yes, you can customize your preferences by selecting your areas of interest in your profile settings to get tailored suggestions.',
        },
        {
            id: 7,
            question: 'How can I access additional learning resources?',
            answer: 'Career Insight provides links to relevant blogs, articles, and tutorials. These resources are aggregated and displayed on your dashboard.',
        },
        {
            id: 8,
            question: 'How do I contact support if I need help?',
            answer: 'You can reach out to our support team by visiting the "Contact Us" section and submitting your query. We’re here to help!',
        },
    ];

    return (
        <div className="mb-10 pt-12">
            <div className="flex flex-col items-center gap-5 px-4 my-20">
                <h1 className='text-2xl md:text-3xl font-bold text-center'>
                    Frequently <span className="text-primary">Asked Questions</span>
                </h1>
                <p className='text-center text-lg opacity-90 tracking-tight'>
                    Discover how Career Insight can help you stay updated and grow your tech skills.
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-y-8 md:gap-x-6 sectionMargin">
                <div className="w-full md:w-1/2 space-y-4">
                    {questionsLeft.map((item, index) => (
                        <div key={item.id} className="rounded-lg shadow-md">
                            <div
                                className={`question px-5 py-4 cursor-pointer flex justify-between items-center ${activeIndexLeft === index ? 'font-semibold' : 'font-medium'
                                    }`}
                                onClick={() => toggleQuestionLeft(index)}
                            >
                                {item.question}
                                <span
                                    className={`transform transition-transform duration-200 text-2xl ${activeIndexLeft === index ? 'rotate-45 text-primary' : 'rotate-0 text-gray-400'
                                        }`}
                                >
                                    +
                                </span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndexLeft === index ? 'max-h-[200px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                                    }`}
                            >
                                <div className="answer px-5 text-sm" dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                    {questionsRight.map((item, index) => (
                        <div key={item.id} className="rounded-lg shadow-md">
                            <div
                                className={`question px-5 py-4 cursor-pointer flex justify-between items-center ${activeIndexRight === index ? 'font-semibold' : 'font-medium'
                                    }`}
                                onClick={() => toggleQuestionRight(index)}
                            >
                                {item.question}
                                <span
                                    className={`transform transition-transform duration-200 text-2xl ${activeIndexRight === index ? 'rotate-45 text-primary' : 'rotate-0 text-gray-400'
                                        }`}
                                >
                                    +
                                </span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndexRight === index ? 'max-h-[200px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'
                                    }`}
                            >
                                <div className="answer px-5 text-sm" dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;