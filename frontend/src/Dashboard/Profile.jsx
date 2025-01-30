import React, { useEffect, useState } from "react";
import { FaEdit, FaProjectDiagram, FaMedal, FaBriefcase, FaCode, FaSchool, FaUniversity, FaCalendarAlt, FaAddressCard } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import Loader from "@/services/Loader";

const Profile = () => {
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            setLoading(false);
        }
        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | ${user?.fullName?.toUpperCase()}'s PROFILE`;
    }, [user]);

    if (loading) {
        return <Loader />
    }

    return (
        <div className="py-10 min-h-screen">
            <div className="container mx-auto max-w-5xl shadow-lg rounded-xl overflow-hidden border" style={{ borderColor: `var(--borderColor)` }}>

                <div className="relative">
                    <div
                        className="h-48 bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://static.canva.com/web/images/e733916c4616f5baa19098cc2844369b.jpg')`,
                        }}
                    ></div>
                    <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                        <img
                            src={user?.photo}
                            alt="User Avatar"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                        />
                    </div>
                </div>

                <div className="mt-20 p-6 text-center">
                    <h1 className="text-4xl font-bold">{user?.fullName}</h1>
                    <h2 className="text-lg font-semibold text-gray-500 mt-2">{user?.email} | +91 {user?.phoneno}</h2>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-5 rounded-lg text-center shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <FaProjectDiagram className="mb-3" size={40} />
                        <h3 className="text-xl font-bold">Projects</h3>
                        <p className="mt-2 text-sm font-semibold">10+ Completed</p>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-5 rounded-lg text-center shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <FaCode className="mb-3" size={40} />
                        <h3 className="text-xl font-bold">Skills</h3>
                        <p className="mt-2 text-sm font-semibold">
                            {user?.techstack?.join(", ")}
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-5 rounded-lg text-center shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <FaMedal className="mb-3" size={40} />
                        <h3 className="text-xl font-bold">Certifications</h3>
                        <p className="mt-2 text-sm font-semibold">Google Cloud, AWS</p>
                    </div>

                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-5 rounded-lg text-center shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <FaBriefcase className="mb-3" size={40} />
                        <h3 className="text-xl font-bold">Experience</h3>
                        <p className="mt-2 text-sm font-semibold">2+ Years in Development</p>
                    </div>
                </div>

                <div className="mt-4 p-6 rounded-lg ">
                    <h3 className="text-2xl font-bold text-primary mb-6 text-center">Academic Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="flex items-center gap-4 border shadow-md p-4 rounded-lg transition duration-300 hover:-translate-y-2 hover:shadow-lg" style={{ borderColor: `var(--borderColor)` }}>
                            <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-full">
                                <FaSchool size={30} />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-500">College Name</span>
                                <p className="text-lg font-bold">{user?.collegename}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border shadow-md p-4 rounded-lg transition duration-300 hover:-translate-y-2 hover:shadow-lg" style={{ borderColor: `var(--borderColor)` }}>
                            <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full">
                                <FaUniversity size={30} />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-500">University</span>
                                <p className="text-lg font-bold">{user?.university}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border shadow-md p-4 rounded-lg transition duration-300 hover:-translate-y-2 hover:shadow-lg" style={{ borderColor: `var(--borderColor)` }}>
                            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full">
                                <FaCalendarAlt size={30} />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-500">Academic Year</span>
                                <p className="text-lg font-bold">{user?.academicyear}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 border shadow-md p-4 rounded-lg transition duration-300 hover:-translate-y-2 hover:shadow-lg" style={{ borderColor: `var(--borderColor)` }}>
                            <div className="p-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full">
                                <FaAddressCard size={30} />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-gray-500">Address</span>
                                <p className="text-lg font-bold">{user?.address}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Drawer>
                    <DrawerTrigger asChild>
                        <div className="flex items-center justify-center flex-col">
                            <Button size="lg" className="my-5 px-6">
                                <FaEdit />Edit
                            </Button>
                        </div>
                    </DrawerTrigger>
                    <DrawerContent style={{ backgroundColor: `var(--background-color)`, borderColor: `var(--borderColor)` }}>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle>Edit your profile</DrawerTitle>
                                <DrawerDescription>Here you can edit your information about yourself</DrawerDescription>
                            </DrawerHeader>
                            <div className="p-4">
                                <div className='flex flex-col space-y-2'>
                                    <Label htmlFor='university' className='font-medium'>
                                        University
                                    </Label>
                                    <input
                                        id='university'
                                        name='university'
                                        placeholder='Enter your university'
                                        // onChange={handleChange}
                                        className="inputField w-10 z-10 opacity-0"
                                    />
                                </div>
                            </div>
                            <DrawerFooter>
                                <Button>Submit</Button>
                                <DrawerClose asChild>
                                    <Button variant="secondary" className="border">Cancel</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>
            </div>
        </div>
    );
};

export default Profile;
