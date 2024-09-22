import BounceLoader from "react-spinners/BounceLoader";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="flex flex-col items-center space-y-4">
        <BounceLoader color="#172554" className=" text-blue-950 text-4xl" />
        {/* <h1 className="text-2xl  font-semibold text-gray-600">Loading...</h1> */}
      </div>
    </div>
  );
};

export default LoadingPage;
