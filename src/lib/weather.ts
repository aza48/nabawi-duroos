/** Madinah's current weather, read from Open-Meteo (free, no key) and described in plain words. */
export const MADINAH = { lat: 24.4672, lon: 39.6112 };

export type WeatherKind = "clear" | "cloudy" | "fog" | "rain" | "storm";
export type Weather = {
  tempC: number;
  feelsC: number;
  kind: WeatherKind;
  label: string;
  labelAr: string;
  isDay: boolean;
  humidity: number;
  windKmh: number;
  at: string;
};

/** WMO weather codes, as Open-Meteo reports them. */
export function describeWeather(code: number, isDay: boolean): Pick<Weather, "kind" | "label" | "labelAr"> {
  if (code === 0) return { kind: "clear", label: isDay ? "Sunny" : "Clear", labelAr: isDay ? "مشمس" : "صافٍ" };
  if (code === 1) return { kind: "clear", label: isDay ? "Mostly sunny" : "Mostly clear", labelAr: "صافٍ غالبًا" };
  if (code === 2) return { kind: "cloudy", label: "Partly cloudy", labelAr: "غائم جزئيًا" };
  if (code === 3) return { kind: "cloudy", label: "Cloudy", labelAr: "غائم" };
  if (code === 45 || code === 48) return { kind: "fog", label: "Hazy", labelAr: "ضباب" };
  if (code >= 95) return { kind: "storm", label: "Thunderstorm", labelAr: "عاصفة رعدية" };
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { kind: "rain", label: code <= 57 ? "Drizzle" : "Rain", labelAr: "مطر" };
  if (code >= 71 && code <= 86) return { kind: "cloudy", label: "Cold and cloudy", labelAr: "بارد وغائم" };
  return { kind: "clear", label: "Clear", labelAr: "صافٍ" };
}

export const openMeteoUrl = () =>
  `https://api.open-meteo.com/v1/forecast?latitude=${MADINAH.lat}&longitude=${MADINAH.lon}` +
  "&current=temperature_2m,apparent_temperature,weather_code,is_day,relative_humidity_2m,wind_speed_10m&timezone=Asia%2FRiyadh";

type OpenMeteo = {
  current?: { time: string; temperature_2m: number; apparent_temperature: number; weather_code: number; is_day: number; relative_humidity_2m: number; wind_speed_10m: number };
};

export function parseOpenMeteo(json: OpenMeteo): Weather | null {
  const c = json.current;
  if (!c || typeof c.temperature_2m !== "number") return null;
  const isDay = c.is_day === 1;
  return {
    tempC: Math.round(c.temperature_2m),
    feelsC: Math.round(c.apparent_temperature),
    isDay,
    humidity: Math.round(c.relative_humidity_2m),
    windKmh: Math.round(c.wind_speed_10m),
    at: c.time,
    ...describeWeather(c.weather_code, isDay),
  };
}
