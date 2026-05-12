import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import profile from "../../images/profile.png";
import { IoIosSettings, IoIosNotifications } from "react-icons/io";

const Header = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Left Side: Logo + Search */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          {/* Logo */}
          <h2 className="text-[#FF5C00] text-xl sm:text-2xl font-bold whitespace-nowrap">
            MORENT
          </h2>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center border border-[#C3D4E966] rounded-full px-3 py-2 bg-white h-9 w-[400px] max-w-[300px] lg:max-w-[400px]">
            <Search className="text-gray-500 mr-2" size={16} />
            <input
              type="text"
              placeholder="Search something here"
              className="flex-1 outline-none bg-transparent text-sm"
            />
            <SlidersHorizontal className="text-gray-500 ml-2" size={16} />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 ml-4">
          <div className="w-10 h-10 border border-[#C3D4E966] rounded-full flex justify-center items-center">
            <FaHeart size={15} />
          </div>

          <div className="w-10 h-10 border border-[#C3D4E966] rounded-full flex justify-center items-center">
            <IoIosNotifications size={18} />
          </div>

          <div className="w-10 h-10 border border-[#C3D4E966] rounded-full flex justify-center items-center">
            <IoIosSettings size={18} />
          </div>

          <div className="w-10 h-10 border border-[#C3D4E966] rounded-full overflow-hidden">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (optional below) */}
      <div className="sm:hidden px-4 pb-3">
        <div className="flex items-center border border-[#C3D4E966] rounded-full px-3 py-2 bg-white h-9">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search something here"
            className="flex-1 outline-none bg-transparent text-sm"
          />
          <SlidersHorizontal className="text-gray-500 ml-2" size={18} />
        </div>
      </div>
    </div>
  );
};

export default Header;
