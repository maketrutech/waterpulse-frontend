import { useTranslation } from 'react-i18next';
import LegalLayout from '../components/LegalLayout';

/**
 * Politique de confidentialité — cookies AdSense, Analytics, données d'usage.
 */
export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const sections = t('legal.privacy.sections', { returnObjects: true });

  return (
    <LegalLayout
      title={t('legal.privacy.seoTitle')}
      description={t('legal.privacy.seoDescription')}
      canonicalPath="/privacy"
    >
      <article className="animate-fade-up">
        <h1 className="font-display text-3xl font-extrabold text-sky-deep sm:text-4xl">
          {t('legal.privacy.title')}
        </h1>
        <p className="mt-2 text-sm text-sky-deep/55">{t('legal.privacy.updated')}</p>

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
