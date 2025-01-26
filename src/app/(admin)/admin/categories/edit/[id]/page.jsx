"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/useCategories";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const categoriesFormData = [
  {
    id: 1,
    label: "عنوان",
    name: "title",
  },
  {
    id: 2,
    label: "عنوان انگلیسی",
    name: "englishTitle",
  },
  {
    id: 3,
    label: "توضیحات",
    name: "description",
  },
];

const catergoryTypes = [
  {
    id: 1,
    label: "محصول",
    value: "product",
  },
  {
    id: 2,
    label: "پست",
    value: "post",
  },
  {
    id: 3,
    label: "تیکت",
    value: "ticket",
  },
  {
    id: 4,
    label: "نظرات",
    value: "comment",
  },
];

function EditCategoryPage() {
  const { id } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data, isLoading: isLoadingCategoryData } = useGetCategoryById(id);
  const { category } = data || {};

  useEffect(() => {
    if (category) {
      reset({
        title: category.title,
        description: category.description,
        englishTitle: category.englishTitle,
        type: category.type,
      });
    }
  }, [reset, category]);

  const { mutateAsync, isPending } = useUpdateCategory();

  const handleEditCategory = async (formData) => {
    try {
      const { message } = await mutateAsync({ id, formData });
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در هنگام ویرایش دسته بندی"
      );
    }
  };

  if (isLoadingCategoryData) return <Loading />;
  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(handleEditCategory)}
        className="max-w-screen-sm p-3 mr-4 flex flex-col gap-y-6"
      >
        {categoriesFormData.map((category) => (
          <div key={category.id}>
            <TextField
              label={category.label}
              name={category.name}
              {...register(category.name, { required: true })}
            />
            {errors[category.name] && (
              <span className="text-error text-xs">
                {category.label} اجباری است !
              </span>
            )}
          </div>
        ))}
        <div>
          <label className="block mb-2" htmlFor="type-select">
            نوع
          </label>
          <select
            className="textField__input"
            name="type"
            id="type-select"
            {...register("type")}
          >
            <option value="">یک دسته بندی انتخاب کنید</option>
            {catergoryTypes.map((categoryType) => (
              <option key={categoryType.id} value={categoryType.value}>
                {categoryType.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary">
              ویرایش دسته بندی
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EditCategoryPage;
