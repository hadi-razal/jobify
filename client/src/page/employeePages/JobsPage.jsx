import React, { useEffect, useState } from "react";
import JobCards from "../../components/JobCards";
import axios from "axios";
import JobSearchBar from "../../components/jobSearchBar";
import JobSortBy from "../../components/jobSortBy";
import { useAuth } from "../../context/authContext.jsx";
import { Navigate } from "react-router-dom";
import NoJobsFound from "../../components/NoJobsFound";

const JobsPage = () => {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/get-jobs`
      );
      console.log(res); // Check the response data in the browser console
      setJobs(res.data.jobs); // Assuming the actual data is in res.data
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [auth.token]);

  if (auth.role === "company") {
    return <Navigate to="/dashboard" />;
  }

  console.log(jobs); // Check the jobs state in the browser console

  return (
    <div className="flex flex-col mb-4">
      {/* <h1 className="text-center text-[80px] text-gray-500">Jobs</h1> */}
      <div className="text-center mt-3 bg-gray-300 mx-10 md:mx-16 p-5 rounded-lg">
        <JobSearchBar />
      </div>
      <div className="mt-3 mx-10 flex justify-end md:mx-16 rounded-lg">
        {jobs.length !== 0 && <JobSortBy />}
      </div>
      {jobs.length === 0 && (
        <div className="flex justify-center items-center h-[30vh]">
          <NoJobsFound />
        </div>
      )}
      <div className="flex  items-center justify-center flex-wrap">
        {jobs.map((job) => (
          <JobCards key={job.id} job={job} reloadJobs={getAllJobs} />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
