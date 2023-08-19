import axios from "axios";
import React, { useEffect, useState } from "react";

const CompanyStats = () => {
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);

  const fetchJobStatus = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/total-jobs/total-applicants` // Update the API endpoint
      );

      if (res.data.success === true) {
        setTotalJobs(res.data.totalJobs);
        const applicantsCount = res.data.jobsWithApplicantsCount.reduce(
          (total, job) => total + job.applicantsCount,
          0
        );

        setTotalApplicants(applicantsCount);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching job status:", error);
    }
  };

  useEffect(() => {
    fetchJobStatus();
  }, []);

  return (
    <div className="bg-gray-600  rounded-lg h-[250px] w-full flex flex-col items-center justify-center shadow-2xl">
      <h2>
        Total Jobs Posted : <span> {totalJobs}</span>
      </h2>
      <h2>
        Total Applicants : <span> {totalApplicants}</span>
      </h2>
    </div>
  );
};

export default CompanyStats;
