import { useQuery } from "@tanstack/react-query";
import { getUserProfileApi } from "@/services/authService";
import { getAllUsersApi } from "@/services/adminService";

export const useGetUser = () =>
  useQuery({
    queryKey: ["get-user"],
    queryFn: getUserProfileApi,
    retry: false,
  });

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["get-all-users"],
    queryFn: getAllUsersApi,
    retry: false,
  });
