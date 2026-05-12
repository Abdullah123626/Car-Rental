import React from "react";

const Footer = () => {
  return (
    <div>

      {/* Footer */}
      <div className="w-full mt-10 px-4 sm:px-6 lg:px-8 ">

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row justify-between gap-10 ">

          {/* Showroom */}
          <div className="text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-[#FF5C00] font-bold">
              Showroom
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-[#13131399] mt-2">
              Our vision is to provide convenience
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-[#13131399]">
              and help increase your sales business.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">

            {/* About */}
            <div>
              <h3 className="text-sm sm:text-base font-medium">About</h3>
              <p className="text-xs sm:text-sm text-[#13131399] mt-4">How it works</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Featured</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Partnership</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Business Relation</p>
            </div>

            {/* Community */}
            <div>
              <h3 className="text-sm sm:text-base font-medium">Community</h3>
              <p className="text-xs sm:text-sm text-[#13131399] mt-4">Events</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Blog</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Podcast</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Invite a friend</p>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-sm sm:text-base font-medium">Socials</h3>
              <p className="text-xs sm:text-sm text-[#13131399] mt-4">Discord</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Instagram</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Twitter</p>
              <p className="text-xs sm:text-sm text-[#13131399] mt-2">Facebook</p>
            </div>

          </div>

        </div>

        {/* Divider */}
<div className="w-full flex justify-center mt-10">
  <div className="w-full max-w-6xl h-[1px] bg-gray-300"></div>
</div>
        {/* Bottom */}
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center mt-5 gap-4 mb-8 text-center sm:text-left">

          <h3 className="text-xs sm:text-sm font-bold">
            ©2022 MORENT. All rights reserved
          </h3>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
            <h3 className="text-xs sm:text-sm font-bold">Privacy & Policy</h3>
            <h3 className="text-xs sm:text-sm font-bold">Terms & Condition</h3>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Footer;