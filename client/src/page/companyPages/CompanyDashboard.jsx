import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
import CompanyStats from "../../components/CompanyStats";
import CompanyProfile from "../../components/CompanyProfile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const CompanyDashboard = () => {
  const [company, setCompany] = useState();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const getCompanyDetails = async () => {
    try {
      const headers = {
        Authorization: `${auth.token}`,
      };
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/company/get-my-company`,
        { headers }
      );
      setCompany(res.data.company);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCompanyDetails();
  }, []);

  // Check if company data is available before rendering
  if (!company) {
    return <LoadingPage />;
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row items-center p-5 justify-center text-white">
        <CompanyProfile company={company} />
        <CompanyStats />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row items-center p-5 justify-center text-white">
        <button
          onClick={() => {
            navigate("/create-job");
          }}
          className="bg-green-500 md:w-[200px] h-20 w-full cursor-pointer p-5 rounded-lg hover:bg-green-600"
        >
          Create New Job Post
        </button>
        <button
          onClick={() => {
            navigate("/all-posted-jobs");
          }}
          className="bg-green-500 md:w-[200px] h-20 w-full cursor-pointer p-5 rounded-lg hover:bg-green-600"
        >
          View All Posted Jobs
        </button>
        <button
          onClick={() => {
            navigate("/view-employees");
          }}
          className="bg-green-500 md:w-[200px] h-20 w-full cursor-pointer p-5 rounded-lg hover:bg-green-600"
        >
          View Profiles
        </button>
        <button
          onClick={() => {
            navigate("/saved-profiles");
          }}
          className="bg-green-500 md:w-[200px]  h-20 w-full cursor-pointer p-5 rounded-lg hover:bg-green-600"
        >
          View Saved Profiles
        </button>
      </div>
    </div>
  );
};

export default CompanyDashboard;
