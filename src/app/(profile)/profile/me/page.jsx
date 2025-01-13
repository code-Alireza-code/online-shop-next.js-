"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import { includeObj } from "@/utils/objectUtils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function MePage() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};

  const includesKey = ["name", "email", "phoneNumber", "biography"];

  const { handleSubmit, register, reset } = useForm();
  useEffect(() => {
    if (user) {
      const defaultValues = includeObj(user, includesKey);
      reset(defaultValues);
    }
  }, [user, reset]);

  const handleFormChange = (formData) => {
    console.log(formData);
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
        <button type="submit" className="border border-purple-600">
          submnit
        </button>
      </form>
    </div>
  );
}

export default MePage;
