/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EmployeeCard = ({ employee, reloadEmployees }) => {
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
      if (res.data.success) {
        getCompany();
        toast.success(res.data.message);
      } else {
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
      if (res.data.success) {
        getCompany();
        reloadEmployees();
        toast.success(res.data.message);
      } else {
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
      setCompany(res.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const makeDescriptionVisible = (description) => {
    return description.length > 50
      ? `${description.slice(0, 100)}...`
      : description;
  };

  return (
    <div className="relative flex flex-col justify-between bg-slate-100 shadow-md border rounded-lg p-4 w-full sm:max-w-[300px] min-h-[235px] transition-all hover:shadow-lg hover:border-gray-300">
      <div
        className="cursor-pointer"
        // onClick={() => navigate(`/employee/profile/${employee._id}`)}
      >
        <div className="flex items-center gap-3 mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt="profile"
            className="rounded-full shadow-md h-12 w-12"
          />
          <h1 className="text-lg font-semibold text-gray-800">
            {employee?.name}
          </h1>
        </div>
        <div className="text-sm text-gray-700">
          <p className="text-sm text-gray-600 mt-2">
            {employee.description
              ? makeDescriptionVisible(employee.description)
              : "No description available."}
          </p>
        </div>
      </div>

      <div className="flex text-xs font-semibold mt-2">
        <span className="text-gray-600">{employee.email}</span>
        <a
          href={employee.resumeURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 ml-2 underline"
        >
          View Resume
        </a>
      </div>

      <div className="mt-4">
        {company?.savedProfile?.includes(employee._id) ? (
          <button
            className="w-full flex items-center justify-center gap-2 p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            onClick={() => handleUnsave(employee._id)}
          >
            <BsFillBookmarkFill />
            <span>Remove From Saved</span>
          </button>
        ) : (
          <button
            className="w-full flex items-center justify-center gap-2 p-2 rounded-md bg-blue-950 text-white hover:bg-blue-900 transition-colors"
            onClick={() => handleSave(employee._id)}
          >
            <BsBookmark />
            <span>Save This Profile</span>
          </button>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default EmployeeCard;
