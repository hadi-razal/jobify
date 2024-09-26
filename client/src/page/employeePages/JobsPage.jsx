import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/authContext.jsx";
import JobSearchBar from "../../components/JobSearchBar";
import JobSortBy from "../../components/JobSortBy";
import JobCards from "../../components/JobCards.jsx";

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
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <JobSearchBar setJobs={setJobs} />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
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
                className="px-6 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors duration-300"
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
