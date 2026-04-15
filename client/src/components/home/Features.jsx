import { Sparkles, Target, Zap, ShieldCheck, Search, Users } from "lucide-react";

const features = [
  { icon: Search, title: "Smart Job Matching", description: "Our algorithm connects you to jobs perfectly aligned with your skillset." },
  { icon: Zap, title: "1-Click Apply", description: "Say goodbye to repetitive forms. Apply to thousands of companies instantly." },
  { icon: ShieldCheck, title: "Verified Employers", description: "Every company is verified to ensure a safe job hunt experience." },
  { icon: Target, title: "Career Insights", description: "Real-time insights into salary trends and market demands for your role." },
  { icon: Users, title: "Community Network", description: "Connect directly with hiring managers and industry peers." },
  { icon: Sparkles, title: "Resume Builder", description: "Create ATS-friendly resumes within minutes using our tools." }
];

export default function Features() {
  return (
    <div className="w-full bg-white py-16 px-6 border-b-2 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 border-l-4 border-black pl-6">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4 tracking-tighter uppercase">
            Everything you need.
          </h2>
          <p className="text-base text-gray-600 max-w-2xl font-medium tracking-wide">
            We provide world-class tools to empower your career evolution. Streamlined, intuitive, and built for modern professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-6 border-2 border-black hover:bg-black group transition-colors duration-300">
              <div className="w-10 h-10 bg-black flex items-center justify-center mb-4 group-hover:bg-white transition-colors duration-300 rounded-none">
                <feature.icon className="text-white group-hover:text-black" size={20} />
              </div>
              <h3 className="text-lg font-black text-black mb-2 group-hover:text-white transition-colors">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-300 font-bold transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
