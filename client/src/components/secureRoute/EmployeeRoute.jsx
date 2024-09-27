/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const EmployeeRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth.token) {
    return <Navigate to="/login" />;
  }
  if (auth.role === "company") {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default EmployeeRoute;
