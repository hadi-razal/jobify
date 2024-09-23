/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";

const NavMenu = ({ onClose }) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  useEffect(() => {
    setActive(true);
    return () => {
      setActive(false);
    };
  }, []);

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div
        className={`w-[200px] h-[200px] flex flex-col justify-center ${
          active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px]"
        } bg-slate-100 rounded-lg p-5 transition-all duration-300 ease-in-out transform absolute top-[40px] right-[10px] z-10 shadow-md`}
      >
        <ul>
          <li
            className="cursor-pointer text-center py-1 hover:bg-gray-100"
            onClick={() => handleNavigation("/profile")}
          >
            Profile
          </li>
          <hr className="my-1" />
          <li
            className="cursor-pointer text-center py-1 hover:bg-gray-100"
            onClick={() => handleNavigation("/appliedjobs")}
          >
            Applied Jobs
          </li>
          <hr className="my-1" />
          <li
            className="cursor-pointer text-center py-1 hover:bg-gray-100"
            onClick={() => handleNavigation("/savedjobs")}
          >
            Saved Jobs
          </li>
          <hr className="my-1" />
          <li
            className="text-red-600 text-center cursor-pointer py-1 hover:bg-gray-100"
            onClick={() => {
              logOut();
              onClose();
            }}
          >
            Log Out
          </li>
        </ul>
      </div>
    </ClickAwayListener>
  );
};

export default NavMenu;
