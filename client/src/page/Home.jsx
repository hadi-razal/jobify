/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { Navigate } from "react-router-dom";
import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { auth } = useAuth();

  // Redirect authenticated users to the jobs page
  if (auth.token) {
    return <Navigate to="/jobs" />;
  }




  return (
    <div className="flex flex-col bg-gray-50">
      <Hero />
    </div>
  );
};

export default Home;
