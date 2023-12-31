import React, { useState } from "react";
import { GrLocation } from "react-icons/gr";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BiSolidPencil } from "react-icons/bi";

//this job card for both employee and company so it contain delete,edit job as an company and save,unsave as an employee

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

  const handleToast = () => {
    toast((t) => (
      <span className="flex flex-col items-center justify-center p-6 gap-4">
        Are You Sure?
        <div className="flex gap-3">
          <button
            className="bg-green-600 rounded-lg p-2"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(job._id);
            }}
          >
            Confirm
          </button>
          <button
            className="bg-red-600 rounded-lg p-2"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </span>
    ));
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/job/delete-job/${id}`
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

  const makeDescriptionVisible = (description) => {
    if (description?.length > 50) {
      return description.slice(0, 60) + "...";
    } else {
      return description;
    }
  };

  return (
    <div className="relative m-2 border flex flex-col rounded-lg shadow-xl p-5 w-[350px] h-[280px] break-words justify-evenly ">
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/job/${job._id}`);
        }}
      >
        <div className="overflow-y-hidden">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">{job?.title}</h3>
            <span className="text-xs font-black flex items-center justify-center">
              <GrLocation /> {job?.location}
            </span>
          </div>
          <h1 className="text-sm">
            <span>Min Work Exp :</span>
            {job?.workExperience} +
          </h1>
          <p className="text-sm overflow-auto">
            {makeDescriptionVisible(job?.description)}
          </p>
        </div>
        <div>
          <span className="text-xs text-gray-500">
            Posted On: {new Date(job?.createdAt).toLocaleDateString("en-GB")}
          </span>
        </div>
        <div className="flex items-center text-gray-600 text-sm ">
          <img
            className="w-10 h-10 rounded-full"
            src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
            alt="Company"
          />
          <h1>{job?.companyName}</h1>
        </div>
        <p
          className={`${
            job?.applicants?.length === 0 ? "text-gray-400" : "text-green-400"
          } text-xs`}
        >
          <span>
            {job?.applicants?.length}{" "}
            {job?.applicants?.length === 1 ? "applicant" : "applicants"}
          </span>
        </p>
      </div>
      <div className="flex justify-between items-center mt-2">
        {auth.role === "employee" &&
          (job?.applicants?.includes(auth.userId) ? (
            <button className="bg-green-300  transition-all duration-1000 ease-in-out hover:bg-green-300 cursor-not-allowed text-white font-bold rounded-md px-4 py-2">
              Applied
            </button>
          ) : (
            <button
              onClick={() => handleApplyJob(job._id)}
              className="bg-green-400  transition-all duration-1000 ease-in-out hover:bg-green-600 text-white font-bold rounded-md px-4 py-2"
            >
              Apply
            </button>
          ))}

        {auth.role === "company" && (
          <button
            onClick={() => {
              handleToast();
            }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-md px-4 py-2"
          >
            Delete Post
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
        <div className="absolute top-3 right-3 cursor-pointer">
          {auth.role === "employee" &&
            (job?.jobSavedUsers?.includes(auth.userId) ? (
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
            ))}

          {auth.role === "company" && (
            <div
              className="relative group"
              onClick={() => navigate(`/job-edit/${job._id}`)}
            >
              <p className="hidden absolute text-[10px] z-10 rounded-lg transition-all duration-300 ease-in-out bg-gray-500 px-3 opacity-0 -mt-4 group-hover:opacity-70 group-hover:flex">
                Edit
              </p>
              <BiSolidPencil className="text-[20px] cursor-pointer transition-all duration-100 ease-in-out group-hover:scale-110" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCards;
