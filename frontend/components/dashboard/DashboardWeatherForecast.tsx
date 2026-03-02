import { ForecastResponse, ForecastDay } from '@/types/weather';
import React from 'react'
import WeatherGroup from './WeatherGroup';


async function getWeatherData(): Promise<ForecastResponse> {
    const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=Istanbul&lang=tr&days=7`)
    if (!res.ok) throw new Error("Failed");
    return res.json();
}



async function DashboardWeatherForecast() {
    const data = await getWeatherData();
    console.log(data);
    const forecastDays = data.forecast.forecastday;
    return (
        <div className='w-full flex justify-around'>
            {forecastDays.map((forecastDay, index) => (
                <WeatherGroup key={forecastDay.date} {...forecastDay} {...(index === 0 && { active: true })}/>
            ))}
        </div>
    )
}

export default DashboardWeatherForecast