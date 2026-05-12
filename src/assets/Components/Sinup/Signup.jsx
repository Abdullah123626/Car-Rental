import React, { useState } from "react";
import blackcar from "../../images/blackcar.png";
import email from "../../images/email.png";
import eye from "../../images/eye.png";
import whitecar from "../../images/whitecar.png";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../../Utils/httpRequests.Js";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email2, setEmail2] = useState("");
  const [password1, setPassword1] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  // ✅ FIRST NAME HANDLER
  const handleFirstNameChange = (e) => {
    let value = e.target.value;

    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFirstName(value);

    setErrors((prev) => ({
      ...prev,
      firstName: "",
    }));
  };

  // ✅ LAST NAME HANDLERn`
  const handleLastNameChange = (e) => {
    let value = e.target.value;

    if (value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setLastName(value);

    setErrors((prev) => ({
      ...prev,
      lastName: "",
    }));
  };

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Please fill this field";
    }

    if (!lastName.trim()) {
      newErrors.lastName = "Please fill this field";
    }

    if (!email2.trim()) {
      newErrors.email2 = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email2)
    ) {
      newErrors.email2 = "Enter valid email";
    }

    if (!password1) {
      newErrors.password1 = "Password required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password1)
    ) {
      newErrors.password1 =
        "Min 8 chars, 1 uppercase, 1 number, 1 special char";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password";
    } else if (password1 !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await postRequest(ENDPOINTS.SIGNUP, {
        firstName,
        lastName,
        email: email2,
        password: password1,
      });
      if (res) {
        navigate("/Mailverify");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const hasUpper = /[A-Z]/.test(password1);
  const hasSpecial = /[!@#$%^&*]/.test(password1);
  const hasNumber = /\d/.test(password1);
  const match = password1 && password1 === confirmPassword;

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* LEFT */}
        <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <img src={blackcar} className="w-3/4 sm:w-3/5 md:w-2/5 md:pb-44" />
            <img src={whitecar} className="w-3/4 sm:w-3/5 md:w-3/5" />
          </div>

          <div className="text-center mt-8">
            <h3 className="text-2xl font-[600] mb-2 text-white">
              Welcome Aboard
            </h3>
            <p className="text-white">
              Just a showroom of clicks and we start
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-2xl">

            <p className="text-black text-3xl sm:text-4xl font-[400] mb-8">
              Create Account
            </p>

            {/* FIRST ROW */}
            <div className="flex flex-col md:flex-row gap-6 mb-4">

              <div className="flex flex-col relative w-full">
                <label className="mb-2 text-black">First Name</label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.firstName && <p className="text-[#FF5C00] font-[500] text-[13px]">{errors.firstName}</p>}
              </div>

              <div className="flex flex-col relative w-full">
                <label className="mb-2 text-black">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.lastName && <p className="text-[#FF5C00] font-[500] text-[13px]">{errors.lastName}</p>}
              </div>

            </div>

            {/* EMAIL */}
            <div className="flex flex-col relative mb-4">
              <label className="mb-2 text-black">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email2}
                onChange={(e) => {
                  setEmail2(e.target.value);
                  setErrors((prev) => ({ ...prev, email2: "" }));
                }}
                className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-11 focus:outline-none focus:ring-2 focus:ring-[#FF6915]"
              />
              <img src={email} className="w-4 h-4 absolute right-3 top-[65%] -translate-y-1/2 pointer-events-none" />
              {errors.email2 && <p className="text-[#FF5C00] font-[500] text-[13px]">{errors.email2}</p>}
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col md:flex-row gap-6 mb-4">

              <div className="flex flex-col relative w-full">
                <label className="mb-2 text-black">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password1}
                  onChange={(e) => {
                    setPassword1(e.target.value);
                    setErrors((prev) => ({ ...prev, password1: "" }));
                  }}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <img src={eye} className="w-4 h-4 absolute right-3 top-[65%] -translate-y-1/2 pointer-events-none" />
                {errors.password1 && <p className="text-[#FF5C00] font-[500] text-[13px]">{errors.password1}</p>}
              </div>

              <div className="flex flex-col relative w-full">
                <label className="mb-2 text-black">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
                  }}
                  className="bg-[#F4F2F2] border border-gray-300 rounded-md px-3 pr-10 w-full h-10 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <img src={eye} className="w-4 h-4 absolute right-3 top-[65%] -translate-y-1/2 pointer-events-none" />
                {errors.confirmPassword && <p className="text-[#FF5C00] font-[500] text-[13px]">{errors.confirmPassword}</p>}
              </div>

            </div>

            {/* RULES */}
            <div className="space-y-2 mb-6 mt-10">
              <p className="text-sm text-[#FF6915]" >
                Contains at least one uppercase letter
              </p>
              <p className="text-[#2D2D2D]" >
                Contains at least one special character
              </p>
              <p className="text-sm text-[#2D2D2D]" >
                Contains at least one number
              </p>
              <p className="text-sm text-[#2D2D2D]" >
                Passwords are matching
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#FF6915] text-white font-medium rounded-md hover:bg-orange-600 transition w-full h-10 disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Sign Up"}
              </button>
            </div>

            <p className="text-center mt-4 text-[#312E81CC] text-sm">
              Already a member?{" "}
              <span
                className="text-[#FF6915] font-medium cursor-pointer"
                onClick={() => navigate("/")}
              >
                Sign In
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;