import { AddCouponApi, getAllCoupons } from "@/services/couponService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () =>
  useQuery({ queryKey: ["get-all-coupons"], queryFn: getAllCoupons });

export const useAddCoupon = () => useMutation({ mutationFn: AddCouponApi });
