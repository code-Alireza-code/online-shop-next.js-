import { addNewProductApi, getAllProducts } from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProducts,
    retry: false,
  });

export const useAddProduct = () =>
  useMutation({ mutationFn: addNewProductApi });
