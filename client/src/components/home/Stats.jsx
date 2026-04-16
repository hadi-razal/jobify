const stats = [
  { label: "Active Jobs", value: "25K+" },
  { label: "Top Companies", value: "8K+" },
  { label: "Candidates Placed", value: "150K+" },
  { label: "Daily Applications", value: "2K+" },
];

export default function Stats() {
  return (
    <div className="w-full bg-white py-12 px-6 border-y-2 border-black">
      <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 divide-x-2 divide-gray-200">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center justify-center p-2">
            <h3 className="text-3xl font-black text-black tracking-tighter mb-1">
              {stat.value}
            </h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
