/**
 * Firebase WaterPulse — config via variables d'environnement Vite (VITE_*).
 * Les clés web restent visibles dans le bundle client (restriction domaine Firebase).
 */
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.appId) {
  console.warn(
    '[Firebase] Config incomplète : définis les variables VITE_FIREBASE_* dans .env / .env.production'
  );
}

export const app = initializeApp(firebaseConfig);

/** Analytics initialisé seulement si l’environnement le permet (navigateur). */
export let analytics = null;

isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch(() => {
    // Environnement sans Analytics (SSR, tests, etc.)
  });
