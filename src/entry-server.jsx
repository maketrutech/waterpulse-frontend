import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { AppContent } from './routes/AppRoutes';
import i18n from './i18n';

/** Langue figée dans le HTML statique (x-default du site). */
export const PRERENDER_LANG = 'fr';

/**
 * Rend une route en HTML statique + balises Helmet (title, meta, JSON-LD).
 * @param {string} url
 */
export async function render(url) {
  if (!i18n.isInitialized) {
    await i18n.init();
  }

  const active = (i18n.resolvedLanguage || i18n.language || '').slice(0, 2);
  if (active !== PRERENDER_LANG) {
    await i18n.changeLanguage(PRERENDER_LANG);
  }

  const helmetContext = {};
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppContent />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  return {
    html,
    helmet: helmetContext.helmet,
    lang: PRERENDER_LANG,
  };
}
