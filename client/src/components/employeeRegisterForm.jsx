import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const EmployeeRegisterForm = () => {
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    resumeURL: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/employee/register`,
        formData
      );
      if (!res.data.success) {
        toast.error(res.data.message);
      } else {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  // Redirect if user is already authenticated
  if (auth.token) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="relative mt-10 mb-10 flex items-center justify-center w-full">
      <Toaster />
      <div className="p-4 flex flex-col justify-center items-center sm:w-[400px] w-full px-4 py-7">
        <div className="flex flex-col items-start justify-center w-full mb-4">
          <span className="text-[30px] font-semibold text-gray-700">
            Create Employee Account
          </span>
          <span className="text-sm font-light text-gray-500">
            Join us to access more features
          </span>
        </div>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium mb-1">Resume URL</label>
            <input
              type="text"
              name="resumeURL"
              value={formData.resumeURL}
              onChange={handleChange}
              autoComplete="off"
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-950 text-white p-3 rounded hover:bg-blue-900 transition duration-200 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>

          <div className="text-xs mt-4 flex items-center justify-center gap-1">
            <p>Already have an account?</p>
            <Link to={"/login"} className="text-blue-950 underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegisterForm;
