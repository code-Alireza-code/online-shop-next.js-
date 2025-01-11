import { useQuery } from "@tanstack/react-query";
import { getUserProfileApi } from "@/services/authService";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfileApi,
    retry: false,
  });
