import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Même routage que les rewrites Firebase : /about sert about.html. */
const PRERENDERED_ROUTES = {
  '/about': '/about.html',
  '/about/': '/about.html',
  '/privacy': '/privacy.html',
  '/privacy/': '/privacy.html',
  '/terms': '/terms.html',
  '/terms/': '/terms.html',
};

function previewPrerenderRoutes() {
  return {
    name: 'preview-prerender-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        if (!req.url) return next();
        const queryIndex = req.url.indexOf('?');
        const path = queryIndex === -1 ? req.url : req.url.slice(0, queryIndex);
        const query = queryIndex === -1 ? '' : req.url.slice(queryIndex);
        const target = PRERENDERED_ROUTES[path];
        if (target) req.url = `${target}${query}`;
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), previewPrerenderRoutes()],
  server: {
    port: 5174,
    open: true,
  },
  ssr: {
    // Leaflet touche `window` à l'import : il reste hors du bundle serveur.
    external: ['leaflet', 'react-leaflet'],
  },
});
