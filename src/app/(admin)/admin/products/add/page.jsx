"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetCategories } from "@/hooks/useCategories";
import { useAddProduct } from "@/hooks/useProducts";
import { priceAfterDiscount } from "@/utils/dicountCalculator";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";

const productsFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
    isNumber: false,
  },
  {
    id: 2,
    label: "توضیحات",
    name: "description",
    isNumber: false,
  },
  {
    id: 3,
    label: "اسلاگ",
    name: "slug",
    isNumber: false,
  },
  {
    id: 4,
    label: "برند",
    name: "brand",
    isNumber: false,
  },
  {
    id: 5,
    label: "قیمت",
    name: "price",
    isNumber: true,
  },
  {
    id: 6,
    label: "(درصد)تخفیف",
    name: "discount",
    isNumber: true,
  },
  {
    id: 7,
    label: "قیمت روی تخفیف",
    name: "offPrice",
    isNumber: true,
  },
  {
    id: 8,
    label: "موجودی",
    name: "countInStock",
    isNumber: true,
  },
  {
    id: 9,
    label: "لینک عکس محصول",
    name: "imageLink",
    isNumber: false,
  },
];

function AddProductPage() {
  const { data } = useGetCategories();
  const { categories } = data || {};
  const { mutateAsync, isLoading } = useAddProduct();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
    control,
    setValue,
  } = useForm();

  const price = watch("price");
  const discount = watch("discount");

  useEffect(() => {
    if (price && discount)
      setValue("offPrice", priceAfterDiscount(price, discount));
  }, [discount, price]);

  const handleAddProduct = async (formData, _e) => {
    try {
      const { message } = await mutateAsync(formData);
      toast.success(message);
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا هنگام افزودن محصول");
    }
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(handleAddProduct)}
        className="max-w-screen-sm p-3 mr-4 flex flex-col gap-y-6"
      >
        {productsFormData.map((p) => (
          <div key={p.id}>
            <TextField
              label={p.label}
              name={p.name}
              {...register(p.name, { required: false })}
              type={p.isNumber ? "number" : "text"}
              readOnly={!!p.name === "offPrice"}
            />
            {errors[p.name] && (
              <span className="text-error text-xs">{p.label} اجباری است !</span>
            )}
          </div>
        ))}
        <div>
          <label htmlFor="select-category">دسته بندی</label>
          <select
            className="textField__input"
            name="category"
            id="select-category"
            {...register("category", { required: "دسته بندی اجباری است" })}
          >
            <option value="" className="text-gray-100">
              دسته بندی را انتخاب کنید ...
            </option>
            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="tags">تگ محصولات</label>
          <Controller
            name="tags"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TagsInput
                name="tags"
                id="tags"
                placeHolder="تگ"
                onChange={onChange}
                value={value || []}
                onExisting={(tag) => toast.error(`تگ ${tag} تکراری است`)}
                classNames={{
                  tag: "!bg-gray-100 ",
                }}
              />
            )}
          />
        </div>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary">
              اضافه کردن محصول
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddProductPage;
