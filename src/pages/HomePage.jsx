import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown } from 'lucide-react';
import AdBanner from '../components/AdBanner';
import Footer from '../components/Footer';
import FormSection from '../components/FormSection';
import HomeSeoSections from '../components/HomeSeoSections';
import Navbar from '../components/Navbar';
import ResultSection from '../components/ResultSection';
import SEO from '../components/SEO';
import { fetchRainData } from '../services/apiService';
import { computeRainwaterScenario } from '../services/rainCalc';

/**
 * Page d'accueil WaterPulse : Hero + Formulaire + Résultats.
 */
export default function HomePage() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async ({
    lat,
    lon,
    surfaceM2,
    people,
    roofType,
    usages,
  }) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const rainPayload = await fetchRainData(lat, lon);
      const rain = rainPayload?.data ?? rainPayload;

      const scenario = computeRainwaterScenario({
        surfaceM2,
        roofType,
        people,
        usages,
        annualRainfallMm: rain.annualRainfallMm,
        monthlyBreakdown: rain.monthlyBreakdown,
      });

      setData({ success: true, data: scenario });
    } catch (err) {
      setError(
        err?.code ? t(`errors.${err.code}`) : err.message || t('errors.unexpected')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-0">
      <SEO />

      <header className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-sky-deep" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(56,189,248,0.35),transparent_45%),linear-gradient(160deg,#063D56_0%,#0E7490_55%,#063D56_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="absolute -right-12 top-4 h-36 w-36 rounded-full bg-aqua/35 blur-2xl sm:right-8 sm:top-8 sm:h-56 sm:w-56" />
        </div>

        <Navbar />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-6 pb-12 sm:px-6 md:py-12 md:pb-16">
          <p className="animate-fade-up font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Water<span className="text-aqua">Pulse</span>
          </p>

          <h1
            className="mt-2 max-w-xl animate-fade-up font-display text-2xl font-bold leading-tight text-white md:mt-3 md:text-4xl md:leading-snug"
            style={{ animationDelay: '80ms' }}
          >
            {t('hero.title')}
          </h1>
          <p
            className="mt-2 max-w-xl animate-fade-up text-sm leading-snug text-on-dark-muted md:mt-3 md:text-base"
            style={{ animationDelay: '140ms' }}
          >
            {t('hero.subtitle')}
          </p>

          <a
            href="#calculateur"
            className="mt-5 inline-flex min-h-12 animate-fade-up items-center gap-2 rounded-2xl bg-aqua px-5 py-3 font-display text-sm font-bold text-sky-deep transition hover:bg-aqua-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:mt-6 md:text-base"
            style={{ animationDelay: '200ms' }}
          >
            {t('hero.cta')}
            <ArrowDown size={18} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main>
        <FormSection onSubmit={handleCalculate} loading={loading} />
        <ResultSection data={data} loading={loading} error={error} />

        {/* Emplacement 1 — sous les résultats (forte visibilité) */}
        <AdBanner className="mt-2" />

        <HomeSeoSections />
      </main>

      {/* Emplacement 2 — juste avant le pied de page */}
      <AdBanner className="mb-1" />
      <Footer />
    </div>
  );
}
