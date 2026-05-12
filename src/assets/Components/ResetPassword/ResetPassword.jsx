import React, { useState } from "react";
import blackcar from "../../images/blackcar.png";
import email from "../../images/email.png";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [error, setError] = useState("");

  // ✅ VALIDATION
  const validate = () => {
    if (!emailValue.trim()) {
      setError("Email is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      setError("Enter a valid email");
      return false;
    }

    setError("");
    return true;
  };

  // ✅ SUBMIT
  const handleSubmit = () => {
    if (!validate()) return;

    navigate("/ChangePassword");
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Left Orange Section */}
        <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
          
          <img
            src={blackcar}
            alt="Car"
            className="w-3/4 sm:w-3/5"
          />

          <div className="text-center mt-8">
            <h3 className="text-3xl sm:text-4xl font-[600] text-white">
              Reset Password
            </h3>
          </div>
        </div>

        {/* Right White Section */}
        <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md flex flex-col items-center">

            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-[700] text-[#333333] mb-3">
                Enter mail for reset password
              </h2>

              <p className="text-gray-600 text-xs">
                Lorem ipsum dolor sit amet, consectetuer
              </p>
              <p className="text-gray-600 text-xs">
                adipiscing elit, sed diam nonummy nibh.
              </p>
            </div>

            {/* Email Input */}
            <div className="flex flex-col relative w-full mb-2">
              <label className="mb-2 text-black">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={emailValue}
                onChange={(e) => {
                  setEmailValue(e.target.value);
                  setError(""); // remove error while typing
                }}
                className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              <img
                src={email}
                alt=""
                className="w-4 h-4 absolute right-3 top-[65%] -translate-y-1/2 pointer-events-none"
              />
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-[#FF5C00] font-[500] text-[13px] mb-3 w-full">
                {error}
              </p>
            )}

            {/* Continue Button */}
            <div className="flex justify-center w-full">
              <button
                className="bg-[#FF6915] text-white rounded-sm hover:bg-orange-600 transition w-full h-10"
                onClick={handleSubmit}
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;