"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useAddCoupon } from "@/hooks/useCoupon";
import { useGetProducts } from "@/hooks/useProducts";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import DatePicker from "react-multi-date-picker";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";

const couponFormData = [
  {
    id: 1,
    name: "code",
    label: "کد",
    isNumber: false,
  },
  {
    id: 2,
    name: "amount",
    label: "مقدار تخفیف",
    isNumber: true,
  },
  {
    id: 3,
    name: "usageLimit",
    label: "ظرفیت",
    isNumber: true,
  },
];

function page() {
  const { data } = useGetProducts();
  const { products } = data || {};
  const { mutateAsync, isPending } = useAddCoupon();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const handleAddCoupon = async (formData) => {
    try {
      const { message } = await mutateAsync(formData);
      toast.success(message);
      reset();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا هنگام افزودن کد تخفیف"
      );
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleAddCoupon)}
        className="max-w-screen-sm p-3 mr-4 flex flex-col gap-y-6"
      >
        {couponFormData.map((coupon) => (
          <div key={coupon.id}>
            <TextField
              label={coupon.label}
              name={coupon.name}
              type={coupon.isNumber ? "number" : "text"}
              {...register(coupon.name, { required: true })}
            />
            {errors[coupon.name] && (
              <span className="text-error text-xs">
                {coupon.label} اجباری است !
              </span>
            )}
          </div>
        ))}
        <div>
          <label className="block mb-2">نوع کد تخفیف</label>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <input
                type="radio"
                id="percent"
                name="discount-type"
                value="percent"
                {...register("type")}
              />
              <label htmlFor="percent">درصد</label>
            </div>
            <div className="flex items-center gap-x-2">
              <input
                type="radio"
                id="money"
                name="discount-type"
                value="fixedProduct"
                {...register("type", { required: true })}
              />
              <label htmlFor="money">قیمت ثابت</label>
            </div>
          </div>
          {errors.type && (
            <span className="block text-error text-xs">
              نوع کد تخفیف اجباری است !
            </span>
          )}
        </div>
        <div>
          {/* react-select package has a hydration error bug and can not be used until the bug fixes! */}
        </div>
        <div>
          <Controller
            name="expireDate"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, name, value } }) => (
              <>
                <DatePicker
                  value={value || new Date()}
                  onChange={(date) =>
                    onChange(date.isValid ? new Date(date).toISOString() : "")
                  }
                  locale={persian_fa}
                  calendar={persian}
                  calendarPosition="left"
                  style={{
                    padding: "1.5rem 2rem",
                    borderRadius: "0.75rem",
                    backgroundColor: "#f3f4f6",
                    outline: "none",
                    border: "none",
                  }}
                />
                {errors[name] && (
                  <span className="block text-error text-xs">
                    تعیین تاریخ انقضا اجباری است !
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div>
          {isPending ? (
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

export default page;
