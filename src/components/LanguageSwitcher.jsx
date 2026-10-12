import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

/**
 * Sélecteur FR | EN — persiste via i18next (localStorage).
 */
export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage || i18n.language || 'fr').slice(0, 2);

  const setLanguage = (code) => {
    i18n.changeLanguage(code);
  };

  return (
    <div
      className="inline-flex min-h-12 items-center rounded-xl border border-white/30 bg-white/15 p-1 backdrop-blur-sm"
      role="group"
      aria-label={t('nav.switchTo')}
    >
      {LANGUAGES.map(({ code, label }) => {
        const active = current === code;

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={active}
            aria-label={label === 'FR' ? 'Français' : 'English'}
            className={`touch-target inline-flex min-h-12 min-w-12 items-center justify-center rounded-lg px-3 text-sm font-bold tracking-wide transition
              focus:outline-none focus:ring-2 focus:ring-aqua
              ${
                active
                  ? 'bg-aqua text-sky-deep shadow-sm'
                  : 'text-white hover:bg-white/15'
              }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
