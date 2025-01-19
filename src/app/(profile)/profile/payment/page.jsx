"use client";
import Loading from "@/common/Loading";
import { userPaymentTHeads } from "@/constants/tableHeads";
import { useGetUser } from "@/hooks/useAuth";
import { toLocalDateString } from "@/utils/toLocalDate";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import PaymentTable from "./PaymentTable";

function page() {
  const { data, isPending } = useGetUser();
  const { payments } = data || {};

  if (isPending) return <Loading />;
  return (
    <div>
      <h1>سفارشات کاربر</h1>
      <PaymentTable payments={payments} />
    </div>
  );
}

export default page;
