import React, { useState } from "react";
import { categoryList } from "../constant/jobcategory";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";

const JobSearchBar = ({ setJobs }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = async () => {
    try {
      let categoryParam = category; // Use the selected category
      if (category === "all") {
        categoryParam = undefined; // Send undefined to the backend to indicate all categories
      }

      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/search-jobs`,
        {
          params: {
            keyword,
            category: categoryParam, // Use the modified category parameter
          },
        }
      );

      if (res.data.success === true) {
        setJobs(res.data.searchResults);
        console.log(res.data.searchResults);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1">
        <input
          type="text"
          value={keyword}
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-gray-200 p-2 focus:outline-none w-[250px] rounded-lg"
        />

        <select
          id="categorySelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-200 w-[250px] p-2 focus:outline-none rounded-lg"
        >
          <option value="all">All Category</option>
          {categoryList.map((c, index) => (
            <option key={index} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSearch}
        className="flex items-center max-w-[250px] justify-center bg-green-500 hover:bg-green-600 text-white font-bold rounded-md p-2 md:p-5 mt-2 md:mt-0 w-full md:w-auto"
      >
        <BiSearchAlt />
      </button>
    </div>
  );
};

export default JobSearchBar;
