import TextField from "@/common/TextField";

function SendOTPForm({ phoneNumber, onChange }) {
  return (
    <div>
      <form className="space-y-10">
        <TextField
          label="شماره موبایل"
          name="phoneNumber"
          type="tel"
          value={phoneNumber}
          onChange={onChange}
        />
        <button type="submit" className="btn btn--primary w-full">
          ارسال کد تایید
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
