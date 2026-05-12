import React, { useRef } from "react";
import blackcar from "../../images/blackcar.png";
import { useNavigate } from "react-router-dom";

const Mailverification = () => {
  const navigate = useNavigate();
  const inputsRef = useRef([]);

const handleChange = (e, index) => {
  const value = e.target.value;

  if (!/^[0-9]?$/.test(value)) return;

  // set value
  e.target.value = value;

  // move to next input immediately after DOM update
  if (value) {
    const nextInput = inputsRef.current[index + 1];
    if (nextInput) {
      setTimeout(() => {
        nextInput.focus();
      }, 0);
    }
  }
};
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
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
              Mail Verification
            </h3>
          </div>
        </div>

        {/* Right White Section */}
        <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md text-center">

            <p className="text-black text-3xl sm:text-4xl font-[600] mb-6">
              Check Your Email
            </p>

            <h2 className="text-xl sm:text-2xl font-[600] text-[#333333] mb-3">
              Verification Code
            </h2>

            <p className="text-gray-600 text-xs">
              Lorem ipsum dolor sit amet, consectetuer
            </p>
            <p className="text-gray-600 text-xs mb-6">
              adipiscing elit, sed diam nonummy nibh.
            </p>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 sm:gap-4 mt-6">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg sm:text-xl border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs text-[#333333]">
                Didn’t receive code?
              </p>
              <p className="text-[#FF6915] text-xs cursor-pointer">
                Resend code
              </p>
            </div>

            {/* Verify Button */}
            <div className="flex justify-center mt-8">
              <button className="bg-[#FF6915] text-white rounded-sm hover:bg-orange-600 transition w-full h-10 cursor-pointer">
                Verify
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Mailverification;