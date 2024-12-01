const API = import.meta.env.VITE_API_URL;

export const googleLoginHelper = async (code) => {
    try{
        const response = await fetch(`${API}/auth/google-login?code=${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        return data;
    }catch(e){
        console.log(e)
    }
}