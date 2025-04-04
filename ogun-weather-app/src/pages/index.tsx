import { useState, useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useWeather } from '../hooks/useWeather';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { WiDaySunny } from 'react-icons/wi';
import { FiSun, FiCloud, FiDroplet, FiWind } from 'react-icons/fi';
// Import Firebase Analytics utilities
import { logAnalyticsEvent, AnalyticsEvents } from '../utils/analytics';

// Dynamically import components to ensure they're only loaded client-side
const CurrentWeather = dynamic(() => import('../components/CurrentWeather'), { ssr: false });
const Forecast = dynamic(() => import('../components/Forecast'), { ssr: false });
const CitySelector = dynamic(() => import('../components/CitySelector'), { ssr: false });

// Make the component client-side only
const Home = () => {
  const {
    currentWeather,
    forecast,
    loading,
    error,
    selectedCity,
    changeCity,
    retryFetch
  } = useWeather(0);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Log app loaded event to Firebase Analytics
    logAnalyticsEvent(AnalyticsEvents.APP_LOADED, {
      timestamp: new Date().toISOString(),
    });
  }, []);

  // Log page view event when component mounts
  useEffect(() => {
    if (mounted) {
      logAnalyticsEvent(AnalyticsEvents.PAGE_VIEW, {
        page_title: 'Home',
        page_location: window.location.href,
      });
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-700 text-white">
      <Head>
        <title>Ogun State Weather App</title>
        <meta name="description" content="Beautiful weather forecast for Ogun State, Nigeria" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-20 animate-float">
        <FiSun size={60} className="text-blue-300" />
      </div>
      <div className="absolute top-40 right-10 opacity-20 animate-float" style={{ animationDelay: '1s' }}>
        <FiCloud size={50} className="text-cyan-200" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>
        <FiDroplet size={40} className="text-indigo-300" />
      </div>
      <div className="absolute bottom-40 right-20 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
        <FiWind size={45} className="text-teal-200" />
      </div>

      {/* Additional decorative elements for depth */}
      <div className="absolute top-1/3 left-1/4 opacity-10 animate-float" style={{ animationDelay: '2.5s' }}>
        <FiCloud size={70} className="text-white/50" />
      </div>
      <div className="absolute bottom-1/3 right-1/4 opacity-10 animate-float" style={{ animationDelay: '3s' }}>
        <FiDroplet size={65} className="text-blue-200/50" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <WiDaySunny size={60} className="text-cyan-300 mr-3 filter drop-shadow(0 0 15px rgba(56, 189, 248, 0.8))" />
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 via-blue-200 to-indigo-100">
              Ogun Weather
            </h1>
          </div>
          <motion.p
            className="text-xl text-cyan-100 bg-blue-900/30 py-2 px-8 rounded-full inline-block shadow-lg shadow-blue-900/30 border border-blue-400/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Real-time weather updates for Ogun State, Nigeria
          </motion.p>
        </motion.header>

        <CitySelector selectedCity={selectedCity} onCityChange={changeCity} />

        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState
            message={error}
            onRetry={() => {
              // Try to fetch data again using the retry function
              retryFetch();
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <Forecast data={forecast} />}
          </motion.div>
        )}

        <motion.footer
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-blue-800/30 backdrop-blur-md rounded-xl py-4 px-8 inline-block shadow-xl border border-blue-400/20 hover:shadow-2xl hover:border-blue-400/30 transition-all duration-300">
            <p className="text-blue-100/80 font-medium">Data provided by OpenWeatherMap</p>
            <p className="mt-1 text-cyan-200">© {new Date().getFullYear()} Ogun State Weather App</p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

// Export the component
export default Home;
