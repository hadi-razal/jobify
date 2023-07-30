import React from "react";
import { Link } from "react-router-dom";

const RegisterModal = () => {
  return (
    <div>
      <div>
        <h3 className="p-5">
          Choose Your Path: Company Account or Job Seeker?"
        </h3>
      </div>
      <div className="flex flex-col  md:flex-row items-center justify-center gap-5 font-bold text-white  mt-[30px]">
        <Link
          to={"/login"}
          className="bg-green-500 flex justify-center py-10 rounded-2xl w-[250px] hover:bg-green-600 transition-all duration-300 ease-in-out  "
        >
          <h1>Login</h1>
        </Link>
        <Link
          to={"/register"}
          className="bg-green-500 py-10 flex justify-center rounded-2xl w-[250px] hover:bg-green-600 transition-all duration-300 ease-in-out"
        >
          <h1>Register</h1>
        </Link>
        <p className="text-center mt-4 text-gray-600 text-[10px]">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700  hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;
