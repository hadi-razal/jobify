import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import JobCards from "../components/JobCards";
import LoadingPage from "../components/LoadingPage";

const SinglePageCompanyProfile = () => {
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState(null);
  const params = useParams();

  const getCompanyDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/company/get-company/${
          params.companyId
        }`
      );
      if (res.data.success === true) {
        setCompany(res.data.company);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCompanyJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/job/get-all-jobs/single-company/${
          params.companyId
        }`
      );
      console.log(res);
      if (res.data.success === true) {
        setJobs(res.data.jobs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCompanyDetails();
    getCompanyJobs();
  }, []);

  console.log(jobs);

  if (!jobs && !company) {
    return <LoadingPage />;
  }

  return (
    <div className="p-3 pb-5">
      <div className="flex items-center justify-center flex-col rounded-lg">
        <div className="flex items-center  justify-center -mb-16">
          <img
            src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
            className="rounded-full  p-2 w-32 h-32 z-10"
            alt="Company Logo"
          />
        </div>
        <div className="bg-gray-200 px-6 shadow-lg rounded-lg pt-16 flex items-center justify-center flex-col max-w-7xl">
          <h1>{company?.name}</h1>
          <span className="font-normal">{company?.email}</span>
          <span className="flex items-center justify-center text-sm">
            <span>
              <GrLocation />
            </span>
            {!company?.location ? "World Wide" : company.location}
          </span>
          <span>{company?.companyEstablishedYear}</span>
          <p className="mb-7 mt-4">{company?.description}</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center mt-4 text-gray-500 text-[30px]">
          <h1 className="sm:text-[40px] text-[35px] font-semibold  text-gray-400">
            Jobs From {company?.name}
          </h1>
        </div>
        <div className="flex justify-center items-center  rounded-md  gap-2 flex-wrap max-w-7xl">
          {jobs?.map((job) => (
            <JobCards key={job._id} job={job} reloadJobs={getCompanyJobs} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SinglePageCompanyProfile;
