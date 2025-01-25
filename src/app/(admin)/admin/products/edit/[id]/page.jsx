"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetCategories } from "@/hooks/useCategories";
import { useGetProductById, useUpdateProduct } from "@/hooks/useProducts";
import { useParams, useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";
import { useEffect } from "react";
import toast from "react-hot-toast";

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

function page() {
  const { id } = useParams();
  const { isLoadingProductData, data: productData } = useGetProductById(id);
  const { product } = productData || {};
  const { data: categoryData } = useGetCategories();
  const { categories } = categoryData || {};

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();
  const router = useRouter();
  const { mutateAsync, isPending } = useUpdateProduct();

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        description: product.description,
        slug: product.slug,
        brand: product.brand,
        price: product.price,
        discount: product.discount,
        offPrice: product.offPrice,
        countInStock: product.countInStock,
        imageLink: product.imageLink,
        category: product.category._id,
        tags: product.tags,
      });
    }
  }, [product, reset]);

  const handleEditProduct = async (formData) => {
    try {
      const { message } = await mutateAsync({ id, formData });
      toast.success(message);
      router.push("/admin/products");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در هنگام ویرایش اطلاعات !"
      );
    }
  };

  if (isLoadingProductData) return <Loading />;
  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(handleEditProduct)}
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
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary">
              ویرایش محصول
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default page;
