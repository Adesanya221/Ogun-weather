import React from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

interface ForecastCardProps {
  day: string;
  date: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  index: number;
}

const ForecastCard: React.FC<ForecastCardProps> = ({
  day,
  date,
  temp,
  temp_min,
  temp_max,
  weather,
  index
}) => {
  return (
    <motion.div
      className="bg-gradient-to-b from-blue-600 to-indigo-700 backdrop-blur-md rounded-xl p-5 text-white flex flex-col items-center shadow-xl border border-blue-400/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: index * 0.1,
          duration: 0.5
        }
      }}
      whileHover={{
        scale: 1.07,
        y: -5,
        boxShadow: "0px 15px 30px rgba(59, 130, 246, 0.4)"
      }}
      whileTap={{ scale: 0.98 }}
    >
      <h3 className="font-bold text-lg bg-blue-500/30 px-4 py-1 rounded-full mb-3 shadow-md border border-blue-400/20">{day}</h3>
      <div className="bg-blue-500/20 rounded-full p-3 mb-3 shadow-lg border border-blue-400/20">
        <WeatherIcon iconCode={weather.icon} size={48} />
      </div>
      <p className="text-sm mt-1 text-center capitalize font-medium text-cyan-100">{weather.description}</p>
      <div className="mt-4 flex items-center justify-between w-full bg-blue-500/20 rounded-lg px-4 py-3 shadow-md border border-blue-400/20">
        <span className="text-blue-200 font-medium">{Math.round(temp_min)}°</span>
        <span className="font-bold text-xl text-white">{Math.round(temp)}°</span>
        <span className="text-cyan-200 font-medium">{Math.round(temp_max)}°</span>
      </div>
    </motion.div>
  );
};

export default ForecastCard;
