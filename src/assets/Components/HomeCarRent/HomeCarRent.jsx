import { useState, useEffect } from "react";
import { Heart, Menu, X } from "lucide-react";
import Footer from "../Footer/Footer";
import { ENDPOINTS } from "../../Utils/EndPoint.Js";
import serverRequestHandler from "../../Utils/http.Js";
import cargtr from "../../images/cargtr.png";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import profile from "../../images/profile.png";
import {toast} from "react-toastify";

const BASE_URL = "http://localhost:5000/";

function HomeCarRent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Home");
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [favCount, setFavCount] = useState(0);






  // TOGGLE LIKE
// const toggleLike = async (index) => {
//   const car = cars[index];
//   const isLiked = car.liked;

//   try {
//     if (isLiked) {
//       await serverRequestHandler(ENDPOINTS.removeFavorite, "post", { car: car._id });
//       toast.success("Removed from favourites");
//     } else {
//       await serverRequestHandler(ENDPOINTS.addFavorite, "post", { car: car._id });
//       toast.success("Added to favourites");
//     }

//     // ✅ Immutable update
//     const updated = cars.map((c, i) =>
//       i === index ? { ...c, liked: !isLiked } : c
//     );
//     setCars(updated);

//   } catch (error) {
//     toast.error("Failed to update favourites");
//   }
// };

// LIKE TOGGLE API 
// const toggleLike = async (index) => {
//   const car = cars[index];
//   const isLiked = car.liked;

//   try {
//     if (isLiked) {
//       await serverRequestHandler(ENDPOINTS.removeFavorite, "post", {
//         car: car._id,
//       });
//       toast.success("Removed from favourites");
//     } else {
//       await serverRequestHandler(ENDPOINTS.addFavorite, "post", {
//         car: car._id,
//       });
//       toast.success("Added to favourites");
//     }

//     const updated = cars.map((c, i) =>
//       i === index ? { ...c, liked: !isLiked } : c
//     );

//     setCars(updated);
//   } catch (error) {
//     toast.error("Failed to update favourites");
//   }
// };

// toggle 
const toggleLike = async (index) =>{
  const car = cars[index];
  const isliked = car.liked;
  try{
    if(isliked){await serverRequestHandler(ENDPOPINTS.removeFavorite,"post",{
      car:car._id,
    });
    toast.success("Removed from favourites")
  }else{
    await serverRequestHandler(ENDPOINTS.addFavorite, "post" ,{
      car:car._id,
    });
    toast.success("add to Favourites")
  }const updated = cars.map((c,i)=> i === index ? { ... c ,liked:!isliked}:c);
  setCars(updated)
    
  }catch(error){
    toast.error("Failed to update favourites")
  }
}

 
// const toggleLike = async () =>{
//   const car = cars[index];
//   const isLiked = car.liked;
//   try{
//     if(isLiked) {
//       await serverRequestHandler(ENDPOINTS.removeFavorite,"post",{
//         car:car._id,
//       })
//       toast.success("Removed From Favourites");
//     }else{
//       await serverRequestHandler(ENDPOINTS.addFavorite,"post",{
//         car:car._id,
//       })
//       toast.success("added to Favourties");
//     }
//     const updated =cars.map((c,i) => i === index ? {...c,Liked:!isLiked} : c);
//     setCars(updated);
//   }
//   catch(error){
//     toast.error("failed to update favourites");
//   }
// }



// toggle button for like and unlike 
// const toggleLiike = async () =>{
//    const car = cars[index];
//    const isliked = car.liked;
//    try{
//     if(isliked){
//     await serverRequesthandler (ENDPOINTS.removeFavorite , "post",{
//     car:car.__id,
//     });
//     toast.success("Removed deom Favorites");
//    }else{
//     await serverRequesthandler (ENDPOINTS.addFavorite, "post" ,{
//       car:car._id,
//     })
//     toast.success("Added to Favorites");
//    }
//    const updated = cars.map((c,i) => i === index  ? {...c , liked:isliked} : c);
//    setcars(updated);
//   }catch(error){
//     toast.error("Failed to update favorites");
//   }

// }



// tooggle button 
// const toggleLiked = async (index) => {
// const car = cars[index];
// const isliked = car.liked;
// try{
//   await serverRequestHandler(ENDPOINTS.removeFavorite, "post", {
//     car:car._id,
//   });
//   toast.success("Removed from Favorites");
// }else {
//   await serverRequestHandler(ENDPOINTS.addFavorite, "post", {
//     car:car._id,
//   });
//   toast.success("Added to Favorites");  
// }const updated = cars.map((c,i) => i === index ? { ...c , liked:!isliked} : c); 
// setcars(updated);
// }catch(error){
//   toast.error("Failed to update favorites");
// }

// }


// toogle button 
// const toggleLike = async (index) =>{
//   const car= cars[index];
//   const isliked = car.liked;
//   try{
//     if(isliked){ await serverRequestHandler (ENDPOINTS.removeFavorite, "post" ,{
//       car:car._id,
//     });
//     toast.success("Removed from Favorities");
//   } else{
//     await serverRequestHandler (ENDPOINTS.addFavorite,"post" ,{
//       car:car._id,
//     });
//     toast.success("Added to Favorites");
//   }const updated = cars.map((c,i) => i=== index ? { ... c , liked:!isliked} : c);
//   setcars(updated);
// }catch(error){
//   toast.error("Failed to update fvourites");
// }
   

// }


// toggle button 
// const toggleLike = async (index) => {
// const car = cars[index];
// const isliked = car.liked;
// try{
//   if(isliked){
//     await serverRequestHandler (ENDPOINTS.removeFavorite,"post",{
//       car:car._id,
//     });
//     toast.success("Removed to Favourites")
//   }else{
//     await serverRequestHandler(ENDPOINTS.addFavourite,"post" ,{
//       car:car._id,
//         });
//         toast.success("add to Favourites")

//   }const updated = cars.map((c,i) => i === index ? {...c,liked:!isliked }:c );
//   setCars(updated)
// }catch(error){
//   toast.error("Failed to update Favourties")
// }
// }



// toggle 
// const toggleLike = async (index) =>{
//   const car = cars[index];
//   const isliked = car.liked;
//   try{
//     if(isliked){await serverRequestHandler(ENDPOPINTS.removeFavorite,"post",{
//       car:car._id,
//     });
//     toast.success("Removed from favourites")
//   }else{
//     await serverRequestHandler(ENDPOINTS.addFavorite, "post" ,{
//       car:car._id,
//     });
//     toast.success("add to Favourites")
//   }const updated = cars.map((c,i)=> i === index ? { ... c ,isliked:!liked}:c);
//   setCars(updated)
    
//   }catch(error){
//     toast.error("Failed to update favourites")
//   }
// }
















// GET CARS API 
  // const getCars = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await serverRequestHandler(ENDPOINTS.products, "get");
  //     setCars(response);
  //   } catch (error) {
  //     console.log("ERROR:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getCars = async () =>{
    try{
      setLoading(true);
      const response = await serverRequestHandler (ENDPOINTS.products,"get")
setCars(response);
      
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false)
    }
  };








  // GET SHOWROOM API 
  const showroms = async () => {
    try {
      setLoading(true);
      const response = await serverRequestHandler(ENDPOINTS.showroom, "get");
      setShowrooms(response);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setLoading(false);
    }
  };




  // GET PROFILE API 
  const getProfile = async () => {
    try {
      const res = await serverRequestHandler(ENDPOINTS.viewProfile, "get");
      setUserProfile(res);
    } catch (error) {
      console.log("Profile error:", error);
    }
  };






  // GET 
  const getFavorites = async () => {
    try {
      const res = await serverRequestHandler(ENDPOINTS.getFavorites, "get");
      const list = Array.isArray(res) ? res : (res?.data ?? []);
      setFavCount(list.length);
    } catch (error) {
      console.log("Favorites error:", error);
    }
  };

  useEffect(() => {
    getCars();
    showroms();
    getProfile();
    getFavorites();
  }, []);

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

            <div
              onClick={() => setActiveMenu("Home")}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 mb-6 cursor-pointer transition ${
                activeMenu === "Home"
                  ? "bg-orange-500 text-white"
                  : "text-gray-500 hover:bg-orange-50"
              }`}
            >
              🏠 Home
            </div>

            <p className="text-xs text-gray-400 mb-4">PREFERENCES</p>

            <div className="space-y-3 text-sm">
              {["Settings", "Help & Center"].map((item) => (
                <div
                  key={item}
                  onClick={() => setActiveMenu(item)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer transition ${
                    activeMenu === item
                      ? "bg-orange-500 text-white"
                      : "text-gray-500 hover:bg-orange-50"
                  }`}
                >
                  {item === "Settings" ? "⚙️" : "❓"} {item}
                </div>
              ))}
            </div>  


            {/* FAVORITES COUNT */}
            <div
              onClick={() => navigate("/Favourites")}
              className="mt-4 flex items-center gap-2 text-sm text-gray-500 cursor-pointer"
            >
              <Heart size={16} className="text-orange-500" />
              <span>Favourites</span>
              {favCount > 0 && (
                <span className="ml-auto bg-orange-500 text-white text-xs rounded-full px-2 py-0.5">
                  {favCount}
                </span>
              )}
            </div>
          </div>

          {/* PROFILE INFO */}
          {userProfile && (
            <div className="mt-6 p-3 bg-gray-50 rounded-xl w-56 flex items-center gap-3">
              <img
                src={
                  userProfile.profilePic
                    ? userProfile.profilePic.startsWith("http")
                      ? userProfile.profilePic
                      : BASE_URL + userProfile.profilePic
                    : profile
                }
                className="w-10 h-10 rounded-full object-cover"
                alt="profile"
              />
              <div>
                <p className="text-sm font-semibold text-gray-700">
                  {userProfile.firstName} {userProfile.lastName}
                </p>
                <p className="text-xs text-gray-400">{userProfile.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="w-full text-left text-gray-400 mt-4 lg:mt-60 cursor-pointer hover:text-gray-600 transition"
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
                  onClick={() =>
                    navigate(`/Detail/${car._id}`, { state: { car } })
                  }
                  className="bg-white p-4 rounded-xl shadow-sm w-full max-w-[300px] mx-auto cursor-pointer hover:shadow-md transition"
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold">{car.title}</h3>
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
                    />{" "}
                  </div>

                  <img
                    src={"http://localhost:5000/" + car.pictures[0]}
                    alt={car.title}
                    className="mx-auto my-4 w-[150px] object-contain"
                  />

                  <div className="flex justify-between items-center">
                    <p className="font-bold text-sm">
                      {car.realPrice}
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
                  //  onClick={() =>
                  //   navigate(`/Detail/${item._id}`, { state: { item } })
                  // }
                  className="bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-[300px] mx-auto cursor-pointer"
                >
                  {/* IMAGE */}
                  <div className="h-[160px] w-full overflow-hidden">
                    <img
                      src={
                        item.showRoomPicture?.startsWith("http")
                          ? item.showRoomPicture
                          : "http://localhost:5000/" + item.showRoomPicture
                      }
                      alt="showroom"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4"> 
                    <p className="font-semibold text-sm font-[600] text-black">
                      {item.showRoomName}
                    </p>

                    <p className="text-xs font-[600] text-black mt-1">
                      Location: {item.location}
                    </p>

                    <p className="text-xs font-[600] text-black mt-1">
                      Available cars: {item.carCount}
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
