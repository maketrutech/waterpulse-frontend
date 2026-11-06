import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LegalLayout from '../components/LegalLayout';

/**
 * Mentions légales — éditeur, LCEN, hébergement Firebase, responsabilité.
 */
export default function MentionsLegales() {
  const { t } = useTranslation();
  const sections = t('legal.mentions.sections', { returnObjects: true });

  return (
    <LegalLayout
      title={t('legal.mentions.seoTitle')}
      description={t('legal.mentions.seoDescription')}
      canonicalPath="/mentions-legales"
    >
      <article className="animate-fade-up">
        <h1 className="font-display text-3xl font-extrabold text-sky-deep sm:text-4xl">
          {t('legal.mentions.title')}
        </h1>
        <p className="mt-2 text-sm text-sky-deep/55">{t('legal.mentions.updated')}</p>

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
          <p className="text-sm leading-relaxed sm:text-base">
            {t('legal.mentions.privacyLead')}{' '}
            <Link
              to="/privacy"
              className="font-medium text-aqua underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua"
            >
              {t('legal.mentions.privacyLink')}
            </Link>
            .
          </p>
        </div>
      </article>
    </LegalLayout>
  );
}
