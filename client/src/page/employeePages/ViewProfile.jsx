import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";

const ViewProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const navigate = useNavigate();

  // Fetch the employee data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/employee/get-single-employee/${
          auth.userId
        }`
      );
      setEmployee(res.data.employee);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Navigate to edit profile page
  const handleEdit = () => {
    navigate("/edit-profile");
  };

  // Handle description visibility
  const makeDescriptionVisible = (description) => {
    return description?.length > 300
      ? description.slice(0, 300) + "..."
      : description;
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full py-5 px-3 md:px-5">
      <h1 className="sm:text-[40px] text-[35px] font-semibold mb-2 text-gray-400">
        Profile
      </h1>

      <div className="w-full max-w-xl  px-5 flex flex-col items-center relative">
        <div className="my-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt="Profile Picture"
            className="rounded-full w-20 h-20"
          />
        </div>

        <div className="w-full grid grid-cols-1 gap-2">
          <div>
            <label className="text-sm font-medium mb-1">Name</label>
            <input
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none"
              value={employee?.name}
              disabled
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1">Email</label>
            <input
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none"
              value={employee?.email || "Not specified"}
              disabled
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1">Location</label>
            <input
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none"
              value={employee?.location || "Not specified"}
              disabled
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1">Resume URL</label>
            <input
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none"
              value={employee?.resumeURL}
              placeholder="No URL"
              disabled
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1">About</label>
            <textarea
              className="w-full border px-3 py-3 border-gray-300 rounded-sm focus:outline-none"
              value={
                employee?.description
                  ? makeDescriptionVisible(employee.description)
                  : "Add description in edit profile"
              }
              rows={4}
              disabled
            />
          </div>

          <button
            className="w-full flex gap-2 items-center justify-center bg-blue-950 text-white p-3  roundedhover:bg-blue-900  transition duration-200"
            onClick={handleEdit}
          >
            Edit Profile <FaEdit className="mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
