import React from "react";
import { FaSpinner } from "react-icons/fa"; 
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[300px]">
      <div className="flex flex-col items-center space-y-4">
        <FaSpinner className="animate-spin text-green-500 text-4xl" />
        <h1 className="text-2xl  font-semibold text-gray-600">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingPage;
