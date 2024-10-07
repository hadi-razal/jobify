import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Info, Mail, LogIn, User, LogOut, X } from "lucide-react";
import NavMenu from "./NavMenu";

const Navbar = () => {
  const { logOut, auth } = useAuth();
  const location = useLocation();
  const [employeePopUp, setEmployeePopUp] = useState(false);

  const toggleEmployeePopUp = () => {
    setEmployeePopUp((prev) => !prev);
  };

  return (
    <header className="w-full h-20 bg-blue-950 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
      {/* Logo */}
      <Link
        to={
          auth?.role === "company"
            ? "/dashboard"
            : auth?.role === "employee"
            ? "/jobs"
            : "/"
        }
        className="text-white font-bold text-3xl cursor-pointer hover:text-blue-200 transition duration-300"
      >
        Jobify
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center gap-6 text-white text-lg">
        {(location.pathname === "/" ||
          location.pathname === "/about-us" ||
          location.pathname === "/contact") && (
          <>
            <Link
              to="/about-us"
              className="md:flex hidden items-center gap-2 hover:text-blue-200 transition duration-300"
            >
              <Info className="w-5 h-5" />
              <span>About Us</span>
            </Link>
            <Link
              to="/contact"
              className="md:flex hidden items-center gap-2 hover:text-blue-200 transition duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>Contact</span>
            </Link>
          </>
        )}
        {!auth?.token && (
          <Link
            to="/login"
            className="flex items-center gap-2 hover:text-blue-200 transition duration-300"
          >
            <LogIn className="w-5 h-5" />
            <span>Login</span>
          </Link>
        )}
      </nav>

      {/* Employee Profile Icon */}
      {auth?.token && auth?.role === "employee" && (
        <div className="relative">
          <button
            onClick={toggleEmployeePopUp}
            className="text-white hover:text-blue-200 transition duration-300 focus:outline-none"
          >
            {!employeePopUp ? (
              <User className="w-8 h-8" />
            ) : (
              <X className="w-8 h-8" />
            )}
          </button>
        </div>
      )}

      {/* Logout button for companies */}
      {auth?.token && auth?.role === "company" && (
        <button
          onClick={logOut}
          className="flex items-center gap-2 text-white hover:text-blue-200 transition duration-300 focus:outline-none"
        >
          <LogOut className="w-6 h-6" />
          <span className="text-lg">Log Out</span>
        </button>
      )}

      {/* Employee Dropdown Menu */}
      {auth?.token && employeePopUp && auth?.role === "employee" && (
        <div className="absolute top-20 right-4">
          <NavMenu onClose={toggleEmployeePopUp} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
