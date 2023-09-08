import React, { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { categoryList } from "../../constant/jobcategory";
import { useAuth } from "../../context/authContext";
import { workExperienceOptions } from "../../constant/workExperience";

const CreateJobPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: auth.name,
    location: "",
    workExperience: "",
    salary: "",
    category: "none",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(formData.workExperience);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/job/create-job`,
        formData
      );
      console.log(res.data.message);
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate("/all-posted-jobs"); // Redirect to the jobs listing page
      }

      if (res.data.success === false) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="mt-10 mb-10 flex items-center justify-center ">
      <Toaster />
      <div className="p-4 bg-white rounded-lg shadow-2xl flex flex-col justify-center items-center">
        <h1 className="text-[30px] text-green-600">Create Job</h1>
        <form className="flex flex-col w-[400px] px-4" onSubmit={handleSubmit}>
          <label className="text-gray-700 font-bold">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="text-gray-700 font-bold">Description:</label>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
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
          <label className="text-gray-700 font-bold">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />

          <label className="text-gray-700 font-bold">Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <label className="text-gray-700 font-bold">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="none">Select a category</option>
            {categoryList?.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-md px-4 py-2 mt-4"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
