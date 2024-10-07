import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, DollarSign, Briefcase, Users, Calendar } from "lucide-react";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import LoadingPage from "../components/LoadingPage";
import { timeAgo } from "../helpers/time";
import JobCards from "../components/JobCards";

const SingleJobViewPage = () => {
  const { auth } = useAuth();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [company, setCompany] = useState(null);
  const { jobId } = useParams();
  const navigate = useNavigate();

  const getAllJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/get-jobs`
      );
      setRelatedJobs(res.data.jobs);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    const fetchJobAndCompany = async () => {
      try {
        const jobRes = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/job/single-job/${jobId}`
        );
        setJob(jobRes.data.sPage);

        if (jobRes.data.sPage?.companyId) {
          const companyRes = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/company/get-company/${
              jobRes.data.sPage.companyId
            }`
          );
          setCompany(companyRes.data.company);
        }
      } catch (error) {
        console.error("Error fetching job and company details:", error);
      }
    };

    fetchJobAndCompany();
    getAllJobs();
  }, [jobId]);

  const handleApplyJob = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/job/apply-for-job/${job._id}`
      );
      if (res.data.success) {
        setJob((prevJob) => ({
          ...prevJob,
          applicants: [...prevJob.applicants, auth.userId],
        }));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("Failed to apply for job");
    }
  };

  const handleRemoveApplication = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/job/remove-job-application/${
          job._id
        }`
      );
      if (res.data.success) {
        setJob((prevJob) => ({
          ...prevJob,
          applicants: prevJob.applicants.filter((id) => id !== auth.userId),
        }));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error removing application:", error);
      toast.error("Failed to remove application");
    }
  };

  const handleApplicants = () => {
    if (auth.role === "company") {
      navigate(`/applicants/${job._id}`);
    }
  };

  const formatDescription = (text) => {
    if (!text) return "";
    return text
      .replace(
        /## (.+)/g,
        '<h2 class="text-xl font-semibold mt-6 mb-2">$1</h2>'
      )
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n\n/g, "</p><p class='mb-4'>")
      .replace(/\n/g, "<br>");
  };

  const jobPostedTime = timeAgo(job?.createdAt);

  if (!job || !company) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto px-4 py-5 pb-10 max-w-7xl">
      <div className="bg-white shadow-sm rounded-lg ">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
              <span>
                {job.salary ? `₹${job.salary}` : "Salary not disclosed"}
              </span>
            </div>
            <div className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.category}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              <span
                onClick={handleApplicants}
                className={
                  auth.role === "company" ? "cursor-pointer text-blue-600" : ""
                }
              >
                {auth.role === "company" ? "View" : ""} {job.applicants.length}{" "}
                Applicants
              </span>
            </div>
          </div>

          <div className="flex items-center text-gray-600 mt-4">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{jobPostedTime}</span>
          </div>
        </div>

        <div className="border-t border-b py-4 mb-6">
          <div
            onClick={() => navigate(`/company/${company._id}`)}
            className="flex items-center cursor-pointer"
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
              className="w-12 h-12 mr-4 rounded"
              alt={company.name}
            />
            <div>
              <h2 className="font-semibold">{company.name}</h2>
              <p className="text-sm text-gray-600">{company.email}</p>
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <div
            dangerouslySetInnerHTML={{
              __html: formatDescription(
                job.description || "No description available"
              ),
            }}
          />
        </div>

        {auth.role === "employee" && (
          <div className="flex justify-center">
            <button
              onClick={
                job.applicants.includes(auth?.userId)
                  ? handleRemoveApplication
                  : handleApplyJob
              }
              className={`px-6 py-2 rounded-md text-white font-medium transition-colors duration-300 ${
                job.applicants.includes(auth?.userId)
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-950 hover:bg-blue-900"
              }`}
            >
              {job.applicants.includes(auth?.userId)
                ? "Withdraw Application"
                : "Apply Now"}
            </button>
          </div>
        )}

        {!auth.role && (
          <div className="flex items-center justify-center">
            <span className="text-md opacity-50 text-center w-full">
              Please login to apply for this job
            </span>
          </div>
        )}

        {/* related jobs  */}

        <div className="flex flex-col gap-3 items-center justify-center mt-10">
          <h1 className="sm:text-[40px] text-[35px] font-semibold mb-2 text-gray-400">
            Related Jobs
          </h1>

          <div className="flex items-center justify-center flex-wrap gap-2 mb10">
            {relatedJobs.length > 0 &&
              relatedJobs
                .filter((relatedJob) => relatedJob._id !== jobId)
                .slice(0, 6)
                .map((relatedJob) => (
                  <JobCards
                    key={relatedJob._id}
                    job={relatedJob}
                    reloadJobs={getAllJobs}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJobViewPage;
