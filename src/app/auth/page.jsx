"use client";

import { useState } from "react";
import SendOTPForm from "./SendOTPForm";
import http from "@/services/httpService";
import toast from "react-hot-toast";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await http.post("/user/get-otp", { phoneNumber });
      toast.success(data.data.message);
    } catch (error) {
      toast.error(
        error.response.data.message | "خطا درهنگام ارسال کد اعتبارسنجی"
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
        />
      </div>
    </div>
  );
}

export default AuthPage;
