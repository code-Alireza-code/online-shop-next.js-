"use client";

import Loading from "@/common/Loading";
import { useGetPaymentById } from "@/hooks/usePayments";
import { useParams } from "next/navigation";

function PaymentDetailPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetPaymentById(id);
  const { payment: paymentArray } = data || {};

  const payment = paymentArray?.at(0) || {};

  if (isLoading) return <Loading />;
  return <div>{payment.description}</div>;
}

export default PaymentDetailPage;
