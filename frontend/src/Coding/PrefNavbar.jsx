import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AiOutlineFullscreen, AiOutlineFullscreenExit, AiOutlineSetting } from "react-icons/ai";

const PrefNavbar = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    useEffect(() => {
        function exitHandler() {
            if (!document.fullscreenElement) {
                setIsFullScreen(false);
            }
        }

        document.addEventListener("fullscreenchange", exitHandler);
        return () => {
            document.removeEventListener("fullscreenchange", exitHandler);
        };
    }, []);

    return (
        <div className="flex items-center justify-between backdrop-blur-md h-12 w-full pl-6 rounded-lg">
            <Button className="text-white font-semibold px-4 py-2 rounded-lg shadow">
                JavaScript
            </Button>

            <div className="flex items-center space-x-2">
                <button
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
                    onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}
                >
                    <AiOutlineSetting className="h-5 w-5" />
                </button>

                <button
                    className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
                    onClick={handleFullScreen}
                >
                    {!isFullScreen ? <AiOutlineFullscreen className="h-5 w-5" /> : <AiOutlineFullscreenExit className="h-5 w-5" />}
                </button>
            </div>
        </div>
    );
};

export default PrefNavbar;
