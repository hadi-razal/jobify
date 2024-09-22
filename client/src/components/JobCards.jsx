/* eslint-disable react/prop-types */
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
            className="bg-blue-800 rounded-lg p-2"
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
    if (description?.length > 30) {
      return description.slice(0, 30) + "...";
    } else {
      return description;
    }
  };

  const formatTextWithLineBreaks = (text) => {
    if (!text) return "";

    return text
      .replace(/## (.+)/g, '<h2 class="text-lg font-semibold mt-2">$1</h2>') // Convert ## to h2
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "</p><p>") // Convert double line breaks to paragraph breaks
      .replace(/\n/g, "<br>"); // Convert single line breaks to <br>
  };

  return (
    <div className="relative border flex gap-2 flex-col bg-slate-50 rounded-md p-5 sm:w-[300px] min-h-[290px] max-h-[290px] w-full  break-words justify-evenly ">
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/job/${job._id}`);
        }}
      >
        <div className="flex flex-col items-start justify-center gap-1">
          <h3 className="text-lg font-semibold">{job?.title}</h3>
          <span className="text-xs font-semibold flex gap-1 items-center justify-center">
            <GrLocation /> {job?.location}
          </span>
          <p className="text-sm overflow-auto">{}</p>
          <p
            className="text-gray-700 font-normal"
            dangerouslySetInnerHTML={{
              __html: formatTextWithLineBreaks(
                makeDescriptionVisible(job?.description) ||
                  "No description available"
              ),
            }}
          ></p>
          <span className="text-xs text-gray-500">
            Posted On : {new Date(job?.createdAt).toLocaleDateString("en-GB")}
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
            job?.applicants?.length === 0 ? "text-gray-400" : "text-blue-950"
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
            <button className="bg-blue-950 bg-opacity-90 transition-all duration-1000 ease-in-out  cursor-not-allowed text-white font-bold rounded-md px-4 py-2">
              Applied
            </button>
          ) : (
            <button
              onClick={() => handleApplyJob(job._id)}
              className="bg-blue-950  transition-all duration-1000 ease-in-out hover:bg-blue-900 text-white font-bold rounded-md px-4 py-2"
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
