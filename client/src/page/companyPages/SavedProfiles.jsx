import { useEffect, useState } from "react";
import EmployeeCard from "../../components/EmployeeCard";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";

const SavedProfiles = () => {
  const { auth } = useAuth();
  const [employees, setEmployees] = useState();
  const navigate = useNavigate();

  const getAllEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/company/get-profiles`,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      console.log(res);
      setEmployees(res.data.employees.savedProfile);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, [auth.token]);

  if (!employees) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-5 px-3 cursor-pointer">
      <h1 className="sm:text-[40px] text-[35px] font-semibold mb-2  text-gray-400">
        Saved Profiles
      </h1>
      <div className="flex items-center justify-center gap-3 sm:flex-row flex-wrap max-w-6xl">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee._id}
            reloadEmployees={getAllEmployees}
            employee={employee}
          />
        ))}
        {employees.length === 0 && (
          <div className="flex flex-col h-[300px] items-center justify-center">
            <h1 className="md:text-[50px] text-[40px]  text-gray-600/40">
              No Profiles Saved
            </h1>
            <span
              className="text-[10px] text-gray-500/70 cursor-pointer"
              onClick={() => navigate("/view-employees")}
            >
              View Profiles
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProfiles;
