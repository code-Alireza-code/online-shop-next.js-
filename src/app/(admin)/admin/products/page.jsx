"use client";
import Loading from "@/common/Loading";
import { useGetProducts } from "@/hooks/useProducts";
import ProductListTable from "./ProductListTable";

function AdminProductPage() {
  const { isLoading, data } = useGetProducts();
  const { products } = data || {};

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 className="text-xl font-bold mb-5">محصولات</h1>
      <ProductListTable products={products} />
    </div>
  );
}

export default AdminProductPage;
