import React, { useEffect, useState } from "react";
import EmployeeCard from "../../components/EmployeeCard";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const ViewEmployees = () => {
  const { auth } = useAuth();
  const [employees, setEmployees] = useState([]); // Initialize as an empty array

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

  return (
    <div className="flex flex-col items-center justify-center mb-5 cursor-pointer">
      <h1 className="text-green-600 my-4 text-3xl">Employees</h1>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row flex-wrap">
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
