import React, { useEffect, useState } from "react";
import EmployeeCard from "../../components/EmployeeCard";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SavedProfiles = () => {
  const { auth } = useAuth();
  const [employees, setEmployees] = useState([]);
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

  console.log(employees);

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
