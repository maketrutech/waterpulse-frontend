import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import i18n from './i18n';
// Firebase Analytics — initialisé au démarrage (navigateur uniquement)
import './services/firebase';
// Styles Tailwind (directives @tailwind)
import './index.css';

const container = document.getElementById('root');

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

// Le HTML prerendu est en français. On hydrate seulement si la langue
// détectée (?lang=, localStorage, html lang) est la même — sinon montage
// client classique pour ne pas écraser un choix EN.
const prerenderLang = container?.dataset.prerenderLang || '';
const activeLang = (i18n.resolvedLanguage || i18n.language || 'fr').slice(0, 2);
const canHydrate =
  Boolean(prerenderLang) &&
  prerenderLang === activeLang &&
  Boolean(container.innerHTML.trim());

if (canHydrate) {
  document.documentElement.removeAttribute('data-ssr-lang-mismatch');
  hydrateRoot(container, app);
} else {
  if (container.innerHTML.trim()) {
    container.innerHTML = '';
  }
  createRoot(container).render(app);
  document.documentElement.removeAttribute('data-ssr-lang-mismatch');
}
