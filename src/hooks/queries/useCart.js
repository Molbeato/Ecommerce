import { useSelector } from "react-redux"
import { getCart } from "../../services/cart/getCart"
import { useQuery } from "@tanstack/react-query"

export const useCart = () => {
    const { token, isLogged } = useSelector((store) => store.auth)
   
    const query = useQuery({
        queryKey: ['cart', isLogged], 
        queryFn: () => getCart(token),
        enable: isLogged
    });

    return query
}