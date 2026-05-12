import Toast from "../Toaster/Toaster";

export const obj = {
    userhome: '/showroomowner/homecars',
    usercardetails: "/showroomowner/homecars/cardetails",
    userfavcardetails: "/showroomowner/favouriteCar/cardetails",
    bookedcars: "/showroomowner/bookedcars",
    bookedcardetails: "/showroomowner/bookedcars/cardetails",
    superadmincardetails: "/showroomowner/showroomcars/cardetails",
    userrentcar: "/showroomowner/showroomcars/rentcar",
    usershowroomcars: "/showroomowner/showroomcars",
    myorders: "/showroomowner/myorders",
    superadminhome: "/showroomowner/showrooms",
    superadminshowroom: "/showroomowner/showrooms/addshowroom",
    superadmincars: "/showroomowner/cars",
    superadminrentcar: "/showroomowner/cars/rentcar",
    forgotpassforgotpasswordword: "",
    showroomnotification: "/showroomowner/notification/addshowroom",
    //App Routes
    otpverification: "/user-verification",
    userverification: "/otpverification",
    otpverify: "/user-verification/otpverification",
    forgottedpassword: "/login/forgotpassword/otpverification",
    register: "/register",
    role: "/role",
    resetpassword: "/retakingauthority",
    myprofile: "/my-profile",
    Error404: "*",
    login: '/',
    loginpage: "/login",
    register: "/register",
    forgotpass: "/login/forgotpassword",
    //Components
    showroomowner: "/showroomowner",
    usernotification: "/showroomowner/notification",
    cardetails: "cardetails",
    rentcar: "rentcar",
    cars: "cars",
    recentcar: "recentcars",
    addshowroom: "addshowroom",
    notification: "notification",
    showroomcars: "showroomcars",
    favoritecar: "favouriteCar",
    showrooms: "showrooms",
    myorderstext: "myorders",
    homecars: "homecars",
    bookingpending: "bookingpending",
    bookedcarstext: "bookedcars",
    rentcarone: 'showroomcars/rentcar',
    rentcartwo: 'cars/rentcar',
    showroomCars: 'homecars/showroomCars',
    showroomCarDetails: 'homecars/showroomCars/cardetails',
    cardetailsone: 'bookedcars/cardetails',
    cardetailstwo: 'homecars/cardetails',
    cardetailsthree: '/showroomowner/homecars/recentcars/cardetails',
    cardetailsfour: 'showroomcars/cardetails',
    cardetailsfive: 'notification/cardetails',
    cardetailssix: 'showroomowner/homecars/showroomCars/cardetails',
    cardetailseven: 'favouriteCar/cardetails',
    cardetailseight: '/showroomowner/homecars/searchedcars/cardetails',
    cardetailsnine: `/showroomowner/homecars/showroomCars/cardetails`,
    // bookedcardetails: `/showroomowner/myorders/cardetails`,
    myorderdetails: `/showroomowner/myorders/cardetails`,
    bookingpendingone: `showroomowner/favouriteCar/cardetails/bookingpending`,
    bookingpendingtwo: `showroomowner/homecars/cardetails/bookingpending/recentcars/cardetails/bookingpending`,
    bookingpendingthree: 'homecars/cardetails/bookingpending',
    bookingpendingfour: `/showroomowner/homecars/searchedcars/cardetails/bookingpending`,
    bookingpendingfive: `/showroomowner/homecars/recentcars/cardetails/bookingpending`,
    bookingpendingsix: `/showroomowner/homecars/showroomCars/cardetails/bookingpending`,
    createshowroomone: 'showrooms/addshowroom',
    createshowroomtwo: 'notification/addshowroom',
    favcarone: '/showroomowner/homecars/recentcars',
    resetpassword: "/resetcomponent",
    retakingauthority: "/retakingauthority",
    rentacar: "/rentacar",
    searchedcars: `/showroomowner/homecars/searchedcars`,
    showroomcarstwo: `showroomCars`,


}

export const EndPoint = {
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

}



export async function myorders(status, carId) {
    // const Token = localStorage.get,i,Item("Token");
    // const URL = `http://localhost:5000/api/booking/updateStatus`;
    const endPoint = '/booking/updateStatus';
    const method = `post`;
    const body = {
        'status': status,
        'booking': carId,
    }
    try {
        let response = await serverRequestHandler(endPoint, method, body);
        Toast.success(response.data?.message ?? `Booking is ${status} Successfully`, {
            autoClose: 1000,
        });
    } catch (error) {
        Toast.error(error.messsage ?? error ?? `* Failed to ${status} Booking`);

    }



}