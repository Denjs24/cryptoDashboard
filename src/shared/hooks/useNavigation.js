import { useLocation, useNavigate } from "react-router-dom";

export function useNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const back = () => {
        if (navigate(-1) === undefined) {
            navigate('/')
        }else{
            navigate(-1);
        }
    };

    const to = (path) => {
        navigate(path);
    };

    const isActive = (path) => {
        return pathname === path;
    };

    return {
        back,
        to,
        isActive,
    };
}