import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { categoryList } from "../../constant/jobcategory";

const EditJob = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]: value,
    }));
  };

  const getJob = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/single-job/${params.jobId}`
      );
      setJob(res.data.sPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/job/update-job/${params.jobId}`,
        job
      );
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate("/all-posted-jobs"); // Redirect to the jobs listing page
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative py-5 mb-10 flex items-center justify-center w-full">
      <Toaster />
      <div className="p-4 flex flex-col justify-center items-center sm:w-[400px] w-full px-4 py-7">
        <div className="flex flex-col items-start justify-center w-full">
          <span className="text-[30px] font-semibold text-blue-950 mb-2">
            Update Job Profile
          </span>
        </div>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <label className="text-gray-700 font-bold">Title:</label>
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Description:</label>
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Location:</label>
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Salary:</label>
          <input
            type="number"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Category:</label>
          <select
            name="category"
            value={job.category}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categoryList?.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
          
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-md px-4 py-2 mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
