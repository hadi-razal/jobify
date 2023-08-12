import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import PageNotFound from "./page/PageNotFound";
import PrivateRoute from "./components/secureRoute/PrivateRoute";
import JobsPage from "./page/employeePages/JobsPage";
import { Toaster } from "react-hot-toast";
import CompanyDashboard from "./page/companyPages/CompanyDashboard";
import ViewEmployees from "./page/companyPages/ViewEmployees";

const App = () => {
  return (
    <>
      <BrowserRouter>
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
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <CompanyDashboard />
              </PrivateRoute>
            }
          />
          <Route path="/view-employees" element={<ViewEmployees />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
