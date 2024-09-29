import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { categoryList } from "../../constant/jobcategory";
import { useAuth } from "../../context/authContext";

const CreateJobPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: auth.name,
    location: "",
    salary: "",
    category: "none",
  });
  const [isLoading, setIsLoading] = useState(false);

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
        `${import.meta.env.VITE_SERVER_URL}/job/create-job`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/all-posted-jobs");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
    setIsLoading(false);
  };

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="relative py-5 mb-10 flex items-center justify-center w-full">
      <Toaster />
      <div className="p-4 flex flex-col justify-center items-center sm:w-[400px] w-full px-4 py-7">
        <div className="flex flex-col items-start justify-center w-full">
          <span className="text-[30px] font-semibold">Post a Job</span>
          <span className="text-sm font-light">
            Fill in the job details below
          </span>
        </div>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <label className="text-gray-700 font-bold">Job Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Salary:</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="none">Select a category</option>
            {categoryList.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-md px-4 py-2 mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobPage;
