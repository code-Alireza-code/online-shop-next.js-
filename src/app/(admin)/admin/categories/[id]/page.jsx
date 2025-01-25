"use client";

import Loading from "@/common/Loading";
import { useGetCategoryById } from "@/hooks/useCategories";
import { useParams } from "next/navigation";

function CategoryDetailPage() {
  const { id } = useParams();

  const { data, isLoading } = useGetCategoryById(id);
  const { category } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="font-bold mb-4 text-xl">{category.title}</h1>
    </div>
  );
}

export default CategoryDetailPage;
