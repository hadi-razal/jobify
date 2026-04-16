const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header Section */}
      <div className="w-full py-16 px-4 border-b-2 border-black bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
            The standard <br/> for hiring.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-medium tracking-wide max-w-2xl mx-auto">
            We are relentlessly dedicated to connecting ambitious professionals with cutting-edge companies. 
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="w-full py-16 px-4 border-b-2 border-black">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10 items-start">
          <div className="w-full md:w-1/3">
            <h2 className="text-3xl font-black uppercase tracking-tighter border-l-4 border-black pl-4">Our Mission</h2>
          </div>
          <div className="w-full md:w-2/3 space-y-4 text-base font-bold text-gray-700 leading-relaxed">
            <p>
              Welcome to <span className="text-black font-black">Jobify</span>. Originating from a fundamental belief that talent is universally distributed but opportunity is not, we've crafted a platform that aggressively levels the playing field.
            </p>
            <p>
              With a profound understanding of the dynamic global job market, Jobify cuts through the friction of traditional hiring. We eliminate unnecessary steps, enforcing a streamlined, brutal efficiency that candidates and employers actually enjoy using. 
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="w-full py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-10">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-black shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-3 border-b-2 border-black pb-2">01. Integrity</h3>
              <p className="text-gray-600 font-bold text-sm">Every company is highly vetted. No phantom jobs, no ghosting protocols.</p>
            </div>
            <div className="p-6 border-2 border-black shadow-sm bg-black text-white">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-3 border-b-2 border-white pb-2">02. Velocity</h3>
              <p className="text-gray-300 font-bold text-sm">1-click apply. Massive distribution. We focus purely on moving fast.</p>
            </div>
            <div className="p-6 border-2 border-black shadow-sm">
              <h3 className="text-xl font-black uppercase tracking-tighter mb-3 border-b-2 border-black pb-2">03. Impact</h3>
              <p className="text-gray-600 font-bold text-sm">Connecting the right talent to the right mission drastically changes the world.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
