"use client";

import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import http from "@/services/httpService";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getOtpApi } from "@/services/authService";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { data, isPending, error, mutateAsync } = useMutation({
    mutationFn: getOtpApi,
  });

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.at(0) != 0 || phoneNumber.length !== 11) {
      toast.error("شماره به درستی وارد نشده است");
      return;
    }
    try {
      const data = await mutateAsync({ phoneNumber });
      toast.success(data.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message | "خطا درهنگام ارسال کد اعتبارسنجی"
      );
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <SendOTPForm
          phoneNumber={phoneNumber}
          onChange={handlePhoneNumber}
          onSubmit={handleSendOTP}
          isLoading={isPending}
        />
      </div>
    </div>
  );
}

export default AuthPage;
