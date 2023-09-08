import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";
import Register from "./page/Register";
import Home from "./page/Home";
import Navbar from "./components/Navbar";
import PageNotFound from "./page/PageNotFound";
import EmployeeRoute from "./components/secureRoute/EmployeeRoute";
import JobsPage from "./page/employeePages/JobsPage";
import { Toaster } from "react-hot-toast";
import CompanyDashboard from "./page/companyPages/CompanyDashboard";
import ViewEmployees from "./page/companyPages/ViewEmployees";
import SinglePageEmployeeProfile from "./page/SinglePageEmployeeProfile";
import PostedJobs from "./page/companyPages/PostedJobs";
import SingleJobViewPage from "./page/SingleJobViewPage";
import CreateJobPage from "./page/companyPages/CreateJobPage";
import SavedProfiles from "./page/companyPages/SavedProfiles";
import EditJob from "./page/companyPages/EditJob";
import EditProfile from "./page/EditProfile";
import AboutUs from "./page/AboutUs";
import Contact from "./page/Contact";
import SinglePageCompanyProfile from "./page/SinglePageCompanyProfile";
import SavedJobs from "./page/employeePages/SavedJobs";
import AppliedJobs from "./page/employeePages/AppliedJobs";
import CompanyRoute from "./components/secureRoute/CompanyRoute";
import LoginRoute from "./components/secureRoute/LoginRoute";
import ViewProfile from "./page/employeePages/ViewProfile";
import ApplicantsPage from "./page/companyPages/ApplicantsPage";

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
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/job/:jobId"
            element={
              <LoginRoute>
                <SingleJobViewPage />
              </LoginRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <LoginRoute>
                <EditProfile />
              </LoginRoute>
            }
          />
          <Route
            path="/view-profile"
            element={
              <LoginRoute>
                <ViewProfile />
              </LoginRoute>
            }
          />
          <Route
            path="/company/:companyId"
            element={
              <LoginRoute>
                <SinglePageCompanyProfile />
              </LoginRoute>
            }
          />
          <Route
            path="/employee/:employeeId"
            element={
              <LoginRoute>
                <SinglePageEmployeeProfile />
              </LoginRoute>
            }
          />

          {/* eployee pages */}
          <Route
            path="/jobs"
            element={
              <EmployeeRoute>
                <JobsPage />
              </EmployeeRoute>
            }
          />
          <Route
            path="/employee/profile/:profileId"
            element={
              <EmployeeRoute>
                <SinglePageEmployeeProfile />
              </EmployeeRoute>
            }
          />
          <Route path="/savedjobs" element={<SavedJobs />} />
          <Route path="/appliedjobs" element={<AppliedJobs />} />

          {/* Company Pages */}
          <Route
            path="/dashboard"
            element={
              <CompanyRoute>
                <CompanyDashboard />
              </CompanyRoute>
            }
          />
          <Route
            path="/view-employees"
            element={
              <CompanyRoute>
                <ViewEmployees />
              </CompanyRoute>
            }
          />
          <Route
            path="/all-posted-jobs"
            element={
              <CompanyRoute>
                <PostedJobs />
              </CompanyRoute>
            }
          />
          <Route
            path="/create-job"
            element={
              <CompanyRoute>
                <CreateJobPage />{" "}
              </CompanyRoute>
            }
          />
          <Route
            path="/job-edit/:jobId"
            element={
              <CompanyRoute>
                <EditJob />
              </CompanyRoute>
            }
          />
          <Route
            path="/applicants/:jobId"
            element={
              <CompanyRoute>
                <ApplicantsPage />
              </CompanyRoute>
            }
          />
          <Route
            path="/saved-profiles"
            element={
              <CompanyRoute>
                <SavedProfiles />
              </CompanyRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
