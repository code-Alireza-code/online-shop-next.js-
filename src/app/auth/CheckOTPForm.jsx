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
          renderInput={(props) => <input {...props} />}
          inputType="number"
        />
        <button type="submit" className="btn btn--primary w-full">
          تایید
        </button>
      </form>
    </div>
  );
}

export default CheckOTPForm;
