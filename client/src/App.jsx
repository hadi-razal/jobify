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
import SinglePageEmployeeProfile from "./page/employeePages/SinglePageEmployeeProfile";
import PostedJobs from "./page/companyPages/PostedJobs";
import SingleJobViewPage from "./page/SingleJobViewPage";
import CreateJobPage from "./page/companyPages/CreateJobPage";
import SavedProfiles from "./page/companyPages/SavedProfiles";
import EditJob from "./page/companyPages/EditJob";
import EditProfile from "./page/EditProfile";

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
          <Route path="/job/:jobId" element={<SingleJobViewPage />} />
          <Route path="/edit-profile" element={<EditProfile />} />

          {/* eployee pages */}
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <JobsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee/profile/:profileId"
            element={
              <PrivateRoute>
                <SinglePageEmployeeProfile />
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
          <Route path="/all-posted-jobs" element={<PostedJobs />} />
          <Route path="/create-job" element={<CreateJobPage />} />
          <Route path="/job-edit/:jobId" element={<EditJob />} />
          <Route path="/saved-profiles" element={<SavedProfiles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
