import discountCalculator from "@/utils/dicountCalculator";

function CartSummary({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

  return (
    <div className="border px-4 py-8 rounded-es-lg flex flex-col gap-y-6 text-sm">
      <div className="flex items-center justify-between text-gray-500">
        <span>قیمت کالا ها </span>
        <span>{totalGrossPrice}تومان</span>
      </div>
      <div className="flex items-center justify-between font-bold">
        <span>جمع سبد خرید</span>
        <span>{totalPrice}تومان</span>
      </div>
      <div className="flex items-center justify-between text-rose-500 font-semibold">
        <span>
          سود شما از خرید ({discountCalculator(totalGrossPrice, totalPrice)}
          %)
        </span>
        <span>{totalOffAmount}تومان</span>
      </div>
      <button className="btn btn--primary shadow-sm rounded-md -mb-2 text-md">
        تایید و تکمیل سفارش
      </button>
    </div>
  );
}

export default CartSummary;
