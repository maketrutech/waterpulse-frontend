import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { syncUrlWithLang } from '../utils/langUrl';

/**
 * Garde l'URL (?lang=en) alignée avec la langue i18n active.
 * Utile après détection localStorage / navigateur.
 */
export default function LanguageUrlSync() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = (i18n.resolvedLanguage || i18n.language || 'fr').slice(0, 2);
    syncUrlWithLang(lang === 'en' ? 'en' : 'fr');
  }, [i18n.language, i18n.resolvedLanguage]);

  return null;
}
