import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const links = [
    { to: '/about', label: t('footer.links.about') },
    { to: '/privacy', label: t('footer.links.privacy') },
    { to: '/terms', label: t('footer.links.terms') },
  ];

  const otherTools = [
    { href: 'https://solarpulse.maketru.com/', label: t('footer.otherTools.solar') },
    { href: 'https://docslice.maketru.com/', label: t('footer.otherTools.docslice') },
    { href: 'https://chronopulse.maketru.com/', label: t('footer.otherTools.chrono') },
    { href: 'https://facturepulse.maketru.com/', label: t('footer.otherTools.facture') },
  ];

  return (
    <footer className="border-t border-sky-mid/10 bg-sky-deep px-4 py-6 text-center text-sm text-on-dark-muted sm:px-6">
      <p className="font-display text-lg font-bold text-white">
        Water<span className="text-aqua">Pulse</span>
      </p>
      <p className="mx-auto mt-2 max-w-2xl leading-relaxed text-white/90">
        {t('footer.credit')}
      </p>

      <nav
        className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm"
        aria-label={t('footer.legalNav')}
      >
        {links.map((link, index) => (
          <span key={link.to} className="inline-flex items-center gap-1">
            {index > 0 && (
              <span className="px-2 text-white/70" aria-hidden="true">
                ·
              </span>
            )}
            <Link
              to={link.to}
              className="inline-flex min-h-12 items-center px-2 font-medium text-aqua transition hover:text-aqua-glow hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
            >
              {link.label}
            </Link>
          </span>
        ))}
      </nav>

      <nav
        className="mx-auto mt-4 flex max-w-3xl flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm"
        aria-labelledby="footer-other-tools"
      >
        <p
          id="footer-other-tools"
          className="w-full text-xs font-semibold uppercase tracking-wide text-white/70"
        >
          {t('footer.otherToolsTitle')}
        </p>
        {otherTools.map((tool) => (
          <a
            key={tool.href}
            href={tool.href}
            className="inline-flex min-h-12 items-center px-2 font-medium text-aqua transition hover:text-aqua-glow hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
          >
            {tool.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
