import { useState } from "react";
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
    <header className="w-full h-[80px] bg-green-600 flex items-center justify-between px-6 lg:px-12 sticky top-0 z-50 shadow-lg">
      {/* Logo */}
      <Link
        to={
          auth?.role === "company"
            ? "/dashboard"
            : auth?.role === "employee"
            ? "/jobs"
            : "/"
        }
        className="text-white font-bold text-2xl cursor-pointer"
      >
        Jobify
      </Link>

      {/* Navigation Links */}
      {location.pathname === "/" || location.pathname === "/about-us" || location.pathname === "/contact" ? (
        <nav className="hidden md:flex items-center gap-6 text-white text-lg">
          <Link to="/about-us" className="hover:text-gray-200 transition">About Us</Link>
          <Link to="/contact" className="hover:text-gray-200 transition">Contact</Link>
        </nav>
      ) : (
        auth?.token && auth?.role === "employee" && (
          <div className="relative">
            <BsFillPersonFill
              onClick={toggleEmployeePopUp}
              className="text-white w-8 h-8 cursor-pointer hover:text-gray-200 transition"
            />
          </div>
        )
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
        <div className="absolute top-[80px] right-[20px] shadow-2xl rounded-lg bg-white p-4 w-[200px]">
          <NavMenu onClose={toggleEmployeePopUp} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
