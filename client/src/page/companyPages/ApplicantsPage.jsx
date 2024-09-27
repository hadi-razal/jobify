import { useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import EmployeeCard from "../../components/EmployeeCard";

const ApplicantsPage = () => {
  const { auth } = useAuth();
  const [applicants, setApplicants] = useState();
  const { jobId } = useParams();

  const getApplicants = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/applicants/${jobId}`,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      console.log(res);
      setApplicants(res.data.applicants);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getApplicants();
  }, []);

  if (!applicants) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-5 px-3 cursor-pointer">
      <h1 className="sm:text-[40px] text-[35px] font-semibold mb-2  text-gray-400">
        Applicants
      </h1>
      <div className="flex items-center justify-center gap-2 flex-wrap max-w-7xl">
        {applicants.map((employee) => (
          <EmployeeCard
            key={employee._id}
            reloadEmployees={getApplicants}
            employee={employee}
          />
        ))}
        {applicants.length === 0 && (
          <div className="flex flex-col h-[300px] items-center justify-center">
            <h1 className="md:text-[50px] text-[40px]  text-gray-600/40">
              No Applicants for this job
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantsPage;
