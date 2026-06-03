import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Detail from "./assets/Components/Detailcarrent/Detail";
import NavBar from "./assets/Components/NavBar/NavBar";
import NavBarTop from "./assets/Components/NavBarTop/NavBArTop";
import HomeCarRent from "./assets/Components/HomeCarRent/HomeCarRent";
import Signin from "./assets/Components/SignIn/Signin";
import SignUp from "./assets/Components/Sinup/Signup";
import Mailverification from "./assets/Components/Mailverification/Mailverification";
import ResetPassword from "./assets/Components/ResetPassword/ResetPassword";
import ChangePassword from "./assets/Components/ChangePassword/ChangePassword";
import UserSelection from "./assets/Components/UserSelection/UserSelection";
import Favourites from "./assets/Components/Favourites/Favourites";
import { ToastContainer } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("Token");
  return token ? children : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("Token");
  return token ? <Navigate to="/NavBarTop" replace /> : children;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute><Signin /></PublicRoute>} />
          <Route path="/Signup" element={<PublicRoute><SignUp /></PublicRoute>} />
          <Route path="/Mailverify" element={<PublicRoute><Mailverification /></PublicRoute>} />
          <Route path="/ResetPassword" element={<PublicRoute><ResetPassword /></PublicRoute>} />
          <Route path="/ChangePassword" element={<PublicRoute><ChangePassword /></PublicRoute>} />
          <Route path="/UserSelection" element={<ProtectedRoute><UserSelection /></ProtectedRoute>} />
          <Route path="/HomeCarRent" element={<ProtectedRoute><HomeCarRent /></ProtectedRoute>} />
          <Route path="/NavBarTop" element={<ProtectedRoute><NavBarTop /></ProtectedRoute>} />
          <Route path="/Detail/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
          <Route path="/NavBar" element={<ProtectedRoute><NavBar /></ProtectedRoute>} />
          <Route path="/Favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
