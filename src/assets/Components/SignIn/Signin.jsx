import React, { useState } from "react";
import blackcar from "../../images/blackcar.png";
import emailIcon from "../../images/email.png";
import eye from "../../images/eye.png";
import whitecar from "../../images/whitecar.png";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import serverRequestHandler from "../../Utils/http.Js";
import { toast } from "react-toastify";

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const response = await serverRequestHandler(ENDPOINTS.login, "post", {
        email: formData.username.trim(),
        password: formData.password.trim(),
      });
      localStorage.setItem("Token", response.token);
      toast.success("Login successful!");
      navigate("/UserSelection", { replace: true });
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col lg:flex-row min-h-screen">

        <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <img src={blackcar} className="w-3/4 sm:w-3/5 md:w-2/5 md:pb-44" alt="car" />
            <img src={whitecar} className="w-3/4 sm:w-3/5 md:w-3/5" alt="car" />
          </div>
          <div className="text-center mt-8">
            <h3 className="text-2xl font-[600] mb-2 text-white">Welcome Back</h3>
            <p className="text-white">Sign in to continue your journey</p>
          </div>
        </div>

        <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <p className="text-black text-3xl sm:text-4xl font-[400] mb-8">Sign In</p>

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="relative mb-4">
                <input
                  name="username"
                  type="email"
                  placeholder="Email"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="off"
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 w-full h-11"
                />
                <img src={emailIcon} className="w-4 h-4 absolute right-3 top-3" alt="" />
              </div>

              {/* PASSWORD */}
              <div className="relative mb-4">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-11"
                />
                <img
                  src={eye}
                  className="w-4 h-4 absolute right-3 top-3 cursor-pointer"
                  alt=""
                  onClick={() => setShowPassword((p) => !p)}
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <button type="submit" disabled={loading} className="bg-[#FF6915] text-white w-full h-10 rounded-md disabled:opacity-60">
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <button type="button" onClick={() => navigate("/Signup")} className="bg-black text-white w-full h-10 rounded-md mt-4">
                Create Account
              </button>

              <p onClick={() => navigate("/ResetPassword")} className="text-center text-sm text-[#FF6915] mt-4 cursor-pointer hover:underline">
                Forgot Password?
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signin;
