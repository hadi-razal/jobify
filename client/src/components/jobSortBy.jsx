/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const JobSortBy = ({ sortJob }) => {
  const [selectedOption, setSelectedOption] = useState("Popular");

  useEffect(() => {
    sortJob(selectedOption);
  }, [selectedOption]);

  return (
    <div className="w-full sm:w-auto">
      <select
        className="bg-white border-2 border-black font-black uppercase tracking-widest text-black p-4 w-full sm:w-64 rounded-none focus:outline-none focus:ring-4 focus:ring-gray-200 cursor-pointer appearance-none"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="Popular">Sort By: Popular</option>
        <option value="SalaryHighToLow">Sort By: Salary (High To Low)</option>
        <option value="SalaryLowToHigh">Sort By: Salary (Low To High)</option>
        <option value="NewPost">Sort By: Newest Posts</option>
      </select>
    </div>
  );
};

export default JobSortBy;
