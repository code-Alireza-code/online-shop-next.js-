import {
  addNewCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryApi,
} from "@/services/categoryService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCategories = () =>
  useQuery({ queryKey: ["get-all-categories"], queryFn: getAllCategories });

export const useGetCategoryById = (id) =>
  useQuery({
    queryKey: ["get-category-by-id", id],
    queryFn: () => getCategoryById(id),
  });

export const useAddCategory = () => useMutation({ mutationFn: addNewCategory });

export const useUpdateCategory = () =>
  useMutation({ mutationFn: updateCategoryApi });
