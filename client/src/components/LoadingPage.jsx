import BounceLoader from "react-spinners/BounceLoader";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-[60vh] w-full">
      <div className="flex flex-col items-center justify-center space-y-6">
        <BounceLoader color="#000000" size={60} />
        <h2 className="text-xl font-black text-black uppercase tracking-widest">Loading...</h2>
      </div>
    </div>
  );
};

export default LoadingPage;
