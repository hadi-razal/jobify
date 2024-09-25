/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import JobCards from "../../components/JobCards";
import axios from "axios";
import JobSearchBar from "../../components/jobSearchBar";
import JobSortBy from "../../components/jobSortBy";
import { useAuth } from "../../context/authContext.jsx";
import BounceLoader from "react-spinners/BounceLoader";

const JobsPage = () => {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [LoadMoreClicked, setLoadMoreClicked] = useState(false);
  const [jobsToDisplay, setJobsToDisplay] = useState(10); // Default number of jobs to display
  const [isLoading, setIsLoading] = useState(false);

  const getAllJobs = async () => {
    try {
      setIsLoading(true); // Show loader when fetching jobs
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/get-jobs`
      );
      setJobs(res.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false); // Hide loader after jobs are fetched
    }
  };

  const handleLoadMore = () => {
    setLoadMoreClicked(true);
    setJobsToDisplay((prev) => prev + 10);
    setLoadMoreClicked(false); // Load more jobs when clicking "Load More"
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

  const displayedJobs = jobs.slice(0, jobsToDisplay);

  return (
    <div className="flex flex-col gap-2 mb-4 py-5 px-3 md:px-5">
      <div className="text-center flex items-center justify-center w-full">
        <JobSearchBar setJobs={setJobs} />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center pt-20">
          <BounceLoader color="#172554" className=" text-blue-950 text-4xl" />
        </div>
      ) : (
        <>
          <div className="flex justify-end items-center w-full max-w-7xl">
            {jobs?.length !== 0 && <JobSortBy sortJob={sortJob} />}
          </div>

          <div className="flex justify-center items-center rounded-md gap-2 flex-wrap max-w-7xl">
            {displayedJobs.map((job) => (
              <JobCards key={job._id} job={job} reloadJobs={getAllJobs} />
            ))}
          </div>

          <div className="w-full flex items-center justify-center">
            {displayedJobs.length < jobs.length && (
              <button
                onClick={handleLoadMore}
                className="w-[200px] bg-blue-950 text-white rounded-md px-3 py-3 mt-4"
              >
                {LoadMoreClicked ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
          {/* Load More Button */}
        </>
      )}
    </div>
  );
};

export default JobsPage;
