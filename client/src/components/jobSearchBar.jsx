/* eslint-disable react/prop-types */
import { useState } from "react";
import { categoryList } from "../constant/jobcategory";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";

const JobSearchBar = ({ setJobs }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("all");

  const handleSearch = async () => {
    try {
      const categoryParam = category === "all" ? undefined : category;

      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/search-jobs`,
        {
          params: {
            keyword,
            category: categoryParam,
          },
        }
      );

      if (res.data.success) {
        setJobs(res.data.searchResults);
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="bg-slate-100 py-4 px-2 rounded-md max-w-7xl w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Search Input */}
        <div className="flex flex-col w-full ">
          <label htmlFor="jobSearch" className="sr-only">
            Search Jobs
          </label>
          <input
            type="text"
            id="jobSearch"
            value={keyword}
            placeholder="Search by job title or location"
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-white font-sans w-full  border-gray-300 p-3 rounded-md  focus:outline-none"
            aria-label="Job Search Input"
          />
        </div>

        {/* Category Select */}
        <div className="flex flex-col w-full">
          <label htmlFor="categorySelect" className="sr-only">
            Select Category
          </label>
          <select
            id="categorySelect"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white font-sans border   w-full p-3 rounded-md focus:outline-none"
            aria-label="Category Select"
          >
            <option value="all">All Categories</option>
            {categoryList.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Search Button */}
        <div className="flex flex-col w-full">
          <button
            onClick={handleSearch}
            className="flex w-full items-center justify-center bg-blue-950 hover:bg-blue-900 text-white font-normal p-3 rounded-md transition-all  focus:outline-none"
            aria-label="Search Button"
          >
            <BiSearchAlt className="mr-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearchBar;
