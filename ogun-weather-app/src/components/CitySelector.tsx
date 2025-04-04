import React from 'react';
import { motion } from 'framer-motion';
import { OGUN_CITIES } from '../utils/api';
import { FiMapPin } from 'react-icons/fi';
import { logAnalyticsEvent, AnalyticsEvents } from '../utils/analytics';

interface CitySelectorProps {
  selectedCity: number;
  onCityChange: (index: number) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ selectedCity, onCityChange }) => {
  return (
    <motion.div
      className="mb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-5 flex items-center bg-blue-800/30 py-3 px-6 rounded-full inline-block shadow-lg border border-blue-400/20">
        <FiMapPin className="mr-3 text-cyan-300" />
        <span>Cities in Ogun State</span>
      </h2>
      <div className="flex flex-wrap gap-3 bg-blue-900/30 p-4 rounded-2xl shadow-lg border border-blue-400/10">
        {OGUN_CITIES.map((city, index) => (
          <motion.button
            key={city.name}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCity === index
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl border border-blue-300/30'
                : 'bg-blue-800/40 text-white hover:bg-blue-700/50 border border-blue-400/20 shadow-md'
            }`}
            onClick={() => {
              // Log city selection to Firebase Analytics
              logAnalyticsEvent(AnalyticsEvents.CITY_SELECTED, {
                city_name: city.name,
                city_index: index,
                coordinates: { lat: city.lat, lon: city.lon }
              });

              // Call the original onCityChange function
              onCityChange(index);
            }}
            whileHover={{ scale: 1.08, y: -3, boxShadow: "0px 8px 20px rgba(59, 130, 246, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            {city.name}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default CitySelector;
