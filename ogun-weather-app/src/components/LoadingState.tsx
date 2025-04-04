import React from 'react';
import { motion } from 'framer-motion';
import { WiDaySunny, WiRaindrops, WiStrongWind } from 'react-icons/wi';

const LoadingState: React.FC = () => {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2
      }
    },
    end: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const loadingCircleVariants = {
    start: {
      y: '0%',
      opacity: 0.3,
      scale: 0.8
    },
    end: {
      y: '0%',
      opacity: 1,
      scale: 1.2
    }
  };

  const loadingCircleTransition = {
    duration: 0.7,
    yoyo: Infinity,
    ease: 'easeInOut'
  };

  const icons = [WiDaySunny, WiRaindrops, WiStrongWind];
  const colors = ['text-cyan-300', 'text-blue-300', 'text-indigo-300'];

  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-br from-blue-700/30 to-indigo-600/30 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-blue-400/20">
      <motion.div
        className="flex space-x-6"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        {icons.map((Icon, index) => (
          <motion.div
            key={index}
            className={`${colors[index]}`}
            variants={loadingCircleVariants}
            transition={{
              ...loadingCircleTransition,
              delay: index * 0.1
            }}
          >
            <Icon size={48} />
          </motion.div>
        ))}
      </motion.div>
      <motion.p
        className="mt-6 text-cyan-100 text-xl font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        Loading weather data...
      </motion.p>
      <motion.div
        className="mt-4 bg-blue-500/30 px-8 py-2 rounded-full text-blue-100 text-sm shadow-lg border border-blue-400/20"
        initial={{ width: '30%' }}
        animate={{ width: '60%' }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      >
        Fetching latest forecasts
      </motion.div>
    </div>
  );
};

export default LoadingState;
