/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import { Navigate } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/home/Features";
import Stats from "../components/home/Stats";
import CallToAction from "../components/home/CallToAction";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { auth } = useAuth();

  // Redirect authenticated users to the jobs page
  if (auth?.token) {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Hero />
      <Stats />
      <Features />
      <CallToAction />
    </div>
  );
};

export default Home;
