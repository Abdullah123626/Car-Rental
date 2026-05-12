import React, { useState } from "react";
import Header from "../Header/Header";
import { PiHouseFill } from "react-icons/pi";
import { FaCar } from "react-icons/fa";
import { AiFillSignal } from "react-icons/ai";
import { BiSolidMessageAlt } from "react-icons/bi";
import { SlCalender } from "react-icons/sl";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

import sportscar from "../../images/sporgtcar.png";
import sportscar2 from "../../images/sportscar2.png";
import blackinterior from "../../images/blackinterior.png";
import redinteriorcar from "../../images/redinteriorcar.png";
import ammar from "../../images/ammar.png";

import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Detail = () => {
  const navigate = useNavigate();

  // MOBILE SIDEBAR
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    cnic: "",
    granteeName: "",
    granteeCnic: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    // NAME
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    // PHONE
    const phone = String(form.phone).replace(/\D/g, "");

    if (!phone) {
      newErrors.phone = "Phone is required";
    } else if (phone.length < 10 || phone.length > 15) {
      newErrors.phone = "Invalid phone number";
    }

    // USER CNIC
    const userCnic = String(form.cnic).replace(/\D/g, "");

    if (!userCnic) {
      newErrors.cnic = "CNIC is required";
    } else if (userCnic.length !== 13) {
      newErrors.cnic = "CNIC must be 13 digits";
    }

    // GRANTEE NAME
    if (!form.granteeName.trim()) {
      newErrors.granteeName = "Graneetier name is required";
    }

    // GRANTEE CNIC
    const granteeCnic = String(form.granteeCnic).replace(/\D/g, "");

    if (!granteeCnic) {
      newErrors.granteeCnic = "Grantee CNIC is required";
    } else if (granteeCnic.length !== 13) {
      newErrors.granteeCnic = "CNIC must be 13 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    navigate("/NavBAr");
  };

  return (
    <div>
      <Header />

      {/* MOBILE TOP BAR ONLY */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
        <button onClick={() => setSidebarOpen(true)}>
          <HiOutlineMenuAlt3 className="text-3xl text-black" />
        </button>

        <h2 className="font-semibold text-[18px]">Menu</h2>

        <div></div>
      </div>

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 mt-4">

        {/* SIDEBAR */}
        <div
          className={`
            w-[260px] bg-gray-100 flex flex-col justify-between py-6

            fixed lg:static top-0 left-0 h-screen lg:h-auto z-50
            transition-transform duration-300

            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >

          {/* CLOSE BUTTON MOBILE */}
          <div className="lg:hidden flex justify-end px-4 mb-4">
            <button onClick={() => setSidebarOpen(false)}>
              <IoClose className="text-3xl text-black" />
            </button>
          </div>

          <div>
            <h2 className="text-[10px] px-5 mb-6">Main Menu</h2>

            <div className="flex flex-col gap-2 px-3">

              <div className="flex items-center space-x-2 bg-[#FF5C00] px-4 py-2 rounded-md text-white">
                <PiHouseFill className="w-4 h-4" />
                <h2 className="text-sm font-medium">Home</h2>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2">
                <FaCar className="w-4 h-4" />
                <h2 className="text-[13px] font-[500]">Car Rent</h2>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2">
                <AiFillSignal className="w-4 h-4" />
                <h2 className="text-[13px] font-[500]">Insight</h2>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2">
                <BiSolidMessageAlt className="w-4 h-4" />
                <h2 className="text-[13px] font-[500]">Inbox</h2>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2">
                <SlCalender className="w-4 h-4" />
                <h2 className="text-[13px] font-[500]">Calendar</h2>
              </div>

              <h2 className="text-[10px] mt-6 px-2">PREFERENCES</h2>

              <div className="flex items-center space-x-2 px-4 py-2">
                <IoSettingsOutline className="w-4 h-4" />
                <h2 className="text-[13px] font-[500]">Setting</h2>
              </div>

              <div className="flex items-center space-x-2 px-4 py-2">
                <IoIosHelpCircleOutline className="w-4 h-4" />
                <h2 className="text-[13px] font-[500]">
                  Help & Center
                </h2>
              </div>

            </div>
          </div>

         <div className="px-3 mt-6">
  <button
    onClick={() => navigate("/Signin")}
    className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-100 rounded-lg transition duration-200 cursor-pointer"
  >
    <TbLogout2 className="w-4 h-4" />
    <h2 className="text-[13px] font-[500]">Logout</h2>
  </button>
</div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 max-w-6xl mx-auto w-full mt-10">

          {/* IMAGES */}
          <div className="flex flex-col lg:flex-row gap-6">

            <div className="flex-1">

              <img
                src={sportscar}
                className="w-full lg:w-[370px] rounded-md"
                alt="Car"
              />

              <div className="flex gap-3 mt-3">

                <img
                  src={sportscar2}
                  className="w-1/5 rounded-md"
                  alt="Detail"
                />

                <img
                  src={blackinterior}
                  className="w-1/5 rounded-md"
                  alt="Detail"
                />

                <img
                  src={redinteriorcar}
                  className="w-1/5 rounded-md"
                  alt="Detail"
                />

              </div>

            </div>

            <div className="flex justify-center">
              <img
                src={ammar}
                className="w-60 sm:w-72 lg:w-100 rounded-md"
                alt="Profile"
              />
            </div>

          </div>

          {/* FORM */}



          
            <h2 className="text-[22px] font-bold  ">
              User details
            </h2>
            <p className="text-[14px] font-[400] text-[#90A3BF] mb-20">Please enter your Details</p>
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-20">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

              <div className="space-y-6">

                <InputField
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Name"
                />

                <InputField
                  label="Cnic"
                  name="cnic"
                  value={form.cnic}
                  onChange={handleChange}
                  error={errors.cnic}
                  placeholder="Enter CNIC Number"
                />

                <InputField
                  label="Graneetier Name"
                  name="granteeName"
                  value={form.granteeName}
                  onChange={handleChange}
                  error={errors.granteeName}
                  placeholder="Graneetier Name"
                />

                <InputField
                  label="Graneetier Name Cnic"
                  name="granteeCnic"
                  value={form.granteeCnic}
                  onChange={handleChange}
                  error={errors.granteeCnic}
                  placeholder="Graneetier CNIC"
                />

              </div>

              <div className="space-y-6">

                <InputField
                  label="Phone No"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Phone No"
                />

              </div>

            </div>

            <div className="mt-10 flex justify-center">

              <button
                className="bg-[#FF5C00] hover:bg-orange-600 text-white px-16 py-3 rounded-md font-semibold transition"
                onClick={handleSubmit}
              >
                Rent Now
              </button>

            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* INPUT FIELD */
function InputField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}) {
  return (
    <div>

      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#F6F7F9] border border-gray-100 p-3 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />

      {error && (
        <p className="text-[#FF5C00] font-[500] text-[13px] mt-1">
          {error}
        </p>
      )}

    </div>
  );
}

export default Detail;