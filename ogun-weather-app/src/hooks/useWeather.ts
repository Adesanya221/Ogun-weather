import { useState, useEffect } from 'react';
import { getCurrentWeather, getForecast, OGUN_CITIES } from '../utils/api';
import { logAnalyticsEvent, AnalyticsEvents } from '../utils/analytics';

export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  name: string;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt_txt: string;
  }>;
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export const useWeather = (cityIndex = 0) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState(cityIndex);

  useEffect(() => {
    let isMounted = true;

    const fetchWeatherData = async () => {
      try {
        if (isMounted) setLoading(true);
        if (isMounted) setError(null);

        // Make sure we have a valid city index
        const safeIndex = selectedCity >= 0 && selectedCity < OGUN_CITIES.length ? selectedCity : 0;
        const city = OGUN_CITIES[safeIndex];

        console.log(`Fetching weather data for ${city.name}`);

        // Fetch data with error handling built into the API functions
        // These functions will never throw errors as they have internal fallbacks
        const weatherData = await getCurrentWeather(city.lat, city.lon);
        const forecastData = await getForecast(city.lat, city.lon);

        // Only update state if component is still mounted
        if (isMounted) {
          setCurrentWeather(weatherData);
          setForecast(forecastData);

          // Check if we're using mock data or live data
          const usingMockData = weatherData.name === city.name &&
                               weatherData.weather[0].id === 800 &&
                               weatherData.main.temp === 28.5;

          if (usingMockData) {
            console.log('Using demo data detected - API may be unavailable');
            setError('Using demo data. The app is working with sample weather information.');

            // Log error event to Firebase Analytics
            logAnalyticsEvent(AnalyticsEvents.ERROR_OCCURRED, {
              error_type: 'api_fallback',
              message: 'Using demo data - API may be unavailable',
              city: city.name,
            });
          } else {
            console.log('SUCCESS: Using LIVE weather data from OpenWeatherMap API');
            setError(null);

            // Log successful weather data fetch to Firebase Analytics
            logAnalyticsEvent(AnalyticsEvents.WEATHER_LOADED, {
              city: city.name,
              coordinates: { lat: city.lat, lon: city.lon },
              temperature: weatherData.main.temp,
              weather_condition: weatherData.weather[0].main,
              data_source: 'live_api'
            });
          }
        }
      } catch (err: any) {
        console.error('Error in useWeather hook:', err);
        if (isMounted) {
          const errorMessage = 'Failed to fetch weather data. Using fallback data.';
          setError(errorMessage);

          // Log error to Firebase Analytics
          logAnalyticsEvent(AnalyticsEvents.ERROR_OCCURRED, {
            error_type: 'fetch_error',
            message: err?.message || 'Unknown error',
            city: OGUN_CITIES[selectedCity]?.name || 'Unknown',
            stack: err?.stack?.substring(0, 500) || 'No stack trace'
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchWeatherData();

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [selectedCity]);

  const changeCity = (index: number) => {
    if (index >= 0 && index < OGUN_CITIES.length) {
      setSelectedCity(index);
    }
  };

  // Retry function to refetch data
  const retryFetch = () => {
    setLoading(true);
    setError(null);

    // Log retry attempt to Firebase Analytics
    logAnalyticsEvent(AnalyticsEvents.RETRY_ATTEMPTED, {
      city_index: selectedCity,
      city_name: OGUN_CITIES[selectedCity]?.name || 'Unknown',
      previous_error: error
    });

    // This will trigger the useEffect again
    setSelectedCity(prev => prev);
  };

  return {
    currentWeather,
    forecast,
    loading,
    error,
    selectedCity,
    changeCity,
    retryFetch,
    cities: OGUN_CITIES
  };
};
