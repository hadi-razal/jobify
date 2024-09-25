import { Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, AlertCircle, BookOpen, Briefcase } from "lucide-react";
import Hero from "../components/Hero";
import { useAuth } from "../context/authContext";

const Home = () => {
  const { auth } = useAuth();

  if (auth.token) {
    return <Navigate to="/jobs" />;
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="flex flex-col items-center bg-gray-50">
      <Hero />

      {/* Testimonials Section */}
      <motion.section
        className="w-full py-16 bg-white"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Users Say
          </h2>
          <div className="mt-8 space-y-8 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6">
            {[
              {
                name: "John Doe",
                role: "Software Engineer",
                quote: "This platform has transformed my job search!",
              },
              {
                name: "Jane Smith",
                role: "Product Manager",
                quote: "I found my dream job within weeks of signing up.",
              },
              {
                name: "Alex Johnson",
                role: "UX Designer",
                quote: "The career guidance here is second to none.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                <p className="font-medium text-gray-900">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us Section */}
      <motion.section
        className="w-full py-16 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 text-white"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-xl">
            Join a community of skilled professionals and discover the best job
            opportunities tailored for you.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: AlertCircle,
                title: "Personalized Job Alerts",
                description:
                  "Get notified about jobs that match your skills and interests.",
              },
              {
                icon: BookOpen,
                title: "Resume Building Tools",
                description:
                  "Access templates and tips to create a standout resume.",
              },
              {
                icon: Star,
                title: "Expert Career Guidance",
                description:
                  "Connect with industry professionals for valuable insights.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-filter backdrop-blur-lg"
              >
                <feature.icon className="h-12 w-12 mx-auto text-yellow-400" />
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Jobs Section */}
      <motion.section
        className="w-full py-16 bg-gray-50"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Job Listings
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Explore some of our top job postings
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Software Engineer",
                company: "Tech Innovators Inc.",
                location: "San Francisco, CA",
              },
              {
                title: "Product Manager",
                company: "Global Solutions Ltd.",
                location: "New York, NY",
              },
              {
                title: "UX Designer",
                company: "Creative Minds Co.",
                location: "London, UK",
              },
            ].map((job, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <Briefcase className="h-12 w-12 mx-auto text-blue-950" />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {job.title}
                </h3>
                <p className="mt-2 text-gray-600">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
                <button className="mt-4 bg-blue-950 text-white px-4 py-2 rounded hover:bg-blue-900 transition-colors duration-300">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400">
                We are dedicated to connecting talented professionals with their
                dream jobs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/jobs"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/resources"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">Email: support@jobify.com</p>
              <p className="text-gray-400">Phone: (123) 456-7890</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>© 2024 Jobify. All rights reserved.</p>
            <p className="mt-2">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link
                to="/terms"
                className="text-gray-400 hover:text-gray-300 transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
