import React, { useEffect, useState } from "react";
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
    <div className="flex flex-col items-center justify-center mb-5 ">
      <h1 className="text-gray-400 my-4 text-[30px]">
        All Employees Rgistered in Jobify
      </h1>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row cursor-pointer flex-wrap">
        {employees.map((employee) => (
          <div key={employee._id}>
            <EmployeeCard
              reloadEmployees={getAllEmployees}
              employee={employee}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewEmployees;
