import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const CompanyRegisterForm = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyEstablishedYear: "",
    location: "",
    role: "company",
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

  if (auth.token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 bg-white text-black py-10">
      <Toaster />

      <div className="w-full max-w-lg bg-white border-2 border-black p-6 sm:p-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-10 text-center border-b-2 border-black pb-6">
          <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tighter">Register Company</h2>
          <p className="text-gray-600 text-sm font-bold tracking-wide uppercase">Join Jobify and start hiring top talent today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-black">Company Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="Acme Corp" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-black">Work Email</label>
            <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="hr@acme.com" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-black uppercase tracking-wider text-black">Password</label>
            <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="••••••••" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-wider text-black">Location</label>
              <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="City, State" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black uppercase tracking-wider text-black">Founded Year</label>
              <input type="number" name="companyEstablishedYear" min="1800" required value={formData.companyEstablishedYear} onChange={handleChange} className="w-full border-2 border-black bg-white text-black rounded-none py-3 px-4 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all font-bold" placeholder="2010" />
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-black text-white font-black uppercase tracking-widest rounded-none py-4 mt-8 hover:bg-gray-800 transition-colors disabled:opacity-70">
            {isLoading ? "Creating..." : "Register Company"}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t-2 border-black text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
            Already have an account? <Link to="/login" className="text-black hover:underline uppercase transition">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegisterForm;
