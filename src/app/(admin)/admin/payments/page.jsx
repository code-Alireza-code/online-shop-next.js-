"use client";

import Loading from "@/common/Loading";
import { useGetAllPayments } from "@/hooks/usePayments";
import PaymentListTable from "./PaymentListTable";

function page() {
  const { data, isLoading } = useGetAllPayments();
  const { payments } = data || {};
  console.log(payments);

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-bold mb-5">سفارشات</h1>
      </div>
      <PaymentListTable payments={payments} />
    </div>
  );
}

export default page;
