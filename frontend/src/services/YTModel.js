import axios from "axios";

const ytUrl = "https://www.googleapis.com/youtube/v3";

const getVideos = async (query) => {
    const params = {
        part:'snippet',
        q:query,
        maxResults:1,
        type:'video',
        key:import.meta.env.VITE_YT_API_KEY
    }

    const res = await axios.get(ytUrl+'/search',{params});

    return res.data.items;
}

export default getVideos;