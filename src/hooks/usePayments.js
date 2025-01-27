import { getAllPaymentsApi, getPaymentById } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPayments = () =>
  useQuery({ queryKey: ["get-all-payments"], queryFn: getAllPaymentsApi });

export const useGetPaymentById = (id) =>
  useQuery({
    queryKey: ["get-payment", id],
    queryFn: () => getPaymentById(id),
  });
