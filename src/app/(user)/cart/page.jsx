"use client";
import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import Link from "next/link";
import { MdLogin } from "react-icons/md";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

function CartPage() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  if (isLoading) return <Loading />;
  if (!user || !data)
    return (
      <div className="container lg:max-w-screen-lg">
        <p className="font-bold mb-4">برای مشاهده اطلاعات لطفا وارد شوید !</p>
        <button className="flex gap-x-1">
          <Link href="/auth" className="text-lg font-bold text-primary-900">
            رفتن به صفحه لاگین
          </Link>
          <MdLogin className="w-6 h-6 text-primary-900" />
        </button>
      </div>
    );

  if (!user.cart?.products || user.cart?.products.length === 0)
    return (
      <div className="container lg:max-w-screen-lg">
        <p className="mb-4">سبد خرید خالی است !</p>
        <Link href="/auth" className="text-lg font-bold text-primary-900">
          رفتن به صفحه محصولات
        </Link>
      </div>
    );

  return (
    <>
      <h1 className="font-bold text-xl mb-8">سبد خرید شما</h1>
      <div className="grid grid-cols-7 gap-x-8">
        <div className="col-span-5 space-y-5">
          {cart &&
            cart.productDetail.map((item) => (
              <CartItem key={item._id} product={item} />
            ))}
        </div>
        <div className="col-span-2">
          <CartSummary payDetail={cart.payDetail} />
        </div>
      </div>
    </>
  );
}

export default CartPage;
