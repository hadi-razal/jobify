import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const { logOut } = useAuth();
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <div className="w-full h-22 bg-green-600 flex items-center justify-between p-8 sticky top-0 z-10 ">
      <Link to={auth.role === "company" ? "/company" : "/jobs"}>
        <div className="text-white font-bold text-[25px] cursor-pointer ">
          Jobify
        </div>
      </Link>
      {location.pathname === "/" ? (
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
        <button onClick={() => logOut()}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
