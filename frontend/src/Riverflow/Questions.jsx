import { CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";
import { MdDelete } from "react-icons/md";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import Loader from "@/services/Loader";

const Questions = () => {
    const user = useRecoilValue(userState);
    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [showDialog, setShowDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [questionLoading, setQuestionLoading] = useState(false);
    const [questionData, setQuestionData] = useState({
        title: "",
        body: "",
        tags: "",
    });

    useEffect(() => {
        const fetchQuestions = async () => {
            setQuestionLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/questions`);
                setQuestions(res.data);
            } catch (error) {
                console.error("Error fetching questions", error);
            } finally {
                setQuestionLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleChange = (e) => {
        setQuestionData({ ...questionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!questionData.title || !questionData.body) {
            toast.error("Title and body are required!");
            return;
        }
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/questions`, {
                ...questionData,
                tags: questionData.tags.split(",").map(tag => tag.trim()),
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setQuestions([res.data, ...questions]);
            toast.success("Question posted successfully!");
            setShowDialog(false);
            setQuestionData({ title: "", body: "", tags: "" });
        } catch (error) {
            toast.error("Failed to post question. Try again!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (questionId) => {
        if (!window.confirm("Are you sure you want to delete this question?")) return;

        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/questions/${questionId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setQuestions(questions.filter(q => q._id !== questionId));
            toast.success("Question deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete the question.");
            console.error(error);
        }
    };

    if (questionLoading) {
        return <Loader />;
    }

    return (
        <div className="py-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div className="w-full md:w-auto mb-4 md:mb-0">
                    <h1 className="text-2xl font-semibold">All Questions</h1>
                    <span className="font-medium">{questions.length} Questions</span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <Input
                        placeholder="🔎 Search questions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-64 border inputField border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button onClick={() => setShowDialog(true)}>
                        Ask Question
                    </Button>
                </div>
            </div>

            <div className="border border-primary w-full bg-violet-50 mb-6 py-3 rounded-md text-primary text-center font-medium">
                Questions with new activity
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 ">
                <div className="pb-10 lg:col-span-2 space-y-4">
                    {questions
                        .filter(q => q.title.toLowerCase().includes(search.toLowerCase()))
                        .map((question) => (
                            <div key={question._id} className="w-full">
                                <Link to={`/question/${question._id}`} key={question._id} className="w-full block">
                                    <CardContent className="p-5 space-y-3 border shadow-sm rounded-lg w-full break-words hover:shadow-md transition duration-300 hover:-translate-y-2 " style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}>
                                        <div className="flex flex-wrap justify-between items-center gap-2">
                                            <div className="flex flex-wrap items-center gap-2 text-gray-700 text-sm">
                                                <div className="flex items-center gap-1 text-blue-600 bg-blue-100 px-3 py-1 rounded-lg shadow-sm">
                                                    <ThumbsUp className="w-5 h-5" />
                                                    <span className="font-semibold">{question.votes}</span>
                                                    <span className="text-xs">Votes</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-green-600 bg-green-100 px-3 py-1 rounded-lg shadow-sm">
                                                    <MessageCircle className="w-5 h-5" />
                                                    <span className="font-semibold">{question.answers.length}</span>
                                                    <span className="text-xs">Answers</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-orange-600 bg-orange-100 px-3 py-1 rounded-lg shadow-sm">
                                                    <Eye className="w-5 h-5" />
                                                    <span className="font-semibold">{question.views}</span>
                                                    <span className="text-xs">Views</span>
                                                </div>
                                            </div>

                                            <div>
                                                {question?.author?._id === user?._id && (
                                                    <div onClick={() => handleDelete(question._id)} className="cursor-pointer text-white rounded-md bg-red-500 p-2 hover:bg-red-600 transition-colors duration-200 gap-2">
                                                        <MdDelete size={22} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-lg font-semibold text-primary hover:text-violet-800 transition-colors duration-200 ">
                                            {question.title}
                                        </div>

                                        <CardDescription className="line-clamp-2">
                                            {question.body}
                                        </CardDescription>

                                        <div className="flex flex-wrap gap-2">
                                            {question.tags.map((tag, index) => (
                                                <Badge key={index} variant="outline" className="px-2 py-1 text-xs font-medium text-primary bg-violet-50 rounded-full">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center text-xs pt-2 mt-3">
                                            <div className="flex items-center gap-1">
                                                <span>Asked on</span>
                                                <span className="font-medium">{new Date(question.createdAt).toDateString()}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <img src={question.author.photo} alt={question.author.fullName} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-primary shadow-sm" />
                                                <span className="font-medium">{question.author.fullName}</span>
                                            </div>
                                        </div>

                                        {question.acceptedAnswer && (
                                            <div className="mt-3 text-green-500 font-medium flex items-center gap-2 border w-fit px-3 py-2 rounded-md bg-green-50 border-green-500">
                                                <FaCheckCircle size={20} />
                                                <span>Answer Accepted</span>
                                            </div>
                                        )}
                                    </CardContent>
                                </Link>
                            </div>
                        ))}
                </div>

                <div className="hidden lg:block mb-10">
                    <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg shadow-md sticky top-20">
                        <h2 className="text-lg text-gray-800 font-semibold">How to Use RiverFlow</h2>
                        <ul className="text-sm text-gray-700 mt-2 space-y-2">
                            <li><strong>👉 Asking Questions:</strong> Click "Ask Question" and provide clear details.</li>
                            <li><strong>👉 Answering:</strong> Provide well-explained answers to help others.</li>
                            <li><strong>👉 Voting:</strong> Upvote useful answers, downvote incorrect ones.</li>
                            <li><strong>👉 Tags:</strong> Use relevant tags to categorize your question.</li>
                            <li><strong>👉 Accepting Answers:</strong> Mark the best answer to help future users.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog} >
                <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg" style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)`, scrollY: "auto" }}>
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Ask a Question</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter a clear question title"
                                value={questionData.title}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 inputField mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="body">Body (for code add ``` at start and end)</Label>
                            <Textarea
                                id="body"
                                name="body"
                                placeholder="Describe your question in detail..."
                                value={questionData.body}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 inputField mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="tags">Tags (comma-separated)</Label>
                            <Input
                                id="tags"
                                name="tags"
                                placeholder="e.g., React, JavaScript, Tailwind"
                                value={questionData.tags}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 inputField mt-1"
                            />
                        </div>
                    </div>

                    <DialogFooter className="flex justify-end mt-4 gap-2">
                        <Button
                            onClick={() => setShowDialog(false)}
                            variant="secondary"
                            className="border"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? "Posting..." : "Post Question"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Questions;
