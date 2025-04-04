import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import { logAnalyticsEvent, AnalyticsEvents } from '../utils/analytics';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  // Log error state to Firebase Analytics when component mounts
  useEffect(() => {
    logAnalyticsEvent(AnalyticsEvents.ERROR_OCCURRED, {
      error_type: 'ui_error',
      message: message,
      has_retry: !!onRetry
    });
  }, [message, onRetry]);
  return (
    <motion.div
      className="bg-gradient-to-br from-blue-800/40 to-indigo-900/40 backdrop-blur-md rounded-xl p-8 text-white text-center border border-blue-400/30 shadow-xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ boxShadow: '0 25px 50px -12px rgba(59, 130, 246, 0.25)' }}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mb-6 inline-block"
      >
        <FiAlertTriangle className="h-20 w-20 mx-auto text-cyan-300" />
      </motion.div>

      <h3 className="text-2xl font-bold mb-3 text-cyan-100">
        {message.includes('demo') ? 'Demo Data Notice' : 'Weather Data Status'}
      </h3>
      <p className="mb-6 text-blue-100 bg-blue-900/30 py-3 px-6 rounded-lg inline-block shadow-md border border-blue-400/20">
        {message}
      </p>
      {message.includes('demo') ? (
        <>
          <p className="mb-3 text-blue-200/70 text-sm">The app is currently using sample weather data. All features are fully functional.</p>
          <p className="mb-3 text-blue-200/70 text-sm">This may be due to API rate limits or network connectivity issues.</p>
        </>
      ) : (
        <p className="mb-6 text-green-200/90 text-sm bg-green-900/20 py-2 px-4 rounded-lg inline-block shadow-md border border-green-400/20">
          Using live weather data from OpenWeatherMap API
        </p>
      )}

      {onRetry && (
        <motion.button
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg flex items-center justify-center mx-auto gap-2 border border-blue-300/30"
          onClick={() => {
            // Log retry button click to Firebase Analytics
            logAnalyticsEvent(AnalyticsEvents.RETRY_ATTEMPTED, {
              from_error_ui: true,
              error_message: message
            });

            // Call the original onRetry function
            if (onRetry) onRetry();
          }}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(59, 130, 246, 0.4)", y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <FiRefreshCw className="mr-2" />
          {message.includes('demo') ? 'Retry Live API Connection' : 'Refresh Weather Data'}
        </motion.button>
      )}

      <motion.p
        className="mt-6 text-sm text-blue-200/70 bg-blue-900/20 py-2 px-4 rounded-full inline-block shadow-md border border-blue-400/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {message.includes('demo')
          ? 'Using OpenWeatherMap API with fallback to demo data when needed'
          : 'Successfully connected to OpenWeatherMap API'}
      </motion.p>
    </motion.div>
  );
};

export default ErrorState;
