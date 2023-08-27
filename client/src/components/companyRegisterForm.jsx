import axios from "axios";
import React, { useState } from "react";
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
    role: "company", // Changed from 'employee' to 'company'
  });

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
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/company/register`,
      formData
    );
    if (res.data.success === false) {
      toast.error(res.data.message);
    }
    if (res.data.success === true) {
      toast.success(res.data.message);
      navigate("/login");
    }
  };

  if (auth.token) {
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <div className="mt-10 mb-10 flex items-center justify-center">
      <Toaster />
      <div className="p-4 bg-white rounded-lg shadow-2xl flex flex-col justify-center items-center">
        <label htmlFor="image" className="mb-3">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
            className="rounded-full w-20 h-20"
            alt="Company Logo"
          />
        </label>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="text-gray-700 font-bold">Company Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="text-gray-700 font-bold">Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
          />
          <label className="text-gray-700 font-bold">Password:</label>
          <input
            type="password"
            autoComplete="off"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
          />
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleChange}
            className="border hidden border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
          />

          <label className="text-gray-700 font-bold">Location :</label>
          <input
            type="text"
            name="location"
            min="0"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
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
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-md px-4 py-2 mt-4"
          >
            Create Company Account
          </button>
          <div className="text-xs mt-2">
            <p>Already Have an account?</p>
            <Link to={"/login"} className="text-blue-800">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyRegisterForm;
