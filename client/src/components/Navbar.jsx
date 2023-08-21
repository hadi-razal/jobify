import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { BsFillPersonFill } from "react-icons/bs";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const { auth } = useAuth();
  const location = useLocation();
  const [employeePopUp, setEmployeePopUp] = useState(false);

  const toggleEmployeePopUp = () => {
    setEmployeePopUp(!employeePopUp);
  };

  return (
    <div className="w-full h-[99px] bg-green-600 flex items-center justify-between p-8 sticky top-0 z-10 ">
      <Link
        to={
          auth.role === "company"
            ? "/dashboard"
            : auth.role === "employee"
            ? "/jobs"
            : "/"
        }
      >
        <div className="text-white font-bold text-[25px] cursor-pointer ">
          Jobify
        </div>
      </Link>
      {location.pathname === "/" ||
      location.pathname === "/about-us" ||
      location.pathname === "/contact" ? (
        <div>
          <ul className="flex items-center justify-center gap-5 text-white">
            <Link to={"contact"}>
              <li>Contact</li>
            </Link>
            <Link to={"about-us"}>
              <li>About Us</li>
            </Link>
          </ul>
        </div>
      ) : (
        auth.token && (
          <div>
            <BsFillPersonFill
              onClick={toggleEmployeePopUp}
              className="text-white w-7 h-7 cursor-pointer"
            />
          </div>
        )
      )}
      {auth.token && employeePopUp && (
        <div className="absolute top-[50px] shadow-2xl right-[20px]">
          <NavMenu onClose={toggleEmployeePopUp} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
