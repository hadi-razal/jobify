import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext.jsx";
import JobSearchBar from "../../components/jobSearchBar.jsx";
import JobSortBy from "../../components/jobSortBy.jsx";
import JobCards from "../../components/JobCards.jsx";
import LoadingPage from "../../components/LoadingPage.jsx";

const JobsPage = () => {
  const { auth } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [jobsToDisplay, setJobsToDisplay] = useState(12);

  const getAllJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/get-jobs`
      );
      setJobs(res.data.jobs);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setJobsToDisplay((prev) => prev + 12);
  };

  const sortJob = (selectedOption) => {
    const sortedJobs = [...jobs];
    switch (selectedOption) {
      case "Popular":
        sortedJobs.sort((a, b) => b.applicants.length - a.applicants.length);
        break;
      case "SalaryHighToLow":
        sortedJobs.sort((a, b) => b.salary - a.salary);
        break;
      case "SalaryLowToHigh":
        sortedJobs.sort((a, b) => a.salary - b.salary);
        break;
      case "NewPost":
        sortedJobs.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
      // No sorting
    }
    setJobs(sortedJobs);
  };

  useEffect(() => {
    getAllJobs();
  }, [auth.token]);

  const displayedJobs = jobs.slice(0, jobsToDisplay);

  return (
    <div className="container mx-auto px-3 py-5 max-w-7xl">
      <div className="mb-2">
        <JobSearchBar setJobs={setJobs} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingPage />
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p>No jobs available at the moment. Please check back later!</p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 justify-between mb-2">
            {/* <button
              onClick={getAllJobs}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              Reset Search
            </button> */}
            {jobs.length > 0 && <JobSortBy sortJob={sortJob} />}
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2">
            {displayedJobs.map((job) => (
              <JobCards key={job._id} job={job} reloadJobs={getAllJobs} />
            ))}
          </div>

          {displayedJobs.length < jobs.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-4 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors duration-300"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobsPage;
