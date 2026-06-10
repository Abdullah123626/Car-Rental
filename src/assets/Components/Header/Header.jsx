import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { FaHeart } from "react-icons/fa";
import { IoIosSettings, IoIosNotifications } from "react-icons/io";
import profile from "../../images/profile.png";
import serverRequestHandler from "../../Utils/http.Js";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/";

const Header = ({ onSearch, favCount = 0 }) => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const getProfile = async () => {
    try {
      const res = await serverRequestHandler(ENDPOINTS.viewProfile, "get");
      setUserProfile(res);
    } catch (e) {}
  };

  const getNotifications = async () => {
    try {
      const res = await serverRequestHandler(ENDPOINTS.notifications + "?page=1&pageSize=10", "get");
      const list = Array.isArray(res) ? res : res?.data ?? [];
      setNotifications(list);
      setUnreadCount(list.filter(n => !n.isRead).length);
    } catch (e) {}
  };

  useEffect(() => {
    getProfile();
    getNotifications();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // fix: useCallback taake SearchBar re-render par focus na khoe
  const handleSearch = useCallback((e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (onSearch) onSearch(val);
  }, [onSearch]);

  const markAllRead = async () => {
    try {
      await serverRequestHandler(ENDPOINTS.readAllNotifications, "post");
      setUnreadCount(0);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (e) {}
  };

  const profilePic = userProfile?.profilePic
    ? (userProfile.profilePic.startsWith("http") ? userProfile.profilePic : BASE_URL + userProfile.profilePic)
    : profile;

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">

        {/* LEFT */}
        <div className="flex items-center gap-4 flex-1">
          <h2
          onClick={() => navigate("/HomeCarRent")}
           className="text-[#FF5C00] text-xl sm:text-2xl font-bold whitespace-nowrap cursor-pointer">MORENT</h2>

          {/* SEARCH - inline, no nested component */}
          <div className="hidden sm:flex items-center border border-[#C3D4E966] rounded-full px-3 py-2 bg-white h-9 w-full max-w-[400px]">
            <Search className="text-gray-500 mr-2 shrink-0" size={16} />
            <input
              type="text"
              value={searchVal}
              onChange={handleSearch}
              placeholder="Search something here"
              className="flex-1 outline-none bg-transparent text-sm"
            />
            <SlidersHorizontal className="text-gray-500 ml-2 shrink-0" size={16} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3 ml-4">

          {/* HEART */}
          <div onClick={() => navigate("/Favourites")} className="relative w-10 h-10 border border-[#C3D4E966] rounded-full flex justify-center items-center cursor-pointer hover:bg-orange-50 transition">
            <FaHeart size={15} className="text-gray-500" />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {favCount}
              </span>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <div className="relative" ref={notifRef}>
            <div onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }} className="relative w-10 h-10 border border-[#C3D4E966] rounded-full flex justify-center items-center cursor-pointer">
              <IoIosNotifications size={18} className="text-gray-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            {showNotif && (
              <div className="absolute right-0 top-12 w-72 bg-white shadow-lg rounded-xl p-4 z-50 border border-gray-100 max-h-80 overflow-y-auto">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold text-gray-400">NOTIFICATIONS</p>
                  {unreadCount > 0 && <button onClick={markAllRead} className="text-xs text-orange-500 cursor-pointer">Mark all read</button>}
                </div>
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">No notifications yet</p>
                ) : notifications.map((n, i) => (
                  <div key={i} className={`p-2 rounded-lg mb-2 text-sm ${n.isRead ? "bg-gray-50" : "bg-orange-50"}`}>
                    <p className="text-gray-700">{n.message || n.title || "New notification"}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SETTINGS */}
          <div className="w-10 h-10 border border-[#C3D4E966] rounded-full flex justify-center items-center cursor-pointer">
            <IoIosSettings size={18} className="text-gray-500" />
          </div>

          {/* PROFILE */}
          <div className="relative" ref={profileRef}>
            <div onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }} className="w-10 h-10 border border-[#C3D4E966] rounded-full overflow-hidden cursor-pointer">
              <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
            </div>
            {showProfile && (
              <div className="absolute right-0 top-12 w-62 bg-white shadow-lg rounded-xl p-4 z-50 border border-gray-100">
                <p className="text-xs font-bold text-gray-400 mb-3">PROFILE</p>
                {userProfile ? (
                  <div className="flex items-center gap-3">
                    <img src={profilePic} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">{userProfile.firstName} {userProfile.lastName}</p>
                      <p className="text-xs text-gray-400">{userProfile.email}</p>
                    </div>
                  </div>
                ) : <p className="text-sm text-gray-400">Loading...</p>}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="sm:hidden px-4 pb-3">
        <div className="flex items-center border border-[#C3D4E966] rounded-full px-3 py-2 bg-white h-9">
          <Search className="text-gray-500 mr-2 shrink-0" size={16} />
          <input
            type="text"
            value={searchVal}
            onChange={handleSearch}
            placeholder="Search something here"
            className="flex-1 outline-none bg-transparent text-sm"
          />
          <SlidersHorizontal className="text-gray-500 ml-2 shrink-0" size={16} />
        </div>
      </div>
    </div>
  );
};

export default Header;
