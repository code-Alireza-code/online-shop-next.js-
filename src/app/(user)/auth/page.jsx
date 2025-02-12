"use client";

import { useEffect, useState } from "react";
import SendOTPForm from "./SendOTPForm";
import http from "@/services/httpService";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkotpApi, getOtpApi } from "@/services/authService";
import CheckOTPForm from "./CheckOTPForm";
import { useRouter } from "next/navigation";
import toEnglishDigits from "@/utils/toEnglishDigits";
const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [time, setTime] = useState(RESEND_TIME);
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    isPending: isSendingOtp,
    mutateAsync: mutateSendOtp,
    data: otpResponse,
  } = useMutation({
    mutationFn: getOtpApi,
  });

  const { isPending: isCheckingOtp, mutateAsync: mutatecheckOtp } = useMutation(
    {
      mutationFn: checkotpApi,
    }
  );

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!phoneNumber || phoneNumber.length !== 11) {
      toast.error("شماره به درستی وارد نشده است");
      return;
    }
    try {
      const data = await mutateSendOtp({
        phoneNumber: toEnglishDigits(phoneNumber),
      });
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      toast.error(
        error?.response?.data?.message | "خطا درهنگام ارسال کد اعتبارسنجی"
      );
    }
  };

  const handleCheckOTP = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutatecheckOtp({ phoneNumber, otp });
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message | "کد تایید اشتباه است");
    }
  };

  useEffect(() => {
    if (step !== 2) return;
    const timer =
      time > 0 &&
      setInterval(() => {
        setTime((t) => t - 1);
      }, 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time, step]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            phoneNumber={phoneNumber}
            onChange={handlePhoneNumber}
            onSubmit={handleSendOTP}
            isSendingOtp={isSendingOtp}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep(1)}
            otp={otp}
            setOtp={setOtp}
            onSubmit={handleCheckOTP}
            time={time}
            onResendOTP={handleSendOTP}
            otpResponse={otpResponse}
            isCheckingOtp={isCheckingOtp}
          />
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
