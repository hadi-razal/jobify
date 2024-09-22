import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const CompanyRegisterForm = () => {
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyEstablishedYear: 0,
    location: "",
    role: "company",
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
        `${import.meta.env.VITE_SERVER_URL}/company/register`,
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
      <div className="p-4flex flex-col justify-center items-center sm:w-[400px] w-full px-4 py-7">
        <div className="flex flex-col items-start justify-center w-full">
          <span className="text-[30px] font-semibold">
            Create Company Account
          </span>
          <span className="text-sm font-light">
            Join us to access more features
          </span>
        </div>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <label className="text-gray-700 font-bold">Company Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none  mt-2"
            required
          />
          <label className="text-gray-700 font-bold">Password:</label>
          <input
            type="password"
            name="password"
            autoComplete="off"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none  mt-2"
            required
          />
          <label className="text-gray-700 font-bold">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none  mt-2"
            required
          />
          <label className="text-gray-700 font-bold">
            Company Established Year:
          </label>
          <input
            type="number"
            name="companyEstablishedYear"
            min="0"
            value={formData.companyEstablishedYear}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none mt-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-md px-4 py-2 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Company Account"}
          </button>
          <div className="text-xs mt-2 flex items-center justify-center gap-1">
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

export default CompanyRegisterForm;
