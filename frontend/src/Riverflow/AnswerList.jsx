import { useState, useEffect } from "react";
import axios from "axios";
import { FaReplyAll, FaCheckCircle } from "react-icons/fa";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Editor, EditorProvider, Toolbar, BtnUndo, BtnRedo, BtnBold, BtnItalic, BtnUnderline, BtnStrikeThrough, BtnNumberedList, BtnBulletList, BtnLink, Separator } from 'react-simple-wysiwyg';
import { useRecoilValue } from "recoil";
import { userState } from "@/store/auth";
import { toast } from "sonner";
import DOMPurify from "dompurify";

const AnswerList = ({ id, acceptedAnswer, setAcceptedAnswer, question }) => {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");
    const [richText, setRichText] = useState(replyText);
    const [comments, setComments] = useState({});
    const user = useRecoilValue(userState);

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/answers/${id}`);
                setAnswers(response.data);
            } catch (err) {
                setError("Failed to load answers. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnswers();
    }, [id]);

    useEffect(() => {
        const fetchAllComments = async () => {
            try {
                const responses = await Promise.all(
                    answers.map((answer) =>
                        axios.get(`${import.meta.env.VITE_BASE_URL}/api/comments?answerId=${answer._id}`)
                    )
                );

                const newComments = {};
                responses.forEach((res, index) => {
                    newComments[answers[index]._id] = res.data;
                });

                setComments(newComments);
            } catch (err) {
                console.error("Failed to fetch comments:", err);
            }
        };

        if (answers.length > 0) {
            fetchAllComments();
        }
    }, [answers]);

    const handleReplySubmit = async (answerId) => {
        if (!richText.trim()) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/comments`,
                {
                    body: DOMPurify.sanitize(richText),
                    questionId: id,
                    answerId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setReplyText("");
            setReplyingTo(null);
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/comments?answerId=${answerId}`);
            setComments((prev) => ({ ...prev, [answerId]: response.data }));
        } catch (err) {
            console.error("Failed to submit reply:", err);
        }
    };

    const handleAcceptAnswer = async (answerId) => {
        if (!user || user._id !== question.author._id) {
            toast.error("Only the question author can accept an answer!");
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/questions/accept`, {
                questionId: question._id,
                answerId
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            setAcceptedAnswer(res.data.acceptedAnswer);
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Failed to accept answer");
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="space-y-4 mt-8">
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
                <Skeleton className="h-20 w-full rounded-lg" />
            </div>
        );
    }

    if (error) {
        return <p className="text-red-500 mt-8">{error}</p>;
    }

    const sortedAnswers = [...answers].sort((a, b) => (a._id === acceptedAnswer ? -1 : b._id === acceptedAnswer ? 1 : 0));

    return (
        <div>
            {answers.length === 0 ? (
                <div className="border border-primary w-full bg-violet-50 mb-6 py-3 rounded-md text-primary text-center font-medium">
                    No answers yet 😭. Be the first to answer ⚡
                </div>
            ) : (
                <div className="space-y-6">
                    {sortedAnswers.map((answer) => (
                        <div
                            key={answer._id}
                            className={`border rounded-lg p-4 shadow-sm ${acceptedAnswer === answer._id ? "bg-green-50 text-black" : "border"}`}
                            style={{ borderColor: `var(--borderColor)` }}
                        >
                            {acceptedAnswer === answer._id && (
                                <div className="mb-3 text-green-700 font-medium flex items-center gap-2">
                                    <FaCheckCircle size={20} /> Accepted Answer
                                </div>
                            )}
                            <div className="flex items-center space-x-3 justify-between">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={answer.author?.photo || "/default-avatar.png"}
                                        alt="User Avatar"
                                        className="w-9 h-9 rounded-full border border-primary"
                                    />
                                    <div className="font-medium">{answer.author?.fullName || "Anonymous"}</div>
                                </div>
                                <div className="text-xs text-gray-500">
                                    {new Date(answer.createdAt).toLocaleString()}
                                </div>
                            </div>

                            <p className="mt-3 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(answer.body) }}></p>

                            {user && user._id === question.author._id && (
                                <Button
                                    onClick={() => handleAcceptAnswer(answer._id)}
                                    className={`px-3 py-1 rounded-md mt-2 ${acceptedAnswer === answer._id ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"}`}
                                >
                                    {acceptedAnswer === answer._id ? "Unaccept Answer" : "Accept Answer"}
                                </Button>
                            )}

                            <div className="mt-3 flex items-center space-x-4 text-sm justify-between">
                                <button
                                    onClick={() => setReplyingTo(answer._id)}
                                    className="flex items-center gap-2 text-primary hover:text-violet-700 hover:underline cursor-pointer"
                                >
                                    <FaReplyAll />
                                    <span className="font-medium">Reply</span>
                                </button>
                            </div>

                            {replyingTo === answer._id && (
                                <div className="mt-3">
                                    <EditorProvider>
                                        <Editor
                                            value={richText}
                                            onChange={(e) => {
                                                setRichText(e.target.value);
                                                setReplyText(e.target.value);
                                            }}
                                            className={`w-full p-2 rounded-md border ${acceptedAnswer === answer._id ? "" : "inputField"}`}
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

                                    <div className="flex justify-end mt-2 space-x-2">
                                        <Button variant="secondary" className="border" onClick={() => setReplyingTo(null)}>
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleReplySubmit(answer._id)}>Submit Reply</Button>
                                    </div>
                                </div>
                            )}
                            {comments[answer._id]?.length > 0 && (
                                <div className="mt-4 border-l-2 border-primary pl-4 space-y-2">
                                    {comments[answer._id]?.map((comment) => (
                                        <div key={comment._id} className="relative flex items-start gap-3">
                                            <img
                                                src={comment.author?.photo || "/default-avatar.png"}
                                                alt="User Avatar"
                                                className="w-8 h-8 rounded-full border border-primary"
                                            />
                                            <div className={`p-3 rounded-lg w-full ${acceptedAnswer === answer._id ? "bg-green-50 border" : "courseSection"} `}>
                                                <span className="font-medium text-sm">{comment.author?.fullName || "Anonymous"}</span>
                                                <p className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleString()}</p>
                                                <p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.body) }}></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AnswerList;