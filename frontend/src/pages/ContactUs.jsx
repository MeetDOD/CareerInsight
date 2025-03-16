import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo.png";
import { MdOutlineEmail } from "react-icons/md";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";

const ContactUs = () => {
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "CAREERINSIGHT | CONTACT US";
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", import.meta.env.VITE_CONTACTUS_KEY);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        }).then((res) => res.json());

        if (res.success) {
            toast.success("Message sent successfully!");
            event.target.reset();
        }
    };

    return (
        <section className="pt-24">
            <div className="mx-auto max-w-7xl">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
                    <div className="flex items-center lg:mb-0 mb-10">
                        <div className="w-full">
                            <h4 className="text-primary text-base font-medium leading-6 mb-2 lg:text-left text-center">
                                Contact Us
                            </h4>
                            <h2 className="text-3xl font-semibold mb-7 lg:text-left text-center">
                                Let us know and we’ll get back to you
                            </h2>

                            {successMessage && (
                                <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">
                                    {successMessage}
                                </div>
                            )}

                            <form onSubmit={onSubmit}>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="my-2 mb-4 inputField"
                                    placeholder="Enter your name"
                                    required
                                />

                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="my-2 mb-4 inputField"
                                    placeholder="Enter your email"
                                    required
                                />

                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    name="description"
                                    id="description"
                                    placeholder="Type your message here..."
                                    className="my-2 mb-4 inputField"
                                    required
                                />

                                <Button type="submit" className="w-full my-2">
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                    <div className="lg:max-w-xl w-full h-[500px] flex items-center justify-center bg-cover bg-no-repeat bg-[url('https://pagedone.io/asset/uploads/1696245837.png')]">
                        <div>
                            <div className="lg:w-96 w-auto h-auto bg-white rounded-md shadow-xl lg:p-6 p-4">
                                <div className="flex flex-col justify-center items-center">
                                    <img src={logo} alt="Logo" className="w-40 mb-7 mt-3" />
                                </div>
                                <div className="flex items-center mb-6">
                                    <MdOutlineEmail className="text-gray-800" size={30} />
                                    <h5 className="text-gray-800 text-base font-semibold ml-5">
                                        techcare@gmail.com
                                    </h5>
                                </div>
                                <a href="javascript:;" className="flex items-center mb-6">
                                    <FaGithub className="text-gray-800" size={30} />
                                    <h5 className="text-gray-800 text-base font-semibold ml-5">
                                        @MeetDOD @RAM909 @kashish567
                                    </h5>
                                </a>
                                <div className="flex items-center justify-center border-t border-gray-100 pt-6 gap-7">
                                    <a
                                        href="https://github.com/MeetDOD"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaGithub
                                            className="text-gray-800 hover:-translate-y-1 transition-transform duration-300 hover:text-primary"
                                            size={30}
                                        />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/meetdodiya"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaLinkedin
                                            className="text-gray-800 hover:-translate-y-1 transition-transform duration-300 hover:text-primary"
                                            size={30}
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
