import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { educationOptions } from "../constant/educationOptions";
import { workExperienceOptions } from "../constant/workExperience";
import { useAuth } from "../context/authContext";

const EmployeeProfileEdit = () => {
  const { auth } = useAuth();
  const [employee, setEmployee] = useState({
    name: "",
    location: "",
    workExperience: "",
    description: "",
    education: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/employee/get-single-employee/${
          auth.userId
        }`
      );
      setEmployee(res.data.employee);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/employee/update-profile`,
        employee
      );
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate("/view-profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="mt-10 mb-10 flex items-center justify-center">
      <Toaster />
      <div className="p-4 bg-white rounded-lg shadow-2xl flex flex-col justify-center items-center">
        <label htmlFor="image" className="mb-3">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt="Profile"
            className="rounded-full w-20 h-20"
          />
        </label>
        <form className="flex flex-col w-[350px]" onSubmit={handleSubmit}>
          <label className="text-gray-700 font-bold">Full Name:</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="text-gray-700 font-bold">Email:</label>
          <input
            type="email"
            name="email"
            autoComplete="off"
            value={employee.email}
            onChange={handleChange}
            className="border border-gray-400 text-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
            disabled
          />
          <label className="text-gray-700 font-bold">Description:</label>
          <textarea
            type="text"
            name="description"
            autoComplete="off"
            value={employee.description}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
          />
          <label className="text-gray-700 font-bold">Location:</label>
          <input
            type="text"
            name="location"
            value={employee.location}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500 mt-2"
          />
          <label className="text-gray-700 font-bold">
            Work Experience(Years):
          </label>
          <select
            name="workExperience"
            value={employee.workExperience}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a Work Experience</option>
            {workExperienceOptions.map((experience, index) => (
              <option key={index} value={experience}>
                {experience !== 0 ? `${experience} +` : experience}
              </option>
            ))}
          </select>
          <label className="text-gray-700 font-bold">Education:</label>
          <select
            name="education"
            value={employee.education}
            onChange={handleChange}
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
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfileEdit;
