import React from "react";
import redcar from "../../images/redcar.png";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
      const navigate = useNavigate();
  
  return (
    <div>
      <Header />

      {/* Top Section */}
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 bg-[#F1EEEE]">
        <h4 className="text-sm sm:text-base text-[#90A3BF] font-semibold">
          Confirmation
        </h4>

        <button
          className="text-sm sm:text-base text-[#90A3BF] font-semibold hover:text-black transition"
          onClick={() => console.log("View All clicked")}
        >
          View All
        </button>
      </div>

      {/* Card Section */}
      <div className="w-full bg-[#F1EEEE] py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-3xl bg-white flex flex-col items-center justify-center px-6 sm:px-10 py-10 rounded-md">

          {/* Card */}
          <div className="w-full h-[320px] sm:h-[400px] border rounded-md flex flex-col items-center justify-center mb-6">

            <img
              src={redcar}
              alt="car"
              className="w-32 sm:w-40 md:w-48 h-auto mb-6 object-contain"
            />

            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold">Booking</h2>
              <h2 className="text-xl sm:text-2xl font-bold mt-2">is</h2>
              <h2 className="text-xl sm:text-2xl font-bold mt-2">Proceed</h2>
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 py-2 rounded-md hover:bg-black hover:text-white transition bg-[#FF5C00] text-white text-sm font-medium" 
             onClick={() => navigate("/HomeCarRent")}>
              Go Back
            </button>
            <button className="w-full sm:w-auto px-4 py-2 rounded-md hover:bg-black hover:text-white transition bg-[#FF5C00] text-white text-sm font-medium">
              View Booking
            </button>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="w-full mt-10 px-4 sm:px-6 lg:px-8">

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">

          {/* Showroom */}
          <div>
            <h2 className="text-2xl sm:text-3xl text-[#FF5C00] font-bold">
              Showroom
            </h2>
            <p className="text-sm sm:text-base text-[#13131399] mt-2">
              Our vision is to provide convenience
            </p>
            <p className="text-sm sm:text-base text-[#13131399]">
              and help increase your sales business.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">

            {/* About */}
            <div>
              <h3 className="text-sm sm:text-base font-medium">About</h3>
              <p className="text-sm text-[#13131399] mt-4">How it works</p>
              <p className="text-sm text-[#13131399] mt-2">Featured</p>
              <p className="text-sm text-[#13131399] mt-2">Partnership</p>
              <p className="text-sm text-[#13131399] mt-2">Business Relation</p>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-sm sm:text-base font-medium">Community</h3>
              <p className="text-sm text-[#13131399] mt-4">Events</p>
              <p className="text-sm text-[#13131399] mt-2">Blog</p>
              <p className="text-sm text-[#13131399] mt-2">Podcast</p>
              <p className="text-sm text-[#13131399] mt-2">Invite a friend</p>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-sm sm:text-base font-medium">Socials</h3>
              <p className="text-sm text-[#13131399] mt-4">Discord</p>
              <p className="text-sm text-[#13131399] mt-2">Instagram</p>
              <p className="text-sm text-[#13131399] mt-2">Twitter</p>
              <p className="text-sm text-[#13131399] mt-2">Facebook</p>
            </div>

          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-300 mt-10"></div>

        {/* Bottom */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-5 gap-4 mb-8 text-center sm:text-left">
          
          <h3 className="text-sm font-bold">
            ©2022 MORENT. All rights reserved
          </h3>

          <div className="flex gap-6">
            <h3 className="text-sm font-bold">Privacy & Policy</h3>
            <h3 className="text-sm font-bold">Terms & Condition</h3>
          </div>

        </div>

      </div>
    </div>
  );
};

export default NavBar;