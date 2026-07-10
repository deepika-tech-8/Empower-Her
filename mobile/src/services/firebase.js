// Minimalist, robust initialization wrapper for Firebase in Expo/React Native environment
import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY_TEMPLATE",
  authDomain: "elevateher-learn.firebaseapp.com",
  projectId: "elevateher-learn",
  storageBucket: "elevateher-learn.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:12345:web:abcdef"
};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Persist user sessions securely in standard AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true // Keeps connections reliable on slow networks
});

export { app, auth, db };