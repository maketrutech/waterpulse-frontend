import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
// i18n : détection navigateur + localStorage (doit être chargé avant l'UI)
import './i18n';
// Firebase Analytics — initialisé au démarrage
import './services/firebase';
// Styles Tailwind (directives @tailwind)
import './index.css';

// Point d'entrée React — HelmetProvider pour le SEO dynamique
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
