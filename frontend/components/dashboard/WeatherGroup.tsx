import { DailyDisplay } from '@/types/weather'
import Image from 'next/image'
import { getWmoInfo, getLocalWeatherIconPath } from "@/lib/wmoIcons";

function getTurkishDayName(dateStr: string) {
    return new Intl.DateTimeFormat("en-EN", {
        weekday: "short",
    }).format(new Date(dateStr));
}

type WeatherGroupProps = DailyDisplay & {
    active?: boolean
}

function WeatherGroup({ active, ...props }: WeatherGroupProps) {
    const info = getWmoInfo(props.weatherCode);
    const iconPath = getLocalWeatherIconPath(props.weatherCode, true, "png");
    if (!info || !iconPath) return null;
    return (
        <div className={`
        flex flex-col items-center pb-2
        ${active ? "border-b-2 border-violet-700" : ""}
      `}>
            <div>
                {getTurkishDayName(props.date)}
            </div>
            <div>
                <Image
                    src={iconPath}
                    alt={info.longDescription}
                    width={36}
                    height={36}
                />
            </div>
            <div>
                {props.tempMax}°C
            </div>
        </div>
    )
}

export default WeatherGroup