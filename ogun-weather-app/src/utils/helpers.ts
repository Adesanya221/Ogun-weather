import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiNightRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiWindy,
  WiHumidity,
  WiBarometer,
  WiSunrise,
  WiSunset,
  WiThermometer,
  WiStrongWind,
  WiRaindrops,
  WiDayHaze,
  WiNightFog,
  WiDayLightning,
  WiNightLightning,
  WiDaySnow,
  WiNightSnow,
  WiDust
} from 'react-icons/wi';
import { IconType } from 'react-icons';

// Map weather condition codes to icons with vibrant colors
export const getWeatherIcon = (iconCode: string, size = 36): { icon: IconType; color: string } => {
  const isDay = iconCode.includes('d');

  const iconMap: Record<string, { icon: IconType; color: string }> = {
    // Clear sky - cyan for day, deep blue for night
    '01d': { icon: WiDaySunny, color: '#22D3EE' },  // cyan-400
    '01n': { icon: WiNightClear, color: '#3B82F6' }, // blue-500

    // Few clouds - light cyan for day, blue for night
    '02d': { icon: WiDayCloudy, color: '#67E8F9' },  // cyan-300
    '02n': { icon: WiNightCloudy, color: '#60A5FA' }, // blue-400

    // Scattered clouds - teal for day, indigo for night
    '03d': { icon: WiCloud, color: '#2DD4BF' },      // teal-400
    '03n': { icon: WiCloud, color: '#818CF8' },      // indigo-400

    // Broken clouds - blue for day, darker indigo for night
    '04d': { icon: WiCloudy, color: '#38BDF8' },     // sky-400
    '04n': { icon: WiCloudy, color: '#6366F1' },     // indigo-500

    // Shower rain - bright blue for both day and night
    '09d': { icon: WiRain, color: '#0EA5E9' },       // sky-500
    '09n': { icon: WiRain, color: '#2563EB' },       // blue-600

    // Rain - light blue for day, darker blue for night
    '10d': { icon: WiDayRain, color: '#7DD3FC' },    // sky-300
    '10n': { icon: WiNightRain, color: '#1D4ED8' },  // blue-700

    // Thunderstorm - indigo for day, purple for night
    '11d': { icon: WiDayLightning, color: '#A5B4FC' }, // indigo-300
    '11n': { icon: WiNightLightning, color: '#8B5CF6' }, // violet-500

    // Snow - white with blue tint for day, light blue for night
    '13d': { icon: WiDaySnow, color: '#BAE6FD' },    // sky-200
    '13n': { icon: WiNightSnow, color: '#93C5FD' },  // blue-300

    // Mist/fog - light blue-gray for day, darker blue-gray for night
    '50d': { icon: WiDayHaze, color: '#CBD5E1' },    // slate-300
    '50n': { icon: WiNightFog, color: '#94A3B8' },   // slate-400
  };

  return iconMap[iconCode] || { icon: isDay ? WiDaySunny : WiNightClear, color: isDay ? '#22D3EE' : '#3B82F6' };
};

// Format date from timestamp with more readable format
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-NG', {
    weekday: 'long',  // Full weekday name
    month: 'short',
    day: 'numeric',
  });
};

// Format time from timestamp with AM/PM
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-NG', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,  // Use AM/PM format
  });
};

// Get day name from timestamp
export const getDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-NG', { weekday: 'short' });
};

// Group forecast by day with improved algorithm
export const groupForecastByDay = (forecastList: any[]) => {
  const grouped = forecastList.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-NG');
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return Object.keys(grouped).map(date => {
    const items = grouped[date];
    // Find the item closest to noon for the day summary
    const noon = new Date(date);
    noon.setHours(12, 0, 0, 0);
    const noonTime = noon.getTime();

    let closestToNoon = items[0];
    let minDiff = Math.abs(new Date(items[0].dt * 1000).getTime() - noonTime);

    for (let i = 1; i < items.length; i++) {
      const diff = Math.abs(new Date(items[i].dt * 1000).getTime() - noonTime);
      if (diff < minDiff) {
        minDiff = diff;
        closestToNoon = items[i];
      }
    }

    return {
      date,
      day: getDayName(closestToNoon.dt),
      temp: closestToNoon.main.temp,
      feels_like: closestToNoon.main.feels_like,
      temp_min: Math.min(...items.map((item: any) => item.main.temp_min)),
      temp_max: Math.max(...items.map((item: any) => item.main.temp_max)),
      weather: closestToNoon.weather[0],
      items
    };
  });
};

// Enhanced weather detail icons with better visual representation
export const weatherDetailIcons = {
  wind: WiStrongWind,
  humidity: WiRaindrops,
  pressure: WiBarometer,
  sunrise: WiSunrise,
  sunset: WiSunset,
  feels_like: WiThermometer
};

// Get weather condition description
export const getWeatherCondition = (code: number): string => {
  // Weather condition codes: https://openweathermap.org/weather-conditions
  if (code >= 200 && code < 300) return 'Thunderstorm';
  if (code >= 300 && code < 400) return 'Drizzle';
  if (code >= 500 && code < 600) return 'Rain';
  if (code >= 600 && code < 700) return 'Snow';
  if (code >= 700 && code < 800) return 'Atmosphere';
  if (code === 800) return 'Clear';
  if (code > 800) return 'Clouds';
  return 'Unknown';
};
