/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const CompanyRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth.token) {
    return <Navigate to="/login" />;
  }
  if (auth.role === "employee") {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default CompanyRoute;
