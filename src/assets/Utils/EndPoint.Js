export const ENDPOINTS = {
  // AUTH
  login: "/auth/login",
  registeration: "/auth/register",
  verify: "/auth/verify",
  verifyreset: "/auth/verifyForReset",
  resendOTP: "/auth/resendOTP",
  forgotpassword: "/auth/forgot",
  resetpassword: "/auth/reset",
  viewProfile: "/auth/viewProfile",
  updateProfile: "/auth/updateProfile", 

  // CARS
  products: "/car/getAll",
  searchCars: "/car/searchcars",
  getbyid: (id) => `/car/getOne/${id}`,

  // BRANDS
  brands: "/brand/getAll",

  // SHOWROOM
  showroom: "/showroom/getAll",

  // FAVORITES
  addFavorite: "/favorite/addFavorite",
  removeFavorite: "/favorite/removeFavorite",
  getFavorites: "/favorite",

  // NOTIFICATIONS
  notifications: "/notification",
  readNotification: "/notification/readSingleNotification",
  readAllNotifications: "/notification/readAllNotifications",

  // BOOKINGS
  addBooking: "/booking/addtobooking",
  getBookings: "/booking/getAll",
   login: "/auth/login",
    registeration: "/auth/register",
    getProfile: "/auth/viewProfile",
    forgotpassword: "/auth/forgot",

    resetpassword: "/auth/reset",

    updateProfile: "/auth/updateProfile",
    showroom: '/showroom',
    userShowroom: "/showroom/get/userShowRoom",
    locations: "/location/getAll",
    showroomstatus: "/showroom/approve",
    // OTP,
    resendOTP: "/auth/resendOTP",
    //Reset
    verifyreset: "/auth/verifyForReset",
    verify: "/auth/verify",
    //Notification
    readAll: "/notification/approval/readAll",
    readone: "/notification/approval/singleRead",
    readNotification: ``,
    showroom: '/showroom/getAll',
    // unreadNotification: `/notification/approval/notifications?page=${pageno}&pageSize=${readNotificationCount}&isRead=false`
    //cars
    createcar: `/car/create`,
    carapproval: `/car/approve`,
    getBrands: `/brand/getAll`,
    getLocations: `/location/getAll`,
    getSingleBooking: (id) => {
        return `/booking//getById/${id}`;
    },
    getSingleCar: (id) => {
        return `/car/getOne/${id}`;
    },
    updateCar: (id) => {
        return `/car/update/${id}`;
    },
    addshowroom: "/showroom",
    usershowroom: `/showroom/get/userShowRoom`,
    getShowroom: (id) => {
        return `/showroom/${id}`;
    },

    bookingOfCar: `/booking/addtobooking`,

    searchcar: (query) => {
        return `/car/searchcars?search=${query}&page=1&pageSize=10`;
    },

    superAdminShowroom: (pageno, pagesize, filter) => {
        return `/showroom/getAll?page=${pageno}&pageSize=${pagesize}&status=${filter}`
    },

    showroomcars: (pageno = 1, pagesize = 8, filter, showroomId) => {
        return { 
            link: `/showroom/getAll?page=${pageno}&pageSize=${pagesize}`,
            recentcar: `/car/getAll?page=${pageno}&pageSize=${pagesize}`,
            bookedcars: `/booking/getAll?page=${pageno}&pageSize=${pagesize}&status=${filter}`,
            getCars: `/car/getall?pageSize=${pageno}&page=${pagesize}&status=${filter}`,
            myshowroomcars: `/car/getAll?showroomId=${localStorage.getItem("Showroomid")}&page=${pageno}pageSize=${pagesize}&status=${filter}`,
            myorders: `/booking/getAll?status=${filter}&showRoom=${showroomId}&page=${pageno}&pageSize=${pagesize}`,
            readNotification: `/notification/approval/notifications?page=${pageno}&pageSize=${pagesize}&isRead=true`,
            unreadNotification: `/notification/approval/notifications?page=${pageno}&pageSize=${pagesize}&isRead=false`,
            favcars: `/favorite?page=${pageno}&pageSize=${pagesize}`,

        }
    },



};
