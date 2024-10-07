import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Search,
  Briefcase,
  TrendingUp,
  Users,
} from "lucide-react";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const features = [
    { icon: Briefcase, text: "100,000+ Job Listings" },
    { icon: TrendingUp, text: "Career Growth Tools" },
    { icon: Users, text: "Expert Career Advice" },
  ];

  return (
    <div className="bg-blue-950 w-full flex flex-col items-center justify-center h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 text-white text-center">
      <div className="max-w-4xl w-full space-y-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
          Elevate Your Career with{" "}
          <span className="text-yellow-300">Jobify</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
          Unlock a world of opportunities and take the next step in your
          professional journey. Let{" "}
          <span className="font-semibold text-yellow-300">Jobify</span> be your
          compass to navigate the ever-changing landscape of career
          possibilities.
        </p>

        <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow px-4 py-3 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
            <button
              type="submit"
              className="bg-yellow-300 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300 flex items-center justify-center"
            >
              <Search className="mr-2" size={20} />
              Search
            </button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <feature.icon className="text-yellow-300 mr-2" size={24} />
              <span className="text-sm sm:text-base md:text-lg font-semibold">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/jobs"
            className="bg-transparent border-2 border-yellow-300 text-yellow-300 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 hover:text-blue-900 transition-colors duration-300 flex items-center justify-center"
          >
            Explore Open Positions
            <ChevronRight className="ml-2" size={20} />
          </Link>
        </div>

        <p className="text-xs sm:text-sm text-gray-300 max-w-2xl mx-auto">
          Join thousands of professionals who have found their dream careers
          through Jobify. Our platform connects you with top employers and
          provides the tools you need to succeed.
        </p>
      </div>
    </div>
  );
};

export default Hero;
