import { EventItem } from '@/types/event'
import { formatDate } from '@/lib/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons'

type EventCardProps = {
    data: EventItem,
    index: number;
}

// Daha "kalemle yazılmış" gibi duran renkler
const watercolorColors = [
    { bg: "bg-rose-100/80", text: "text-rose-700", border: "border-rose-200" },
    { bg: "bg-amber-100/80", text: "text-amber-700", border: "border-amber-200" },
    { bg: "bg-emerald-100/80", text: "text-emerald-700", border: "border-emerald-200" },
];

function DashboardEventListItem({ data, index }: EventCardProps) {
    const style = watercolorColors[index % watercolorColors.length];
    const wobblyClass = ["wobbly-1", "wobbly-2", "wobbly-3"][index % 3];
    
    const time = data.startDate.split("T")[1].slice(0, 5);

    return (
        <div className={`
            relative w-full px-6 py-4 transition-all duration-300
            ${style.bg} ${wobblyClass} border-2 ${style.border}
            flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4
        `}>
            {/* Sol Taraf: Başlık */}
            <div className="relative">
                <p className={`font-handwriting text-lg md:text-2xl ${style.text} leading-none`}>
                    {data.title}
                </p>
                {/* Alt çizgi karalaması */}
                <div className={`h-[2px] w-full ${style.text} opacity-20 absolute -bottom-1 left-0 rotate-[-1deg] bg-current`} />
            </div>

            {/* Sağ Taraf: Tarih ve Saat */}
            <div className={`
                flex items-center gap-2 py-1.5 px-4 
                bg-white/50 backdrop-blur-sm rounded-full 
                border border-white/60 shadow-inner
            `}>
                <FontAwesomeIcon icon={faClock} className={`${style.text} opacity-70`} />
                <p className={`${style.text} font-mono text-xs font-semibold`}>
                    {formatDate(new Date(data.startDate), "long")} • {time}
                </p>
            </div>

            {/* Dekoratif: "Ataç" veya "Bant" - Sadece ilk kartta veya her kartta küçük bir detay */}
            {index % 2 === 0 && (
                <div className="absolute -top-2 left-10 w-8 h-4 bg-slate-400/20 -rotate-12 border-x border-slate-500/10 shadow-sm" />
            )}
        </div>
    )
}

export default DashboardEventListItem