import Hero from "../components/Hero";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { auth } = useAuth();

  if (auth.token) {
    return <Navigate to="/jobs" />;
  }

  return (
    <div className="flex flex-col items-center">
      <Hero />

      {/* Testimonials Section
      <div className="max-w-7xl w-full px-4 text-center mt-10">
        <h2 className="text-2xl font-bold">What Our Users Say</h2>
        <div className="flex flex-col items-center mt-4">
          <p className="text-gray-600 italic">
            “This platform has transformed my job search!”
          </p>
          <p className="text-gray-600 mt-1">- John Doe, Job Seeker</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <h2 className="text-2xl font-bold">Why Choose Us?</h2>
        <p className="text-gray-600 mt-2">
          Join a community of skilled professionals and discover the best job
          opportunities tailored for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8 max-w-7xl w-full px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="font-bold text-lg">Personalized Job Alerts</h3>
          <p className="text-gray-600 mt-2">
            Get notified about jobs that match your skills and interests.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="font-bold text-lg">Resume Building Tools</h3>
          <p className="text-gray-600 mt-2">
            Access templates and tips to create a standout resume.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="font-bold text-lg">Expert Career Guidance</h3>
          <p className="text-gray-600 mt-2">
            Connect with industry professionals for valuable insights.
          </p>
        </div>
      </div>

      {/* Featured Jobs Section */}
      {/* <div className="max-w-7xl w-full px-4 text-center mt-10">
        <h2 className="text-2xl font-bold">Featured Job Listings</h2>
        <p className="text-gray-600 mt-2">
          Explore some of our top job postings.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {/* Replace with dynamic job listings */}
      {/* <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg">Software Engineer</h3>
            <p className="text-gray-600 mt-2">Company A - Location</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg">Product Manager</h3>
            <p className="text-gray-600 mt-2">Company B - Location</p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="font-bold text-lg">UX Designer</h3>
            <p className="text-gray-600 mt-2">Company C - Location</p>
          </div>
        </div> 
      // </div> */}

      {/* Footer */}
      {/* <footer className="bg-gray-800 text-white w-full py-6 mt-10">
        <div className="max-w-7xl mx-auto text-center">
          <p>© 2024 Your Company. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="text-gray-400 hover:text-gray-300">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="/terms" className="text-gray-400 hover:text-gray-300">
              Terms of Service
            </Link>
          </p>
        </div>
      </footer> */}
    </div>
  );
};
export default Home;
