import React, { useRef, useState } from "react";
import blackcar from "../../images/blackcar.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import serverRequestHandler from "../../Utils/http.Js";
import { toast } from "react-toastify";

const Mailverification = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const location = useLocation();
  const email = location.state?.email;
  const type = location.state?.type;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // ================= OTP CHANGE =================
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move next
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // ================= BACKSPACE =================
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      const token = otp.join("");

      if (token.length !== 6) {
        toast.error("Please enter complete OTP");
        return;
      }

      const endpoint = type === "reset" ? ENDPOINTS.verifyreset : ENDPOINTS.verify;

      const response = await serverRequestHandler(endpoint, "post", { token });

      toast.success("Email Verified Successfully");

      if (type === "signup") {
        navigate("/UserSelection", { replace: true });
      }

      if (type === "reset") {
        navigate("/ChangePassword", {
          state: { token: response?.token || token },
        });
      }
    } catch (error) {
      toast.error(error?.message || "Verification failed");
    }
  };

  // ================= RESEND OTP =================
  const resendOtp = async () => {
    try {
      const response = await serverRequestHandler(
        ENDPOINTS.resendOTP,
        "post",
        {
          email: email,
          subject: "Resent OTP",
        }
      );

      console.log(response);

      toast.success("OTP Resent Successfully");

    } catch (error) {
      toast.error(error.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">

      {/* LEFT SIDE */}
      <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
        <img src={blackcar} className="w-3/4 sm:w-3/5" />

        <h3 className="text-3xl sm:text-4xl font-semibold text-white mt-8">
          Mail Verification
        </h3>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md text-center">

          <h2 className="text-3xl font-bold mb-6">
            Check Your Email
          </h2>

          <p className="text-gray-500 text-sm mb-6">
            Enter the 6 digit code sent to your email
          </p>

          {/* OTP BOXES */}
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-10 h-10 text-center border rounded-lg text-lg"
              />
            ))}
          </div>

          {/* RESEND */}
          <p className="text-sm text-gray-500 mb-4">
            Didn’t receive code?
          </p>

          <p
            onClick={resendOtp}
            className="text-[#FF6915] text-sm cursor-pointer mb-6"
          >
            Resend OTP
          </p>

          {/* VERIFY BUTTON */}
          <button
            onClick={verifyOtp}
            className="bg-[#FF6915] text-white w-full h-10 rounded-md"
          >
            Verify
          </button>

        </div>
      </div>
    </div>
  );
};

export default Mailverification;