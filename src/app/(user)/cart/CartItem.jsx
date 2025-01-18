"use client";
import { useAddToCart } from "@/hooks/useCart";
import { removeFromCartApi } from "@/services/cartService";
import { getProductById } from "@/services/productService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiMinus, HiOutlineTrash, HiPlus } from "react-icons/hi";

function CartItem({ product }) {
  const { data } = useQuery({
    queryKey: [`get-product-${product._id}`],
    queryFn: () => getProductById(product._id),
  });

  const queryClient = useQueryClient();

  const { product: singleProduct } = data || {};
  const { mutateAsync: mutateAsyncAdd } = useAddToCart();

  const handleAddToCart = async (id) => {
    try {
      const { message } = await mutateAsyncAdd(id);
      // toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "محصول اضافه نشد !");
    }
  };

  const { mutateAsync: mutateAsyncRemove } = useMutation({
    mutationFn: removeFromCartApi,
  });

  const handleRemoveFromCart = async (id) => {
    try {
      const { message } = await mutateAsyncRemove(id);
      // toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا هنگام حذف محصول");
    }
  };

  const handleDeleteProductFromCart = async (id) => {
    try {
      for (let i = 1; i <= product.quantity; i++) {
        await mutateAsyncRemove(id);
      }
      toast.success("محصول با موفقیت حذف شد");
    } catch (error) {
      console.log(error?.response?.data?.message || "خطا در هنگام حذف محصول");
    }
    queryClient.invalidateQueries({ queryKey: ["get-user"] });
  };

  return (
    <div className="border rounded-xl p-4 flex justify-between">
      <span className="flex-1 font-bold">{product.title}</span>
      <div className="ml-3 flex items-center gap-x-3 border-l-2 pl-4">
        <span>قیمت :</span>
        {product.discount > 0 && (
          <>
            <span className="font-bold">{product.offPrice}</span>
            <div className=" text-white rounded-2xl px-2 py-1 flex items-center justify-center bg-red-500">
              %{product.discount}
            </div>
          </>
        )}
        <span
          className={` ${
            product.discount > 0 ? "line-through text-gray-600" : "font-bold"
          }`}
        >
          {product.price}
        </span>
      </div>
      <div className="flex items-center justify-between gap-x-8">
        <span className=" border-l-2 pl-4">تعداد : {product.quantity}</span>
        <div className="flex gap-x-2">
          <button
            className="bg-primary-900 text-white rounded p-1 disabled:cursor-not-allowed disabled:bg-gray-300"
            onClick={() => handleAddToCart(product._id)}
            disabled={product.quantity >= singleProduct?.countInStock}
          >
            <HiPlus className="w-4 h-4" />
          </button>
          <button onClick={() => handleDeleteProductFromCart(product._id)}>
            <HiOutlineTrash className="w-5 h-5 text-rose-500" />
          </button>
          <button
            className="border-2 text-primary-800 border-primary-400 rounded"
            onClick={() => handleRemoveFromCart(product._id)}
          >
            <HiMinus className="w-5 h-5 " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
