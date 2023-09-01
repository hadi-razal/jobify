import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PageNotFound = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      if (auth.role) {
        navigate(auth.role === "company" ? "/dashboard" : "/jobs");
      } else {
        navigate("/");
      }
    }
  }, [seconds, auth.role, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-[300px]">
      <h2 className="text-gray-400 text-2xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600">
        Redirecting to the home page in {seconds} seconds...
      </p>
    </div>
  );
};

export default PageNotFound;
