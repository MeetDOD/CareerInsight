import { Button } from '@/components/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { BsStars } from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from '@/context/ResumeContext';
import { chatSession } from '@/services/GeminiModel';
import { Label } from '@/components/ui/label';
import { ImSpinner2 } from "react-icons/im";
import { toast } from 'sonner';
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';

const summaryForm = () => {
    const [resumeInfo, setResumeInfo] = useContext(ResumeInfoContext);
    const [summary, setsummary] = useState(resumeInfo?.summary || '');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            summary,
        }));
    }, [summary, setResumeInfo]);

    const onSave = (e) => {
        e.preventDefault();
        toast.success("Summary saved successfully!");
    };

    const summaryGenerater = async () => {
        setLoading(true);

        const summaryFormPrompt = import.meta.env.VITE_SUMMARYFORM_PROMPT;

        const prompt = `${summaryFormPrompt}
        Job Title: ${resumeInfo?.jobTitle}.
        `;

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
                <form className="mt-7" onSubmit={onSave} >
                    <div className="flex justify-between items-end">
                        <Label className="text-sm">Add Summary</Label>
                        <motion.div
                            className="relative p-[2px] rounded-lg"
                            initial={{ backgroundPosition: "0% 50%" }}
                            animate={{ backgroundPosition: "200% 50%" }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            style={{
                                background: "linear-gradient(90deg, #ff00ff, #00ffff, #ff0, #ff00ff)",
                                backgroundSize: "200% 200%",
                            }}
                        >
                            <Button
                                onClick={summaryGenerater}
                                type="button"
                                size="sm"
                                disabled={loading}
                                className="relative z-10 bg-primary hover:bg-primary/50 text-white border-none w-full flex items-center gap-2"
                            >
                                {loading ?
                                    <>
                                        <ImSpinner2 size={20} className="animate-spin" /> Generating from AI ...
                                    </>
                                    :
                                    <>
                                        <Sparkles className='animate-pulse' size={20} /> Generate from AI
                                    </>
                                }
                            </Button>
                        </motion.div>
                    </div>
                    <Textarea
                        required
                        value={summary}
                        onChange={(e) => setsummary(e.target.value)}
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
                    {response.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setsummary(item.summary);
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

export default summaryForm;
