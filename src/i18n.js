/**
 * Configuration i18next — FR / EN (WaterPulse)
 * Priorité : ?lang=en dans l'URL > localStorage > html lang > navigateur
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr.json';
import en from './locales/en.json';
import { readLangFromSearch } from './utils/langUrl';

const isBrowser = typeof window !== 'undefined';

// Le détecteur navigateur (localStorage, navigator) n'existe pas au prerender.
if (isBrowser) {
  i18n.use(LanguageDetector);
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    // Prerender : français figé. Navigateur : détection inchangée.
    lng: isBrowser ? undefined : 'fr',
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // ?lang= choisit l'affichage. Ce n'est pas une URL indexable distincte.
      order: ['querystring', 'localStorage', 'htmlTag', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'waterpulse_lang',
    },
  });

// Alignement immédiat si l'URL impose déjà une langue
const urlLang = isBrowser ? readLangFromSearch() : null;
if (urlLang && i18n.language?.slice(0, 2) !== urlLang) {
  i18n.changeLanguage(urlLang);
}

export default i18n;
