// wmoIcons.ts

export type WmoCode =
  | "0" | "1" | "2" | "3"
  | "45" | "48"
  | "51" | "53" | "55" | "56" | "57"
  | "61" | "63" | "65" | "66" | "67"
  | "71" | "73" | "75" | "77"
  | "80" | "81" | "82"
  | "85" | "86"
  | "95" | "96" | "99";

export type MapIconDesignation =
  | "01" | "02" | "03" | "50" | "10" | "09" | "13" | "07";

export type WmoInfo = {
  description: string;
  longDescription: string;
  mapIcon: string;
};

export const wmoToMapIcon: Record<WmoCode, WmoInfo> = {
  "0":  { description: "Clear" ,           longDescription: "Clear sky",                    mapIcon: "clear-day.svg" },
  "1":  { description: "MainlyClear",     longDescription: "Mainly clear sky",             mapIcon: "fair-day.svg" },
  "2":  { description: "Partly Cloudy",    longDescription: "Partly cloudy sky",            mapIcon: "cloudy-day-2.svg" },
  "3":  { description: "Overcast",        longDescription: "Overcast sky",                 mapIcon: "cloudy-original.svg" },
  "45": { description: "Fog",             longDescription: "Foggy",                        mapIcon: "fog.svg" },
  "48": { description: "Fog",             longDescription: "Depositing rime fog",          mapIcon: "fog.svg" },
  "51": { description: "Drizzle",         longDescription: "Light drizzle",                mapIcon: "rainy-2.svg" },
  "53": { description: "Drizzle",         longDescription: "Moderate drizzle",             mapIcon: "rainy-3.svg" },
  "55": { description: "Drizzle",         longDescription: "Dense drizzle",                mapIcon: "rainy-3.svg" },
  "56": { description: "FreezingDrizzle", longDescription: "Light freezing drizzle",       mapIcon: "rainy-2.svg" },
  "57": { description: "FreezingDrizzle", longDescription: "Dense freezing drizzle",       mapIcon: "rainy-2.svg" },
  "61": { description: "Rain",            longDescription: "Slight rain",                  mapIcon: "rainy-4.svg" },
  "63": { description: "Rain",            longDescription: "Moderate rain",                mapIcon: "rainy-5.svg" },
  "65": { description: "Rain",            longDescription: "Heavy rain",                   mapIcon: "rainy-6.svg" },
  "66": { description: "FreezingRain",    longDescription: "Light freezing rain",          mapIcon: "rainy-4.svg" },
  "67": { description: "FreezingRain",    longDescription: "Heavy freezing rain",          mapIcon: "rainy-6.svg" },
  "71": { description: "Snow",            longDescription: "Slight snow fall",             mapIcon: "snowy-4.svg" },
  "73": { description: "Snow",            longDescription: "Moderate snow fall",           mapIcon: "snowy-5.svg" },
  "75": { description: "Snow",            longDescription: "Heavy snow fall",              mapIcon: "snowy-6.svg" },
  "77": { description: "Snow",            longDescription: "Snow grains falling",          mapIcon: "snowy-4.svg" },
  "80": { description: "Rain",            longDescription: "Slight rain showers",          mapIcon: "rainy-4.svg" },
  "81": { description: "Rain",            longDescription: "Moderate rain showers",        mapIcon: "rainy-5.svg" },
  "82": { description: "Rain",            longDescription: "Violent rain showers",         mapIcon: "rainy-7.svg" },
  "85": { description: "Snow",            longDescription: "Slight snow showers",          mapIcon: "snowy-4.svg" },
  "86": { description: "Snow",            longDescription: "Heavy snow showers",           mapIcon: "snowy-6.svg" },
  "95": { description: "Thunderstorm",    longDescription: "Thunderstorm",                 mapIcon: "thunder.svg" },
  "96": { description: "Thunderstorm",    longDescription: "Thunderstorm with slight hail",mapIcon: "thunder.svg" },
  "99": { description: "Thunderstorm",    longDescription: "Thunderstorm with heavy hail", mapIcon: "thunder.svg" },
};

export function getWmoInfo(code: number | string): WmoInfo | null {
  const key = String(code) as WmoCode;
  return wmoToMapIcon[key] ?? null;
}

/**
 * public/icons klasöründeki dosya adını üretir.
 * Örn: mapIcon="01" ve isDay=true => "/icons/01d.png"
 */
export function getLocalWeatherIconPath(
  code: number | string,
): string | null {
  const info = getWmoInfo(code);
  if (!info) return null;

  return `/weather_icons_new/${info.mapIcon}`;
}