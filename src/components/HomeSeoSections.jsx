import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * Contenu SEO bilingue de la page d'accueil :
 * intro, guide « Comment ça marche », FAQ (balises sémantiques).
 */
export default function HomeSeoSections() {
  const { t, i18n } = useTranslation();

  const steps = t('homeSeo.how.steps', { returnObjects: true });
  const faqItems = t('homeSeo.faq.items', { returnObjects: true });

  const safeSteps = Array.isArray(steps) ? steps : [];
  const safeFaq = Array.isArray(faqItems) ? faqItems : [];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: (i18n.resolvedLanguage || i18n.language || 'fr').slice(0, 2),
    mainEntity: safeFaq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {safeFaq.length > 0 && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        </Helmet>
      )}

      <section
        id="recuperation-eau-pluie"
        aria-labelledby="home-seo-intro-title"
        className="mx-auto mt-4 max-w-4xl px-4 sm:px-6"
      >
        <h2
          id="home-seo-intro-title"
          className="font-display text-2xl font-bold text-sky-deep sm:text-3xl"
        >
          {t('homeSeo.intro.title')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-sky-deep/75 sm:text-base">
          {t('homeSeo.intro.body')}
        </p>
      </section>

      <section
        id="comment-ca-marche"
        aria-labelledby="home-seo-how-title"
        className="mx-auto mt-8 max-w-4xl px-4 sm:px-6"
      >
        <h2
          id="home-seo-how-title"
          className="font-display text-2xl font-bold text-sky-deep sm:text-3xl"
        >
          {t('homeSeo.how.title')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-sky-deep/75 sm:text-base">
          {t('homeSeo.how.lead')}
        </p>

        <ol className="mt-5 space-y-4">
          {safeSteps.map((step, index) => (
            <li key={step.title} className="border-l-2 border-aqua/60 pl-4 sm:pl-5">
              <h3 className="font-display text-lg font-bold text-sky-deep">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-sky-deep/70 sm:text-base">
                {step.body}
              </p>
              <span className="sr-only">
                {t('homeSeo.how.title')} — {index + 1}/{safeSteps.length}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="faq"
        aria-labelledby="home-seo-faq-title"
        className="mx-auto mt-8 mb-2 max-w-4xl px-4 sm:px-6"
      >
        <h2
          id="home-seo-faq-title"
          className="font-display text-2xl font-bold text-sky-deep sm:text-3xl"
        >
          {t('homeSeo.faq.title')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-sky-deep/75 sm:text-base">
          {t('homeSeo.faq.lead')}
        </p>

        <div className="mt-5 space-y-4">
          {safeFaq.map((item) => (
            <article
              key={item.question}
              className="border-b border-sky-mid/10 pb-4 last:border-b-0"
            >
              <h3 className="font-display text-base font-bold text-sky-deep sm:text-lg">
                {item.question}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sky-deep/70 sm:text-base">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
