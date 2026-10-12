/**
 * Firebase WaterPulse — app web + Analytics (projet solarpulse-676e1).
 */
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCqyPqDZkwrpiGpSp1KsMSVj2HQFuMb2bE',
  authDomain: 'solarpulse-676e1.firebaseapp.com',
  projectId: 'solarpulse-676e1',
  storageBucket: 'solarpulse-676e1.firebasestorage.app',
  messagingSenderId: '678975142088',
  appId: '1:678975142088:web:0419eaab6659d61d408dfd',
  measurementId: 'G-RB9KVNQ6RE',
};

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
