import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { categoryList } from "../constant/jobcategory";
import { BiSearchAlt } from "react-icons/bi";

const JobSearchBar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    setKeyword(searchParams.get("search") || "");
    setCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  const handleSearch = () => {
    const trimmedKeyword = keyword.trim();
    const hasCategory = category && category !== "all";

    const query = new URLSearchParams();
    if (trimmedKeyword) {
      query.set("search", trimmedKeyword);
    }
    if (hasCategory) {
      query.set("category", category);
    }

    const queryString = query.toString();
    navigate(queryString ? `/jobs?${queryString}` : "/jobs");
  };

  return (
    <div className="bg-white py-4 px-4 border-2 border-black shadow-sm rounded-none max-w-7xl w-full">
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
