import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import Footer from "../Footer/Footer";

// IMAGES
import cargtr from "../../images/cargtr.png";
import ammar from "../../images/amaar.png";
import showroom from "../../images/showroom.png";
import mg from "../../images/mg.png";
import suzu from "../../images/suzu.png";
import porshe from "../../images/porshe.png";
import carss from "../../images/cars.png";
import roolsroyce from "../../images/rollyroyce.png";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

function HomeCarRent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const cars = [
    { name: "Nissan GT - R", price: "33,000", img: cargtr },
    { name: "Rolls - Royce", price: "21,000", img: roolsroyce },
    { name: "Nissan GT - R", price: "43,000", img: cargtr },
  ];

  const showrooms = [
    {
      name: "Amar & Farrukh Rent Car",
      location: "Islamabad",
      cars: 33,
      img: ammar,
    },
    {
      name: "Luxury Drive Center",
      location: "Lahore",
      cars: 18,
      img: showroom,
    },
    {
      name: "BMW Showroom",
      location: "Karachi",
      cars: 25,
      img: mg,
    },
    {
      name: "Audi Rent Hub",
      location: "Islamabad",
      cars: 14,
      img: suzu,
    },
    {
      name: "Ferrari Club",
      location: "Dubai Section",
      cars: 7,
      img: porshe,
    },
    {
      name: "Mercedes Premium Rent",
      location: "Lahore",
      cars: 22,
      img: carss,
    },
  ];

  return (
    <div>
      <Header />
      <div className="flex bg-[#F6F7F9] min-h-screen relative">
        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
        >
          <Menu size={24} />
        </button>

        {/* MOBILE OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* SIDEBAR */}
        <div
          className={`
            fixed lg:static top-0 left-0 h-full z-50
            w-[260px] bg-white p-4 sm:p-6
            flex flex-col justify-between
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          {/* CLOSE BUTTON MOBILE */}
          <div className="lg:hidden flex justify-end mb-4">
            <button onClick={() => setSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-4">MAIN MENU</p>

            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-6">
              🏠 Home
            </div>

            <p className="text-xs text-gray-400 mb-4">PREFERENCES</p>

            <div className="space-y-3 text-gray-500 text-sm">
              <p>⚙️ Settings</p>
              <p>❓ Help & Center</p>
            </div>
          </div>

         <button
  onClick={() => navigate("/Signup")}
  className="w-full text-left text-gray-400 mt-4 lg:mt-260 cursor-pointer hover:text-gray-600 transition"
>
  🔓 Log Out
</button>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-4 sm:p-6 lg:ml-0 mt-14 lg:mt-0">
          {/* HERO SECTION */}
          <div className="bg-orange-500 rounded-xl p-4 sm:p-6 mb-6 h-auto lg:h-[350px]">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-2xl text-white text-center lg:text-left mt-6 lg:mt-10">
              Easy way to rent a car at a low price
            </h1>

            <p className="text-sm text-white mt-2 text-center lg:text-left max-w-2xl">
              Providing cheap car rental services and safe and comfortable
              facilities.
            </p>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mt-10 lg:mt-20">
              <button className="bg-transparent border border-[#7B7B7B] text-white px-5 py-2 rounded-md font-medium">
                Rental Car
              </button>

              <img
                src={cargtr}
                alt="car"
                className="w-[200px] sm:w-[250px] lg:w-[300px] object-contain"
              />

              <div></div>
            </div>
          </div>

          {/* POPULAR CARS */}
          <div className="mb-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-gray-600 font-semibold">Popular Car</h2>

              <p className="text-gray-400 text-sm cursor-pointer">View All</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {cars.map((car, i) => (
                <div
                  key={i}
                  className="bg-white p-4 rounded-xl shadow-sm w-full max-w-[300px] mx-auto"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{car.name}</h3>

                    <Heart size={16} className="text-gray-300" />
                  </div>

                  <img
                    src={car.img}
                    alt={car.name}
                    className="mx-auto my-4 w-[150px] object-contain"
                  />

                  <div className="flex justify-between items-center">
                    <p className="font-bold text-sm">
                      {car.price}
                      <span className="text-gray-400"> /day</span>
                    </p>

                    <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm">
                      Rent Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SHOWROOM */}
          <div>
            <h2 className="text-gray-600 font-semibold mb-10">Showroom Car</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {showrooms.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-[300px] mx-auto"
                >
                  {/* IMAGE */}
                  <div className="h-[160px] w-full overflow-hidden">
                    <img
                      src={item.img}
                      alt="showroom"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    <p className="font-semibold text-sm font-[600] text-black">
                      {item.name}
                    </p>

                    <p className="text-xs font-[600] text-black mt-1">
                      Location: {item.location}
                    </p>

                    <p className="text-xs font-[600] text-black mt-1">
                      Available cars: {item.cars}
                    </p>

                    <div className="flex flex-col h-full mt-3">
                      <button className="bg-orange-500 text-white px-3 py-1 rounded text-sm mt-auto self-end cursor-pointer">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomeCarRent;
