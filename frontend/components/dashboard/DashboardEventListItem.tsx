import { EventItem } from '@/types/event'
import { formatDate } from '@/lib/date';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faClock } from '@fortawesome/free-regular-svg-icons'
type EventCardProps = {
    data: EventItem,
    index: number;
}
const colors = [
    "text-red-600",
    "text-yellow-600",
    "text-emerald-600",
];
const graidents = ["from-red-400 to-rose-500", "from-yellow-400 to-amber-500", "from-emerald-400 to-emerald-500"]

function DashboardEventListItem({ data,index }: EventCardProps) {
    const bgColor = graidents[index % colors.length]
    const textColor = colors[index % colors.length]
    const datetime = data.startDate;
    const date = datetime.split("T")[0];
    const time = datetime.split("T")[1].slice(0, 5);
    return (
        <div className={`relative overflow-hidden w-full px-5 py-3 rounded-lg text-white bg-linear-to-r ${bgColor}`}>
            {/* diagonal overlay */}
            <div className="
                pointer-events-none
                absolute inset-0
                bg-white/20
                opacity-40
                [clip-path:polygon(40%_0,100%_0,100%_100%,65%_100%)]
            " />
            <div className='flex justify-between items-center'>
                <div className='left'>
                    <p className='font-medium'>{data.title}</p>
                </div>
                <div className={`right py-2 px-3 bg-gray-50/90 rounded-4xl flex items-center gap-1.5`}>
                    <FontAwesomeIcon icon={faClock} className={`${textColor}`}/>
                    <p className={`${textColor} font-medium`}>{formatDate(new Date(data.startDate))} • {time}</p>
                </div>
            </div>

        </div>
    )
}

export default DashboardEventListItem