import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import PageNotFound from "./page/PageNotFound";
import PrivateRoute from "./components/secureRoute/PrivateRoute";
import JobsPage from "./page/employeePages/JobsPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/:role" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />

          {/* eployee pages */}
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <JobsPage />
              </PrivateRoute>
            }
          />
          {/* Company Pages */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
