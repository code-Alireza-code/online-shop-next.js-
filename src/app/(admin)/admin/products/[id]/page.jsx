"use client";

import Loading from "@/common/Loading";
import { useGetProductById } from "@/hooks/useProducts";
import { useParams } from "next/navigation";

function ProductDetailPage() {
  const { id } = useParams();

  const { data, isLoading } = useGetProductById(id);
  const { product } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="mb-4 font-bold text-xl">{product.title}</h1>
    </div>
  );
}

export default ProductDetailPage;
