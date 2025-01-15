"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ProductFilter from "./ProductFilter";

function CategorySidebar({ categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathaname = usePathname();

  const [selectedCategories, setSelectedCategories] = useState(() => {
    return searchParams.get("category")
      ? String(searchParams.get("category")).split(",")
      : [];
  });

  const createQueryString = (name, value) => {
    const params = new URLSearchParams();
    params.set(name, value);
    return params.toString();
  };

  const handleToggleCategory = (e) => {
    const currentCategory = e.target.value;

    if (selectedCategories.includes(currentCategory)) {
      const categories = selectedCategories.filter(
        (c) => c !== currentCategory
      );
      setSelectedCategories(categories);
      if (!categories.length) {
        return router.push(pathaname);
      }
      router.push(pathaname + "?" + createQueryString("category", categories));
    } else {
      setSelectedCategories([...selectedCategories, currentCategory]);

      router.push(
        pathaname +
          "?" +
          createQueryString("category", [
            ...selectedCategories,
            currentCategory,
          ])
      );
    }
  };

  return (
    <div className="col-span-1">
      <ProductFilter
        handleToggleCategory={handleToggleCategory}
        selectedCategories={selectedCategories}
        categories={categories}
      />
    </div>
  );
}

export default CategorySidebar;
