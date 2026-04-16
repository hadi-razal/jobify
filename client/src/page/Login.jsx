import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useAuth } from "../context/authContext";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message);

        setAuth({
          token: res.data.token,
          userId: res.data.user_id,
          role: res.data.role,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: res.data.token,
            userId: res.data.user_id,
            role: res.data.role,
          })
        );
        setTimeout(() => {
          navigate(res.data.role === "company" ? "/dashboard" : "/");
        }, 100);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center p-4 bg-white text-black">
      <Toaster />
      
      <div className="w-full max-w-sm bg-white border-2 border-black p-6 sm:p-8 shadow-sm">
        <div className="mb-8 text-center border-b-2 border-black pb-4">
          <h2 className="text-2xl font-black text-black mb-2 uppercase tracking-tighter">Welcome back</h2>
          <p className="text-gray-600 text-xs font-bold tracking-wide uppercase">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-black">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-2 border-black p-3 bg-white text-black font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all rounded-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-black">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border-2 border-black p-3 bg-white text-black font-bold placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all rounded-none"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors mt-4 rounded-none border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Sign in
          </button>
        </form>

        <p className="text-center text-xs font-bold text-gray-600 mt-6 pt-6 border-t-2 border-black">
          Don&apos;t have an account?{" "}
          <Link to="/register/employee" className="text-black font-black uppercase hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
