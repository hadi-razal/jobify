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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10 max-w-6xl">
        <div className="mb-6">
          {/* Header Title for the Grid */}
          <div className="border-b-2 border-black pb-3 mb-6">
            <h1 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tighter">Explore Jobs</h1>
          </div>
          <JobSearchBar setJobs={setJobs} />
        </div>

        {isLoading ? (
          <LoadingPage />
        ) : jobs.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-48 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white p-6">
            <p className="text-xl font-black uppercase tracking-widest text-black">No jobs available at the moment.</p>
            <p className="text-gray-500 font-bold text-sm mt-2">Please check back later!</p>
          </div>
        ) : (
          <>
            <div className="flex sm:flex-row flex-col items-start sm:items-center justify-between mb-6 pb-3 border-b border-gray-200">
              <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 sm:mb-0">
                Displaying {displayedJobs.length} of {jobs.length} Opportunities
              </h2>
              {jobs.length > 0 && <JobSortBy sortJob={sortJob} />}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-12">
              {displayedJobs.map((job) => (
                <JobCards key={job._id} job={job} reloadJobs={getAllJobs} />
              ))}
            </div>

            {displayedJobs.length < jobs.length && (
              <div className="flex justify-center w-full mb-16">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-4 bg-white border-2 border-black text-black font-black text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none"
                >
                  Load More Outcomes
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
