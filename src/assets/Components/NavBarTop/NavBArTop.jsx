import { useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";

// IMAGES
import cargtr from "../../images/cargtr.png";
import roolsroyce from "../../images/rollyroyce.png";
import koenigsegg from "../../images/koenigsegg.png";
import allnewrush from "../../images/allnewrush.png";
import crv from "../../images/crv.png";
import mgzx from "../../images/mgzx.png";
import mgzs from "../../images/mgzs.png";
import mgzxexite from "../../images/mgzxexite.png";

function NavBarTop() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [cars, setCars] = useState([
    {
      name: "Koenigsegg",
      price: "133500",
      oldPrice: "180000",

      img: koenigsegg,
      liked: true,
    },
    {
      name: "Nissan GT - R",
      price: "236500",
      oldPrice: "250000",
      img: cargtr,
      liked: true,
    },
    {
      name: "Rolls-Royce",
      price: "238500",
      oldPrice: "280000",
      img: roolsroyce,
      liked: true,
    },
    {
      name: "All New Rush",
      price: "19500",
oldPrice: "21500",
      img: allnewrush,
      liked: false,
    },
    {
      name: "CR - V",
      price: "14500",
      oldPrice: "18000",
      img: crv,
      liked: false,
    },
    {
      name: "All New Terios",
      price: "17500",
      oldPrice: "21500",
      img: allnewrush,
      liked: false,
    },
    {
      name: "MG ZX Exclusive",
      price: "12500",
      oldPrice: "18500",
      img: mgzx,
      liked: false,
    },
    {
      name: "New MG ZS",
      price: "18500",
      oldPrice: "21500",
      img: mgzs,
      liked: false,
    },
    {
      name: "MG ZX Excite",
      price: "23500",
      oldPrice: "34500",
      img: mgzxexite,
      liked: false,
    },
  ]);

  const [active, setActive] = useState("All");

  const tabs = ["All", "Petrol", "Diesel", "CNG"];

  const toggleLike = (index) => {
    const updated = [...cars];
    updated[index].liked = !updated[index].liked;
    setCars(updated);
  };

  return (
    <div>
      <div className="bg-[#F6F7F9] min-h-screen">
        <Header />

        {/* MOBILE FILTER BUTTON */}
        <div className="lg:hidden px-4 pt-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-white shadow-md border border-gray-200 p-2 rounded-lg"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* OVERLAY */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* TOP FILTER SECTION */}
        <div className="w-full px-4 sm:px-6 lg:px-10 py-4">
          <div className="flex flex-row justify-between items-center gap-3 mb-4 flex-wrap">
  
  <h2 className="text-sm sm:text-base md:text-lg text-[#90A3BF] font-medium">
    Available Cars
  </h2>

  <button className="text-sm sm:text-base text-[#3563E9] whitespace-nowrap cursor-pointer">
    View All
  </button>

</div>
          {/* TABS */}
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-4 sm:px-6 py-2 text-sm rounded-md border transition
                ${
                  active === tab
                    ? "border-orange-500 text-black bg-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex px-4 sm:px-6 lg:px-10 gap-6">

          {/* SIDEBAR */}
          <aside
            className={`
              fixed lg:static top-0 left-0 h-full lg:h-auto
              w-[260px] bg-white p-4 sm:p-6 rounded-xl
              z-50 lg:z-0
              transform transition-transform duration-300
              ${
                sidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
            `}
          >
            {/* MOBILE CLOSE */}
            <div className="flex justify-between items-center mb-6 lg:hidden">
              <h2 className="font-semibold text-lg">Filters</h2>

              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="mb-8">
              <h3 className="text-xs font-bold text-slate-400 mb-4">
                TYPE
              </h3>

              <div className="space-y-3">
                {[
                  "Mehran (16)",
                  "Premio (20)",
                  "Xli car (14)",
                  "Tz prado (14)",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center text-[#90A3BF] text-sm"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#90A3BF]"
                    />

                    <span className="ml-3">{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#90A3BF] mb-4">
                PRICE
              </h3>

              <div className="relative h-2 w-full bg-[#90A3BF] rounded-full">
                <div className="absolute h-full w-3/4 bg-orange-500 rounded-full"></div>

                <div className="absolute -top-1.5 left-[65%] h-5 w-5 bg-white border-4 border-orange-500 rounded-full cursor-pointer"></div>
              </div>

              <div className="mt-4 font-semibold text-[#596780]">
                Max. 72.00
              </div>


          
            </div>
                  <button
  onClick={() => navigate("/Signup")}
  className="w-full text-left  text-[17px] text-[#90A3BF] mt-4 lg:mt-50 cursor-pointer hover:text-gray-600 transition"
>
Log Out
</button>
          </aside>

          {/* CAR GRID */}
          <main className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {cars.map((car, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* TOP */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-sm sm:text-base">
                      {car.name}
                    </h2>

                    <Heart
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(i);
                      }}
                      className={`w-5 h-5 cursor-pointer ${
                        car.liked
                          ? "fill-red-500 text-red-500"
                          : "text-[#90A3BF]"
                      }`}
                    />
                  </div>

                  {/* IMAGE */}
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-[110px] sm:h-[130px] object-contain my-6"
                  />

                  {/* FEATURES */}
                  <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-4">
                    <span>⛽ Mileage</span>
                    <span>⚙️ Manual</span>
                    <span>👤 Driver</span>
                  </div>

                  {/* PRICE */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-base sm:text-lg">
                        {car.price}

                        <span className="text-xs text-gray-400">
                          {" "}
                          /day
                        </span>
                      </p>

                      {car.oldPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {car.oldPrice}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => navigate("/Detail")}
                      className="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-lg text-sm cursor-pointer"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="flex justify-center mt-8 mb-10">
              <button className="bg-orange-500 text-white px-5 py-2 rounded-md cursor-pointer">
                Show More Cars
              </button>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default NavBarTop;