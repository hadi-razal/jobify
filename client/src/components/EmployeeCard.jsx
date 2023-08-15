import React, { useEffect, useState } from "react";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();
  const [company, setCompany] = useState([]);
  const { auth } = useAuth();

  const handleSave = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/company/save-profile/${id}`,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      if (res.data.success === true) {
        getCompany();
        toast.success(res.data.message);
      }
      if (res.data.success === false) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnsave = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/company/unsave-profile/${id}`
      );
      if (res.data.success === true) {
        getCompany();
        toast.success(res.data.message);
      }
      if (res.data.success === false) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCompany = async () => {
    try {
      const headers = {
        Authorization: `${auth.token}`,
      };
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/company/get-my-company`,
        { headers }
      );
      console.log(res);
      setCompany(res.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const makeDescriptionVisible = (description) => {
    if (description.length > 50) {
      return description.slice(0, 200) + "...";
    } else {
      return description;
    }
  };

  return (
    <div className="rounded-lg border w-[300px] items-center  shadow-2xl h-[330px] justify-between  p-7 relative flex flex-col">
      <div
        onClick={() => {
          navigate(`/employee/profile/${employee._id}`);
        }}
      >
        <div className="flex items-center justify-start gap-3 mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt="profile"
            className="rounded-full shadow-lg h-10 w-10"
          />
          <h1 className="text-m">{employee?.name}</h1>
        </div>
        <div className="text-sm">
          <h1>
            Work Experience : <span>{employee.workExperience} Yrs+</span>
          </h1>
          <h1>
            Education: <span>{employee.education}</span>
          </h1>
          <p className="text-xs">
            {employee.description
              ? makeDescriptionVisible(employee.description)
              : "Profile Has No Description"}
          </p>
        </div>
        <div className="flex-grow"></div>{" "}
        {/* This will push the save profile section to the bottom */}
        <div className="flex justify-center items-center text-xs font-semibold mt-1">
          <span>{employee.email}</span>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center text-white bg-green-500 cursor-pointer rounded-lg p-3 mt-2 gap-3">
          {company?.savedProfile?.includes(employee._id) ? (
            <div
              className="flex items-center justify-center gap-3"
              onClick={() => {
                handleUnsave(employee._id);
              }}
            >
              <BsFillBookmarkFill />
              <span>Remove From Saved</span>
            </div>
          ) : (
            <div
              className="flex items-center justify-center gap-3"
              onClick={() => {
                handleSave(employee._id);
              }}
            >
              <BsBookmark />
              <span>Save This Profile</span>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default EmployeeCard;
