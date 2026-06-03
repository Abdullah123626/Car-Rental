import React, { useState } from "react";
import blackcar from "../../images/blackcar.png";
import eye from "../../images/eye.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import serverRequestHandler from "../../Utils/http.Js";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state?.token;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/.test(password)) {
      newErrors.password = "Min 6 chars, 1 uppercase, 1 number, 1 special character";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlesubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      await serverRequestHandler(ENDPOINTS.resetpassword, "post", {
        token: token,
        newPassword: password,
      });
      toast.success("Password updated successfully!");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col lg:flex-row min-h-screen">

        <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
          <img src={blackcar} alt="Car" className="w-3/4 sm:w-3/5" />
          <div className="text-center mt-8">
            <h3 className="text-3xl sm:text-4xl font-[600] text-white">Change Password</h3>
          </div>
        </div>

        <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-xl flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl font-[700] text-[#333333] mb-8 text-center">Change Password</h2>

            <div className="flex flex-col md:flex-row gap-6 w-full mb-10">

              {/* PASSWORD */}
              <div className="flex flex-col relative w-full">
                <label className="mb-2 font-[500] text-[#2D2D2D] text-xs">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <img
                  src={eye} alt=""
                  onClick={() => setShowPassword((p) => !p)}
                  className="w-4 h-4 absolute right-3 top-[65%] -translate-y-1/2 cursor-pointer"
                />
                {errors.password && <p className="text-[#FF5C00] text-[13px] font-[500] mt-1">{errors.password}</p>}
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="flex flex-col relative w-full">
                <label className="mb-2 font-[500] text-[#2D2D2D] text-xs">Confirm Password</label>
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="**********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <img
                  src={eye} alt=""
                  onClick={() => setShowConfirm((p) => !p)}
                  className="w-4 h-4 absolute right-3 top-[65%] -translate-y-1/2 cursor-pointer"
                />
                {errors.confirmPassword && <p className="text-[#FF5C00] text-[13px] font-[500] mt-1">{errors.confirmPassword}</p>}
              </div>

            </div>

            <div className="flex justify-center w-full">
              <button onClick={handlesubmit} disabled={loading} className="bg-[#FF6915] text-white rounded-sm w-full h-10 disabled:opacity-50">
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;
