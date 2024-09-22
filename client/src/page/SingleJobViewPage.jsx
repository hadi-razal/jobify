import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../components/LoadingPage";
import { GrLocation } from "react-icons/gr";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";

const SingleJobViewPage = () => {
  const { auth } = useAuth();
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const getSingleJob = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/single-job/${params.jobId}`
      );
      setJob(res.data.sPage);
    } catch (error) {
      console.error(error);
    }
  };

  const getCompanyDetails = async () => {
    if (job && job.companyId) {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/company/get-company/${
            job.companyId
          }`
        );
        if (res.data.success === true) {
          setCompany(res.data.company);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getSingleJob();
  }, []);

  useEffect(() => {
    getCompanyDetails();
  }, [job]);

  const handleApplyJob = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/job/apply-for-job/${job._id}`
      );
      if (res.data.success === true) {
        getSingleJob();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveApplication = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/job/remove-job-application/${
          job._id
        }`
      );
      if (res.data.success === true) {
        getSingleJob();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleApplicants = async () => {
    try {
      if (auth.role === "employee") {
        return;
      }
      if (auth.role === "company") {
        navigate(`/applicants/${job._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navbarHeight = 99;

  if (!job && !company) {
    return <LoadingPage />;
  }

  const formatTextWithLineBreaks = (text) => {
    if (!text) return "";

    return text
      .replace(/## (.+)/g, '<h2 class="text-lg font-semibold mt-2">$1</h2>') // Convert ## to h2
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "</p><p>") // Convert double line breaks to paragraph breaks
      .replace(/\n/g, "<br>"); // Convert single line breaks to <br>
  };

  return (
    <div className="">
      {job && (
        <div
          className="bg-white md:px-5 px-3 py-5 rounded-sm"
          style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
        >
          <div className="flex flex-col items-start mb-4">
            <div className="flex flex-col items-start gap-2">
              <h1 className="text-2xl font-semibold">{job.title}</h1>
              <span className="text-gray-600 flex justify-center items-center gap-2">
                <GrLocation />
                {job.location}
              </span>
              <span className="text-gray-500">
                &#8377; {!job.salary ? "Not Disclosed" : job.salary}
              </span>
              <span className="text-gray-500 font-normal">{job.category}</span>
              <span
                onClick={() => handleApplicants()}
                className={`text-blue-950 ${
                  auth.role === "company" && "cursor-pointer"
                } `}
              >
                {auth.role === "company" ? "View Applicants" : "Applicants"} :{" "}
                {""}
                {job?.applicants?.length}
              </span>
            </div>

            <div
              onClick={() => {
                navigate(`/company/${company._id}`);
              }}
              className="p-3 my-3 cursor-pointer rounded-sm"
            >
              <div className="flex gap-3 items-center justify-start">
                <div className="">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
                    className=" p-2 w-16 h-16"
                    alt="Company Logo"
                  />
                </div>
                <div>
                  <h1>{company?.name}</h1>
                  <h1 className="text-sm font-thin">
                    <span>email</span> : {company?.email}
                  </h1>
                </div>
              </div>
            </div>

            <p
              className="text-gray-700 font-normal"
              dangerouslySetInnerHTML={{
                __html: formatTextWithLineBreaks(
                  job?.description || "No description available"
                ),
              }}
            ></p>
          </div>

          <div className="h-16 my-7 rounded-md flex justify-center items-center text-white font-semibold">
            {job.applicants.includes(auth?.userId) ? (
              <button
                onClick={() => {
                  handleRemoveApplication();
                }}
                className="bg-red-600 transition-all duration-700 ease-in-out px-7 py-3 w-[300px] rounded-md"
              >
                Cancel Application
              </button>
            ) : (
              <button
                onClick={() => {
                  handleApplyJob();
                }}
                className="bg-blue-950 transition-all duration-700 ease-in-out w-[300px] px-7 py-3 rounded-md"
              >
                Apply
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleJobViewPage;
