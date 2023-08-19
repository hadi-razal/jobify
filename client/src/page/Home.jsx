import React from "react";
import Hero from "../components/Hero";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";

const Home = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth.token) {
    return <Navigate to={"/jobs"} />;
  }

  const handleToast = () => {
    toast((t) => (
      <span className="flex flex-col items-center justify-center p-6 gap-4">
        Select Type Of Account?
        <div className="flex gap-3">
          <button
            className="bg-green-600 rounded-lg p-2"
            onClick={() => {
              toast.dismiss(t.id);
              navigate("/register/employee");
            }}
          >
            Job Seeker
          </button>
          <button
            className="bg-red-600 rounded-lg p-2"
            onClick={() => {
              toast.dismiss(t.id);
              navigate("/register/company");
            }}
          >
            Company
          </button>
        </div>
      </span>
    ));
  };

  return (
    <div>
      <Hero />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 font-bold text-white  mt-5 mb-7">
        <Link
          to={"/login"}
          className="bg-green-500 cursor-pointer flex justify-center py-10 rounded-2xl w-[250px] hover:bg-green-600 transition-all duration-300 ease-in-out"
        >
          <h1>Login</h1>
        </Link>
        <div
          onClick={() => handleToast()}
          className="bg-green-500 cursor-pointer py-10 flex justify-center rounded-2xl w-[250px] hover:bg-green-600 transition-all duration-300 ease-in-out"
        >
          <h1>Register</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
