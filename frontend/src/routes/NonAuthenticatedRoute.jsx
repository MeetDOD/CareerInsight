import { loggedInState } from "@/store/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const NonAuthenticatedRoute = ({ children }) => {
    const isLoggedIn = useRecoilValue(loggedInState);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) navigate("/");
    }, [isLoggedIn, navigate]);

    return <>{children}</>;
};

export default NonAuthenticatedRoute;