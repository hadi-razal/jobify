import React, { useEffect, useState } from "react";
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
  const handleRemoveApplicantion = async () => {
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

  return (
    <div className="">
      {job ? (
        <div
          className="bg-white p-10 rounded-lg shadow-md"
          style={{ minHeight: `calc(100vh - ${navbarHeight}px)` }}
        >
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-semibold">{job.title}</h1>
            <span className="text-gray-600 flex justify-center items-center gap-2">
              <GrLocation />
              {job.location}
            </span>
          </div>
          <span className="text-gray-500">
            &#8377; {!job.salary ? "Not Disclosed" : job.salary}
          </span>
          <div className="mt-4">
            <div className="text-sm flex flex-col gap-3 text-gray-600">
              <span>Category: {job.category}</span>
              <span
                onClick={() => handleApplicants()}
                className={`text-green-500 ${
                  auth.role === "company" && "cursor-pointer"
                } `}
              >
                Applicants: {job?.applicants?.length}
              </span>
            </div>

            <div
              onClick={() => {
                navigate(`/company/${company._id}`);
              }}
              className="p-3 my-3 cursor-pointer bg-gray-200 shadow-xl rounded-lg"
            >
              <div className="flex gap-3 items-center justify-start">
                <div className="">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
                    className="rounded-full shadow-md p-2 w-16 h-16"
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
            <h2 className="text-lg font-semibold mt-2">Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div className="h-16 my-7 rounded-lg flex justify-center items-center text-white font-semibold">
            {job.applicants.includes(auth?.userId) ? (
              <button
                onClick={() => {
                  handleRemoveApplicantion();
                }}
                className="bg-red-600 transition-all duration-700 ease-in-out px-7 py-3 w-[300px] rounded-lg "
              >
                Cancel Application
              </button>
            ) : (
              <button
                onClick={() => {
                  handleApplyJob();
                }}
                className="bg-green-600 transition-all duration-700 ease-in-out w-[300px] px-7 py-3 rounded-lg "
              >
                Apply
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <LoadingPage />
        </div>
      )}
    </div>
  );
};

export default SingleJobViewPage;
