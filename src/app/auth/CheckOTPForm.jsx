import OTPInput from "react-otp-input";

function CheckOTPForm({ onSubmit, otp, setOtp }) {
  return (
    <div>
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
        <button type="submit" className="btn btn--primary w-full">
          تایید
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
