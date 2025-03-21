import { userState } from "@/store/auth";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HiChevronUpDown } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Building2, Clock4, ThumbsUp, AlertTriangle, UserCheck, ShieldHalf, NotebookTabs, BookOpenText } from "lucide-react";

const FeedbackList = () => {
    const [feedback, setFeedback] = useState([]);
    const user = useRecoilValue(userState);

    useEffect(() => {
        const fetchUserFeedback = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/interview/user-feedback/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await res.json();
                setFeedback(data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
                toast.error("Failed to fetch feedback.");
            }
        };

        fetchUserFeedback();
    }, [user._id]);

    return (
        <div className="my-4">
            <h1 className="text-2xl font-bold">Your Interview Feedback</h1>
            {feedback.length > 0 ? (
                feedback.map((item) => (
                    <div
                        key={item._id}
                        className="border p-5 rounded-xl my-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                        style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                    >
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="w-full flex justify-between items-center cursor-pointer">
                                    <div className="space-y-2">
                                        <p className="text-xl font-bold flex items-center gap-2 text-primary">
                                            <BookOpenText size={25} /> {item.analysis.structuredData.topic}
                                        </p>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                            <Building2 size={20} /> {item.analysis.structuredData.companyName || "Company not specified"}
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                                        <Clock4 size={20} /> {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                    </p>
                                </div>
                            </DialogTrigger>

                            <DialogContent
                                style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
                                className="max-w-[90vw] md:max-w-[650px] lg:max-w-[850px] p-8 rounded-xl shadow-xl border bg-background overflow-y-auto max-h-[90vh]"
                            >
                                <DialogHeader>
                                    <DialogTitle className="text-2xl flex items-center gap-2"><NotebookTabs /> Interview Feedback</DialogTitle>
                                    <DialogDescription>
                                        Insights from your interview on <strong>{item.analysis.structuredData.topic}</strong>.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-6 mt-4">
                                    <div>
                                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                            <UserCheck size={20} className="text-green-500" /> Practice Areas
                                        </h3>
                                        <p>{item.analysis.structuredData.practiceAreas}</p>
                                    </div>

                                    <div className="border-t border-primary pt-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                            <ThumbsUp size={20} className="text-blue-500" /> Strength
                                        </h3>
                                        <p>{item.analysis.structuredData.usersStrength}</p>
                                    </div>

                                    <div className="border-t border-primary pt-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                            <ShieldHalf size={20} className="text-primary" /> Confidence Level
                                        </h3>
                                        <Badge variant="outline" className="text-sm px-3 py-1 text-primary border border-primary bg-violet-50">
                                            {item.analysis.structuredData["confidenceLevel "] || "Not specified"}
                                        </Badge>
                                    </div>

                                    <div className="border-t border-primary pt-4">
                                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                                            <AlertTriangle size={20} className="text-yellow-500" /> Areas for Improvement
                                        </h3>
                                        <p>{item.analysis.structuredData.areaOfImprovements}</p>
                                    </div>

                                    <div className="border-t border-primary pt-4">
                                        <h2 className="text-xl font-bold mb-4">
                                            {item.analysis.structuredData.numberOfQuestions} Questions & Answers
                                        </h2>
                                        {item.analysis.structuredData?.questions?.length > 0 ? (
                                            item.analysis.structuredData.questions.map((question, idx) => (
                                                <Collapsible key={idx} className="mb-4">
                                                    <CollapsibleTrigger className="w-full border border-primary p-4 rounded-xl flex justify-between items-center text-start hover:bg-primary/10 transition">
                                                        <div className="flex items-center gap-2">
                                                            {question.questionName}
                                                        </div>

                                                        <p className="ml-1 border border-primary bg-violet-50 rounded-full p-2 text-primary"><HiChevronUpDown /></p>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <div className="flex flex-col gap-4 mt-3 text-justify">
                                                            <div className="p-4 border rounded-lg bg-blue-100 text-blue-800 border-blue-600">
                                                                <strong>Your Answer:</strong> {item.analysis.structuredData?.answers?.[idx]?.userAnswer || "Own opinion"}
                                                            </div>
                                                            <div className="p-4 border rounded-lg bg-green-100 text-green-800 border-green-600">
                                                                <strong>Correct Answer:</strong> {item.analysis.structuredData?.answers?.[idx]?.correctAnswer || "Own opinion"}
                                                            </div>
                                                        </div>
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            ))
                                        ) : (
                                            <p className="text-muted-foreground">No questions available.</p>
                                        )}
                                    </div>
                                </div>

                                <DialogFooter className="mt-6 flex justify-center">
                                    <DialogClose asChild>
                                        <Button variant="secondary" size="lg" className="w-40 border">
                                            Close
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                ))
            ) : (
                <p className="text-muted-foreground text-center py-10 text-lg">No feedback yet. Time for a mock interview! 🎯</p>
            )}

        </div>
    );
};

export default FeedbackList;
