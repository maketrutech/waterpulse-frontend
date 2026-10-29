/** URL canonique du site (production) */
export const SITE_URL = 'https://waterpulse.maketru.com';

/**
 * Construit l'URL absolue d'une page pour une langue donnée.
 * FR → path seul ; EN → path + ?lang=en
 * @param {string} path - ex. '/' ou '/about'
 * @param {'fr'|'en'} lang
 */
export function buildLangHref(path = '/', lang = 'fr') {
  const normalized =
    !path || path === '/' ? '/' : path.startsWith('/') ? path : `/${path}`;
  const base = `${SITE_URL}${normalized === '/' ? '/' : normalized}`;

  if (lang === 'en') {
    const url = new URL(base);
    url.searchParams.set('lang', 'en');
    return url.toString();
  }

  return base;
}

/**
 * Lit la langue depuis l'URL (?lang=en).
 * @returns {'fr'|'en'|null}
 */
export function readLangFromSearch(search) {
  const source =
    search ?? (typeof window !== 'undefined' ? window.location.search : '');
  const params = new URLSearchParams(source);
  const raw = (params.get('lang') || '').toLowerCase().slice(0, 2);
  if (raw === 'en') return 'en';
  if (raw === 'fr') return 'fr';
  return null;
}

/**
 * Met à jour l'URL (history) pour refléter la langue, sans recharger la page.
 * @param {'fr'|'en'} lang
 */
export function syncUrlWithLang(lang) {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (lang === 'en') {
    url.searchParams.set('lang', 'en');
  } else {
    url.searchParams.delete('lang');
  }

  const next = `${url.pathname}${url.search}${url.hash}`;
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (next !== current) {
    window.history.replaceState(window.history.state, '', next);
  }
}
