
const API = import.meta.env.VITE_API_URL;

export const addResumeData = async (data) => {
    try{
        const res = await fetch(`${API}/resume/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    }catch(error){
        console.log(error);
    }
}

export const getResumeData = async () => {
    try{
        const res = await fetch(`${API}/resume/my-resume`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await res.json();
        console.log("fetching resume data", result?.data);
        if(result && result.data){
            return result.data;
        }else{
            return [];
        }
    }catch(error){
        console.log(error);
    }
}