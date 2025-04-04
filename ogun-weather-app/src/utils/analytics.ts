import { analytics } from './firebase';
import { logEvent, Analytics } from 'firebase/analytics';

/**
 * Log an event to Firebase Analytics
 * @param eventName The name of the event to log
 * @param eventParams Optional parameters to include with the event
 */
export const logAnalyticsEvent = (eventName: string, eventParams?: Record<string, any>) => {
  try {
    if (analytics) {
      // Type assertion to handle the type issue
      logEvent(analytics as Analytics, eventName, eventParams);
      console.log(`Analytics event logged: ${eventName}`, eventParams);
    } else {
      console.log('Analytics not initialized, event not logged:', eventName, eventParams);
    }
  } catch (error) {
    console.error('Error logging analytics event:', error);
  }
};

/**
 * Common analytics events for the weather app
 */
export const AnalyticsEvents = {
  PAGE_VIEW: 'page_view',
  CITY_SELECTED: 'city_selected',
  WEATHER_LOADED: 'weather_loaded',
  FORECAST_VIEWED: 'forecast_viewed',
  ERROR_OCCURRED: 'error_occurred',
  RETRY_ATTEMPTED: 'retry_attempted',
  APP_LOADED: 'app_loaded',
};
