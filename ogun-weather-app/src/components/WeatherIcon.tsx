import React from 'react';
import { motion } from 'framer-motion';
import { getWeatherIcon } from '../utils/helpers';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  animate?: boolean;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ iconCode, size = 64, animate = true }) => {
  const { icon: Icon, color } = getWeatherIcon(iconCode);

  const variants = {
    initial: { scale: 0.8, opacity: 0, rotate: -10 },
    animate: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -8, 0],
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Add a glow effect based on the weather type
  const getGlowColor = () => {
    if (iconCode.includes('01') || iconCode.includes('02')) return 'filter drop-shadow(0 0 8px rgba(255, 180, 0, 0.6))';
    if (iconCode.includes('09') || iconCode.includes('10')) return 'filter drop-shadow(0 0 8px rgba(66, 165, 245, 0.6))';
    if (iconCode.includes('11')) return 'filter drop-shadow(0 0 8px rgba(92, 107, 192, 0.6))';
    if (iconCode.includes('13')) return 'filter drop-shadow(0 0 8px rgba(224, 224, 224, 0.6))';
    return 'filter drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))';
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={animate ? variants : undefined}
      className={getGlowColor()}
    >
      <motion.div
        variants={animate ? floatVariants : undefined}
        style={{ display: 'inline-block' }}
      >
        <Icon size={size} color={color} />
      </motion.div>
    </motion.div>
  );
};

export default WeatherIcon;
