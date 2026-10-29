/**
 * Injecte le HTML prerendu (react-dom/server) dans les pages statiques.
 *
 * Français uniquement : l'anglais est exposé via ?lang=en, qui pointe vers
 * le même fichier sur Firebase Hosting. Le client bascule toujours la langue
 * après le chargement du bundle.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');
const fr = JSON.parse(fs.readFileSync(path.join(root, 'src', 'locales', 'fr.json'), 'utf8'));

const routes = [
  {
    url: '/',
    file: 'index.html',
    minWords: 120,
    h1: fr.hero.title,
    mustInclude: [
      fr.hero.subtitle,
      fr.homeSeo.intro.title,
      fr.homeSeo.intro.body,
      fr.homeSeo.faq.title,
      fr.homeSeo.faq.items[0].question,
      fr.homeSeo.faq.items[0].answer,
    ],
    jsonLdTypes: ['WebApplication', 'FAQPage'],
    canonical: 'https://waterpulse.maketru.com/',
  },
  {
    url: '/about',
    file: 'about.html',
    minWords: 40,
    h1: fr.legal.about.title,
    mustInclude: [fr.legal.about.paragraphs[0], fr.legal.about.seoDescription],
    jsonLdTypes: ['WebApplication'],
    canonical: 'https://waterpulse.maketru.com/about',
  },
  {
    url: '/privacy',
    file: 'privacy.html',
    minWords: 40,
    h1: fr.legal.privacy.title,
    mustInclude: [fr.legal.privacy.sections[0].paragraphs[0], fr.legal.privacy.seoDescription],
    jsonLdTypes: ['WebApplication'],
    canonical: 'https://waterpulse.maketru.com/privacy',
  },
  {
    url: '/terms',
    file: 'terms.html',
    minWords: 30,
    h1: fr.legal.terms.title,
    mustInclude: [fr.legal.terms.sections[0].paragraphs[0], fr.legal.terms.seoDescription],
    jsonLdTypes: ['WebApplication'],
    canonical: 'https://waterpulse.maketru.com/terms',
  },
];

function helmetHead(helmet) {
  if (!helmet) {
    throw new Error('Helmet context missing after render');
  }

  return [helmet.title, helmet.priority, helmet.meta, helmet.link, helmet.script]
    .map((part) => (part && typeof part.toString === 'function' ? part.toString() : ''))
    .map((part) => part.trim())
    .filter(Boolean)
    .join('\n    ');
}

function applyPrerender(template, rendered) {
  const headRe = /<!--prerender-head-->[\s\S]*?<!--\/prerender-head-->/;
  if (!headRe.test(template)) {
    throw new Error('dist/index.html is missing <!--prerender-head--> markers');
  }

  const attrs = rendered.helmet.htmlAttributes?.toString?.().trim();
  let page = template.replace(/<html\b[^>]*>/i, `<html ${attrs || `lang="${rendered.lang}"`}>`);
  page = page.replace(
    headRe,
    `<!--prerender-head-->\n    ${helmetHead(rendered.helmet)}\n    <!--/prerender-head-->`
  );

  const root = '<div id="root"></div>';
  if (!page.includes(root)) {
    throw new Error('dist/index.html is missing <div id="root"></div>');
  }

  page = page.replace(
    root,
    `<div id="root" data-prerender-lang="${rendered.lang}">${rendered.html}</div>`
  );

  return page;
}

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;|&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function rootText(html) {
  const body = html.split(/<body[^>]*>/i)[1]?.split('</body>')[0] ?? '';
  const withoutScripts = body.replace(/<script[\s\S]*?<\/script>/gi, ' ');
  const root = withoutScripts.match(
    /<div id="root"[^>]*>([\s\S]*)<\/div>\s*<script\b/i
  );
  const source = root ? root[1] : withoutScripts;
  return decodeEntities(source.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function jsonLdTypes(html) {
  const types = [];
  const re = /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  let match = re.exec(html);
  while (match) {
    const data = JSON.parse(match[1]);
    const list = Array.isArray(data) ? data : [data];
    for (const item of list) {
      if (item && item['@type']) types.push(item['@type']);
    }
    match = re.exec(html);
  }
  return types;
}

function assertPage(route, html) {
  const text = rootText(html);
  const words = text.split(' ').filter(Boolean);
  const problems = [];

  if (!html.includes(`data-prerender-lang="fr"`)) {
    problems.push('missing data-prerender-lang');
  }
  if (!/<html[^>]*\blang="fr"/i.test(html)) {
    problems.push('html lang is not fr');
  }
  if ((html.match(/<title\b/gi) || []).length !== 1) {
    problems.push(`expected 1 <title>, found ${(html.match(/<title\b/gi) || []).length}`);
  }
  if (!html.includes('<h1')) {
    problems.push('missing h1');
  }
  if (!text.includes(route.h1)) {
    problems.push(`h1/body missing “${route.h1}”`);
  }
  for (const snippet of route.mustInclude) {
    if (!text.includes(snippet) && !html.includes(snippet)) {
      problems.push(`missing content: ${snippet.slice(0, 72)}`);
    }
  }
  if (words.length < route.minWords) {
    problems.push(`only ${words.length} words in #root (min ${route.minWords})`);
  }
  const canonicalTag = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i);
  if (!canonicalTag) {
    problems.push('missing canonical');
  } else if (!canonicalTag[0].includes(`href="${route.canonical}"`)) {
    problems.push(`canonical is not ${route.canonical} (${canonicalTag[0]})`);
  }
  if (!html.includes('https://waterpulse.maketru.com/og-image.png')) {
    problems.push('missing og:image');
  }
  if (!html.includes('<script type="module"')) {
    problems.push('missing client module script');
  }

  const types = jsonLdTypes(html);
  for (const type of route.jsonLdTypes) {
    if (!types.includes(type)) {
      problems.push(`JSON-LD missing @type ${type} (found ${types.join(', ') || 'none'})`);
    }
  }

  if (problems.length) {
    throw new Error(`${route.url} prerender check failed:\n- ${problems.join('\n- ')}`);
  }

  return { words: words.length, types };
}

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
const { render } = await import(pathToFileURL(serverEntry).href);

for (const route of routes) {
  const rendered = await render(route.url);
  if (!rendered.html || !rendered.html.includes('<h1')) {
    throw new Error(`${route.url} rendered without an h1`);
  }

  const page = applyPrerender(template, rendered);
  const stats = assertPage(route, page);
  const outPath = path.join(distDir, route.file);
  fs.writeFileSync(outPath, page);
  console.log(
    `prerender ${route.url} -> ${route.file} (${stats.words} words, JSON-LD: ${stats.types.join(', ')})`
  );
}
