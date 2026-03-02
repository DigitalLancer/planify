import { ForecastResponse, DailyResponse, DailyDisplay } from '@/types/weather';
import React from 'react'
import WeatherGroup from './WeatherGroup';
import { getWmoInfo, getLocalWeatherIconPath } from "@/lib/wmoIcons";

async function getWeatherData(): Promise<ForecastResponse> {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=41.0138&longitude=28.9497&daily=weather_code,rain_sum,temperature_2m_max,temperature_2m_min&timezone=auto`)
    if (!res.ok) throw new Error("Failed");
    return res.json();
}

export function toDailyRows(daily: DailyResponse): DailyDisplay[] {
    const len = daily.time.length;

    return Array.from({ length: len }, (_, i) => ({
        date: daily.time[i],
        weatherCode: daily.weather_code[i],
        tempMax: daily.temperature_2m_max[i],
        tempMin: daily.temperature_2m_min[i],
        rainSum: daily.rain_sum?.[i],
    }));
}

async function DashboardWeatherForecast() {
    const data = await getWeatherData();
    const forecast = toDailyRows(data.daily);
    console.log(forecast);
    return (
        <div className='w-full flex justify-around'>
            {forecast.map((forecastDay, index) => (
                <WeatherGroup key={forecastDay.date} {...forecastDay} {...(index === 0 && { active: true })} />
            ))}
        </div>
    )
}

export default DashboardWeatherForecast