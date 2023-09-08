import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { educationOptions } from "../constant/educationOptions"; // Make sure to import educationOptions
import { workExperienceOptions } from "../constant/workExperience";

const EmployeeRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
    workExperience: 0,
    education: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEducationChange = (e) => {
    // Add this function for education selection
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      education: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/employee/register`,
      formData
    );
    console.log(res);
    console.log(res.data.message);

    if (res.data.success === true) {
      toast.success(res.data.message);
      navigate("/login");
    }
    if (res.data.success === false) {
      toast.error(res.data.message);
    }
  };
  return (
    <div className="mt-10 mb-10 flex items-center justify-center">
      <Toaster />
      <div className="p-4 bg-white rounded-lg shadow-2xl flex flex-col justify-center items-center">
        {/* <h2 className="text-gray-800 text-xl font-semibold mb-4">
          Create Job Seeker Account
        </h2> */}
        <label htmlFor="image" className="mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            className="rounded-full w-20 h-20"
          />
        </label>
        <form className="flex flex-col w-[350px]" onSubmit={handleSubmit}>
          <label className="text-gray-700 font-bold">Full Name:</label>
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
          <label className="text-gray-700 font-bold">
            Work Experience(Years):
          </label>
          <select
            name="workExperience"
            value={formData.workExperience}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="none">Select a Work Experience</option>
            {workExperienceOptions?.map((c, index) => (
              <option key={index} value={c}>
                {c !== 0 ? `${c} +` : c}
              </option>
            ))}
          </select>
          <label className="text-gray-700 font-bold">Education:</label>
          <select
            name="education"
            value={formData.education}
            onChange={handleEducationChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
          >
            <option value="">Select Education</option>
            {educationOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-md px-4 py-2 mt-4"
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegisterForm;
