import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import serverRequestHandler from "../../Utils/http.Js";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:5000/";

function Favourites() {
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFavourites = async () => {
    try {
      setLoading(true);
      const res = await serverRequestHandler(ENDPOINTS.getFavorites, "get");
      const list = Array.isArray(res) ? res : res?.data ?? [];
      setFavourites(list);
    } catch {
      toast.error("Failed to load favourites");
    } finally {
      setLoading(false);
    }
  };

  const removeFavourite = async (carId, index) => {
    try {
      await serverRequestHandler(ENDPOINTS.removeFavorite, "post", { car: carId });
      toast.success("Removed from favourites");
      setFavourites((prev) => prev.filter((_, i) => i !== index));
    } catch {
      toast.error("Failed to remove");
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col">
      <Header />

      <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Heart size={20} className="text-orange-500 fill-orange-500" />
          <h2 className="text-xl font-semibold text-gray-700">My Favourites</h2>
          <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">{favourites.length}</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">Loading...</p>
          </div>
        ) : favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Heart size={48} className="text-gray-300" />
            <p className="text-gray-400 text-lg">No favourites yet</p>
            <button
              onClick={() => navigate("/NavBarTop")}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm"
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {favourites.map((item, i) => {
              const car = item?.car ?? item;
              return (
                <div key={i} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="font-semibold text-sm sm:text-base">{car?.title}</h2>
                    <Heart
                      size={18}
                      className="text-red-500 fill-red-500 cursor-pointer"
                      onClick={() => removeFavourite(car?._id, i)}
                    />
                  </div>

                  <img
                    src={BASE_URL + car?.pictures?.[0]}
                    alt={car?.title}
                    className="w-full h-[130px] object-contain my-4"
                  />

                  <div className="flex justify-between text-xs text-gray-400 mb-4">
                    <span>⛽ {car?.fuelType}</span>
                    <span>⚙️ {car?.feature}</span>
                    <span>👤 {car?.driverType}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="font-bold text-base">
                      Rs. {car?.realPrice}
                      <span className="text-xs text-gray-400"> /day</span>
                    </p>
                    <button
                      onClick={() => navigate(`/Detail/${car?._id}`, { state: { car } })}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Favourites;
