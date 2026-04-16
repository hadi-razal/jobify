import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
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
import SingleJobViewCompanyPage from "./page/companyPages/SingleJobViewCompanyPage";

const DEFAULT_SEO = {
  title: "Jobify | Find Jobs and Hire Talent",
  description:
    "Jobify helps candidates discover jobs and companies find skilled professionals with a faster hiring workflow.",
  robots: "index, follow",
};

const SEO_RULES = [
  {
    match: (pathname) => pathname === "/",
    title: "Jobify | Find Jobs and Hire Talent",
    description:
      "Search jobs, explore companies, and connect with opportunities faster on Jobify.",
    robots: "index, follow",
  },
  {
    match: (pathname) => pathname === "/jobs",
    title: "Browse Jobs | Jobify",
    description:
      "Explore job openings by keyword and category. Sort opportunities and apply faster on Jobify.",
    robots: "index, follow",
  },
  {
    match: (pathname) => pathname.startsWith("/job/"),
    title: "Job Details | Jobify",
    description:
      "Review job requirements, company details, and apply to the role that matches your goals.",
    robots: "index, follow",
  },
  {
    match: (pathname) => pathname === "/about-us",
    title: "About Jobify | Careers Platform",
    description:
      "Learn how Jobify helps candidates and companies connect through a simple, modern hiring experience.",
    robots: "index, follow",
  },
  {
    match: (pathname) => pathname === "/contact",
    title: "Contact Jobify",
    description:
      "Get in touch with the Jobify team for support, questions, or partnership opportunities.",
    robots: "index, follow",
  },
  {
    match: (pathname) => pathname === "/login",
    title: "Login | Jobify",
    description:
      "Sign in to your Jobify account to manage applications, jobs, and hiring activity.",
    robots: "noindex, nofollow",
  },
  {
    match: (pathname) => pathname.startsWith("/register/"),
    title: "Create Account | Jobify",
    description:
      "Create a candidate or company account on Jobify to start applying or hiring.",
    robots: "noindex, nofollow",
  },
  {
    match: (pathname) =>
      [
        "/profile",
        "/edit-profile",
        "/savedjobs",
        "/appliedjobs",
        "/saved-profiles",
        "/dashboard",
        "/view-employees",
        "/all-posted-jobs",
        "/create-job",
      ].includes(pathname) ||
      pathname.startsWith("/employee/") ||
      pathname.startsWith("/company/") ||
      pathname.startsWith("/employee/profile/") ||
      pathname.startsWith("/company/jobs/") ||
      pathname.startsWith("/job-edit/") ||
      pathname.startsWith("/applicants/"),
    title: "Jobify Dashboard",
    description:
      "Manage your Jobify account, profiles, jobs, and applications from your dashboard.",
    robots: "noindex, nofollow",
  },
];

const setMetaTag = (attribute, key, content) => {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setCanonicalTag = (href) => {
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", href);
};

const getSeoForPath = (pathname) => {
  const matchedRule = SEO_RULES.find((rule) => rule.match(pathname));
  return matchedRule || { ...DEFAULT_SEO, robots: "noindex, nofollow" };
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RouteSEO = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(pathname);
    const origin = window.location.origin;
    const canonicalUrl = `${origin}${pathname}`;

    document.title = seo.title;
    setMetaTag("name", "description", seo.description);
    setMetaTag("name", "robots", seo.robots);
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:title", seo.title);
    setMetaTag("property", "og:description", seo.description);
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:site_name", "Jobify");
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", seo.title);
    setMetaTag("name", "twitter:description", seo.description);
    setCanonicalTag(canonicalUrl);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <RouteSEO />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/:role" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/job/:jobId" element={<SingleJobViewPage />} />
          <Route
            path="/edit-profile"
            element={
              <LoginRoute>
                <EditProfile />
              </LoginRoute>
            }
          />
          <Route
            path="/profile"
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

          <Route path="/jobs" element={<JobsPage />} />

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
            path="/company/jobs/:jobId"
            element={
              <CompanyRoute>
                <SingleJobViewCompanyPage />{" "}
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
