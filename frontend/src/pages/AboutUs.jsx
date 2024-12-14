import React, { useEffect } from "react";
import meet from "../assets/meet.png";
import kashish from "../assets/kashish.png";
import ramesh from "../assets/ramesh.png";
import about from "../assets/about.png";

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "CAREERINSIGHT | ABOUT CAREERINSIGHT";
    }, []);
    return (
        <div className="2xl:container lg:py-16  md:py-12 py-9 ">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
                <div
                    className="w-full lg:w-8/12  shadow-md border rounded-md p-5"
                    style={{
                        borderColor: `var(--borderColor)`,
                    }}
                >
                    <img
                        className="w-full h-full rounded-md"
                        src={about}
                        alt="A group of People"
                    />
                </div>
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-4xl lg:text-5xl font-bold leading-9 pb-4">
                        About <span className="text-primary">Us</span>
                    </h1>
                    <p className="text-lg leading-relaxed text-start font-semibold tracking-tight">
                        At <span className="text-primary font-bold">Career Insight</span>, we empower 2nd and 3rd-year students by providing insights into trending technologies. Our platform helps you stay ahead in the tech world by curating the latest trends in software development, data science, artificial intelligence, and more. With a focus on usability and relevance, we ensure your learning journey is informative and efficient.
                    </p>
                </div>
            </div>

            <div className="flex lg:flex-row flex-col justify-between gap-8 pt-12">
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    <h1 className="text-3xl lg:text-4xl font-bold leading-9 pb-4">
                        Our <span className="text-primary">Story</span>
                    </h1>
                    <p className="text-lg leading-relaxed text-start font-semibold tracking-tight">
                        <span className="text-primary font-bold">Career Insight</span> was created to bridge the gap between students and the rapidly evolving tech industry. Recognizing the need for an intuitive platform that provides up-to-date trends and resources, we set out to build a solution that keeps you informed. Our mission is to help students explore new tools, frameworks, and technologies, making sure they stay competitive and informed.
                    </p>
                </div>
                <div className="w-full lg:w-8/12 lg:pt-8 ">
                    <div
                        className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 shadow-md rounded-md border"
                        style={{
                            borderColor: `var(--borderColor)`,
                        }}
                    >
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="rounded-md" src={meet} alt="Alexa featured Img" />
                            <p className="font-medium text-xl leading-5 mt-4">
                                Meet <span className="text-primary">Dodiya</span>
                            </p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img
                                className="rounded-md"
                                src={kashish}
                                alt="Olivia featured Img"
                            />
                            <p className="font-medium text-xl leading-5 mt-4">
                                Kashish <span className="text-primary">Bhanushali</span>
                            </p>
                        </div>
                        <div className="p-4 pb-6 flex justify-center flex-col items-center">
                            <img className="rounded-md" src={ramesh} alt="Liam featued Img" />
                            <p className="font-medium text-xl leading-5 mt-4">
                                Ramesh <span className="text-primary">Yadav</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;