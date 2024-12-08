import React from "react";
import { FaEdit, FaProjectDiagram, FaMedal, FaBriefcase, FaCode } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";

const Profile = () => {

    const user = useRecoilValue(userState);
    console.log(user)

    return (
        <div
            className="py-5 min-h-screen flex flex-col items-center"
            style={{ borderColor: `var(--borderColor)` }}
        >
            <div
                className="w-full max-w-5xl shadow-md rounded-xl overflow-hidden border border-gray-300"
                style={{ backgroundColor: `var(--background-color)`, borderColor: `var(--borderColor)` }}
            >
                <div className="relative">
                    <div className="h-40 bg-gradient-to-r from-indigo-400 to-purple-950"></div>
                    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                        <img
                            src={user?.photo}
                            alt="User Avatar"
                            className="w-28 h-28 rounded-full border-4 " style={{ borderColor: `var(--background-color)` }}
                        />
                    </div>
                </div>

                <div className="mt-16 p-6 text-center">
                    <h1 className="text-3xl font-bold">{user.fullName}</h1>
                    <h1 className="text-lg  text-gray-600">~ {user.email}</h1>
                    <p className="mt-2 text-lg font-semibold">
                        Aspiring Full-Stack Developer | Passionate about building user-friendly web applications.
                    </p>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
                    <div className="bg-primary p-4 rounded-md text-center flex flex-col items-center">
                        <FaProjectDiagram className="text-2xl my-2" />
                        <h2 className="text-xl font-bold">Projects</h2>
                        <p className="font-semibold text-sm mt-1">10+ Completed</p>
                    </div>
                    <div className="bg-primary p-4 rounded-md text-center flex flex-col items-center">
                        <FaCode className="text-2xl my-2" />
                        <h2 className="text-xl font-bold">Skills</h2>
                        <p className="font-semibold text-sm mt-1">React, Node.js, Tailwind CSS</p>
                    </div>
                    <div className="bg-primary p-4 rounded-md text-center flex flex-col items-center">
                        <FaMedal className="text-2xl my-2" />
                        <h2 className="text-xl font-bold">Certifications</h2>
                        <p className="font-semibold text-sm mt-1">Google Cloud, AWS</p>
                    </div>
                    <div className="bg-primary p-4 rounded-md text-center flex flex-col items-center">
                        <FaBriefcase className="text-2xl my-2" />
                        <h2 className="text-xl font-bold">Experience</h2>
                        <p className="font-semibold text-sm mt-1">2+ Years in Development</p>
                    </div>
                </div>

                <div className="flex items-center justify-center flex-col">
                    <Button className="my-5 px-6">
                        <FaEdit />Edit
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
