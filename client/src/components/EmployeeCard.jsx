import React from "react";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ employee, getAllEmployees }) => {
  return (
    <div className=" rounded-lg w-[300px] items-center shadow-2xl justify-center p-7 relative">
      <div className="flex items-center justify-start gap-3 mb-3">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
          alt="profile"
          className="rounded-full shadow-lg  h-10 w-10"
        />
        <h1 className="font-semibold">Hadi Razal</h1>
      </div>
      <div className="font-medium">
        <h1>
          Work Experience : <span>3 Yrs+</span>
        </h1>
        <h1>
          Education: <span>Masters In Computer Science</span>
        </h1>

        <p>
          <span>About :</span>
          Iam Good Guy With HardWorking Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Fugit molestiae voluptatibus molestias dignissimos?
        </p>
      </div>
      <div className="flex justify-center items-center text-xs font-semibold mt-1">
        <span>hadirasal22@gmail.com</span>
      </div>
      <div>
        <div className="flex items-center justify-center bg-gray-400 rounded-lg p-3 mt-2 gap-3">
          <BsFillBookmarkFill /> <span>Save This Profile</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
