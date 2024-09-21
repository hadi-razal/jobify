import  { useEffect, useState } from "react";
import JobCards from "../../components/JobCards";
import axios from "axios";
import JobSearchBar from "../../components/jobSearchBar";
import JobSortBy from "../../components/jobSortBy";
import { useAuth } from "../../context/authContext.jsx";
import NoJobsFound from "../../components/NoJobsFound";

const JobsPage = () => {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);

  const getAllJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/get-jobs`
      );
      setJobs(res.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const sortJob = (selectedOption) => {
    try {
      const sortedJobs = jobs.slice();

      if (selectedOption === "none") {
        // No need to sort the jobs.
      } else if (selectedOption === "Popular") {
        sortedJobs.sort((a, b) => b.applicants.length - a.applicants.length);
      } else if (selectedOption === "SalaryHighToLow") {
        sortedJobs.sort((a, b) => b.salary - a.salary);
      } else if (selectedOption === "SalaryLowToHigh") {
        sortedJobs.sort((a, b) => a.salary - b.salary);
      } else if (selectedOption === "NewPost") {
        sortedJobs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
      setJobs(sortedJobs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllJobs();
  }, [auth.token]);


  return (
    <div className="flex flex-col mb-4">
      {/* <h1 className="text-center text-[80px] text-gray-500">Jobs</h1> */}
      <div className="text-center mt-3 bg-gray-300 mx-10 md:mx-16 p-5 rounded-lg">
        <JobSearchBar setJobs={setJobs} />
      </div>
      <div className="mt-3 mx-10 flex justify-end md:mx-16 rounded-lg">
        {jobs?.length !== 0 && <JobSortBy sortJob={sortJob} />}
      </div>
      {jobs?.length === 0 && (
        <div className="flex justify-center items-center h-[30vh]">
          <NoJobsFound />
        </div>
      )}
      <div className="flex  items-center justify-center flex-wrap">
        {jobs?.map((job) => (
          <JobCards key={job._id} job={job} reloadJobs={getAllJobs} />
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
