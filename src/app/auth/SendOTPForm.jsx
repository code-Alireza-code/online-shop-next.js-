import TextField from "@/common/TextField";

function SendOTPForm({ phoneNumber, onChange, onSubmit, isLoading }) {
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
          disabled={isLoading}
          className={`btn btn--primary w-full ${
            isLoading ? "bg-gray-400 hover:bg-gray-400" : ""
          }`}
        >
          {isLoading ? "در حال ارسال..." : "ارسال کد تایید"}
        </button>
      </form>
    </div>
  );
}

export default SendOTPForm;
