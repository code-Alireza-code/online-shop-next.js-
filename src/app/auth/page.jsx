"use client";

import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import http from "@/services/httpService";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { checkotpApi, getOtpApi } from "@/services/authService";
import CheckOTPForm from "./CheckOTPForm";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(2);

  const { isPending: isSending, mutateAsync: mutateSendOtp } = useMutation({
    mutationFn: getOtpApi,
  });

  const { isPending: isChecking, mutateAsync: mutatecheckOtp } = useMutation({
    mutationFn: checkotpApi,
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
      const data = await mutateSendOtp({ phoneNumber });
      toast.success(data.message);
      setStep(2);
    } catch (error) {
      toast.error(
        error?.response?.data?.message | "خطا درهنگام ارسال کد اعتبارسنجی"
      );
    }
  };

  const handleCheckOTP = async (e) => {
    e.preventDefault();
    try {
      const data = await mutatecheckOtp({ phoneNumber, otp });
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message | "کد تایید اشتباه است");
    }
  };

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={handlePhoneNumber}
            onSubmit={handleSendOTP}
            isLoading={isSending}
          />
        );
      case 2:
        return (
          <CheckOTPForm otp={otp} setOtp={setOtp} onSubmit={handleCheckOTP} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">{renderSteps()}</div>
    </div>
  );
}

export default AuthPage;
