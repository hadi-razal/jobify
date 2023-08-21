import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col  justify-center items-center mt-10">
      <h1 className="text-[30px] text-green-700 mb-3">Jobify</h1>
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">Contact Us</h2>
        <p className="text-gray-600 mb-4">
          Have questions or inquiries? Reach out to us via the contact details
          below or by using the form on this page.
        </p>
        <div className="flex items-center space-x-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <p className="text-gray-600">123 Main Street, City</p>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.7 14.3a8 8 0 10-11.4 0"
            />
          </svg>
          <p className="text-gray-600">hadhirasal22@gmail.com</p>
        </div>
        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M22 11.08V12a10 10 0 11-5.93-9.14"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M22 4L12 14.01l-3-3"
            />
          </svg>
          <p className="text-gray-600">+123 456 7890</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
