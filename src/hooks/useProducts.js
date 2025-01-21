import { getAllProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProducts,
    retry: false,
  });
