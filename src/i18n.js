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

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
    },
    fallbackLng: 'fr',
    supportedLngs: ['fr', 'en'],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      // querystring (?lang=en) en premier pour Googlebot / partages SEO
      order: ['querystring', 'localStorage', 'htmlTag', 'navigator'],
      caches: ['localStorage'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'waterpulse_lang',
    },
  });

// Alignement immédiat si l'URL impose déjà une langue
const urlLang = typeof window !== 'undefined' ? readLangFromSearch() : null;
if (urlLang && i18n.language?.slice(0, 2) !== urlLang) {
  i18n.changeLanguage(urlLang);
}

export default i18n;
