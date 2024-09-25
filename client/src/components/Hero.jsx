import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import RegisterOptionModal from "./RegisterOptionModal";

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (type) => {
    if (type === "employee") {
      navigate("/register/employee");
    } else if (type === "company") {
      navigate("/register/company");
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex flex-col justify-center items-center min-h-screen text-white text-center overflow-hidden w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full  px-4 sm:px-6 lg:px-8 z-10"
      >
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8 leading-tight">
          Discover Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            Dream Career
          </span>
        </h1>
        <p className="text-xl sm:text-2xl lg:text-3xl mb-10 text-gray-300 max-w-4xl mx-auto">
          Join our thriving community of professionals and unlock a world of
          opportunities. Let Jobify be your guide to success in the
          ever-evolving job market.
        </p>
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-yellow-300 mb-12"
        >
          Your future starts here!
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 font-bold mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Link
              to="/login"
              className="bg-white text-blue-950 flex items-center justify-center py-4 px-8 rounded-full w-full sm:w-64 transition duration-300 ease-in-out shadow-lg hover:bg-blue-100 hover:text-blue-800 group"
            >
              <span className="text-lg mr-2 group-hover:mr-4 transition-all">
                Login
              </span>
              <ChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-950 py-4 px-8 flex items-center justify-center rounded-full w-full sm:w-64 transition duration-300 ease-in-out shadow-lg hover:from-yellow-500 hover:to-yellow-600 group"
            >
              <span className="text-lg mr-2 group-hover:mr-4 transition-all">
                Register
              </span>
              <ChevronRight
                size={24}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16"
        >
          <Link
            to="/jobs"
            className="text-yellow-300 hover:text-yellow-400 flex items-center justify-center text-lg font-semibold group"
          >
            <span className="mr-2 group-hover:mr-4 transition-all">
              Explore Open Positions
            </span>
            <ArrowRight
              size={24}
              className="group-hover:translate-x-2 transition-transform"
            />
          </Link>
        </motion.div>
      </motion.div>

      <RegisterOptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
      />

      {/* Enhanced Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-3000"></div>
      </div>
    </div>
  );
};

export default Hero;
