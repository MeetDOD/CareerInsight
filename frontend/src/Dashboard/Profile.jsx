import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaUserEdit } from "react-icons/fa";
import { useRecoilValue } from 'recoil';
import { userState } from '@/store/auth';

const Profile = () => {

    const user = useRecoilValue(userState)

    return (
        <form className="mb-10">
            <div className="flex flex-col gap-6 m-auto items-center justify-center p-6 sm:p-8 min-w-[300px] sm:min-w-[400px] max-w-lg rounded-xl shadow-lg border bg-white">

                <div className="flex flex-col items-center gap-4">
                    <img
                        src={user?.avatar}
                        alt={user?.email}
                        className="w-24 h-24 rounded-full border-2 object-cover"
                    />
                    <h2 className="text-2xl font-semibold text-gray-800">{user?.email}'s Profile</h2>
                </div>

                <div className="flex flex-col w-full gap-4">
                    <div className="flex flex-col sm:flex-row justify-between">
                        <p className="font-medium text-gray-700">First Name:</p>
                        <span className="opacity-90">{user?.firstName || "N/A"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                        <p className="font-medium text-gray-700">Last Name:</p>
                        <span className="opacity-90">{user?.lastName || "N/A"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                        <p className="font-medium text-gray-700">Email Id:</p>
                        <span className="opacity-90">{user?.email || "N/A"}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between">
                        <p className="font-medium text-gray-700">Password:</p>
                        <span className="opacity-90">{user?.password || "N/A"}</span>
                    </div>
                    <Drawer>
                        <div className='flex flex-col items-center'>
                            <DrawerTrigger className="mt-4 w-1/2 text-white hover:opacity-90 bg-primary rounded-lg py-2">
                                Edit Profile
                            </DrawerTrigger>
                        </div>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-lg text-start">
                                <DrawerHeader>
                                    <DrawerTitle className="font-semibold mt-2 flex items-center gap-1.5">
                                        <FaUserEdit size={25} /> Edit your profile
                                    </DrawerTitle>
                                </DrawerHeader>
                                <div className="gap-4 mx-auto flex flex-row mb-3 items-center">
                                    {/* <img
                                        src={photoPreview}
                                        alt="Profile Preview"
                                        className="w-24 h-24 rounded-full border-2 shadow-sm object-cover"
                                    /> */}
                                    {/* <div
                                        className="w-24 h-24 rounded-full border-2 shadow-sm border-dashed flex items-center justify-center"
                                        style={{
                                            borderColor: `var(--borderColor)`,
                                        }}
                                    >
                                        <input
                                            type="file"
                                            id="photo"
                                            accept="image/*"
                                            className="absolute w-10 z-10 opacity-0"
                                        />
                                        <IoIosAddCircleOutline size={30} className="opacity-90 cursor-pointer" />
                                    </div> */}
                                </div>
                                <div className="grid grid-cols-2 gap-4 px-4 mb-4">
                                    <div>
                                        <Label htmlFor="firstname" className="text-sm font-medium">
                                            First Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="firstname"
                                            placeholder="Enter your first name"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="lastname" className="text-sm font-medium">
                                            Last Name
                                        </Label>
                                        <Input
                                            type="text"
                                            id="lastname"
                                            placeholder="Enter your last name"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phoneno" className="text-sm font-medium">
                                            Phone Number
                                        </Label>
                                        <Input
                                            type="number"
                                            id="phoneno"
                                            placeholder="Enter your phone number"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="gender" className="text-sm font-medium">
                                            Gender
                                        </Label>
                                        <Input
                                            type="text"
                                            id="gender"
                                            placeholder="Enter your gender"
                                            className="mt-1 rounded-md"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-4 px-4">
                                    <Label htmlFor="dateofbirth" className="block text-sm font-medium">
                                        Birth Date
                                    </Label>
                                    <Input
                                        type="date"
                                        id="dateofbirth"
                                        className="mt-1 rounded-md"
                                        required
                                    />
                                </div>
                                <DrawerFooter>
                                    <Button >Save</Button>
                                    <DrawerClose asChild>
                                        <Button variant="secondary">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </form>

    );
};

export default Profile;