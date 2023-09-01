import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";

const NavMenu = ({ onClose }) => {
  const { logOut, auth } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  const HandleSavedJobs = () => {
    navigate(`/savedjobs`);
    onClose();
  };

  const HandleAppliedJobs = () => {
    navigate(`/appliedjobs`);
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
        className={`w-[200px] h-[200px] flex flex-col justify-center  ${
          active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px]"
        } bg-white rounded-lg p-5 transition-all duration-300 ease-in-out transform absolute top-[40px] right-[10px] z-10 shadow-md`}
      >
        <ul>
          <li
            className="cursor-pointer text-center py-1 hover:bg-gray-100"
            onClick={() => {
              navigate("/view-profile");
              onClose();
            }}
          >
            Profile
          </li>
          <hr className="my-1" />
          <li
            className="cursor-pointer text-center py-1 hover:bg-gray-100"
            onClick={HandleAppliedJobs}
          >
            Applied Jobs
          </li>
          <hr className="my-1" />
          <li
            className="cursor-pointer text-center py-1 hover:bg-gray-100"
            onClick={HandleSavedJobs}
          >
            Saved Jobs
          </li>
          <hr className="my-1" />
          <li
            className="text-red-600 text-center cursor-pointer py-1 hover:bg-gray-100"
            onClick={logOut}
          >
            Log Out
          </li>
        </ul>
      </div>
    </ClickAwayListener>
  );
};

export default NavMenu;
