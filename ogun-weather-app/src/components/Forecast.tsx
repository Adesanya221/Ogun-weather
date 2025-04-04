import React from 'react';
import { motion } from 'framer-motion';
import { ForecastData } from '../hooks/useWeather';
import ForecastCard from './ForecastCard';
import { groupForecastByDay } from '../utils/helpers';
import { WiTime1 } from 'react-icons/wi';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  if (!data || !data.list) return null;

  const dailyForecast = groupForecastByDay(data.list).slice(0, 5);

  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        className="flex items-center mb-6 bg-blue-800/30 backdrop-blur-md rounded-full px-8 py-3 inline-block shadow-xl border border-blue-400/20"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ boxShadow: '0 15px 30px rgba(59, 130, 246, 0.3)', y: -2 }}
      >
        <WiTime1 size={32} className="mr-3 text-cyan-300" />
        <h2 className="text-2xl font-bold text-white">5-Day Forecast</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
        {dailyForecast.map((day, index) => (
          <ForecastCard
            key={day.date}
            day={day.day}
            date={day.date}
            temp={day.temp}
            temp_min={day.temp_min}
            temp_max={day.temp_max}
            weather={day.weather}
            index={index}
          />
        ))}
      </div>

      <motion.div
        className="mt-8 bg-blue-800/20 backdrop-blur-md rounded-lg p-4 text-center text-blue-100/90 text-sm shadow-lg border border-blue-400/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ boxShadow: '0 10px 25px rgba(59, 130, 246, 0.2)', y: -2 }}
      >
        <p>Forecast data is updated every 3 hours from OpenWeatherMap</p>
      </motion.div>
    </motion.div>
  );
};

export default Forecast;
