import React from "react";

const jobSortBy = () => {
  return (
    <div>
      <select className="bg-gray-200 max-w-[250px] p-2 focus:outline-none rounded-lg">
        <option>Popular</option>
        <option>Salary High To low</option>
        <option>Salary Low To High</option>
        <option>New Post</option>
      </select>
    </div>
  );
};

export default jobSortBy;
