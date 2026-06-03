import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import serverRequestHandler from "../../Utils/http.Js";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";

function NavBarTop() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(100000);
  const MAX_LIMIT = 100000;
  const [searchText, setSearchText] = useState("");
  const [cars, setCars] = useState([]);
  const [queryparams, setQueryparams] = useState({ page: 1, pageSize: 5 });
  const [active, setActive] = useState("All");

  const tabs = [
    { label: "All", value: null },
    { label: "Petrol", value: "petrol" },
    { label: "Diesel", value: "diesel" },
    { label: "CNG", value: "cng" },
    { label: "Electric", value: "electric" },
  ];

  const toggleLike = async (index) => {
    const car = cars[index];
    const isLiked = car.liked;
    try {
      if (isLiked) {
        await serverRequestHandler(ENDPOINTS.removeFavorite, "post", { car: car._id });
        toast.success("Removed from favourites");
      } else {
        await serverRequestHandler(ENDPOINTS.addFavorite, "post", { car: car._id });
        toast.success("Added to favourites");
      }
      const updated = [...cars];
      updated[index].liked = !isLiked;
      setCars(updated);
    } catch (error) {
      toast.error("Failed to update favourites");
    }
  };

  const loadmore = () => {
    setQueryparams((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const toggleBrand = (brandId) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId) ? prev.filter((b) => b !== brandId) : [...prev, brandId]
    );
  };

  const getBrands = async () => {
    try {
      const response = await serverRequestHandler(ENDPOINTS.brands, "get");
      setBrands(Array.isArray(response) ? response : []);
    } catch (error) {
      console.log("Brands error:", error);
    }
  };

  const getproducts = async (page = queryparams.page, brandFilters = selectedBrands, fuel = active, priceMax = appliedMaxPrice) => {
    try {
      let url = ENDPOINTS.products + `?page=${page}&pageSize=${queryparams.pageSize}`;
      if (brandFilters.length > 0) {
        brandFilters.forEach((id) => { url += `&brand=${id}`; });
      }
      if (fuel !== "All" && fuel !== null) {
        const fuelValue = tabs.find(t => t.label === fuel)?.value;
        if (fuelValue) url += `&fuelType=${fuelValue}`;
      }
      url += `&maxPrice=${priceMax}`;
      const response = await serverRequestHandler(url, "get");
      setCars((prev) => page === 1 ? response : [...prev, ...response]);
    } catch (error) {
      toast.error("Failed to fetch products");
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => { getBrands(); getproducts(1, [], "All", 100000); }, []);

  useEffect(() => {
    setQueryparams((prev) => ({ ...prev, page: 1 }));
    getproducts(1, selectedBrands, active, appliedMaxPrice);
  }, [selectedBrands, active, appliedMaxPrice]);

  useEffect(() => {
    if (queryparams.page !== 1) getproducts(queryparams.page, selectedBrands, active, appliedMaxPrice);
  }, [queryparams.page]);

  return (
    <div>
      <div className="bg-[#F6F7F9] min-h-screen">
        <Header onSearch={(val) => setSearchText(val)} favCount={cars.filter(c => c.liked).length} />

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
                key={tab.label}
                onClick={() => setActive(tab.label)}
                className={`px-4 sm:px-6 py-2 text-sm rounded-md border transition
                ${
                  active === tab.label
                    ? "border-orange-500 text-black bg-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {tab.label}
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
              <h3 className="text-xs font-bold text-slate-400 mb-4">TYPE</h3>

              <div className="space-y-3">
                {brands.map((brand) => (
                  <label
                    key={brand._id}
                    className="flex items-center text-[#90A3BF] text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 accent-orange-500"
                      checked={selectedBrands.includes(brand._id)}
                      onChange={() => toggleBrand(brand._id)}
                    />
                    <span className="ml-3 capitalize">{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-[#90A3BF] mb-4">PRICE</h3>

              <input
                type="range"
                min={0}
                max={MAX_LIMIT}
                step={1000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                onMouseUp={() => setAppliedMaxPrice(maxPrice)}
                onTouchEnd={() => setAppliedMaxPrice(maxPrice)}
                className="w-full accent-orange-500 cursor-pointer"
              />

              <div className="mt-2 flex justify-between text-xs text-[#596780]">
                <span>Rs. 0</span>
                <span className="font-semibold text-orange-500">Max. Rs. {maxPrice.toLocaleString()}</span>
              </div>
            </div>
            <button
              onClick={() => {localStorage.clear();navigate("/");}}
              className="w-full text-left  text-[17px] text-[#90A3BF] mt-4 lg:mt-30 cursor-pointer hover:text-gray-600 transition">
              Log Out 
            </button>
          </aside>

          {/* CAR GRID */}
          <main className="flex-1 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {cars.filter(car => car.title?.toLowerCase().includes(searchText.toLowerCase())).map((car, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* TOP */}
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-sm sm:text-base">
                      {car.title}
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
                    src={"http://localhost:5000/" + car.pictures[0]}
                    alt={car.title}
                    className="w-full h-[110px] sm:h-[130px] object-contain my-6"
                  />

                  {/* FEATURES */}
                  <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-4">
                    <span>⛽ Mileage {car.mileage}</span>
                    <span>⚙️ Manual</span>
                    <span>👤 Driver</span>
                  </div>

                  {/* PRICE */}
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-base sm:text-lg">
                        {car.realPrice}

                        <span className="text-xs text-gray-400"> /day</span>
                      </p>

                      {car.discountedPrice && (
                        <p className="text-xs text-gray-400 line-through">
                          {car.discountedPrice}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/Detail/${car._id}`, { state: { car } })
                      }
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
              <button
                className="bg-orange-500 text-white px-5 py-2 rounded-md cursor-pointer"
                onClick={loadmore}
              >
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
