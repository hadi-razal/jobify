/* eslint-disable react/prop-types */
import { GrLocation } from "react-icons/gr";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { Users } from "lucide-react";
import { BiSolidPencil } from "react-icons/bi";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { timeAgo } from "../helpers/time";

const JobCards = ({ job, reloadJobs }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleSave = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/employee/save-job/${id}`
      );
      if (res.data.success) {
        reloadJobs();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving the job");
    }
  };

  const handleUnsave = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/employee/unsave-job/${id}`
      );
      if (res.data.success) {
        reloadJobs();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while unsaving the job");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/job/delete-job/${id}`
      );
      if (res.data.success) {
        reloadJobs();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while deleting the job");
    }
  };

  const handleApplyJob = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/job/apply-for-job/${id}`
      );
      if (res.data.success) {
        reloadJobs();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while applying for the job");
    }
  };

  const jobPostedTime = timeAgo(job?.createdAt);

  return (
    <div
      onClick={() => {
        if (auth.role === "company") {
          navigate(`/company/job/${job._id}`);
        } else {
          navigate(`/job/${job._id}`);
        }
      }}
      className="relative border flex flex-col bg-slate-50 rounded-md p-4 w-full sm:w-[400px] h-[220px]"
    >
      <div className="cursor-pointer flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold truncate mb-1">
            {job?.title || "Untitled Job"}
          </h3>
          <span className="text-xs font-medium flex items-center gap-1 mb-2">
            <GrLocation className="inline-block" size={12} />{" "}
            {job?.location || "No location specified"}
          </span>
          <p className="text-gray-700 text-sm mb-3 line-clamp-3">
            {job?.description || "No description available"}
          </p>
        </div>

        <div className="flex items-center justify-between text-gray-600 text-sm mb-2">
          <div className="flex items-center">
            <img
              className="w-8 h-8 rounded-full mr-2"
              src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
              alt="Company"
            />
            <h1 className="truncate max-w-[150px]">
              {job?.companyName || "Unknown Company"}
            </h1>
          </div>
          <div
            className={`flex items-center text-xs ${
              job?.applicants?.length === 0 ? "text-gray-400" : "text-blue-950"
            }`}
          >
            <Users className="w-4 h-4 mr-1" />
            <span>
              {job?.applicants?.length || 0}{" "}
              {job?.applicants?.length === 1 ? "applicant" : "applicants"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <span className="text-xs text-gray-500">{jobPostedTime}</span>

        {auth.role === "employee" &&
          (job?.applicants?.includes(auth.userId) ? (
            <button className="bg-gray-300 text-gray-600 text-sm font-semibold py-1 px-3 rounded-lg cursor-not-allowed">
              Applied
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleApplyJob(job._id);
              }}
              className="bg-blue-950 text-white text-sm py-1 px-3 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-200"
            >
              Apply
            </button>
          ))}

        {auth.role === "company" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast((t) => (
                <span className="flex flex-col items-center justify-center p-4 gap-3">
                  <p>Are you sure you want to delete this job?</p>
                  <div className="flex gap-2">
                    <button
                      className="bg-red-600 text-white rounded-lg p-2 text-sm"
                      onClick={() => {
                        toast.dismiss(t.id);
                        handleDelete(job._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 rounded-lg p-2 text-sm"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </span>
              ));
            }}
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-md px-3 py-1 transition-colors duration-200"
          >
            Delete
          </button>
        )}

        <div className="absolute top-3 right-3">
          {auth.role === "employee" &&
            (job?.jobSavedUsers?.includes(auth.userId) ? (
              <BsFillBookmarkFill
                size={20}
                className="text-blue-950 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnsave(job._id);
                }}
              />
            ) : (
              <BsBookmark
                size={20}
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave(job._id);
                }}
              />
            ))}

          {auth.role === "company" && (
            <div
              className="relative group"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/job-edit/${job._id}`);
              }}
            >
              <p className="hidden absolute text-[10px] z-10 rounded-lg transition-all duration-300 ease-in-out bg-gray-500 px-2 py-1 -mt-8 -ml-6 group-hover:flex">
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
