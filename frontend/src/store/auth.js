import { atom, selector } from "recoil";
import axios from "axios";

export const tokenState = atom({
    key: "tokenState",
    default: localStorage.getItem("token"),
})

export const userState = selector({
    key: 'authState',
    get: async ({ get }) => {
        const token = get(tokenState);

        if (!token) return null;

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            return data?.user;
        } catch (error) {
            return null;
        }
    }
})

export const loggedInState = selector({
    key: "loggedInState",
    get: ({ get }) => {
      const token = get(tokenState);
      const user = get(userState);
      return Boolean(token && user);
    },
  });
  