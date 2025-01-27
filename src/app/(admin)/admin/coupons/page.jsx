"use client";
import Loading from "@/common/Loading";
import { useGetAllCoupons } from "@/hooks/useCoupon";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";
import CouponListTable from "./CouponListTable";

function page() {
  const { data, isLoading } = useGetAllCoupons();
  const { coupons } = data || {};
  console.log(coupons);

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold mb-5">کدهای تخفیف</h1>
        <Link
          href="/admin/coupons/add"
          className="font-bold text-primary-900 flex items-center gap-x-2"
        >
          <HiPlusCircle className="w-6 h-6" />
          <span>افزودن کد تخفیف</span>
        </Link>
      </div>
      <CouponListTable coupons={coupons} />
    </div>
  );
}

export default page;
