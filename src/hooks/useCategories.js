import { getAllCategories } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () =>
  useQuery({ queryKey: ["get-all-categories"], queryFn: getAllCategories });
