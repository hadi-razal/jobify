import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import NavMenu from "./NavMenu";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const { logOut, auth } = useAuth();
  const location = useLocation();
  const [employeePopUp, setEmployeePopUp] = useState(false);

  const toggleEmployeePopUp = () => {
    setEmployeePopUp((prev) => !prev);
  };

  return (
    <header className="w-full h-[80px] bg-blue-950 flex items-center justify-between px-3 lg:px-6 sticky top-0 z-50 border-b-10">
      {/* Logo */}
      <Link
        to={
          auth?.role === "company"
            ? "/dashboard"
            : auth?.role === "employee"
            ? "/jobs"
            : "/"
        }
        className="text-white font-bold text-[35px] cursor-pointer"
      >
        Jobify
      </Link>

      {/* Navigation Links */}
      {(location.pathname === "/" ||
        location.pathname === "/about-us" ||
        location.pathname === "/contact") && (
        <nav className="flex items-center gap-3 text-white text-lg">
          <Link to="/about-us" className="hover:text-gray-200 transition">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-gray-200 transition">
            Contact
          </Link>
        </nav>
      )}

      {/* Employee Profile Icon */}
      {auth?.token && auth?.role === "employee" && (
        <div className="relative">
          {!employeePopUp ? (
            <BsFillPersonFill
              onClick={toggleEmployeePopUp}
              className="text-white w-8 h-8 cursor-pointer hover:text-gray-200 transition"
            />
          ) : (
            <IoMdClose 
              onClick={toggleEmployeePopUp}
              className="text-white w-8 h-8 cursor-pointer hover:text-gray-200 transition"
            />
          )}
        </div>
      )}

      {/* Logout button for companies */}
      {auth?.token && auth?.role === "company" && (
        <div
          onClick={logOut}
          className="flex items-center cursor-pointer gap-2 text-white hover:text-gray-200 transition"
        >
          <HiOutlineLogout className="text-2xl" />
          <span className="text-lg">Log Out</span>
        </div>
      )}

      {/* Employee Dropdown Menu */}
      {auth?.token && employeePopUp && auth?.role === "employee" && (
        <div className="absolute top-[50px] right-[10px]">
          <NavMenu onClose={toggleEmployeePopUp} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
