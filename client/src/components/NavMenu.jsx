/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import ClickAwayListener from "react-click-away-listener";
import { User, Briefcase, BookmarkCheck, LogOut } from "lucide-react";

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

  const menuItems = [
    { icon: User, label: "Profile", path: "/profile" },
    { icon: Briefcase, label: "Applied Jobs", path: "/appliedjobs" },
    { icon: BookmarkCheck, label: "Saved Jobs", path: "/savedjobs" },
    {
      icon: LogOut,
      label: "Log Out",
      action: logOut,
      className: "text-red-600",
    },
  ];

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div
        className={`w-64 bg-white rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out transform absolute top-12 right-4 z-10 ${
          active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px]"
        }`}
      >
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  if (item.path) {
                    handleNavigation(item.path);
                  } else if (item.action) {
                    item.action();
                    onClose();
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded-md transition-colors duration-200 hover:bg-gray-100 ${
                  item.className || ""
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
              {index < menuItems.length - 1 && (
                <hr className="my-1 border-gray-200" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </ClickAwayListener>
  );
};

export default NavMenu;
