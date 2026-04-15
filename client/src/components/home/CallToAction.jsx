import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <div className="w-full bg-black py-24 border-b-2 border-black">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase">
          Ready to Elevate Your Career?
        </h2>
        <p className="text-lg text-gray-400 mb-10 font-medium tracking-wide">
          Join thousands of professionals landing their dream jobs every week. Your path to success starts right here, right now.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register/employee" className="w-full sm:w-auto bg-white text-black font-black uppercase tracking-widest px-8 py-4 hover:bg-gray-200 transition-colors">
            Find a Job
          </Link>
          <Link to="/register/company" className="w-full sm:w-auto bg-transparent border-2 border-white text-white font-black uppercase tracking-widest px-8 py-4 hover:bg-gray-900 transition-colors">
            Hire Talent
          </Link>
        </div>
      </div>
    </div>
  );
}
