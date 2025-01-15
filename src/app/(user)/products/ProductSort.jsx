import RadioInput from "@/common/RadioInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortOptions = [
  {
    id: 1,
    value: "latest",
    label: "جدید ترین",
  },
  {
    id: 2,
    value: "earliest",
    label: "قدیمی ترین",
  },
  {
    id: 3,
    value: "popular",
    label: "محبوب ترین",
  },
];

function ProductSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "latest");

  const handleChangeSort = (e) => {
    setSort(e.target.value);
    const params = new URLSearchParams(searchParams);
    params.set("sort", e.target.value);

    router.push(pathname + "?" + params);
  };

  return (
    <div>
      <p className="font-bold mb-2 mt-6">مرتب سازی </p>
      {sortOptions.map((option) => (
        <RadioInput
          key={option.id}
          id={option.id}
          label={option.label}
          name={"product-sort"}
          value={option.value}
          checked={option.value === sort}
          onChange={handleChangeSort}
        />
      ))}
    </div>
  );
}

export default ProductSort;
