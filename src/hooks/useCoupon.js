import { getAllCoupons } from "@/services/coupon";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () =>
  useQuery({ queryKey: ["get-all-coupons"], queryFn: getAllCoupons });
