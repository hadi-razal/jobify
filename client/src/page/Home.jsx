import React, { useState } from "react";
import Hero from "../components/Hero";
import ChooseRegister from "../components/chooseRegister";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { AiFillCloseCircle } from "react-icons/ai";

const Home = () => {
  const [regModal, setRegModal] = useState(false);
  const { auth } = useAuth();

  if (auth.token) {
    return <Navigate to={"/job"} />;
  }

  return (
    <div>
      <Hero />
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5 font-bold text-white  mt-5">
        <Link
          to={"/login"}
          className="bg-green-500 flex justify-center py-10 rounded-2xl w-[250px] hover:bg-green-600 transition-all duration-300 ease-in-out"
        >
          <h1>Login</h1>
        </Link>
        <div
          onClick={() => setRegModal(true)}
          className="bg-green-500 py-10 flex justify-center rounded-2xl w-[250px] hover:bg-green-600 transition-all duration-300 ease-in-out"
        >
          <h1>Register</h1>
        </div>
      </div>
      {regModal ? (
        <div>
          <AiFillCloseCircle
            onClick={() => setRegModal(!regModal)}
            className="absolute z-10 top-[250px] right-[100px] h-7 w-7"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gray-300 bg-opacity-98 flex items-center justify-center shadow-2xl rounded-lg transition-all ease-in-out duration-1000">
            <ChooseRegister />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
