import React from "react";

const CompanyStats = () => {
  return (
    <div className="bg-gray-600  rounded-lg h-[250px] w-full flex flex-col items-center justify-center shadow-2xl">
      <h2>
        Total Jobs Posted : <span> 30</span>
      </h2>
      <h2 className="underline cursor-pointer">View All Jobs</h2>
      <h2 className="underline cursor-pointer">View Saved Profiles</h2>
      {/* ... display jobs posted */}
    </div>
  );
};

export default CompanyStats;
