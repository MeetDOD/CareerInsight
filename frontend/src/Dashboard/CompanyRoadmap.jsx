import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Loader from '@/services/Loader';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBook, FaCode, FaCheckCircle, FaBriefcase, FaRocket } from "react-icons/fa";
import { chatSession } from '@/services/GeminiModel';

const CompanyRoadmap = ({ open, onClose, singlecompany }) => {
    const [roadmap, setRoadmap] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(singlecompany)
    useEffect(() => {
        if (open && singlecompany) {
            generateRoadmap(singlecompany);
        }
    }, [open, singlecompany]);

    const generateRoadmap = async (company) => {
        setLoading(true);
        setError(null);

        const prompt = `
        Generate a detailed step-by-step roadmap for students to prepare for an interview at ${company.name} the information are provided as:
        1. Roles and responsibilities of the job ${company.Role}
        2. Preparations tips for the interview ${company.Preparation}
        3. The interview process and rounds ${company.rounds} 
        Provide the roadmap in strict JSON format with the following structure:
        {
            "roadmap": [
                {
                    "step": 1,
                    "title": "Step Title",
                    "description": "Detailed description of this step",
                    "icon": "book/code/briefcase/rocket/check"
                },
                {
                    "step": 2,
                    "title": "Step Title",
                    "description": "Detailed description of this step",
                    "icon": "book/code/briefcase/rocket/check"
                }
            ]
        }
        - Use "book" icon for learning steps
        - Use "code" icon for technical preparation steps
        - Use "briefcase" icon for practical projects or internships
        - Use "rocket" icon for advanced preparation steps
        - Use "check" icon for final steps or tips
        - Provide at least 5 steps with clear and actionable guidance.
        `;

        try {
            const result = await chatSession.sendMessage(prompt);
            const responseText = await result.response.text();
            const cleanedData = responseText.replace(/```json|```|`/g, "").trim();
            const parsedResponse = JSON.parse(cleanedData);
            if (parsedResponse.roadmap) {
                setRoadmap(parsedResponse.roadmap);
            } else {
                setError('Invalid roadmap format received.');
            }
        } catch (error) {
            console.error('Error generating roadmap:', error);
            setError('Failed to generate roadmap. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getIcon = (icon) => {
        switch (icon) {
            case "book": return <FaBook />;
            case "code": return <FaCode />;
            case "briefcase": return <FaBriefcase />;
            case "rocket": return <FaRocket />;
            case "check": return <FaCheckCircle />;
            default: return <FaBook />;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] p-6 rounded-lg shadow-lg border overflow-y-auto max-h-[90vh]" style={{
                borderColor: `var(--borderColor)`,
                backgroundColor: `var(--background-color)`,
                scrollY: "auto",
            }}>
                <DialogHeader>
                    <DialogTitle>Roadmap for {singlecompany?.name}</DialogTitle>
                    <img src={singlecompany?.logo} alt={singlecompany?.name} className="w-20 h-20 my-4 rounded-lg" />
                </DialogHeader>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <VerticalTimeline>
                        {roadmap.map((step) => (
                            <VerticalTimelineElement
                                key={step.step}
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: '#f3f4f6', color: '#333' }}
                                contentArrowStyle={{ borderRight: '7px solid  #ddd' }}
                                iconStyle={{ background: '#4f46e5', color: '#fff' }}
                                icon={getIcon(step.icon)}
                            >
                                <h3 className="font-bold">{step.title}</h3>
                                <p>{step.description}</p>
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                )}

                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CompanyRoadmap;
