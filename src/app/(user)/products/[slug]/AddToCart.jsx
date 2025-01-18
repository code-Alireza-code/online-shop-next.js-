"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import { useAddToCart } from "@/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";

function AddToCart({ product }) {
  const router = useRouter();
  const { data: userData } = useGetUser();
  const { user } = userData || {};
  const queryClient = useQueryClient();
  const { isPending, mutateAsync } = useAddToCart();

  const isInCart = (user, product) => {
    if (!user) return false;
    return user.cart?.products.some((p) => p.productId == product._id);
  };

  const handleAddToCart = async () => {
    if (!user)
      toast(
        (t) => (
          <div className="flex items-center justify-between gap-x-4">
            <button onClick={() => toast.dismiss(t.id)} className="text-error">
              <MdClose />
            </button>
            <span>لطفا ابتدا لاگین کنید</span>
            <button
              className="btn bg-primary-900 text-white"
              onClick={() => {
                router.push("/auth");
                toast.dismiss(t.id);
              }}
            >
              ورود
            </button>
          </div>
        ),
        {
          duration: 10000,
        }
      );

    try {
      const { message } = await mutateAsync(product._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در هنگام افزودن به سبد خرید"
      );
    }
  };

  return (
    <div className="flex justify-start">
      {isInCart(user, product) ? (
        <button className="btn btn--secondary">
          <Link href="/cart" className="text-sm">
            ادامه سفارش در سبد خرید
          </Link>
        </button>
      ) : isPending ? (
        <Loading />
      ) : (
        <button onClick={handleAddToCart} className="btn btn--primary text-sm">
          اضافه کردن به سبد خرید
        </button>
      )}
    </div>
  );
}

export default AddToCart;
