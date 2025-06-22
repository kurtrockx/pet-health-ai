export default function ForgotPage() {
  return (
    <div className="flex flex-col justify-between items-center gap-4 ">
      <h1 className="font-bold">Forgot Password?</h1>
      <div>
        <h4 className="text-[#cccc] text-[10px] text-center gap-1">
          We'll email you a secure link to reset your password,
        </h4>
        <h4 className="text-[#cccc] text-[10px] text-center gap-1">
          we've noticed you may be having trouble accessing your account.
        </h4>
      </div>
      <div className="bg-[#f0f9ff] text-black w-sm flex flex-col gap-2 py-4 px-2 rounded-lg">
        <label className="text-center text-[10px]">
          Enter your E-mail Address:
        </label>
        <div className="w-full flex justify-center">
          <input type="text" className="border max-w-[90%]" />
        </div>
        <div className="flex justify-center gap-0.5">
          <div className="text-[10px] w-32 text-center py-2 rounded-sm bg-[#c4c4c4]">
            Cancel
          </div>
          <div className="text-[10px] w-32 text-center py-2 rounded-sm bg-[#64d1b0]">
            Send Request E-mail
          </div>
        </div>
      </div>
    </div>
  );
}
