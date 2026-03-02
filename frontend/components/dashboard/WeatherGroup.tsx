import { ForecastDay } from '@/types/weather'
import Image from 'next/image'
import React from 'react'

function getTurkishDayName(dateStr: string) {
    return new Intl.DateTimeFormat("en-EN", {
        weekday: "short",
    }).format(new Date(dateStr));
}

type WeatherGroupProps = ForecastDay & {
  active?: boolean
}

function WeatherGroup({active, ...props}: WeatherGroupProps) {
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
                    src={`https:${props.day.condition.icon}`}
                    alt={props.day.condition.text}
                    width={36}
                    height={36}
                />
            </div>
            <div>
                {props.day.avgtemp_c}°C
            </div>
        </div>
    )
}

export default WeatherGroup