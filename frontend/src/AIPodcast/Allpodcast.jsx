import React, { useEffect, useState } from 'react';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import AppSidebar from '@/Dashboard/AppSidebar';
import axios from 'axios';
import AudioPlayer from 'react-h5-audio-player';
import { format } from 'date-fns';
import 'react-h5-audio-player/lib/styles.css';
import { LuRefreshCw, LuRefreshCwOff } from "react-icons/lu";
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { FaForwardStep, FaBackwardStep, FaPlay, FaPause } from "react-icons/fa6";
import Loader from '@/services/Loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreatePodcastDialog from './CreatePodcast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const stringToGradient = (text) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color1 = `hsl(${hash % 360}, 70%, 60%)`;
    const color2 = `hsl(${(hash * 7) % 360}, 80%, 70%)`;

    return `linear-gradient(135deg, ${color1}, ${color2})`;
};

const Allpodcast = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedPodcast, setSelectedPodcast] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const customPlayerIcons = {
        play: <FaPlay size={20} color="#fff" />,
        pause: <FaPause size={20} color="#fff" />,
        next: <FaForwardStep size={20} color="#fff" />,
        previous: <FaBackwardStep size={20} color="#fff" />,
        loop: <LuRefreshCw size={20} color="#fff" />,
        loopOff: <LuRefreshCwOff size={20} color="#fff" />,
        volume: <MdVolumeUp size={23} color="#fff" />,
        volumeMute: <MdVolumeOff size={23} color="#fff" />,
    };

    const fetchPodcasts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/podcast`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setPodcasts(res.data.podcasts);
            console.log(res.data.podcasts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching podcasts:', error);
            setLoading(false);
        }
    };

    const openModal = (podcast) => {
        setSelectedPodcast(podcast);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPodcast(null);
    };

    useEffect(() => {
        fetchPodcasts();
    }, []);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset style={{ backgroundColor: `var(--background-color)` }}>
                <div className="flex items-center gap-2 mb-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block font-semibold">
                                Dashboard
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="font-semibold" style={{ color: `var(--text-color)` }}>
                                    All Podcasts
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <CreatePodcastDialog
                    showDialog={showDialog}
                    setShowDialog={setShowDialog}
                    fetchPodcasts={fetchPodcasts}
                />
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <div className="w-full md:w-auto mb-4 md:mb-0">
                                <h1 className="text-2xl font-semibold">AI Podcasts </h1>
                                <span className="font-medium">{podcasts.length} podcasts to listen</span>
                            </div>

                            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                                <Input
                                    placeholder="🔎 Search a podcast..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full md:w-64 border inputField border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                />
                                <Button onClick={() => setShowDialog(true)}>
                                    Create Podcast
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {podcasts
                                .filter(q => q.topic.toLowerCase().includes(search.toLowerCase()))
                                .map((podcast) => (
                                    <div
                                        key={podcast._id}
                                        className="relative rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col gap-4 backdrop-blur-md"
                                    >
                                        <div
                                            className="absolute inset-0 bg-cover bg-center transition-all"
                                            style={{
                                                backgroundImage: podcast.thumbnail
                                                    ? `url(${podcast.thumbnail})`
                                                    : stringToGradient(podcast.topic),
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />

                                        <div className="relative p-4 text-white flex flex-col gap-4">
                                            <div>
                                                <h2 className="text-2xl font-bold mb-1 drop-shadow-lg line-clamp-1">
                                                    {podcast.topic}
                                                </h2>
                                                <p className="text-sm text-gray-200 mb-2">
                                                    Hosts: <strong>{podcast.voice1}</strong> & <strong>{podcast.voice2}</strong>
                                                </p>
                                                <p className="text-xs text-gray-300">
                                                    {format(new Date(podcast.createdAt), "PPpp")}
                                                </p>
                                            </div>
                                            <AudioPlayer
                                                src={podcast.audioUrl}
                                                autoPlay={false}
                                                showJumpControls={false}
                                                showSkipControls={true}
                                                loop={false}
                                                layout="stacked-reverse"
                                                customIcons={customPlayerIcons}
                                                style={{
                                                    borderRadius: "12px",
                                                    background: "rgba(124, 58, 237, 0.4)",
                                                    padding: "0.8rem",
                                                    backdropFilter: "blur(5px)",
                                                }}
                                            />
                                            <div className="text-sm mt-2 text-gray-200">
                                                <Button size="sm" onClick={() => openModal(podcast)}>
                                                    Show Conversation Script
                                                </Button>

                                            </div>
                                            <Dialog
                                                open={isModalOpen}
                                                onOpenChange={(open) => {
                                                    if (!open) closeModal();
                                                }}
                                            >
                                                <DialogContent
                                                    style={{ backgroundColor: `var(--background-color)`, borderColor: `var(--borderColor)` }}
                                                    className="max-w-[90vw] md:max-w-[600px] lg:max-w-[800px] p-6 rounded-lg shadow-lg border overflow-y-auto max-h-[90vh]"
                                                >
                                                    <DialogHeader>
                                                        <DialogTitle className="text-xl font-bold">
                                                            {selectedPodcast?.topic}
                                                        </DialogTitle>
                                                        <DialogDescription>
                                                            Podcast Script Conversation
                                                            <br />
                                                            Host1 - {selectedPodcast?.voice1}
                                                            <br />
                                                            Host2 - {selectedPodcast?.voice2}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                                        {selectedPodcast?.conversation}
                                                    </div>

                                                    <DialogFooter className="mt-4">
                                                        <Button variant="secondary" className="border" onClick={closeModal}>
                                                            Close
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Allpodcast;
