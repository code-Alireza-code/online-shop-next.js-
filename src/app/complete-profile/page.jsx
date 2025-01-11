"use client";

import TextField from "@/common/TextField";
import { useForm } from "react-hook-form";

function CompleteProfilePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm();

  const handleCompleteProfile = (formData, e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(handleCompleteProfile)}
        >
          <TextField
            label="نام و نام خانوادگی"
            name="نام و نام خانوادگی"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500 text-xs">
              نام و نام خانوادگی الزامیست
            </span>
          )}
          <TextField
            label="ایمیل"
            name="ایمیل"
            dir="ltr"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-xs">ایمیل الزامیست </span>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`btn btn--primary w-full ${
              isLoading && "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? "در حال ارسال اطلاعات" : "تایید اطلاعات"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfilePage;
