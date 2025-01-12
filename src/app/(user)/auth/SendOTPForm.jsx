import TextField from "@/common/TextField";

function SendOTPForm({ phoneNumber, onChange, onSubmit, isSendingOtp }) {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={onChange}
        />
        <button
          type="submit"
          disabled={isSendingOtp}
          className={`btn btn--primary w-full ${
            isSendingOtp ? "bg-gray-400 hover:bg-gray-400" : ""
          }`}
        >
          {isSendingOtp ? "در حال ارسال..." : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
