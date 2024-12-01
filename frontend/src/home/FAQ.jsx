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
            question: "How can I register as a new patient?",
            answer: "To register, click on the 'Sign Up' button on the homepage and fill out the required information including your personal details, medical history, and contact information.",
        },
        {
            id: 2,
            question: "How do I schedule an appointment?",
            answer:
                "You can schedule an appointment by navigating to the 'Appointments' section. Select your preferred doctor, available time slot, and provide details about your health concern.",
        },
        {
            id: 3,
            question: "Can I view my previous medical records?",
            answer:
                "Yes, once logged in, you can access your medical records from the 'Health Records' section. This includes past consultations, prescriptions, and test results.",
        },
        {
            id: 5,
            question: "How secure is my personal health information?",
            answer: "We prioritize your privacy and security. All your personal and health data is encrypted and complies with healthcare privacy standards such as HIPAA.",
        }
    ];

    const questionsRight = [
        {
            id: 7,
            question: "Can I cancel or reschedule an appointment?",
            answer: "Yes, appointments can be canceled or rescheduled from the 'Appointments' section, provided you make the changes at least 24 hours in advance.",
        },
        {
            id: 9,
            question: "Is there an option for online consultation?",
            answer: "Yes, we offer online video consultations with doctors. You can select this option while scheduling your appointment.",
        },
        {
            id: 10,
            question: "How do I update my personal or medical information?",
            answer: "You can update your information by visiting the 'Profile' section and editing your details. Ensure that all your medical records are accurate and up-to-date.",
        },
        {
            id: 11,
            question: "Are my video consultations recorded?",
            answer: "No, video consultations are not recorded to ensure your privacy. All consultations are secure and confidential.",
        }
    ];

    return (
        <div className='mb-10'>
            <div className='flex flex-col items-center gap-5 px-4 my-20'>
                <h1 className='text-2xl md:text-3xl font-bold text-center'>
                    Frequently Asked <span className='text-primary'>Questions</span>
                </h1>
                <p className='w-1/2 text-center text-lg opacity-90'>
                    Private online consultations with verified doctors in all specialties
                </p>
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-y-8 md:gap-x-6 sectionMargin">
                <div className="w-full md:w-1/2 space-y-4">
                    {questionsLeft.map((item, index) => (
                        <div
                            key={item.id}
                            className="rounded-lg shadow-md"
                        >
                            <div
                                className={`question px-5 py-4 cursor-pointer flex justify-between items-center ${activeIndexLeft === index ? 'font-semibold' : 'font-medium'}`}
                                onClick={() => toggleQuestionLeft(index)}
                            >
                                {item.question}
                                <span
                                    className={`transform transition-transform duration-200 text-2xl ${activeIndexLeft === index ? 'rotate-45 text-primary' : 'rotate-0 text-gray-400'}`}
                                >
                                    +
                                </span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndexLeft === index ? 'max-h-[200px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                                style={{
                                    maxHeight: activeIndexLeft === index ? '200px' : '0',
                                    paddingTop: activeIndexLeft === index ? '1rem' : '0',
                                    paddingBottom: activeIndexLeft === index ? '1rem' : '0',
                                    opacity: activeIndexLeft === index ? '1' : '0',
                                }}
                            >
                                <div
                                    className="answer px-5 text-sm"
                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                    {questionsRight.map((item, index) => (
                        <div
                            key={item.id}
                            className="rounded-lg shadow-md"
                        >
                            <div
                                className={`question px-5 py-4 cursor-pointer flex justify-between items-center ${activeIndexRight === index ? 'font-semibold' : 'font-medium'}`}
                                onClick={() => toggleQuestionRight(index)}
                            >
                                {item.question}
                                <span
                                    className={`transform transition-transform duration-200 text-2xl ${activeIndexRight === index ? 'rotate-45 text-primary' : 'rotate-0 text-gray-400'}`}
                                >
                                    +
                                </span>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${activeIndexRight === index ? 'max-h-[200px] py-5 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                                style={{
                                    maxHeight: activeIndexRight === index ? '200px' : '0',
                                    paddingTop: activeIndexRight === index ? '1rem' : '0',
                                    paddingBottom: activeIndexRight === index ? '1rem' : '0',
                                    opacity: activeIndexRight === index ? '1' : '0',
                                }}
                            >
                                <div
                                    className="answer px-5 text-sm"
                                    dangerouslySetInnerHTML={{ __html: item.answer }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;