import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        { email, password }
      );

      if (!res.data.success) {
        toast.error(res.data.message);
        setIsLoading(false);
        return;
      }

      const { token, name, userId, email: userEmail, role } = res.data.user;

      if (token) {
        setAuth({ name, userId, token, email: userEmail, role });
        localStorage.setItem(
          "auth",
          JSON.stringify({ name, userId, token, email: userEmail, role })
        );
        setEmail("");
        setPassword("");

        // Navigate based on user role
        navigate(role === "company" ? "/dashboard" : "/jobs");
        toast.success(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // Redirect if user is already authenticated
  if (auth.token) {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="relative h-[80vh] flex items-center justify-center">
      <Toaster />

      <div className="rounded-sm flex flex-col items-center justify-center gap-4 sm:w-[400px] w-full px-4 py-7">
        <div className="flex flex-col items-start justify-center w-full">
          <span className="text-[30px] font-semibold">
            Login to your account
          </span>
          <span className="text-sm font-light">
            Access your career opportunities
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="email" className="text-sm font-medium">
              Email:
            </label>
            <input
              type="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              className="w-full border px-3 py-3 border-b rounded-sm focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="password" className="text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              className="w-full border px-3 py-3 border-b rounded-sm focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="px-5 py-3 h-[50px] w-full bg-blue-950 text-white rounded-sm"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col items-center justify-center text-sm mt-4">
          <span className="font-light">
            Don&apos;t have an account yet?{" "}
            <Link to="/register/employee" className="text-blue-950 underline">
              create account
            </Link>
          </span>
          <span className="font-light">
            are you an employer?{" "}
            <Link to="/register/company" className="text-blue-950 underline">
              create account
            </Link>
          </span>
          <span className="text-blue-950 underline cursor-pointer font-light mt-2">
            <Link
              to="/login/forgot-password"
              className="text-blue-950 underline"
            >
              Forgot password?
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
