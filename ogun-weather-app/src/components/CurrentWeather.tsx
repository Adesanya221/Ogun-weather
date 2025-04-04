import React from 'react';
import { motion } from 'framer-motion';
import { WeatherData } from '../hooks/useWeather';
import WeatherIcon from './WeatherIcon';
import { formatDate, formatTime, weatherDetailIcons } from '../utils/helpers';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data) return null;

  const {
    name,
    main: { temp, feels_like, humidity, pressure },
    weather,
    wind,
    sys: { sunrise, sunset }
  } = data;

  const WeatherDetails = [
    {
      icon: weatherDetailIcons.feels_like,
      label: 'Feels Like',
      value: `${Math.round(feels_like)}°C`
    },
    {
      icon: weatherDetailIcons.humidity,
      label: 'Humidity',
      value: `${humidity}%`
    },
    {
      icon: weatherDetailIcons.wind,
      label: 'Wind',
      value: `${Math.round(wind.speed * 3.6)} km/h`
    },
    {
      icon: weatherDetailIcons.pressure,
      label: 'Pressure',
      value: `${pressure} hPa`
    },
    {
      icon: weatherDetailIcons.sunrise,
      label: 'Sunrise',
      value: formatTime(sunrise)
    },
    {
      icon: weatherDetailIcons.sunset,
      label: 'Sunset',
      value: formatTime(sunset)
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl border border-blue-400/20"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)' }}
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-white/80">{formatDate(data.dt)}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold">{Math.round(temp)}°C</div>
          <p className="text-xl capitalize">{weather[0].description}</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center my-8">
        <div className="bg-blue-500/20 backdrop-blur-md rounded-full p-8 shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-float border border-blue-400/30">
          <WeatherIcon iconCode={weather[0].icon} size={130} />
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
        variants={containerVariants}
      >
        {WeatherDetails.map((detail, index) => (
          <motion.div
            key={index}
            className="bg-blue-600/20 backdrop-blur-md rounded-xl p-4 flex items-center shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-500/30 border border-blue-400/20"
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.4)' }}
            whileTap={{ scale: 0.98 }}
          >
            <detail.icon size={32} className="mr-3 text-cyan-300" />
            <div>
              <p className="text-xs font-medium text-white/80">{detail.label}</p>
              <p className="font-bold text-lg">{detail.value}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default CurrentWeather;
