import axios from "axios";
import React, { useEffect, useState } from "react";
import JobCards from "../../components/JobCards";
import NoJobsFound from "../../components/NoJobsFound";

const SavedJobs = () => {
  const [savedJob, setSavedJob] = useState();
  const getSavedJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/employee/get-saved-jobs`
      );
      setSavedJob(res.data.savedJobs);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedJobs();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[40px] text-gray-400">Saved Jobs</h1>
      <div className="flex  items-center justify-center flex-wrap">
        {savedJob?.map((job, i) => (
          <JobCards job={job} key={i} reloadJobs={getSavedJobs} />
        ))}
      </div>
      {savedJob?.length === 0 && (
        <div className="flex justify-center items-center h-[30vh]">
          <NoJobsFound />
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
