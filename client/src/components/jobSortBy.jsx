import React, { useState, useEffect } from "react";
// import axios from "axios";

const JobSortBy = ({ sortJob }) => {
  const [selectedOption, setSelectedOption] = useState("none");

  useEffect(() => {
    sortJob(selectedOption);
  }, [selectedOption]);
  return (
    <div>
      <select
        className="bg-gray-200 max-w-[250px] p-2 focus:outline-none rounded-lg"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="Popular">Popular</option>
        <option value="SalaryHighToLow">Salary High To Low</option>
        <option value="SalaryLowToHigh">Salary Low To High</option>
        <option value="NewPost">New Post</option>
      </select>
    </div>
  );
};

export default JobSortBy;
