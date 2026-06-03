import React, { useState } from "react";
import blackcar from "../../images/blackcar.png";
import emailIcon from "../../images/email.png";
import { useNavigate } from "react-router-dom";
import serverRequestHandler from "../../Utils/http.Js";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [emailValue, setEmailValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= VALIDATION =================
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

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await serverRequestHandler(
        ENDPOINTS.forgotpassword, // "/auth/forgot"
        "post",
        {
          email: emailValue.trim(),
        }
      );

      console.log("FORGOT PASSWORD RESPONSE:", response);

      toast.success(response?.message || "OTP sent to email");

      // 👉 IMPORTANT: email pass to OTP screen
      navigate("/Mailverify", {
  state: {
    email: emailValue,
    type: "reset",
  },
});

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">

      {/* LEFT */}
      <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
        <img src={blackcar} className="w-3/4 sm:w-3/5" />
        <h3 className="text-white text-3xl font-semibold mt-6">
          Reset Password
        </h3>
      </div>

      {/* RIGHT */}
      <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <h2 className="text-2xl font-bold mb-6 text-center">
            Enter email for reset password
          </h2>

          {/* EMAIL INPUT */}
          <div className="relative mb-3">

            <input
              type="email"
              value={emailValue}
              onChange={(e) => {
                setEmailValue(e.target.value);
                setError("");
              }}
              placeholder="Enter your email"
              className="w-full h-11 px-3 pr-10 border rounded-md bg-gray-100 focus:ring-2 focus:ring-orange-500"
            />

            <img
              src={emailIcon}
              className="w-4 h-4 absolute right-3 top-3"
              alt=""
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-3">
              {error}
            </p>
          )}

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-11 bg-[#FF6915] text-white rounded-md disabled:opacity-60"
          >
            {loading ? "Sending..." : "Continue"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;