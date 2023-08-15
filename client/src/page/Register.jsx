import React from "react";
import { Navigate, useParams } from "react-router-dom";
import CompanyRegisterForm from "../components/companyRegisterForm";
import EmployeeRegisterForm from "../components/employeeRegisterForm";
import { useAuth } from "../context/authContext";

const Register = () => {
  const { role } = useParams();
  const { auth } = useAuth();

  if (auth.role === "company") {
    return <Navigate to={"/company"} />;
  }
  if (auth.role === "employee") {
    return <Navigate to={"/jobs"} />;
  }

  return (
    <div className="flex items-center justify-center">
      {role === "company" ? <CompanyRegisterForm /> : <EmployeeRegisterForm />}
    </div>
  );
};

export default Register;
