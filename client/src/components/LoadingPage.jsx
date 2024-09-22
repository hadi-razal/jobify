import { FaSpinner } from "react-icons/fa";
const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center space-y-4">
        <FaSpinner className="animate-spin text-blue-950 text-4xl" />
        <h1 className="text-2xl  font-semibold text-gray-600">Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingPage;
