"use client";

import Checkbox from "@/common/Checkbox";

function ProductFilter({
  categories,
  handleToggleCategory,
  selectedCategories,
}) {
  return (
    <>
      <p className="font-bold mb-4">دسته بندی ها</p>
      <ul className="space-y-4">
        {categories.map((category) => (
          <Checkbox
            key={category._id}
            id={category._id}
            value={category.englishTitle}
            name="product-category"
            label={category.title}
            onChange={handleToggleCategory}
            checked={selectedCategories.includes(category.englishTitle)}
          />
        ))}
      </ul>
    </>
  );
}

export default ProductFilter;
