import { Button } from "@/components/ui/button";
import { startAssistant } from "@/services/vapi";
import { useNavigate } from "react-router-dom";
import FeedbackList from "./FeedbackList";
import { userState } from "@/store/auth";
import { useRecoilValue } from "recoil";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { AvatarCircles } from "@/components/magicui/avatar-circles";

const avatar = [
  {
    imageUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671140.jpg",
  },
  {
    imageUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671163.jpg",
  },
  {
    imageUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671132.jpg",
  },
  {
    imageUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671159.jpg",
  },
  {
    imageUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg",
  },
  {
    imageUrl: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671151.jpg",
  }
]

const MockInterviewForm = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  const handleStartCall = async () => {
    if (!user.phoneno) {
      alert("Phone number is missing.");
      return;
    }

    setLoading(true);
    try {
      const data = await startAssistant(user.phoneno);
      if (data?.id) {
        navigate(`/interviewscreen?call_id=${data.id}&phone=${user.phoneno}`);
      } else {
        alert("Failed to start the call. Please try again.");
      }
    } catch (error) {
      console.error("Error starting call:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="flex flex-col border p-8 rounded-lg shadow-sm"
        style={{ borderColor: `var(--borderColor)`, backgroundColor: `var(--background-color)` }}
      >
        <div className="mb-2 items-center justify-center flex">
          <AvatarCircles avatarUrls={avatar} />
        </div>
        <h2 className="text-2xl font-semibold text-center">Start Mock Interview</h2>
        <h2 className="text-sm font-semibold text-center mb-10 text-gray-500">Sharpen Your Skills with Realistic AI Interview Simulations</h2>
        <Label>Your phone number<span className="text-red-500">*</span></Label>
        <Input
          type="text"
          value={user.phoneno}
          readOnly
          className="inputField cursor-not-allowed mt-3"
        />

        <div className="w-full mt-6 flex sm:flex-row flex-col justify-center gap-4">
          <Button className="w-full border" variant="secondary" onClick={() => navigate("/courses")}>
            View Courses
          </Button>
          <Button className="w-full" onClick={handleStartCall} disabled={loading}>
            {loading ? "Starting..." : "Start Interview"}
          </Button>
        </div>
      </div>

      <FeedbackList />
    </div>
  );
};

export default MockInterviewForm;