import { useTranslation } from 'react-i18next';
import LegalLayout from '../components/LegalLayout';

/**
 * Conditions générales d'utilisation du service WaterPulse.
 */
export default function TermsOfService() {
  const { t } = useTranslation();
  const sections = t('legal.terms.sections', { returnObjects: true });

  return (
    <LegalLayout
      title={t('legal.terms.seoTitle')}
      description={t('legal.terms.seoDescription')}
      canonicalPath="/terms"
    >
      <article className="animate-fade-up">
        <h1 className="font-display text-3xl font-extrabold text-sky-deep sm:text-4xl">
          {t('legal.terms.title')}
        </h1>
        <p className="mt-2 text-sm text-sky-deep/55">{t('legal.terms.updated')}</p>

        <div className="mt-8 space-y-8 text-sky-deep/85">
          {Array.isArray(sections) &&
            sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-bold text-sky-deep">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 text-sm leading-relaxed sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
        </div>
      </article>
    </LegalLayout>
  );
}
