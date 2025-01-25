"use client";

import Loading from "@/common/Loading";
import { useGetCategories } from "@/hooks/useCategories";
import Link from "next/link";
import { HiPlusCircle } from "react-icons/hi";
import CategoriesTable from "./CategoriesTable";

function CategoryPage() {
  const { data, isLoading } = useGetCategories();
  const { categories } = data || {};

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold mb-5">دسته بندی ها</h1>
        <Link
          href="/admin/categories/add"
          className="font-bold text-primary-900 flex items-center gap-x-2 border px-2 py-1 border-primary-700 rounded-md hover:bg-primary-100/60"
        >
          <HiPlusCircle className="w-6 h-6" />
          <span>اضافه کردن دسته بندی</span>
        </Link>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  );
}

export default CategoryPage;
