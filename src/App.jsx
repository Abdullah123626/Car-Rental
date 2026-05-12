import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavBarTop />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/Mailverify" element={<Mailverification />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/UserSelection" element={<UserSelection />} />
        <Route path="/HomeCarRent" element={<HomeCarRent />} />
        <Route path="/NavBarTop" element={<NavBarTop />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/NavBar" element={<NavBar />} />
      </Routes>
    </Router>
  );
}

export default App;
