/* eslint-disable react/prop-types */
import { BiSolidPencil } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const CompanyProfile = ({ company }) => {
  const navigate = useNavigate();

  const makeDescriptionVisible = (description) => {
    if (description.length > 100) {
      return description.slice(0, 100) + "...";
    } else {
      return description;
    }
  };

  return (
    <div className="bg-gray-500 p-5 rounded-lg h-[250px] w-full relative flex flex-col items-center justify-center shadow-2xl">
      <div className="flex gap-3 items-center">
        <img
          className="w-16 h-16 rounded-full shadow-lg"
          src="https://static.vecteezy.com/system/resources/previews/000/592/901/non_2x/vector-office-building-icon.jpg"
          alt="Company"
        />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg">{company.name}</h1>
          <span className="text-center">
            Estd :{company.companyEstablishedYear}
          </span>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-sm mt-2 p-3 ">
        <p>{company.email}</p>
        <p>
          {company?.description
            ? makeDescriptionVisible(company?.description)
            : "(Add Company Description In Edit Profile)"}
          ..
        </p>
      </div>

      <div
        onClick={() => {
          navigate("/edit-profile");
        }}
        className="absolute top-5 right-5 cursor-pointer group "
      >
        <p className="hidden absolute text-xs rounded-lg px-4 transition-all 3s ease-in-out bg-gray-500 -mt-4 group-hover:flex">
          Update Profile
        </p>
        <BiSolidPencil className="w-10 h-7 text-white" />
      </div>
    </div>
  );
};

export default CompanyProfile;
