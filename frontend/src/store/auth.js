import { atom, selector } from "recoil";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;
export const tokenState = atom({
    key: "tokenState",
    default: localStorage.getItem("token"),
});

export const userState = selector({
    key: 'authState',
    get: async ({ get }) => {
        const token = get(tokenState);

        if (!token) return null;

        try {
            const { data } = await axios.get(`${API}/auth/me`, { 
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("DATA:", data.user);
            return data?.user;
        } catch (error) {
            return null;
        }
    }
});

export const loggedInState = selector({
    key: "loggedInState",
    get: ({ get }) => {
        const token = get(tokenState);
        
        if (!token) return false;

        const user = get(userState);

        console.log("USER:", user?._id);

        if (!user || !user?._id) return false;

        return true;
    }
});
