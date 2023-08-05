import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      console.log(res);
      if (res.data.token) {
        setAuth({
          user: res.data.user.name,
          token: res.data.token,
          email: res.data.user.email,
          role: res.data.user.role,
        });
        setEmail("");
        setPassword("");
        navigate("/");
      }
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(auth);
  return (
    <div className=" h-[80vh] flex items-center justify-center">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            autoComplete="nope"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            id="email"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
          />

          <label
            htmlFor="password"
            className="text-gray-700 font-bold mb-2 mt-4"
          >
            Password:
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            id="password"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
          />

          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-md px-4 py-2 mt-6"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
