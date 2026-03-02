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
  mapIcon: MapIconDesignation;
};

export const wmoToMapIcon: Record<WmoCode, WmoInfo> = {
  "0":  { description: "Clear",           longDescription: "Clear sky.",                    mapIcon: "01" },
  "1":  { description: "MainlyClear",     longDescription: "Mainly clear sky.",             mapIcon: "02" },
  "2":  { description: "PartlyCloudy",    longDescription: "Partly cloudy sky.",            mapIcon: "02" },
  "3":  { description: "Overcast",        longDescription: "Overcast sky.",                 mapIcon: "03" },
  "45": { description: "Fog",             longDescription: "Foggy.",                        mapIcon: "50" },
  "48": { description: "Fog",             longDescription: "Depositing rime fog.",          mapIcon: "50" },
  "51": { description: "Drizzle",         longDescription: "Light drizzle.",                mapIcon: "10" },
  "53": { description: "Drizzle",         longDescription: "Moderate drizzle.",             mapIcon: "09" },
  "55": { description: "Drizzle",         longDescription: "Dense drizzle.",                mapIcon: "09" },
  "56": { description: "FreezingDrizzle", longDescription: "Light freezing drizzle.",       mapIcon: "09" },
  "57": { description: "FreezingDrizzle", longDescription: "Dense freezing drizzle.",       mapIcon: "09" },
  "61": { description: "Rain",            longDescription: "Slight rain.",                  mapIcon: "10" },
  "63": { description: "Rain",            longDescription: "Moderate rain.",                mapIcon: "09" },
  "65": { description: "Rain",            longDescription: "Heavy rain.",                   mapIcon: "09" },
  "66": { description: "FreezingRain",    longDescription: "Light freezing rain.",          mapIcon: "09" },
  "67": { description: "FreezingRain",    longDescription: "Heavy freezing rain.",          mapIcon: "09" },
  "71": { description: "Snow",            longDescription: "Slight snow fall.",             mapIcon: "13" },
  "73": { description: "Snow",            longDescription: "Moderate snow fall.",           mapIcon: "13" },
  "75": { description: "Snow",            longDescription: "Heavy snow fall.",              mapIcon: "13" },
  "77": { description: "Snow",            longDescription: "Snow grains falling.",          mapIcon: "13" },
  "80": { description: "Rain",            longDescription: "Slight rain showers.",          mapIcon: "10" },
  "81": { description: "Rain",            longDescription: "Moderate rain showers.",        mapIcon: "09" },
  "82": { description: "Rain",            longDescription: "Violent rain showers.",         mapIcon: "09" },
  "85": { description: "Snow",            longDescription: "Slight snow showers.",          mapIcon: "13" },
  "86": { description: "Snow",            longDescription: "Heavy snow showers.",           mapIcon: "13" },
  "95": { description: "Thunderstorm",    longDescription: "Thunderstorm.",                 mapIcon: "07" },
  "96": { description: "Thunderstorm",    longDescription: "Thunderstorm with slight hail.",mapIcon: "07" },
  "99": { description: "Thunderstorm",    longDescription: "Thunderstorm with heavy hail.", mapIcon: "07" },
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
  isDay: boolean,
  ext: "png" | "svg" = "png"
): string | null {
  const info = getWmoInfo(code);
  if (!info) return null;

  const suffix = isDay ? "d" : "n";
  return `/weather_icons/${info.mapIcon}${suffix}.${ext}`;
}