export default function StatCard({ title, value, color}: any) {
  return (
    <div className={`
      ${color}  wobbly-journal
      p-5 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 border-2 border-slate-900/5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.05)]
    `}>
      <p className="font-handwriting text-xl text-slate-600 mb-1">{title}</p>
      <span className="text-4xl font-bold font-mono tracking-tighter text-slate-800">
        {value}
      </span>
      {/* Alt Karalama */}
      <div className="w-12 h-1 bg-black/5 mt-2 rounded-full" />
    </div>
  );
}