import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const EmployeeRegisterForm = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    resumeURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  if (auth.token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 bg-white text-black py-10">
      <Toaster />

      <div className="w-full max-w-lg bg-white border-2 border-black p-6 sm:p-8 shadow-sm">
        <div className="mb-10 text-center border-b-2 border-black pb-6">
          <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tighter">Join as Applicant</h2>
          <p className="text-gray-600 text-sm font-bold tracking-wide uppercase">Create an account to track applications.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-black">Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="John Doe" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-black">Email Address</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-black">Password</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-black">Portfolio / Resume URL</label>
            <input type="url" name="resumeURL" required value={formData.resumeURL} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="https://linkedin.com/in/..." />
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-black text-white font-black uppercase tracking-widest rounded-none py-4 mt-8 hover:bg-gray-800 transition-colors disabled:opacity-70">
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t-2 border-black text-center flex flex-col gap-3">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
            Already have an account? <Link to="/login" className="text-black hover:underline uppercase transition">Sign in</Link>
          </p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            Looking to hire? <Link to="/register/company" className="text-gray-600 hover:text-black hover:underline uppercase transition">Register as Employer</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegisterForm;
