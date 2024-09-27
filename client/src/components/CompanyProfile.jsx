/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const CompanyProfile = ({ company }) => {
  const navigate = useNavigate();
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);

  const fetchJobStatus = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/total-jobs/total-applicants`
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

  const truncateDescription = (description, maxLength = 100) => {
    return description.length > maxLength
      ? `${description.slice(0, maxLength)}...`
      : description;
  };

  return (
    <div className="bg-blue-950 p-8 rounded-md  sm:max-w-md w-full mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <button
          onClick={() => navigate("/edit-profile")}
          className="bg-white bg-opacity-20 p-2 rounded-full transition-all duration-300 hover:bg-opacity-30 group"
        >
          <Edit3 className="w-5 h-5 text-white" />
          <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 bg-white text-indigo-600 text-xs font-semibold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Update Profile
          </span>
        </button>
      </div>

      <div className="flex items-center mb-6">
        <img
          className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          src={company.logoUrl || "https://via.placeholder.com/80"}
          alt={`${company.name} logo`} 
        />
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-white">{company.name}</h1>
          <p className="text-indigo-100 text-sm">
            Est. {company.companyEstablishedYear}
          </p>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 rounded-lg p-5 mb-4 shadow-lg">
        <p className="text-indigo-100 text-sm font-medium mb-2">
          {company.email}
        </p>
        <p className="text-white text-sm">
          {company.description
            ? truncateDescription(company.description)
            : "(Add Company Description In Edit Profile)"}
        </p>
      </div>

    

      {/* Stats Section */}
      <div className="bg-white bg-opacity-10 rounded-lg p-5 shadow-lg">
        <div className="flex justify-between text-lg text-indigo-100">
          <div className="text-center">
            <span className="block text-2xl font-bold text-white">
              {totalJobs}
            </span>
            <span>Total Jobs</span>
          </div>
          <div className="text-center">
            <span className="block text-2xl font-bold text-white">
              {totalApplicants}
            </span>
            <span>Total Applicants</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
