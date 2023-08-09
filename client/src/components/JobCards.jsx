import React from "react";
import { GrLocation } from "react-icons/gr";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { useAuth } from "../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const JobCards = ({ job }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const handleSave = () => {};

  console.log(auth.userId);
  return (
    <div className="relative m-2 border flex flex-col rounded-lg shadow-xl p-5 w-[350px] max-h-[350px] break-words ">
      <div className="overflow-y-hidden">
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-lg">{job.title}</h3>
          <span className="text-xs flex items-center justify-center">
            <GrLocation /> {job.location}
          </span>
        </div>
        <p className="text-sm overflow-auto" maxLength="10">
          {job.description}
        </p>
      </div>
      <div>
        <span className="text-xs text-gray-500">Posted at 10:30 12/23</span>
      </div>
      <div className="flex items-center text-gray-600 text-sm ">
        <img
          className="w-10 h-10 rounded-full"
          src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
          alt="Company"
        />
        <h1>{job.company}</h1>
      </div>
      <div className="flex justify-between items-center mt-2">
        {job.applicants.includes(auth.userId) ? (
          <button className="bg-green-300 hover:bg-green-300 cursor-not-allowed text-white font-bold rounded-md px-4 py-2">
            Applied
          </button>
        ) : (
          <button className="bg-green-400 hover:bg-green-600 text-white font-bold rounded-md px-4 py-2">
            Apply
          </button>
        )}

        <button
          onClick={() => {
            navigate(`/job/${job._id}`);
          }}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold rounded-md px-4 py-2"
        >
          View More
        </button>
        <div className="absolute top-3 right-3" onClick={handleSave}>
          {job.jobSavedUsers.includes(auth.userId) ? (
            <BsFillBookmarkFill />
          ) : (
            <BsBookmark />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCards;
