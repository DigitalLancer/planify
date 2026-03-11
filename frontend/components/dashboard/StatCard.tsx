const wobblyBorder = "rounded-[255px_15px_225px_15px/15px_225px_15px_255px]";

type StatCardProps = {
  title: string;
  value: string | number; // Değer hem "2" hem de 2 olabilir
  subtitle?: string;      // Opsiyonel (her kartta olmayabilir)
  icon: React.ReactNode;   // Lucide ikonları veya herhangi bir SVG/Component için
  bgcolor: string;        // Tailwind class'ı (örn: "bg-blue-100")
  rotate: string;         // Tailwind class'ı (örn: "-rotate-2")
}
export default function StatCard({ title, value, subtitle, icon, bgcolor, rotate }: StatCardProps) {
  return (
    <div className={`
      ${bgcolor} ${rotate} ${wobblyBorder} p-6 border-2 border-slate-900/5 shadow-sm transition-transform hover:scale-105 hover:rotate-0
    `}>
      <div className="flex justify-between items-start">
        <span className="text-3xl font-bold font-mono tracking-tighter">{value}</span>
        <div className="opacity-60">{icon}</div>
      </div>
      <p className="mt-2 font-handwriting text-xl text-slate-700">{title}</p>
      <p className="text-xs uppercase tracking-widest opacity-50 font-sans">{subtitle}</p>
    </div>
  );
}