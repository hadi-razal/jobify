import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const { logOut, auth } = useAuth();
  const location = useLocation();
  const [employeePopUp, setEmployeePopUp] = useState(false);

  const toggleEmployeePopUp = () => {
    setEmployeePopUp(!employeePopUp);
  };

  return (
    <div className="w-full h-[99px] bg-green-600 flex items-center justify-between p-8 sticky top-0 z-10">
      <Link
        to={
          auth.role === "company"
            ? "/dashboard"
            : auth.role === "employee"
            ? "/jobs"
            : "/"
        }
      >
        <div className="text-white font-bold text-[25px] cursor-pointer">
          Jobify
        </div>
      </Link>
      {location.pathname === "/" ||
      location.pathname === "/about-us" ||
      location.pathname === "/contact" ? (
        <ul className="flex items-center justify-center gap-5 text-white">
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
        </ul>
      ) : (
        auth.token &&
        auth.role === "employee" && (
          <div>
            <BsFillPersonFill
              onClick={toggleEmployeePopUp}
              className="text-white w-7 h-7 cursor-pointer"
            />
          </div>
        )
      )}
      {auth.token && auth.role === "company" && (
        <div
          onClick={logOut}
          className="flex items-center cursor-pointer justify-center gap-1"
        >
          <HiOutlineLogout className="text-[20px] text-white" />
          {/* <button className="text-white text-[20px] shadow-2xl">Log Out</button> */}
        </div>
      )}
      {auth.token && employeePopUp && auth.role === "employee" && (
        <div className="absolute top-[50px] shadow-2xl right-[20px]">
          <NavMenu onClose={toggleEmployeePopUp} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
