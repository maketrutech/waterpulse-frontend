import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import LanguageSwitcher from './LanguageSwitcher';
import SEO from './SEO';

/**
 * Mise en page partagée pour les pages légales / About.
 */
export default function LegalLayout({
  title,
  description,
  canonicalPath,
  children,
}) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <SEO title={title} description={description} canonicalPath={canonicalPath} />

      <header className="border-b border-sky-mid/10 bg-sky-deep text-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="font-display text-lg font-extrabold tracking-tight transition hover:text-aqua-glow"
          >
            Water<span className="text-aqua-glow">Pulse</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-semibold text-white/70 transition hover:text-white"
            >
              {t('legal.backHome')}
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        {children}
      </main>

      <Footer />
    </div>
  );
}
