import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import JobCards from "../../components/JobCards";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";

const PostedJobs = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState();

  const getAllJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/get-jobs-mycompany`
      );
      console.log(res);
      setJobs(res.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  if (!jobs) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="mb-3 flex flex-col justify-center items-center">
        <h1 className="sm:text-[30px] text-[20px] underline mt-5 text-green-600 ">
          All Jobs Posted By Your Company
        </h1>
        <div className="flex items-center justify-center flex-wrap">
          {jobs?.map((job) => (
            <JobCards key={job._id} job={job} reloadJobs={getAllJobs} />
          ))}
        </div>
      </div>

      {jobs?.length === 0 && (
        <div className="flex flex-col h-[300px] items-center justify-center">
          <h1 className="md:text-[50px]  text-gray-600/40">
            No Jobs Posted By Your Company
          </h1>
          <span
            className="text-[10px] text-gray-500/70 cursor-pointer"
            onClick={() => navigate("/create-job")}
          >
            Click To Post Now
          </span>
        </div>
      )}
    </>
  );
};

export default PostedJobs;
