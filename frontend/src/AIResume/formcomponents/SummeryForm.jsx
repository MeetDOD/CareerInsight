import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { BsRobot } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from '@/context/ResumeContext';
import { chatSession } from '@/services/GeminiModel';
import { Label } from '@/components/ui/label';
import { ImSpinner2 } from "react-icons/im";
import { toast } from 'sonner';

const SummeryForm = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState(resumeInfo?.summery || '');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            summery,
        }));
    }, [summery, setResumeInfo]);

    const onSave = (e) => {
        e.preventDefault();
        toast.success("Summary saved successfully!");
    };

    const summeryGenerater = async () => {
        setLoading(true);
        const prompt = `Job Title: ${resumeInfo?.jobTitle}. 
        Based on this job title, generate a brief JSON-formatted summary for a resume, 
        covering three experience levels: 'Fresher', 'Mid-Level', and 'Experienced'.`;

        try {
            const result = await chatSession.sendMessage(prompt);
            const data = await result.response.text();
            const cleanedData = data.replace(/`|json|\n/g, '').trim();
            const parsedResponse = JSON.parse(cleanedData);
            setResponse(parsedResponse);
            console.log(parsedResponse)
        } catch (error) {
            console.error("Error generating summary: ", error);
            toast.error("Failed to generate summary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="p-5 rounded-lg shadow-lg border-t-primary border-t-8">
                <h2 className="font-bold text-lg">Summary</h2>
                <p>Add a summary for your job title</p>
                <form className="mt-7" onSubmit={onSave}>
                    <div className="flex justify-between items-end">
                        <Label className="text-sm">Add Summary</Label>
                        <Button
                            onClick={summeryGenerater}
                            type="button"
                            variant="secondary"
                            size="sm"
                            className="border border-primary text-primary flex gap-1.5"
                            disabled={loading}
                        >
                            <BsRobot size={20} />
                            {loading ? <ImSpinner2 size={20} className="animate-spin" /> : 'Generate from AI'}
                        </Button>
                    </div>
                    <Textarea
                        required
                        value={summery}
                        onChange={(e) => setSummery(e.target.value)}
                        className="mt-5 inputField"
                        placeholder="Type your summary here or you can take help from AI..."
                    />
                    <div className="mt-3 flex justify-end">
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
            {response && (
                <div className="my-5">
                    <h2 className="font-bold text-xl">AI Suggestions</h2>
                    {response.experienceLevels.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSummery(item.summary);
                                toast.success("Added AI-generated response to your summary");
                            }}
                            className="border my-4 p-5 shadow-md rounded-lg cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-lg"
                            style={{ borderColor: `var(--borderColor)` }}
                        >
                            <h3 className="font-bold my-1 text-lg text-primary">
                                Level: {item.experienceLevel}
                            </h3>
                            <p className="text-sm">{item.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SummeryForm;
