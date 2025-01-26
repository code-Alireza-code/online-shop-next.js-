"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useAddCategory } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
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

function AddCategoryPage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useAddCategory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddCategory = async (formData) => {
    try {
      const { message } = await mutateAsync(formData);
      toast.success(message);
      router.push("/admin/categories");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا هنگام افزودن دسته بندی"
      );
    }
  };

  return (
    <div>
      <form
        noValidate
        onSubmit={handleSubmit(handleAddCategory)}
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
            {...register("type", { required: true })}
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
              اضافه کردن دسته بندی
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddCategoryPage;
