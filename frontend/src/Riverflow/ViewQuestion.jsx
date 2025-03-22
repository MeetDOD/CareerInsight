import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHome, FaCaretUp, FaCaretDown, FaCheckCircle } from "react-icons/fa";
import Loader from "@/services/Loader";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { duotoneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AnswerList from "./AnswerList";
import { IoMdArrowRoundBack } from "react-icons/io";
import { userState } from "@/store/auth";
import { useRecoilValue } from "recoil";
import { Eye, MessageCircle, ThumbsUp } from "lucide-react";
import { Editor, EditorProvider, Toolbar, BtnUndo, BtnRedo, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, BtnLink, Separator } from 'react-simple-wysiwyg';
import DOMPurify from "dompurify";

const ViewQuestion = () => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState("");
    const [hasVotedQuestion, setHasVotedQuestion] = useState(false);
    const [loading, setLoading] = useState(true);
    const [acceptedAnswer, setAcceptedAnswer] = useState(null);
    const navigate = useNavigate();
    const [richText, setRichText] = useState(answer);

    if (!user) {
        toast.error("Please login to use riverflow");
    }

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/questions/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });
                setQuestion(res.data);
                setAcceptedAnswer(res.data.acceptedAnswer);
                const userVote = res.data.voters.find(vote => vote.userId === user?._id)?.value;
                setHasVotedQuestion(userVote);
                console.log(res.data);
            } catch (error) {
                console.error("Error fetching question:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();

        window.scrollTo(0, 0);
        document.title = `CAREERINSIGHT | RIVERFLOW`;
    }, [id, user]);


    if (loading) {
        return <div className="text-center py-10 text-gray-600"><Loader /></div>;
    }

    if (!question) {
        return <NotFound />
    }

    const renderBodyContent = (body) => {
        const lines = body.split("\n");
        let insideCodeBlock = false;
        let codeBlock = "";
        let language = "javascript";

        return lines.map((line, index) => {
            if (line.startsWith("```")) {
                if (!insideCodeBlock) {
                    insideCodeBlock = true;
                    language = line.replace(/```/g, "").trim() || "javascript";
                    codeBlock = "";
                    return null;
                } else {
                    insideCodeBlock = false;
                    return (
                        <SyntaxHighlighter key={index} language={language} style={duotoneDark} className="rounded-lg my-3">
                            {codeBlock.trim()}
                        </SyntaxHighlighter>
                    );
                }
            }

            if (insideCodeBlock) {
                codeBlock += line + "\n";
                return null;
            }

            return <p key={index} className="mb-2">{line}</p>;
        });
    };

    const handleSubmit = async () => {
        if (!richText.trim()) {
            toast.error("Answer cannot be empty!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/answers`, {
                questionId: id,
                body: DOMPurify.sanitize(richText),
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            toast.success("Answer submitted successfully!");
            setRichText("");
        } catch (error) {
            console.error("Error submitting answer:", error);
            toast.error("Failed to submit answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVoteQuestion = async (type) => {
        if (!user) {
            toast.error("Please login to vote");
            return;
        }

        const value = type === "upvote" ? 1 : -1;

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/vote/votequestion`,
                { questionId: question._id, value },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );

            setQuestion(prev => ({ ...prev, votes: res.data.votes }));
            setHasVotedQuestion(prev => (prev === value ? null : value));
            toast.success("Vote updated");
        } catch (error) {
            toast.error("Error voting question");
            console.log(error);
        }
    };

    return (
        <div>
            <div className='flex flex-row gap-2 justify-between mb-3'>
                <Button size="sm" onClick={() => navigate(-1)} className="flex gap-2">
                    <IoMdArrowRoundBack size={20} />Back
                </Button>
                <Button onClick={() => navigate("/dashboard")} size="sm" className="flex gap-2"><FaHome size={20} /></Button>
            </div>

            <div className="max-w-4xl mx-auto py-3">
                {question.acceptedAnswer && (
                    <div className="mb-5 text-green-500 font-medium flex items-center gap-2 border w-fit px-3 py-2 rounded-md bg-green-50 border-green-500">
                        <FaCheckCircle size={20} />
                        <span>Question Solved</span>
                    </div>
                )}
                <h1 className="text-2xl font-bold break-words">{question.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2 border-b border-primary pb-4">
                    <div className="flex items-center gap-1 text-blue-600">
                        <ThumbsUp />
                        <span className="font-semibold">{question.votes}</span> votes
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                        <MessageCircle />
                        <span className="font-semibold">{question.answers.length}</span> answers
                    </div>
                    <div className="flex items-center gap-1 text-orange-600">
                        <Eye />
                        <span className="font-semibold">{question.views}</span> views
                    </div>
                </div>

                <div className="flex items-center space-x-3 text-sm mt-3">
                    <img src={question.author.photo} alt="User" className="w-9 h-9 rounded-full border border-primary" />
                    <span>Asked by <span className="font-medium">{question.author.fullName}</span> on {new Date(question.createdAt).toDateString()}</span>
                </div>

                <div className="mt-5 text-lg leading-relaxed flex gap-4 w-full overflow-hidden">
                    <div className="flex flex-col items-center shrink-0">
                        <button
                            onClick={() => handleVoteQuestion("upvote")}
                            className={`p-2 rounded-full transition-all hover:bg-green-200 ${hasVotedQuestion === 1 ? "bg-green-500 text-white" : "bg-gray-200 text-black"}`}
                        >
                            <FaCaretUp size={25} />
                        </button>

                        <span className="font-semibold text-lg my-1">{question.votes}</span>

                        <button
                            onClick={() => handleVoteQuestion("downvote")}
                            className={`p-2 rounded-full transition-all hover:bg-red-200 ${hasVotedQuestion === -1 ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
                        >
                            <FaCaretDown size={25} />
                        </button>
                    </div>


                    <div className="flex-1 w-full overflow-hidden break-words">
                        {renderBodyContent(question.body)}
                    </div>
                </div>


                <div className="flex flex-wrap gap-2 mt-5">
                    {question.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs font-medium text-primary bg-violet-50 rounded">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="w-full my-5">
                    <h1 className="text-2xl font-semibold">All Answers</h1>
                    <span className="font-medium">{question.answers.length} Answers</span>
                </div>
                <AnswerList id={question._id} acceptedAnswer={acceptedAnswer} setAcceptedAnswer={setAcceptedAnswer} question={question} />

                <div className="mt-8">
                    <h2 className="text-lg font-semibold">Your Answer</h2>

                    <EditorProvider>
                        <Editor
                            value={richText}
                            onChange={(e) => setRichText(e.target.value)}
                            className="w-full mt-2 p-3 inputField border rounded-md"
                        >
                            <Toolbar>
                                <BtnUndo />
                                <BtnRedo />
                                <Separator />
                                <BtnBold />
                                <BtnItalic />
                                <BtnUnderline />
                                <BtnStrikeThrough />
                                <Separator />
                                <BtnNumberedList />
                                <BtnBulletList />
                                <Separator />
                                <BtnLink />
                            </Toolbar>
                        </Editor>
                    </EditorProvider>

                    <Button
                        className="mt-3"
                        onClick={() => handleSubmit(DOMPurify.sanitize(richText))}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Answer"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ViewQuestion;
