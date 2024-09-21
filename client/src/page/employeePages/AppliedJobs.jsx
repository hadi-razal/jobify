import axios from "axios";
import { useEffect, useState } from "react";
import JobCards from "../../components/JobCards";
import NoJobsFound from "../../components/NoJobsFound";
import LoadingPage from "../../components/LoadingPage";

const AppliedJobs = () => {
  const [appliedJob, setAppliedJobs] = useState();
  const getAppliedJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/employee/get-applied-jobs`
      );
      setAppliedJobs(res.data.appliedJobs);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppliedJobs();
  }, []);

  if (!appliedJob) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[40px] text-gray-400">Applied Jobs</h1>
      <span className="text text-red-600 text-[10px]">
        to cancel application click on view more
      </span>
      <div className="flex  items-center justify-center flex-wrap">
        {appliedJob?.map((job, i) => (
          <JobCards job={job} key={i} reloadJobs={getAppliedJobs} />
        ))}
      </div>
      {appliedJob?.length === 0 && (
        <div className="flex justify-center items-center h-[30vh]">
          <NoJobsFound />
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
