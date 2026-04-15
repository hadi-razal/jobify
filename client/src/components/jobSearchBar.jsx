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
    <div className="bg-white py-4 px-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none max-w-7xl w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
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
            className="bg-white text-black font-bold border-2 border-black p-3 rounded-none focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all placeholder:text-gray-500 w-full"
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
            className="bg-white text-black font-bold uppercase border-2 border-black p-3 rounded-none focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all w-full cursor-pointer appearance-none text-sm tracking-wide"
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
            className="flex w-full items-center justify-center bg-black hover:bg-gray-800 text-white font-black uppercase tracking-widest p-3 rounded-none transition-colors border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-gray-500"
            aria-label="Search Button"
          >
            <BiSearchAlt className="mr-2 w-5 h-5" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearchBar;
