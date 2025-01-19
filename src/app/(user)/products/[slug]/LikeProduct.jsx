"use client";

import { likeProductApi } from "@/services/productService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export const revalidate = 0;

function LikeProduct({ product }) {
  const router = useRouter();
  const handleLikeProduct = async () => {
    try {
      const { message } = await likeProductApi(product._id);
      toast.success(message);
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا هنگام لایک !");
    }
  };
  return (
    <div>
      <button className="p-1" onClick={handleLikeProduct}>
        {product.isLiked ? (
          <MdFavorite className="w-5 h-5 text-red-500" />
        ) : (
          <MdFavoriteBorder className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default LikeProduct;
