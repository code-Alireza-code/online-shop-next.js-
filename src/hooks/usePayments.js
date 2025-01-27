import { getAllPaymentsApi } from "@/services/paymentService";
import { useQuery } from "@tanstack/react-query";

export const useGetAllPayments = () =>
  useQuery({ queryKey: ["get-all-payments"], queryFn: getAllPaymentsApi });
