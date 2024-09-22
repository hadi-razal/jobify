
const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-10 px-4">
      <h1 className="text-3xl text-blue-950 mb-4">Jobify</h1>
      <div className="max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue-950 mb-3">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Got questions? Contact us using the details below.
        </p>
        <div className="space-y-3 text-gray-600 text-sm">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3 text-gray-500"
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
            123 Main Street, City
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3 text-gray-500"
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
                d="M17.7 14.3a8 8 0 10-11.4 0"
              />
            </svg>
            hadhirasal22@gmail.com
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-3 text-gray-500"
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
            +123 456 7890
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
