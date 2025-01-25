import { getAllCategories, getCategoryById } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () =>
  useQuery({ queryKey: ["get-all-categories"], queryFn: getAllCategories });

export const useGetCategoryById = (id) =>
  useQuery({
    queryKey: ["get-category-by-id", id],
    queryFn: () => getCategoryById(id),
  });
