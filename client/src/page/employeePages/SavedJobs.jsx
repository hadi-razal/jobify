import axios from "axios";
import { useEffect, useState } from "react";
import JobCards from "../../components/JobCards";
import NoJobsFound from "../../components/NoJobsFound";
import LoadingPage from "../../components/LoadingPage";

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

  if (!savedJob) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-5 px-3">
      <h1 className="sm:text-[40px] text-[35px] font-semibold mb-2  text-gray-400">
        Saved Jobs
      </h1>
      <div className="flex justify-center items-center  rounded-md gap-2 flex-wrap max-w-7xl">
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
