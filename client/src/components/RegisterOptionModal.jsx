/* eslint-disable react/prop-types */
import { FaBriefcase, FaUserPlus } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Modal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 duration-300 ease-in-out transition-all">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md  sm:w-[340px] w-[280px] ">
        <h2 className="font-bold text-blue-950 text-lg mb-4">
          Select Type Of Account:
        </h2>
        <div className="flex flex-col gap-3">
          <button
            className="bg-blue-950 hover:bg-opacity-95 text-white font-semibold rounded-md px-4 py-4 transition duration-300"
            onClick={() => {
              onSelect("employee");
              onClose();
            }}
          >
            <FaUserPlus className="inline mr-2" /> Job Seeker
          </button>
          <button
            className="bg-blue-950 hover:bg-opacity-95 text-white font-semibold rounded-md px-4 py-4 transition duration-300"
            onClick={() => {
              onSelect("company");
              onClose();
            }}
          >
            <FaBriefcase className="inline mr-2" /> Company
          </button>
        </div>

        <div className="flex justify-center items-center rounded-full">
          <IoMdCloseCircleOutline
            className="cursor-pointer text-2xl text-red-600 mt-4"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
