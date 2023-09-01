import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { BiSolidPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";

const ViewProfile = () => {
  const [employee, setEmployee] = useState();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/employee/get-single-employee/${
          auth.userId
        }`
      );
      console.log(res);
      setEmployee(res.data.employee);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const makeDescriptionVisible = (description) => {
    if (description?.length > 300) {
      return description.slice(0, 300) + "...";
    } else {
      return description;
    }
  };

  if (!employee) {
    return <LoadingPage />;
  }

  return (
    <div className="p-10 ">
      <div className="bg-gray-200 rounded-2xl py-5 px-5 gap-3 flex flex-col items-center justify-center relative ">
        <span className="text-black text-[10px] font-light">
          Joined On :{" "}
          {new Date(employee?.createdAt).toLocaleDateString("en-GB")}
        </span>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            className="rounded-full w-20 h-20"
          />
        </div>

        <div className="flex flex-col items-center gap-3 justify-center">
          <h1 className="text-[20px]">{employee?.name}</h1>
          <div className="flex flex-col items-center justify-start font-sans">
            <p>
              <span className=" text-[15px]"> Education </span> :{" "}
              {employee?.education}
            </p>
            <p>
              <span className=" text-[15px]"> Work Experience </span> :{" "}
              {employee?.workExperience}
            </p>
            <p>
              <span className=" text-[15px]"> Location </span> :{" "}
              {employee?.location ? (
                employee.location
              ) : (
                <span className="text-sm "> Not specified</span>
              )}
            </p>
          </div>
          <p className="px-7">
            {employee?.description ? (
              makeDescriptionVisible(employee.description)
            ) : (
              <span className="text-[10px]">
                add description from edit profile
              </span>
            )}
          </p>
        </div>
        <div
          onClick={handleEdit}
          className="absolute cursor-pointer top-7 right-7"
        >
          <BiSolidPencil className="text-[20px] text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
