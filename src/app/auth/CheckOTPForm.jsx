import OTPInput from "react-otp-input";

function CheckOTPForm({ onSubmit, otp, setOtp, onBack, time, onResendOTP }) {
  return (
    <div>
      <button onClick={onBack} className="w-8 h-8">
        &rarr;
      </button>
      <form className="space-y-10" onSubmit={onSubmit}>
        <p>کد تایید را وارد کنید</p>
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
        <button type="submit" className="btn btn--primary w-full">
          تایید
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
