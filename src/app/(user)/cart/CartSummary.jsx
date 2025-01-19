import Loading from "@/common/Loading";
import { createPaymentApi } from "@/services/paymentService";
import discountCalculator from "@/utils/dicountCalculator";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function CartSummary({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createPaymentApi,
  });

  const handleCompleteOrder = async () => {
    try {
      const { message } = await mutateAsync();
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="border px-4 py-8 rounded-es-lg flex flex-col gap-y-6 text-sm">
      <div className="flex items-center justify-between text-gray-500">
        <span>قیمت کالا ها </span>
        <span>{toPersianNumbersWithComma(totalGrossPrice)}تومان</span>
      </div>
      <div className="flex items-center justify-between font-bold">
        <span>جمع سبد خرید</span>
        <span>{toPersianNumbersWithComma(totalPrice)}تومان</span>
      </div>
      <div className="flex items-center justify-between text-rose-500 font-semibold">
        <span>
          سود شما از خرید ({discountCalculator(totalGrossPrice, totalPrice)}
          %)
        </span>
        <span>{toPersianNumbersWithComma(totalOffAmount)}تومان</span>
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <button
          onClick={handleCompleteOrder}
          className="btn btn--primary shadow-sm rounded-md -mb-2 text-md"
        >
          تایید و تکمیل سفارش
        </button>
      )}
    </div>
  );
}

export default CartSummary;
