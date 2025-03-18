import axios from "axios";

const ytUrl = "https://www.googleapis.com/youtube/v3";
const apiLimitKey = "yt_api_count"; 

const getApiCount = () => {
    const storedCount = localStorage.getItem(apiLimitKey);
    const { count, date } = storedCount ? JSON.parse(storedCount) : { count: 0, date: new Date().toDateString() };

    if (date !== new Date().toDateString()) {
        localStorage.setItem(apiLimitKey, JSON.stringify({ count: 0, date: new Date().toDateString() }));
        return 0;
    }

    return count;
};

const incrementApiCount = () => {
    const currentCount = getApiCount();
    localStorage.setItem(apiLimitKey, JSON.stringify({ count: currentCount + 1, date: new Date().toDateString() }));
};

const getVideos = async (query) => {
    const apiCount = getApiCount();

    if (apiCount >= 20) {
        throw new Error("You have reached the daily limit of course generation.");
    }

    const params = {
        part: 'snippet',
        q: query,
        maxResults: 1,
        type: 'video',
        key: import.meta.env.VITE_YT_API_KEY
    };

    const res = await axios.get(`${ytUrl}/search`, { params });

    incrementApiCount();

    return res.data.items;
};

export default getVideos;
