import React from "react";
import { BsSearch } from "react-icons/bs";

const NoJobsFound = () => {
  return (
    <div className="flex flex-col justify-center items-center text-gray-500">
      <BsSearch className="w-24 h-24" />
      <p className="text-lg">No Jobs Found</p>
    </div>
  );
};

export default NoJobsFound;
