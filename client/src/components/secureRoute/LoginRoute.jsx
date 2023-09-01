import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const LoginRoute = ({ children }) => {
  const { auth } = useAuth();
  if (!auth.token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default LoginRoute;
