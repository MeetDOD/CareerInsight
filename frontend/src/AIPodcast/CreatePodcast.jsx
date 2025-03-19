import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";
import { userState } from "@/store/auth";
import { useRecoilValue } from "recoil";
import { ImSpinner2 } from "react-icons/im";
import { BsStars } from "react-icons/bs";
import { toast } from "sonner";

const voiceImages = {
    Rachel: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg",
    Domi: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671163.jpg",
    Bella: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg",
    Antoni: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671159.jpg",
    Josh: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg",
    Arnold: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671151.jpg",
};

const voices = ["Rachel", "Domi", "Bella", "Antoni", "Josh", "Arnold"];

const CreatePodcastDialog = ({ showDialog, setShowDialog, fetchPodcasts }) => {
    const user = useRecoilValue(userState);
    const [formData, setFormData] = useState({
        topic: "",
        voice1: "",
        voice2: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.topic || !formData.voice1 || !formData.voice2) return toast.error("Please fill all the fields!");
        setLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/podcast/generate`, {
                ...formData,
                id: user._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log("Podcast created: ", res.data);
            fetchPodcasts && fetchPodcasts();
            setShowDialog(false);
            setFormData({ topic: "", voice1: "", voice2: "" });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg" style={{ borderColor: "var(--borderColor)", backgroundColor: "var(--background-color)" }}>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Create a Podcast</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div>
                        <Label htmlFor="topic">Podcast Topic</Label>
                        <Textarea
                            id="topic"
                            name="topic"
                            placeholder="Enter podcast topic"
                            value={formData.topic}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 mt-1 inputField"
                        />
                    </div>

                    <div>
                        <Label>Voice 1</Label>
                        <Select onValueChange={(val) => setFormData({ ...formData, voice1: val })}>
                            <SelectTrigger className="inputField">
                                <SelectValue placeholder="Select Voice 1" />
                            </SelectTrigger>
                            <SelectContent
                                style={{
                                    backgroundColor: `var(--background-color)`,
                                    color: `var(--text-color)`,
                                    borderColor: `var(--borderColor)`,
                                }}
                            >
                                {voices.map((v) => (
                                    <SelectItem key={v} value={v}>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={voiceImages[v]}
                                                alt={v}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span>{v}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Voice 2</Label>
                        <Select onValueChange={(val) => setFormData({ ...formData, voice2: val })}>
                            <SelectTrigger className="inputField">
                                <SelectValue placeholder="Select Voice 2" />
                            </SelectTrigger>
                            <SelectContent style={{
                                backgroundColor: `var(--background-color)`,
                                color: `var(--text-color)`,
                                borderColor: `var(--borderColor)`,
                            }}>
                                {voices.map((v) => (
                                    <SelectItem key={v} value={v}>
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={voiceImages[v]}
                                                alt={v}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span>{v}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="flex justify-end mt-4">
                    <Button onClick={() => setShowDialog(false)} variant="secondary" className="border">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? (
                            <>
                                <ImSpinner2 size={20} className="animate-spin" /> Generating Podcast
                            </>
                        ) : (
                            <>
                                <BsStars size={20} /> Generate Podcast
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CreatePodcastDialog;