import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="w-full h-22 bg-green-600 flex items-center justify-between p-8 ">
      <Link to={"/"}>
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
      ) : null}
    </div>
  );
};

export default Navbar;
