import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../services/user/getLoggedInUser";
import { useSelector } from "react-redux";


export const useUser = () => {
    const { token, isLogged } = useSelector((store) => store.auth)

    const query = useQuery({ 
        queryKey: ['users', isLogged], 
        queryFn: () => getUser(token),
        enable: isLogged
    });

    return query;
};