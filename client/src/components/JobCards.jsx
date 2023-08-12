import React from "react";
import { GrLocation } from "react-icons/gr";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const JobCards = ({ job, reloadJobs }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSave = async (id) => {
    console.log(id);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/employee/save-job/${id}`
      );
      console.log(res);
      if (res.data.success === true) {
        reloadJobs();
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
    console.log(id);
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/employee/unsave-job/${id}`
      );
      console.log(res);
      if (res.data.success === true) {
        reloadJobs();
        toast.success(res.data.message);
      }
      if (res.data.success === false) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplyJob = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/job/apply-for-job/${id}`
      );
      console.log(res);
      if (res.data.success === true) {
        reloadJobs();
        toast.success(res.data.message);
      }
      if (res.data.success === false) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <h1>{job.companyName}</h1>
      </div>
      <p
        className={`${
          job.applicants.length === 0 ? "text-gray-400" : "text-green-400"
        } text-xs`}
      >
        <span>
          {job.applicants.length}{" "}
          {job.applicants.length === 1 ? "applicant" : "applicants"}
        </span>
      </p>
      <div className="flex justify-between items-center mt-2">
        {job.applicants.includes(auth.userId) ? (
          <button className="bg-green-300 hover:bg-green-300 cursor-not-allowed text-white font-bold rounded-md px-4 py-2">
            Applied
          </button>
        ) : (
          <button
            onClick={() => handleApplyJob(job._id)}
            className="bg-green-400 hover:bg-green-600 text-white font-bold rounded-md px-4 py-2"
          >
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
        <div className="absolute top-3 right-3">
          {job.jobSavedUsers.includes(auth.userId) ? (
            <BsFillBookmarkFill
              onClick={() => {
                handleUnsave(job._id);
              }}
            />
          ) : (
            <BsBookmark
              onClick={() => {
                handleSave(job._id);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCards;
