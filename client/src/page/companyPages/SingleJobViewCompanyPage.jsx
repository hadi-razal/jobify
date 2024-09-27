import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { MapPin, DollarSign, Briefcase, Users, Calendar } from "lucide-react";
import { useAuth } from "../../context/authContext";
import LoadingPage from "../../components/LoadingPage";
import { timeAgo } from "../../helpers/time";
import toast from "react-hot-toast";

const SingleJobViewCompanyPage = () => {
  const { auth } = useAuth();
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { jobId } = useParams();
  const navigate = useNavigate();

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
  }, [jobId]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/job/delete-job/${id}`
      );
      if (res.data.success === true) {
        navigate("/all-posted-jobs");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setShowModal(false); // Close modal after deletion
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

        <div className="flex justify-center">
          {auth.role === "company" && (
            <div className="flex justify-center">
              <button
                onClick={() => setShowModal(true)} // Show modal on delete click
                className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-md px-4 py-2"
              >
                Delete Job
              </button>
            </div>
          )}
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black opacity-50 fixed inset-0" />
            <div className="bg-white p-6 rounded-lg shadow-lg z-10">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">Are you sure you want to delete this job?</p>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowModal(false)} // Close modal without deleting
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(job._id)} // Call delete function
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleJobViewCompanyPage;
