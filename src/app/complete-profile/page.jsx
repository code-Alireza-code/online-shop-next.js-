"use client";

import TextField from "@/common/TextField";
import { completeProfile } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function CompleteProfilePage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending, data, error } = useMutation({
    mutationFn: completeProfile,
  });
  console.log({ data, error });

  const handleCompleteProfile = async (formData, e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateAsync(formData);
      toast.success(message);
      router.push("/");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در هنگام تایید اطلاعات"
      );
    }
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
            disabled={isPending}
            className={`btn btn--primary w-full ${
              isPending && "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isPending ? "در حال ارسال اطلاعات" : "تایید اطلاعات"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfilePage;
