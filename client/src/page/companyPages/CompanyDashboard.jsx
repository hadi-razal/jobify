/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";
// import CompanyStats from "../../components/CompanyStats";
import CompanyProfile from "../../components/CompanyProfile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

import {
  PlusCircle,
  Briefcase,
  Users,
  BookmarkCheck,
  ArrowRight,
} from "lucide-react";

const DashboardCard = ({ title, description, icon: Icon, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white sm:min-w-[270px] sm:max-w-[270px] w-full gap-2 rounded-md p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl  cursor-pointer"
  >
    <Icon size={48} className="text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-center mb-4">{description}</p>
    <ArrowRight size={24} className="text-blue-600" />
  </div>
);

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

  if (!company) {
    return <LoadingPage />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] md:max-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        {/* Company profile section */}
        <div className="md:w-1/2 w-full mb-6 md:mb-0 md:pr-8">
          <CompanyProfile company={company} /> {/* Display company profile */}
        </div>

        {/* Quick actions section */}
        <div className="md:w-1/2 w-full">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Dashboard cards for various actions */}
            <DashboardCard
              title="Create Job Post"
              description="Post a new job opening for your company"
              icon={PlusCircle}
              onClick={() => navigate("/create-job")}
            />
            <DashboardCard
              title="Posted Jobs"
              description="View and manage all your posted job listings"
              icon={Briefcase}
              onClick={() => navigate("/all-posted-jobs")}
            />
            <DashboardCard
              title="View Profiles"
              description="Browse through potential candidate profiles"
              icon={Users}
              onClick={() => navigate("/view-employees")}
            />
            <DashboardCard
              title="Saved Profiles"
              description="Access your shortlisted candidate profiles"
              icon={BookmarkCheck}
              onClick={() => navigate("/saved-profiles")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
