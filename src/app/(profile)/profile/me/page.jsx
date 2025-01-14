"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import { updateUserProfileApi } from "@/services/authService";
import { includeObj } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function MePage() {
  const { data, isLoading } = useGetUser();
  const { isPending: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateUserProfileApi,
  });
  const { user } = data || {};

  const includesKey = ["name", "email", "phoneNumber", "biography"];

  const { handleSubmit, register, reset } = useForm();
  useEffect(() => {
    if (user) {
      const defaultValues = includeObj(user, includesKey);
      reset(defaultValues);
    }
  }, [user, reset]);

  const handleFormChange = async (formData) => {
    try {
      const { message } = await mutateAsync(formData);
      toast.success(message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در هنگام به روزرسانی اطلاعات"
      );
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="max-w-sm">
      <h1 className="mb-8">اطلاعات کاربری</h1>
      <form className="space-y-8" onSubmit={handleSubmit(handleFormChange)}>
        {user &&
          Object.keys(includeObj(user, includesKey)).map((key) => {
            return (
              <TextField key={key} label={key} name={key} {...register(key)} />
            );
          })}
        <button
          type="submit"
          disabled={isUpdating}
          className={`btn btn--primary w-full ${
            isUpdating ? "bg-gray-400 hover:bg-gray-400" : ""
          }`}
        >
          {isUpdating ? <Loading margin="m-1" /> : "به روزرسانی"}
        </button>
      </form>
    </div>
  );
}

export default MePage;
