import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCart } from "../../services/cart/addProductToCart";
import { useSelector } from "react-redux";

export const useAddProductToCart = () => {
    const token = useSelector((store) => store.auth.token)

    const queryClient = useQueryClient();

    const mutation = useMutation({ 
        mutationFn: ({ quantity, productId }) => 
            addProductToCart({ token, quantity, productId }),
        onSuccess: async () => {
           await queryClient.invalidateQueries({ queryKey: ["cart"] })
        }
    });

    return mutation;
}