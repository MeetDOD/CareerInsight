import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const MockInterviewForm = ({ onSubmit }) => {
    const [jobRole, setJobRole] = useState("");
    const [jobDesc, setJobDesc] = useState("");
    const [experience, setExperience] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ jobRole, jobDesc, experience });
    };

    return (
        <div className="flex flex-col items-center gap-5">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl rounded-lg border border-gray-300 shadow-md p-6"
                style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}

            >
                <div className="mb-5">
                    <Label className="text-lg font-medium ">
                        Job Position / Role
                    </Label>
                    <Input
                        placeholder="e.g: SDE, Frontend Developer, Backend Developer..."
                        className="mt-2 inputField"
                        type="text"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        required

                    />
                </div>

                <div className="mb-5">
                    <Label className="text-lg font-medium">
                        Job Description / Tech Stack
                    </Label>
                    <Textarea
                        placeholder="Describe the job role or required tech stack"
                        className="mt-2 inputField"
                        type="text"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        required
                        style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                    />
                </div>

                <div className="mb-6">
                    <Label className="text-lg font-medium inputField">
                        Years of Experience
                    </Label>
                    <Input
                        placeholder="e.g: 0, 1, 2..."
                        className="mt-2 inputField"
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-between">
                    <Button
                        variant="secondary"
                        className="flex-1 mx-2"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button className="flex-1 mx-2" type="submit">
                        Start Interview
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default MockInterviewForm;
