import fs from 'node:fs';
import path from 'node:path';
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

const KNOWN_PAGES = new Set([
  '/',
  '/index.html',
  '/about',
  '/about/',
  '/about.html',
  '/privacy',
  '/privacy/',
  '/privacy.html',
  '/terms',
  '/terms/',
  '/terms.html',
  '/404.html',
]);

function previewPrerenderRoutes() {
  return {
    name: 'preview-prerender-routes',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) return next();

        const queryIndex = req.url.indexOf('?');
        const urlPath = queryIndex === -1 ? req.url : req.url.slice(0, queryIndex);
        const query = queryIndex === -1 ? '' : req.url.slice(queryIndex);
        const target = PRERENDERED_ROUTES[urlPath];
        if (target) {
          req.url = `${target}${query}`;
          return next();
        }

        const hasExtension = path.posix.extname(urlPath) !== '';
        if (KNOWN_PAGES.has(urlPath) || hasExtension || urlPath.startsWith('/assets/')) {
          return next();
        }

        const distDir = path.resolve(server.config.root, server.config.build.outDir);
        const notFound = path.join(distDir, '404.html');
        if (!fs.existsSync(notFound)) return next();

        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(notFound));
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
