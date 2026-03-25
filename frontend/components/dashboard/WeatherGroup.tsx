import { DailyForecastDisplay } from '@/types/weather'
import Image from 'next/image'
import { getWmoInfo, getLocalWeatherIconPath } from "@/lib/wmoIcons";

function getDayName(dateStr: string) {
    return new Intl.DateTimeFormat("en-EN", {
        weekday: "short",
    }).format(new Date(dateStr));
}

type WeatherGroupProps = DailyForecastDisplay & {
    active?: boolean
}

function WeatherGroup({ active, ...props }: WeatherGroupProps) {
    const info = getWmoInfo(props.weatherCode);
    const iconPath = getLocalWeatherIconPath(props.weatherCode);
    if (!info||!iconPath) return null;
    return (
        <div className={`
        flex flex-col items-center pb-2
        ${active ? "border-b-2 border-violet-700" : ""}
      `}>
            <div>
                {getDayName(props.date)}
            </div>
            <div>
                <Image
                    src={iconPath}
                    alt={info.description}
                    width={48}
                    height={48}
                    title={info.longDescription}
                />
            </div>
            <div>
                {Math.round(props.tempMax)}°C
            </div>
        </div>
    )
}

export default WeatherGroup