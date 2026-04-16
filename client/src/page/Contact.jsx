import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white text-black py-16 px-4 border-b-2 border-black">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 border-b-4 border-black pb-2 inline-block">
            Get In Touch
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-bold tracking-wide mt-4 max-w-2xl text-center">
            Have questions? Want to partner with us? Reach out through any of the channels below and our team will respond with absolute velocity.
          </p>
        </div>

        {/* Contact Info Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="flex flex-col items-center justify-center p-8 border-2 border-black shadow-sm bg-white hover:-translate-y-1 hover:shadow-md transition-all">
            <MapPin className="w-8 h-8 mb-4 text-black" strokeWidth={2.5} />
            <h2 className="text-lg font-black uppercase tracking-widest mb-1">Location</h2>
            <p className="text-gray-600 font-bold text-center text-xs">
              123 Main Street<br/>
              Tech Valley, CA 94043
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-8 border-2 border-black shadow-sm bg-black text-white hover:-translate-y-1 hover:shadow-md transition-all">
            <Mail className="w-8 h-8 mb-4 text-white" strokeWidth={2.5} />
            <h2 className="text-lg font-black uppercase tracking-widest mb-1 border-b-2 border-white pb-1">Email</h2>
            <a href="mailto:hadhirasal22@gmail.com" className="text-gray-300 font-bold hover:text-white transition-colors text-xs">
              hadhirasal22@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center justify-center p-8 border-2 border-black shadow-sm bg-white hover:-translate-y-1 hover:shadow-md transition-all">
            <Phone className="w-8 h-8 mb-4 text-black" strokeWidth={2.5} />
            <h2 className="text-lg font-black uppercase tracking-widest mb-1">Phone</h2>
            <p className="text-gray-600 font-bold text-xs">
              +1 (123) 456-7890
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
