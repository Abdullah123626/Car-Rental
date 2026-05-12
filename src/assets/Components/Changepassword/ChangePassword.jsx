import React, { useState } from "react";
import blackcar from "../../images/blackcar.png";
import eye from "../../images/eye.png";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/.test(password)
    ) {
      newErrors.password =
        "Min 6 chars, 1 uppercase, 1 number, 1 special character";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    navigate("/UserSelection");
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
              Change Password
            </h3>
          </div>
        </div>

        {/* Right White Section */}
        <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-xl flex flex-col items-center">

            <h2 className="text-3xl sm:text-4xl font-[700] text-[#333333] mb-8 text-center">
              Change Password
            </h2>

            {/* Password Row */}
            <div className="flex flex-col md:flex-row gap-6 w-full mb-10">

              {/* Password */}
              <div className="flex flex-col relative w-full">
                <label className="mb-2 font-[500] text-[#2D2D2D] text-xs">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <img
                  src={eye}
                  alt=""
                  className="w-4 h-4 absolute right-3 top-[65%] -translate-y-1/2 pointer-events-none"
                />

                {errors.password && (
                  <p className="text-[#FF5C00] text-[13px] font-[500] mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col relative w-full">
                <label className="mb-2 font-[500] text-[#2D2D2D] text-xs">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="**********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <img
                  src={eye}
                  alt=""
                  className="w-4 h-4 absolute right-3 top-[65%] -translate-y-1/2 pointer-events-none"
                />

                {errors.confirmPassword && (
                  <p className="text-[#FF5C00] text-[13px] font-[500] mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

            </div>

            {/* Button */}
            <div className="flex justify-center w-full">
              <button
                className="bg-[#FF6915] text-white rounded-sm hover:bg-orange-600 transition w-full h-10"
                onClick={handleSubmit}
              >
                Update Password
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;