import React from "react";
import { category } from "../constant/jobcategory";
import { BiSearchAlt } from "react-icons/bi";

const JobSearchBar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-200 p-2 focus:outline-none min-w-[250px] rounded-lg"
        />

        <select
          id="categorySelect"
          className="bg-gray-200 max-w-[250px] p-2 focus:outline-none rounded-lg"
        >
          <option>Category</option>
          {category?.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button className=" flex items-center max-w-[250px] justify-center  bg-green-500 hover:bg-green-600 text-white font-bold rounded-md p-2 md:p-5 mt-2 md:mt-0 w-full md:w-auto">
        <BiSearchAlt />
      </button>
    </div>
  );
};

export default JobSearchBar;
