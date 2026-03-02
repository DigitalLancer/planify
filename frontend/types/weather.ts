export type OpenMeteoDailyUnits = {
  time: "iso8601";
  weather_code: "wmo code";
  rain_sum: "mm";
  temperature_2m_max: "°C";
  temperature_2m_min: "°C";
};

export type DailyResponse = {
  time: string[];
  weather_code: number[];
  rain_sum: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
};

export type DailyDisplay = {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  rainSum?: number;
}

export type ForecastResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  daily_units: OpenMeteoDailyUnits;
  daily: DailyResponse;
};