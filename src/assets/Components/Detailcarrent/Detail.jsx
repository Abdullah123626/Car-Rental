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
import Footer from "../Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import serverRequestHandler from "../../Utils/http.Js";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000/";
const UPLOAD_URL = "http://localhost:5000/api/upload/anyfile";

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.car || null;

  const [selectedImg, setSelectedImg] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    cnic: "",
    granteeName: "",
    granteeCnic: "",
    granteePhone: "",
  });

  // CNIC images state
  const [userCnicFront, setUserCnicFront] = useState(null);
  const [userCnicBack, setUserCnicBack] = useState(null);
  const [granteeCnicFront, setGranteeCnicFront] = useState(null);
  const [granteeCnicBack, setGranteeCnicBack] = useState(null);

  // Preview URLs
  const [userCnicFrontPreview, setUserCnicFrontPreview] = useState(null);
  const [userCnicBackPreview, setUserCnicBackPreview] = useState(null);
  const [granteeCnicFrontPreview, setGranteeCnicFrontPreview] = useState(null);
  const [granteeCnicBackPreview, setGranteeCnicBackPreview] = useState(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleImageChange = (e, setter, previewSetter) => {
    const file = e.target.files[0];
    if (!file) return;
    setter(file);
    previewSetter(URL.createObjectURL(file));
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("Token");
    const res = await axios.post(UPLOAD_URL, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  };

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    const phone = form.phone.replace(/\D/g, "");
    if (!phone) newErrors.phone = "Phone is required";
    else if (phone.length < 10 || phone.length > 15) newErrors.phone = "Invalid phone number";
    const cnic = form.cnic.replace(/\D/g, "");
    if (!cnic) newErrors.cnic = "CNIC is required";
    else if (cnic.length !== 13) newErrors.cnic = "CNIC must be 13 digits";
    if (!userCnicFront) newErrors.userCnicFront = "CNIC front image is required";
    if (!userCnicBack) newErrors.userCnicBack = "CNIC back image is required";
    if (!form.granteeName.trim()) newErrors.granteeName = "Grantee name is required";
    const granteeCnic = form.granteeCnic.replace(/\D/g, "");
    if (!granteeCnic) newErrors.granteeCnic = "Grantee CNIC is required";
    else if (granteeCnic.length !== 13) newErrors.granteeCnic = "Grantee CNIC must be 13 digits";
    const granteePhone = form.granteePhone.replace(/\D/g, "");
    if (!granteePhone) newErrors.granteePhone = "Grantee phone is required";
    if (!granteeCnicFront) newErrors.granteeCnicFront = "Grantee CNIC front image is required";
    if (!granteeCnicBack) newErrors.granteeCnicBack = "Grantee CNIC back image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      toast.info("Uploading images...");
      const [uFront, uBack, gFront, gBack] = await Promise.all([
        uploadFile(userCnicFront),
        uploadFile(userCnicBack),
        uploadFile(granteeCnicFront),
        uploadFile(granteeCnicBack),
      ]);

      await serverRequestHandler(ENDPOINTS.addBooking, "post", {
        Car: car._id,
        showRoom: car.showroomId,
        TotalCost: car.realPrice,
        UserCnic: form.cnic,
        UserCnicPicFront: uFront,
        UserCnicPicBack: uBack,
        GranteeName: form.granteeName,
        GranteeCnic: form.granteeCnic,
        GranteeCnicPicFront: gFront,
        GranteeCnicPicBack: gBack,
        GranteePhoneNumber: form.granteePhone,
        status: "pending",
      });

      toast.success("Booking submitted successfully!");
      navigate("/NavBarTop", { replace: true });
    } catch (error) {
      toast.error(error?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!car) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No car data found.</p>
          <button onClick={() => navigate("/NavBarTop")} className="bg-orange-500 text-white px-4 py-2 rounded-lg">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b">
        <button onClick={() => setSidebarOpen(true)}>
          <HiOutlineMenuAlt3 className="text-3xl text-black" />
        </button>
        <h2 className="font-semibold text-[18px]">Menu</h2>
        <div></div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 lg:px-8 mt-4">
        {/* SIDEBAR */}
        <div className={`w-[260px] bg-gray-100 flex flex-col justify-between py-6 fixed lg:static top-0 left-0 h-screen lg:h-auto z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="lg:hidden flex justify-end px-4 mb-4">
            <button onClick={() => setSidebarOpen(false)}><IoClose className="text-3xl text-black" /></button>
          </div>
          <div>
            <h2 className="text-[10px] px-5 mb-6">Main Menu</h2>
            <div className="flex flex-col gap-2 px-3">
              <div className="flex items-center space-x-2 bg-[#FF5C00] px-4 py-2 rounded-md text-white">
                <PiHouseFill className="w-4 h-4" /><h2 className="text-sm font-medium">Home</h2>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2">
                <FaCar className="w-4 h-4" /><h2 className="text-[13px] font-[500]">Car Rent</h2>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2">
                <AiFillSignal className="w-4 h-4" /><h2 className="text-[13px] font-[500]">Insight</h2>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2">
                <BiSolidMessageAlt className="w-4 h-4" /><h2 className="text-[13px] font-[500]">Inbox</h2>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2">
                <SlCalender className="w-4 h-4" /><h2 className="text-[13px] font-[500]">Calendar</h2>
              </div>
              <h2 className="text-[10px] mt-6 px-2">PREFERENCES</h2>
              <div className="flex items-center space-x-2 px-4 py-2">
                <IoSettingsOutline className="w-4 h-4" /><h2 className="text-[13px] font-[500]">Setting</h2>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2">
                <IoIosHelpCircleOutline className="w-4 h-4" /><h2 className="text-[13px] font-[500]">Help & Center</h2>
              </div>
            </div>
          </div>
          <div className="px-3 mt-6">
            <button onClick={() => { localStorage.clear(); navigate("/"); }} className="flex items-center space-x-2 px-4 py-2 w-full hover:bg-gray-200 rounded-lg transition cursor-pointer">
              <TbLogout2 className="w-4 h-4" /><h2 className="text-[13px] font-[500]">Logout</h2>
            </button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 max-w-6xl mx-auto w-full mt-10">

          {/* CAR IMAGES */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            <div className="flex-1">
              <img src={BASE_URL + car.pictures[selectedImg]} className="w-full lg:w-[370px] rounded-md h-[220px] object-cover" alt={car.title} />
              <div className="flex gap-3 mt-3">
                {car.pictures.slice(0, 4).map((pic, i) => (
                  <img key={i} src={BASE_URL + pic} onClick={() => setSelectedImg(i)}
                    className={`w-1/5 rounded-md h-[60px] object-cover cursor-pointer border-2 ${selectedImg === i ? "border-orange-500" : "border-transparent"}`}
                    alt={`pic-${i}`} />
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-3 min-w-[220px]">
              <h2 className="text-lg font-bold">{car.title}</h2>
              <p className="text-sm text-gray-400">{car.brand?.name} • {car.model}</p>
              <div className="flex flex-col gap-2 text-sm text-gray-600">
                <span>⛽ Fuel: {car.fuelType}</span>
                <span>⚙️ Feature: {car.feature}</span>
                <span>👤 Driver: {car.driverType}</span>
                <span>📍 Location: {car.location}</span>
                <span>🛣️ Mileage: {car.mileage}</span>
              </div>
              <p className="text-orange-500 font-bold text-xl">Rs. {car.realPrice} <span className="text-gray-400 text-sm font-normal">/day</span></p>
              <p className="text-xs text-gray-400">{car.description}</p>
            </div>
          </div>

          {/* FORM */}
          <h2 className="text-[22px] font-bold">Booking Details</h2>
          <p className="text-[14px] text-[#90A3BF] mb-6">Please fill in your details to complete the booking</p>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">

            {/* SECTION 1 - USER INFO */}
            <h3 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b">Your Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Enter your full name" />
              <InputField label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="03xxxxxxxxx" />
              <InputField label="CNIC Number" name="cnic" value={form.cnic} onChange={handleChange} error={errors.cnic} placeholder="XXXXXXXXXXXXX (13 digits)" />
            </div>

            {/* USER CNIC IMAGES */}
            <h3 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b">Your CNIC Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CnicUpload
                label="CNIC Front"
                preview={userCnicFrontPreview}
                onChange={(e) => handleImageChange(e, setUserCnicFront, setUserCnicFrontPreview)}
                error={errors.userCnicFront}
              />
              <CnicUpload
                label="CNIC Back"
                preview={userCnicBackPreview}
                onChange={(e) => handleImageChange(e, setUserCnicBack, setUserCnicBackPreview)}
                error={errors.userCnicBack}
              />
            </div>

            {/* SECTION 2 - GRANTEE INFO */}
            <h3 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b">Guarantor Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField label="Guarantor Name" name="granteeName" value={form.granteeName} onChange={handleChange} error={errors.granteeName} placeholder="Enter guarantor full name" />
              <InputField label="Guarantor Phone" name="granteePhone" value={form.granteePhone} onChange={handleChange} error={errors.granteePhone} placeholder="03xxxxxxxxx" />
              <InputField label="Guarantor CNIC" name="granteeCnic" value={form.granteeCnic} onChange={handleChange} error={errors.granteeCnic} placeholder="XXXXXXXXXXXXX (13 digits)" />
            </div>

            {/* GRANTEE CNIC IMAGES */}
            <h3 className="text-base font-semibold text-gray-700 mb-4 pb-2 border-b">Guarantor CNIC Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CnicUpload
                label="Guarantor CNIC Front"
                preview={granteeCnicFrontPreview}
                onChange={(e) => handleImageChange(e, setGranteeCnicFront, setGranteeCnicFrontPreview)}
                error={errors.granteeCnicFront}
              />
              <CnicUpload
                label="Guarantor CNIC Back"
                preview={granteeCnicBackPreview}
                onChange={(e) => handleImageChange(e, setGranteeCnicBack, setGranteeCnicBackPreview)}
                error={errors.granteeCnicBack}
              />
            </div>

            {/* SUBMIT */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-[#FF5C00] hover:bg-orange-600 text-white px-16 py-3 rounded-md font-semibold transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Rent Now"}
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
function InputField({ label, name, value, onChange, error, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#F6F7F9] border border-gray-200 p-3 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      {error && <p className="text-[#FF5C00] font-[500] text-[13px] mt-1">{error}</p>}
    </div>
  );
}

/* CNIC UPLOAD */
function CnicUpload({ label, preview, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <label className="cursor-pointer block">
        <div className={`w-full h-36 rounded-lg border-2 border-dashed flex flex-col items-center justify-center overflow-hidden transition ${error ? "border-red-400 bg-red-50" : "border-gray-300 bg-[#F6F7F9] hover:border-orange-400"}`}>
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="text-center px-4">
              <p className="text-2xl mb-1">📷</p>
              <p className="text-xs text-gray-400">Click to upload {label}</p>
            </div>
          )}
        </div>
        <input type="file" accept="image/*" onChange={onChange} className="hidden" />
      </label>
      {error && <p className="text-[#FF5C00] font-[500] text-[13px] mt-1">{error}</p>}
    </div>
  );
}

export default Detail;
