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
      className="relative flex flex-col bg-white border-2 border-black shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200 rounded-none p-5 w-full h-[280px] cursor-pointer group"
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-black uppercase tracking-tighter truncate mb-2">
            {job?.title || "Untitled Job"}
          </h3>
          <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1 mb-2 text-black">
            <GrLocation className="inline-block" size={12} />{" "}
            {job?.location || "No location specified"}
          </span>
          <p className="text-gray-600 font-bold text-sm mb-4 line-clamp-2">
            {job?.description || "No description available"}
          </p>
        </div>

        <div className="flex items-center justify-between text-black text-xs mb-4 border-t-2 border-black pt-3">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-none mr-2 bg-black flex justify-center items-center">
              <span className="text-white font-black text-[10px]">CO</span>
            </div>
            <h1 className="truncate max-w-[120px] font-black uppercase tracking-wider">
              {job?.companyName || "Unknown Company"}
            </h1>
          </div>
          <div
            className={`flex items-center font-black uppercase tracking-widest ${
              job?.applicants?.length === 0 ? "text-gray-400" : "text-black"
            }`}
          >
            <Users className="w-3 h-3 mr-1" strokeWidth={3} />
            <span>
              {job?.applicants?.length || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{jobPostedTime}</span>

        {auth.role === "company" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast((t) => (
                <span className="flex flex-col items-center justify-center p-4 gap-3 bg-white border-2 border-black shadow-sm">
                  <p className="font-bold text-sm">Are you sure you want to delete this job?</p>
                  <div className="flex gap-2 w-full">
                    <button
                      className="flex-1 bg-black text-white font-black uppercase tracking-widest p-2 text-xs"
                      onClick={() => {
                        toast.dismiss(t.id);
                        handleDelete(job._id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="flex-1 border-2 border-black text-black font-black uppercase tracking-widest p-2 text-xs"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </span>
              ));
            }}
            className="border-2 border-black hover:bg-black hover:text-white text-black text-[10px] font-black uppercase tracking-widest rounded-none px-3 py-1.5 transition-colors duration-200"
          >
            Delete
          </button>
        )}

        <div className="absolute top-4 right-4">
          {auth.role === "employee" &&
            (job?.jobSavedUsers?.includes(auth.userId) ? (
              <BsFillBookmarkFill
                size={20}
                className="text-black cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnsave(job._id);
                }}
              />
            ) : (
              <BsBookmark
                size={20}
                className="text-black cursor-pointer hover:scale-110 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave(job._id);
                }}
              />
            ))}

          {auth.role === "company" && (
            <div
              className="relative group bg-white border-2 border-black p-1.5 hover:bg-black transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/job-edit/${job._id}`);
              }}
            >
              <BiSolidPencil className="text-[16px] text-black group-hover:text-white cursor-pointer" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCards;
