import React, { useEffect, useState } from "react";
import EmployeeCard from "../../components/EmployeeCard";
import { useAuth } from "../../context/authContext";
import axios from "axios";

const ViewEmployees = () => {
  const { auth } = useAuth();
  const [employee, setEmployee] = useState();
  const getAllEmployees = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/employee/get-employees`
      );
      console.log(res); // Check the response data in the browser console
      setEmployee(res.data.employees); // Assuming the actual data is in res.data
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    getAllEmployees();
  }, [auth.token]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-blue-500">Employees</h1>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row flex-wrap">
        <EmployeeCard reloadEmployees={getAllEmployees} employee={employee} />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
        <EmployeeCard />
      </div>
    </div>
  );
};

export default ViewEmployees;
