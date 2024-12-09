const apiKey = import.meta.env.VITE_COURSE_THUMBNAIL;
const PIXABAY_API_URL = 'https://pixabay.com/api/';

const fetchRelevantImage = async (query) => {
    try {
        const response = await fetch(`${PIXABAY_API_URL}?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo`);
        const data = await response.json();
        
        if (data.hits && data.hits.length > 0) {
            return data.hits[0].webformatURL; 
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching image from Pixabay:', error);
        return null;
    }
};

export default fetchRelevantImage;
