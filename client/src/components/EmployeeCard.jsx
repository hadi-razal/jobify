/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import axios from "axios";

const EmployeeCard = ({ employee, reloadEmployees }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { auth } = useAuth();

  const handleSaveToggle = useCallback(async () => {
    try {
      const url = `${import.meta.env.VITE_SERVER_URL}/company/${
        isSaved ? "unsave" : "save"
      }-profile/${employee._id}`;
      const headers = { Authorization: auth.token };

      const res = await axios.put(url, {}, { headers });

      if (res.data.success) {
        setIsSaved(!isSaved);
        reloadEmployees();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error toggling save status:", error);
      toast.error("An error occurred. Please try again.");
    }
  }, [isSaved, employee._id, auth.token, reloadEmployees]);

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const headers = { Authorization: auth.token };
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/company/get-my-company`,
          { headers }
        );
        setIsSaved(res.data.company.savedProfile.includes(employee._id));
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    checkSavedStatus();
  }, [auth.token, employee._id]);

  const truncateDescription = (description, maxLength = 100) => {
    return description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description;
  };

  return (
    <div className="bg-white shadow-md border rounded-lg p-4 w-full  min-h-[350px] max-h-[350px] sm:min-w-[300px] sm:max-w-[300px] transition-all hover:shadow-lg hover:border-gray-300 flex flex-col">
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <img
            src={
              employee.profilePicture ||
              "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            }
            alt={`${employee.name}'s profile`}
            className="rounded-full shadow-md h-12 w-12 object-cover"
          />
          <h1 className="text-lg font-semibold text-gray-800">
            {employee.name}
          </h1>
        </div>
        <div className="flex flex-col justify-between items-start text-xs font-semibold mb-2">
          <span className="text-gray-600">{employee.email}</span>
          {employee.resumeURL && (
            <a
              href={employee.resumeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Resume
            </a>
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {employee.description
            ? truncateDescription(employee.description)
            : "No description available."}
        </p>
      </div>

      <button
        className={`w-full flex items-center justify-center gap-2 p-2 rounded-md transition-colors ${
          isSaved
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-950 hover:bg-blue-900 text-white"
        }`}
        onClick={handleSaveToggle}
      >
        {isSaved ? <BsFillBookmarkFill /> : <BsBookmark />}
        <span>{isSaved ? "Remove From Saved" : "Save This Profile"}</span>
      </button>
    </div>
  );
};

export default EmployeeCard;
