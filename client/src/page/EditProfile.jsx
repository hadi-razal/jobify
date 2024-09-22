import CompanyProfileEdit from "../components/CompanyProfileEdit";
import EmployeeProfileEdit from "../components/EmployeeProfileEdit";
import { useAuth } from "../context/authContext";

const EditProfile = () => {
  const { auth } = useAuth();
  return (
    <div className="flex items-center justify-center">
      {auth.role === "company" ? (
        <CompanyProfileEdit />
      ) : (
        <EmployeeProfileEdit />
      )}
    </div>
  );
};

export default EditProfile;
