import React from "react";
import blackcar from "../../images/blackcar.png";
import { useNavigate } from "react-router-dom";

const UserSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* Left Orange Section */}
        <div className="bg-[#FF6915] w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
          
          <img
            src={blackcar}
            alt="Car"
            className="w-3/4 sm:w-3/5"
          />

          <div className="text-center mt-8">
            <h3 className="text-3xl sm:text-4xl font-[600] text-white">
              User Selection
            </h3>
          </div>
        </div>

        {/* Right White Section */}
        <div className="bg-white w-full lg:w-1/2 flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-sm flex flex-col items-center">

            <div className="w-full flex flex-col gap-6">

              <button
                className="bg-[#FF6915] text-white text-sm rounded-sm hover:bg-orange-600 transition w-full h-10" onClick={() => navigate("/NavBarTop", { replace: true })}
              >
                Rent a Car
              </button>

              <button
                className="bg-[#FF6915] text-white text-sm rounded-sm hover:bg-orange-600 transition w-full h-10" onClick={() => navigate("/HomeCarRent", { replace: true })}
              >
                Own a Showroom
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserSelection;