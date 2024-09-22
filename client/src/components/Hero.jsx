import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegsiterOptionModal from "./RegisterOptionModal"; // Adjust the import path as necessary

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
    <div className="relative bg-gradient-to-r from-blue-950 to-blue-900 px-3 flex flex-col justify-center items-center min-h-[calc(100vh-80px)] text-white text-center">
      <h1 className="text-4xl font-bold mb-4">
        Looking For a Job?{" "}
        <span className="text-yellow-300">At the Right Place</span>
      </h1>
      <p className="text-lg md:px-16 mb-6">
        Join our thriving community of job seekers today and embark on an
        exciting new chapter in your professional life. Let Jobify be your
        trusted companion on the path to success. Your dream job awaits!
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 font-bold text-gray-800 mt-8 mb-7">
        <Link
          to="/login"
          className="bg-white text-blue-950 flex justify-center py-4 rounded-lg w-[250px] hover:bg-gray-100 transition duration-300 ease-in-out shadow-lg"
        >
          <h1 className="text-lg">Login</h1>
        </Link>
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-white text-blue-950 py-4 flex justify-center rounded-lg w-[250px] hover:bg-gray-100 transition duration-300 ease-in-out shadow-lg cursor-pointer"
        >
          <h1 className="text-lg">Register</h1>
        </div>
      </div>

      <div className="flex items-center justify-center px-3">
        <RegsiterOptionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default Hero;
