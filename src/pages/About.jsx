import { useTranslation } from 'react-i18next';
import LegalLayout from '../components/LegalLayout';

const CONTACT_EMAIL = 'maketru.tech@gmail.com';

/**
 * À propos de WaterPulse + formulaire de contact.
 */
export default function About() {
  const { t } = useTranslation();
  const paragraphs = t('legal.about.paragraphs', { returnObjects: true });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const message = String(form.get('message') || '').trim();
    const subject = encodeURIComponent(
      t('legal.about.mailSubject', { name: name || 'WaterPulse' })
    );
    const body = encodeURIComponent(
      `${t('legal.about.mailFrom', { name: name || '—' })}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <LegalLayout
      title={t('legal.about.seoTitle')}
      description={t('legal.about.seoDescription')}
      canonicalPath="/about"
    >
      <article className="animate-fade-up">
        <h1 className="font-display text-3xl font-extrabold text-sky-deep sm:text-4xl">
          {t('legal.about.title')}
        </h1>
        <p className="mt-2 text-sm text-sky-deep/55">{t('legal.about.subtitle')}</p>

        <div className="mt-8 space-y-4 text-sm leading-relaxed text-sky-deep/85 sm:text-base">
          {Array.isArray(paragraphs) &&
            paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <section className="mt-10 rounded-2xl border border-sky-mid/15 bg-white/80 p-6 shadow-panel sm:p-8">
          <h2 className="font-display text-xl font-bold text-sky-deep">
            {t('legal.about.contactTitle')}
          </h2>
          <p className="mt-2 text-sm text-sky-deep/65">
            {t('legal.about.contactIntro')}{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-sky-mid underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="about-name" className="label-field">
                {t('legal.about.name')}
              </label>
              <input
                id="about-name"
                name="name"
                type="text"
                autoComplete="name"
                className="input-field"
                placeholder={t('legal.about.namePlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="about-message" className="label-field">
                {t('legal.about.message')}
              </label>
              <textarea
                id="about-message"
                name="message"
                required
                rows={5}
                className="input-field min-h-[8rem] resize-y"
                placeholder={t('legal.about.messagePlaceholder')}
              />
            </div>
            <button
              type="submit"
              className="inline-flex rounded-xl bg-sky-mid px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-deep focus:outline-none focus:ring-2 focus:ring-sky-mid/40"
            >
              {t('legal.about.send')}
            </button>
          </form>
        </section>
      </article>
    </LegalLayout>
  );
}
