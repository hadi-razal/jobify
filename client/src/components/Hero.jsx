import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/jobs");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] py-16 px-6 sm:px-8 lg:px-12 bg-white text-black">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black leading-tight uppercase">
          Find the work <br className="hidden md:block"/> that works.
        </h1>

        <p className="text-base sm:text-lg max-w-xl mx-auto text-gray-500 tracking-wide font-medium">
          Discover thousands of job opportunities. Search, apply, and land your next role effortlessly.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-xl mx-auto mt-8">
          <div className="flex border-2 border-black bg-white rounded-none focus-within:border-gray-800 transition-all overflow-hidden p-1">
            <div className="flex-grow flex items-center px-3">
              <Search className="text-black" size={18} />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2.5 pl-3 bg-transparent text-black placeholder-gray-400 focus:outline-none text-sm font-bold"
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white px-6 py-2.5 rounded-none font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors text-xs"
            >
              Search
            </button>
          </div>
        </form>

        <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">Popular:</p>
          <div className="flex gap-2 flex-wrap justify-center">
             {["Remote", "Software Engineer", "Marketing", "Design"].map(term => (
               <span key={term} className="px-3 py-1 border border-gray-300 rounded-none bg-white text-black text-[10px] font-bold uppercase tracking-wider">
                 {term}
               </span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
