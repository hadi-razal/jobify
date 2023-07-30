import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  //   useLocation;
  return (
    <div className="w-full h-22 bg-green-600 flex items-center justify-between p-8 ">
      <Link to={"/"}>
        <div className="text-white font-bold text-[25px] cursor-pointer ">
          Jobify
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
