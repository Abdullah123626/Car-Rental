import React, { useState } from "react";
import blackcar from "../../images/blackcar.png";
import emailImg from "../../images/email.png";
import eye from "../../images/eye.png";
import whitecar from "../../images/whitecar.png";
import { useNavigate } from "react-router-dom";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import serverRequestHandler from "../../Utils/http.Js";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  // const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirm, setShowConfirm] = useState(false);
  // const [error, setError] = useState("");       
  // const [loading, setLoading] = useState(false);  
  const [form, setForm] = useState({ 
    firstName: "", 
    lastName: "", 
    email: "", 
    password: "",
    confirmPassword: ""
  }); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  //   setError("");
  // };

  const validate = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword)
      return "Please fill all fields"; 
    if (!form.email.includes("@")) return "Enter valid email";
    if (form.password.length < 8) return "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    return null;
  };

  // const validate = () => {
  //   if (
  //     !form.firstName ||
  //     !form.lastName ||
  //     !form.email ||
  //     !form.password ||
  //     !form.confirmPassword
  //   )
  //     return "please fill all fields";
  //   if (!form.email.includes("@")) return "enter valid email";
  //   if (form.password.length < 8)
  //     return "password must be atleast 8 characters";
  //   if (form.password !== form.confirmPassword);
  //   return "passwords dont not match";
  //   return null;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const validationError = validate();
  //   if (validationError) { setError(validationError); return; }
  //   setLoading(true);
  //   try {
  //     await serverRequestHandler(ENDPOINTS.registeration, "post", {
  //       firstName: form.firstName,
  //       lastName: form.lastName,
  //       email: form.email.trim().toLowerCase(),
  //       password: form.password,
  //       phoneNumber: "1234567890",
  //     });
  //     toast.success("Registration successful! Please verify your email.");
  //     navigate("/Mailverify", { state: { email: form.email, type: "signup" } });
  //   } catch (err) {
  //     toast.error(err?.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);

    try {
      await serverRequestHandler(ENDPOINTS.registeration, "post", {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email.trim().toLowerCase(),
        password: form.password,
        phoneNumber: "1234567890",
      });
      toast.success("Registration Successful! Please verify your email");
      navigate("/Mailverify", {
        state: {
          email: form.email,
          type: "signup",
        },
      });
    } catch (error) {
      toast.error(error?.message || "something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <img
              src={blackcar}
              className="w-3/4 sm:w-3/5 md:w-2/5 md:pb-44"
              alt="car"
            />
            <img src={whitecar} className="w-3/4 sm:w-3/5 md:w-3/5" alt="car" />
          </div>
          <div className="text-center mt-8">
            <h3 className="text-2xl font-[600] mb-2 text-white">
              Welcome Aboard
            </h3>
            <p className="text-white">Just a showroom of clicks and we start</p>
          </div>
        </div>

        <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">
            <p className="text-black text-3xl sm:text-4xl font-[400] mb-8">
              Create Account
            </p>

            <form onSubmit={handleSubmit}>
              {/* NAME ROW */}
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 w-full h-10"
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 w-full h-10"
                />
              </div>

              {/* EMAIL */}
              <div className="relative mb-4">
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 w-full h-11"
                />
                <img
                  src={emailImg}
                  className="w-4 h-4 absolute right-3 top-3"
                  alt=""
                />
              </div>

              {/* PASSWORD ROW */}
              <div className="flex gap-6 mb-4">
                {/* PASSWORD */}
                <div className="relative w-full">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10"
                  />
                  <img
                    src={eye}
                    className="w-4 h-4 absolute right-3 top-3 cursor-pointer"
                    alt=""
                    onClick={() => setShowPassword((p) => !p)}
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="relative w-full">
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10"
                  />
                  <img
                    src={eye}
                    className="w-4 h-4 absolute right-3 top-3 cursor-pointer"
                    alt=""
                    onClick={() => setShowConfirm((p) => !p)}
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-[#FF6915] text-white w-full h-10 rounded-md disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
