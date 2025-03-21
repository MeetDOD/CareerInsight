import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { vapi, stopAssistant } from "@/services/vapi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { userState } from "@/store/auth";
import { useRecoilValue } from "recoil";
import { Mic, MicOff, Video, VideoOff, Maximize, Minimize, PhoneOff, Loader2 } from "lucide-react";
import { Ripple } from "@/components/magicui/ripple";

const InterviewScreen = () => {
    const [searchParams] = useSearchParams();
    const callId = searchParams.get("call_id");
    const phone = searchParams.get("phone");
    const navigate = useNavigate();
    const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);
    const [volumeLevel, setVolumeLevel] = useState(0);
    const [loadingResult, setLoadingResult] = useState(false);
    const pollingRef = useRef(null);
    const user = useRecoilValue(userState);
    const [micOn, setMicOn] = useState(true);
    const [videoOn, setVideoOn] = useState(true);
    const [fullscreen, setFullscreen] = useState(false);
    const videoRefSmall = useRef(null);
    const videoRefLarge = useRef(null);
    const streamRef = useRef(null);

    const toggleFullscreen = () => {
        if (!fullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setFullscreen(!fullscreen);
    };

    useEffect(() => {
        vapi
            .on("call-start", () => console.log("Call started"))
            .on("call-end", () => handleStopAndStartPolling())
            .on("speech-start", () => setAssistantIsSpeaking(true))
            .on("speech-end", () => setAssistantIsSpeaking(false))
            .on("volume-level", (level) => setVolumeLevel(level));

        return () => {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }
        };
    }, []);

    const handleStopAndStartPolling = () => {
        stopAssistant();
        setLoadingResult(true);

        pollingRef.current = setInterval(async () => {
            await fetchCallDetails();
        }, 3000);
    };

    const fetchCallDetails = async () => {
        try {
            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }

            const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/interview/call-details?call_id=${callId}&phone=${phone}&userId=${user._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const data = await res.json();

            if (data.summary && data.analysis) {
                setLoadingResult(false);

                toast.success("Feedback generated successfully!");

                navigate("/mockinterview");

                window.location.reload();
            }
        } catch (error) {
            console.error("Error fetching call details:", error);
            setLoadingResult(false);

            if (pollingRef.current) {
                clearInterval(pollingRef.current);
            }

            toast.error("Failed to fetch feedback. Try again!");
        }
    };

    useEffect(() => {
        if (videoOn) {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: false })
                .then((stream) => {
                    streamRef.current = stream;
                    if (videoRefSmall.current) {
                        videoRefSmall.current.srcObject = stream;
                    }
                    if (videoRefLarge.current) {
                        videoRefLarge.current.srcObject = stream;
                    }
                })
                .catch((err) => {
                    console.error("Error accessing webcam: ", err);
                });
        } else {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        }
    }, [videoOn]);

    const micStreamRef = useRef(null);

    useEffect(() => {
        if (micOn) {
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream) => {
                    micStreamRef.current = stream;
                })
                .catch((err) => {
                    console.error("Error accessing mic: ", err);
                    toast.error("Microphone access denied or error.");
                });
        } else {
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach((track) => track.stop());
                micStreamRef.current = null;
            }
        }
    }, [micOn]);

    useEffect(() => {
        if (micOn) {
            navigator.mediaDevices
                .getUserMedia({ audio: true, video: false })
                .then((stream) => {
                    micStreamRef.current = stream;
                })
                .catch((err) => {
                    console.error("Error accessing mic on mount: ", err);
                });
        }
        return () => {
            if (micStreamRef.current) {
                micStreamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-medium my-4">Interview with <span className="text-primary font-semibold">{user.fullName}</span></h2>
            <div className="mt-5 grid grid-cols-1 lg:grid-cols-4 gap-5">
                <div className="lg:col-span-2 h-[60vh] courseSection rounded-xl flex flex-col items-center justify-center relative">
                    <img src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg" className="h-[80px] w-[80px] rounded-full object-cover" />
                    <h2 className="text-gray-500 mt-2">Antonio (interviewer)</h2>
                    <div className="bg-gray-200 rounded-xl absolute bottom-5 right-5 courseSection2">
                        {videoOn ? (
                            <video
                                ref={videoRefSmall}
                                autoPlay
                                muted
                                playsInline
                                className="h-[120px] w-[160px] object-cover rounded-xl"
                            />
                        ) : (
                            <div className="p-5 px-10">
                                <img
                                    src={user.photo}
                                    className="h-[80px] w-[80px] rounded-full object-cover"
                                />
                            </div>
                        )}
                    </div>
                    <Ripple animate={assistantIsSpeaking} volumeLevel={volumeLevel} />
                </div>

                <div className="lg:col-span-2 h-[60vh] courseSection rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                    {videoOn ? (
                        <video
                            ref={videoRefLarge}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-xl"
                        />
                    ) : (
                        <>
                            <img
                                src={user.photo}
                                className="h-[80px] w-[80px] rounded-full object-cover"
                            />
                            <h2 className="text-gray-500 mt-2">{user.fullName} (you)</h2>
                        </>
                    )}
                </div>

            </div>

            <div className="flex items-center space-x-3 flex-wrap justify-center py-5">

                <button
                    onClick={() => setMicOn(!micOn)}
                    className={`p-3 rounded-full transition ${micOn ? "bg-primary text-white" : "bg-red-600 text-white"
                        }`}
                >
                    {micOn ? <Mic size={20} /> : <MicOff size={20} />}
                </button>

                <button
                    onClick={() => setVideoOn(!videoOn)}
                    className={`p-3 rounded-full transition ${videoOn ? "bg-primary text-white" : "bg-red-600 text-white"
                        }`}
                >
                    {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
                </button>

                <button
                    onClick={toggleFullscreen}
                    className={`p-3 rounded-full transition bg-primary text-white`}
                >
                    {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>

                <Button
                    disabled={loadingResult}
                    size="lg"
                    onClick={handleStopAndStartPolling}
                    className="py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition flex items-center gap-2 px-4"
                >
                    {loadingResult ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Ending Call...
                        </>
                    ) : (
                        <>
                            <PhoneOff size={20} />
                            End Call
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
};

export default InterviewScreen;
