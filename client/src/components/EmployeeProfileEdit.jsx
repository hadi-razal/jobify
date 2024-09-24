import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import LoadingPage from "../components/LoadingPage";

const EmployeeProfileEdit = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    location: "",
    resumeURL: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

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
      console.error("Error fetching user data:", error);
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
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
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/profile");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full py-5 px-3">
      <Toaster />
      <h1 className="sm:text-[40px] text-[35px] font-semibold  text-gray-400">
        Edit Profile
      </h1>
      <div className="w-full max-w-xl p-5 ">
        <div className=" flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt="Profile"
            className="rounded-full w-20 h-20"
          />
        </div>
        <form className="w-full grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={employee.name || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 border-gray-300 rounded-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={employee.email || ""}
              className="w-full border px-3 py-2 border-gray-300 rounded-sm text-gray-400"
              disabled
            />
          </div>
          <div>
            <label className="text-sm font-medium">Location</label>
            <input
              type="text"
              name="location"
              value={employee.location || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 border-gray-300 rounded-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">ResumeURL </label>
            <input
              type="text"
              name="resumeURL"
              value={employee.resumeURL || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 border-gray-300 rounded-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description:</label>
            <textarea
              name="description"
              value={employee.description || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 border-gray-300 rounded-sm focus:outline-none"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-950 text-white py-3 rounded-sm hover:bg-blue-900 transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeProfileEdit;
