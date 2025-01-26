import {
  addNewProductApi,
  getAllProducts,
  getProductById,
  removeProductApi,
  updateProductApi,
} from "@/services/productService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () =>
  useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProducts,
    retry: false,
  });

export const useAddProduct = () =>
  useMutation({ mutationFn: addNewProductApi });

export const useGetProductById = (id) =>
  useQuery({
    queryKey: ["get-products-by-id", id],
    queryFn: () => getProductById(id),
    retry: false,
  });

export const useUpdateProduct = () =>
  useMutation({ mutationFn: updateProductApi });

export const useRemoveProduct = () =>
  useMutation({ mutationFn: removeProductApi });
