import { useEffect, useState } from "react";
import EmployeeCard from "../../components/EmployeeCard";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import LoadingPage from "../../components/LoadingPage";

const ViewEmployees = () => {
  const { auth } = useAuth();
  const [employees, setEmployees] = useState();

  const getAllEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/employee/get-employees`,
        {
          headers: {
            authorization: auth.token,
          },
        }
      );
      setEmployees(res.data.employees);
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
    <div className="flex flex-col items-center justify-center py-5 px-3">
      <h1 className="sm:text-[40px] text-[35px] font-semibold mb-2  text-gray-400">
        All Registered users in Jobify
      </h1>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row cursor-pointer flex-wrap max-w-6xl w-full">
        {employees.map((employee) => (
          <EmployeeCard
            key={employee._id}
            reloadEmployees={getAllEmployees}
            employee={employee}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewEmployees;
