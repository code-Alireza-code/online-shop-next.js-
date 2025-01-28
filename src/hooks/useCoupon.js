import {
  AddCouponApi,
  editCouponApi,
  getAllCoupons,
  getCouponByIdApi,
  removeCouponApi,
} from "@/services/couponService";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllCoupons = () =>
  useQuery({ queryKey: ["get-all-coupons"], queryFn: getAllCoupons });

export const useAddCoupon = () => useMutation({ mutationFn: AddCouponApi });

export const useGetCouponById = (id) =>
  useQuery({
    queryFn: () => getCouponByIdApi(id),
    queryKey: ["get-coupon-by-id", id],
  });

export const useEditCoupon = () => useMutation({ mutationFn: editCouponApi });

export const useRemoveCoupon = () =>
  useMutation({ mutationFn: removeCouponApi });
