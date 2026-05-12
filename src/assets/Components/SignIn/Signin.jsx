import React, { useState } from "react";
import blackcar from "../../images/blackcar.png";
import emailIcon from "../../images/email.png";
import eye from "../../images/eye.png";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};






   if (!email.trim()) {
  newErrors.email = "Email is required";
} 
else if (
  !/^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/.test(email)
) {
  newErrors.email = "Enter valid email (gmail, yahoo, or outlook only)";
}








if (!password) {
  newErrors.password = "Password is required";
} 
else if (password.length < 8) {
  newErrors.password = "Password must be at least 8 characters long";
} 
else if (!/[A-Z]/.test(password)) {
  newErrors.password = "Password must include at least one uppercase letter";
} 
else if (!/[a-z]/.test(password)) {
  newErrors.password = "Password must include at least one lowercase letter";
} 
else if (!/[0-9]/.test(password)) {
  newErrors.password = "Password must include at least one number";
} 
else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
  newErrors.password = "Password must include at least one special character";
} 
else if (/\s/.test(password)) {
  newErrors.password = "Password must not contain spaces";
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ SUBMIT
  const handleSubmit = () => {
    if (!validate()) return;

    console.log("Login Data:", { email, password });
    alert("Login Successful ✅");
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">

      {/* LEFT SECTION */}
      <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-10 sm:py-12 lg:p-12">

        <img
          src={blackcar}
          alt="Car"
          className="w-[70%] sm:w-[60%] md:w-[55%] lg:w-[75%] max-w-[400px] mb-6"
        />

        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-white">
            Welcome
          </h3>

          <p className="text-sm sm:text-base text-white">
            Just a Showroom of clicks and we start
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-10 sm:py-12 lg:p-8">

        <div className="w-full max-w-md">

          <p className="text-black text-2xl sm:text-3xl md:text-4xl font-normal mb-8 text-center lg:text-left">
            Sign In
          </p>

          {/* EMAIL */}
          <div className="flex flex-col mb-4 relative w-full">
            <label className="mb-2 text-black text-sm sm:text-base">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 sm:h-11 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <img
              src={emailIcon}
              alt=""
              className="w-4 h-4 absolute right-3 top-[55%] transform -translate-y-1/2 pointer-events-none"
            />

            {errors.email && (
              <p className="text-[#FF6915] font-[500] text-[13px] mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="flex flex-col mb-4 relative w-full">
            <label className="mb-2 text-black text-sm sm:text-base">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 sm:h-11 text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <img
              src={eye}
              alt=""
              className="w-4 h-4 absolute right-3 top-[57%] transform -translate-y-1/2 pointer-events-none"
            />

            {errors.password && (
              <p className="text-[#FF6915] font-[500] text-[13px] mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* FORGOT PASSWORD */}
          <div className="text-right mb-6">
            <h3
              className="text-[#FF6915] underline underline-offset-2 decoration-2 cursor-pointer text-sm"
              onClick={() => navigate("/ResetPassword")}
            >
              Forgotten password
            </h3>
          </div>

          {/* BUTTON */}
          <div className="flex justify-center">
            <button
              className="bg-[#FF6915] text-white font-medium rounded-md hover:bg-orange-600 transition w-full h-10 sm:h-11"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>

          {/* SIGNUP */}
          <p className="text-center mt-4 text-sm sm:text-base">
            Don’t have an account?{" "}
            <span
              className="text-[#FF6915] font-medium cursor-pointer"
              onClick={() => navigate("/Signup")}
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Signin;