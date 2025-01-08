"use client";

import { useState } from "react";
import SendOTPForm from "./SendOTPForm";

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  return (
    <div className="flex justify-center">
      <div className="w-full sm:max-w-sm">
        <SendOTPForm phoneNumber={phoneNumber} onChange={handlePhoneNumber} />
      </div>
    </div>
  );
}

export default AuthPage;
