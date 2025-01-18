import { addToCartApi } from "@/services/cartService";
import { useMutation } from "@tanstack/react-query";

export const useAddToCart = () => useMutation({ mutationFn: addToCartApi });
