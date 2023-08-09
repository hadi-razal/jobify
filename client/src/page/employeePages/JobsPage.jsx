import React, { useEffect, useState } from "react";
import JobCards from "../../components/JobCards";
import axios from "axios";
import { useAuth } from "../../context/authContext.jsx";

const JobsPage = () => {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
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

    getAllJobs();
  }, [auth.token]);

  console.log(jobs); // Check the jobs state in the browser console

  return (
    <div>
      <h1 className="text-center text-[80px] text-gray-500">Jobs</h1>
      <div className="flex  items-center justify-center flex-wrap">
        {jobs.map((job) => (
          <JobCards key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
