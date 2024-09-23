import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../context/authContext";

const CompanyProfileEdit = () => {
  const { auth } = useAuth();
  const [myCompany, setMyCompany] = useState({
    name: "",
    email: "",
    description: "",
    companyEstablishedYear: 0,
    role: "company",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyCompany((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCompany = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/company/get-my-company`,
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );
      if (res.data.success === true) {
        setMyCompany(res.data.company);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error fetching company:", error);
    }
  };

  useEffect(() => {
    getCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/company/update-profile`,
        myCompany
      );
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="relative  mb-10 flex items-center justify-center w-full">
      <Toaster />
      <div className="p-4 flex flex-col justify-center items-center sm:w-[400px] w-full px-4 py-7">
        <div className="flex flex-col items-start justify-center w-full">
          <span className="text-[30px] font-semibold">
            Edit Company Profile
          </span>
          <span className="text-sm font-light">
            Update your company details
          </span>
        </div>
        <label htmlFor="image" className="mb-3 mt-3 flex justify-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
            className="rounded-full w-20 h-20"
            alt="Company Logo"
          />
        </label>
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
          <label className="text-gray-700 font-bold">Company Name:</label>
          <input
            type="text"
            name="name"
            value={myCompany.name}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
          <label className="text-gray-700 font-bold">Email:</label>
          <input
            type="email"
            name="email"
            value={myCompany.email}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none  mt-2 text-slate-700"
            disabled
          />
          <label className="text-gray-700 font-bold">
            Company Established Year:
          </label>
          <input
            type="number"
            name="companyEstablishedYear"
            min="0"
            value={myCompany.companyEstablishedYear}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none  mt-2"
            required
          />
          <label className="text-gray-700 font-bold">Description:</label>
          <textarea
            name="description"
            value={myCompany.description}
            onChange={handleChange}
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none  mt-2"
            rows="4"
          />
          <button
            type="submit"
            className="bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-md px-4 py-2 mt-4"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompanyProfileEdit;
