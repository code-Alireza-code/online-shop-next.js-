import OTPInput from "react-otp-input";
import { HiArrowNarrowRight } from "react-icons/hi";
import { CiEdit } from "react-icons/ci";

function CheckOTPForm({
  onSubmit,
  otp,
  setOtp,
  onBack,
  time,
  onResendOTP,
  otpResponse,
  isCheckingOtp,
}) {
  return (
    <div>
      <button onClick={onBack} className="mb4">
        <HiArrowNarrowRight className="w-6 h-6 text-secondary-500" />
      </button>
      {otpResponse && (
        <div className="space-y-1 ">
          <p>{otpResponse?.message}</p>
          شماره موبایل اشتباه است؟
          <button onClick={onBack} className="underline text-primary-900">
            ویرایش
            <CiEdit className="inline-block w-6 h-6" />
          </button>
        </div>
      )}
      <form className="space-y-5" onSubmit={onSubmit}>
        <p className="mt-10">کد تایید را وارد کنید</p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "3rem",
            height: "3.5rem",
            padding: "0.5rem 0.2rem",
            border: "1px solid rgb(var(--color-primary-300))",
            borderRadius: "0.5rem",
            direction: "ltr",
          }}
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            columnGap: "0.5rem",
            direction: "ltr",
          }}
        />
        <div>
          {time > 0 ? (
            <p>{time} ثانیه تا ارسال مجدد کد</p>
          ) : (
            <button
              onClick={onResendOTP}
              className="text-primary-800 underline"
            >
              ارسال مجدد کد
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isCheckingOtp}
          className={`btn btn--primary w-full ${
            isCheckingOtp ? "bg-gray-400 hover:bg-gray-400" : ""
          }`}
        >
          {isCheckingOtp ? "درحال بررسی کد تایید" : "تایید"}
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
