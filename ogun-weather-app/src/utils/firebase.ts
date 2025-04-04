// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOLqMp-ZDmhPK_sJqvJmVDjlCadWJXuoA",
  authDomain: "ogun-weather-7f4b0.firebaseapp.com",
  projectId: "ogun-weather-7f4b0",
  storageBucket: "ogun-weather-7f4b0.firebasestorage.app",
  messagingSenderId: "139702286451",
  appId: "1:139702286451:web:487b12c1d4a34c493ad206",
  measurementId: "G-R0PJ415RFH"
};

// Initialize Firebase
let firebaseApp: FirebaseApp | undefined;
let analytics: Analytics | undefined;

// Initialize Firebase only if it hasn't been initialized already
// and only on the client side
if (typeof window !== 'undefined' && !getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);

  // Initialize Analytics only if it's supported
  const initAnalytics = async () => {
    if (await isSupported()) {
      analytics = getAnalytics(firebaseApp);
      console.log('Firebase Analytics initialized');
    } else {
      console.log('Firebase Analytics is not supported in this environment');
    }
  };

  initAnalytics().catch(error => {
    console.error('Error initializing Firebase Analytics:', error);
  });
}

export { firebaseApp, analytics };
