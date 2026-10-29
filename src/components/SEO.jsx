import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { SITE_URL, buildLangHref } from '../utils/langUrl';

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const OG_IMAGE_ALT = "WaterPulse — Calculateur gratuit de récupération d'eau de pluie";

/**
 * Métadonnées SEO. L'URL indexable est toujours la version française :
 * ?lang=en n'est pas une URL distincte sur l'hébergement statique.
 */
export default function SEO({
  title: titleProp,
  description: descriptionProp,
  canonicalPath = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
}) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || 'fr').slice(0, 2);
  const isEn = lang === 'en';

  const title = titleProp || t('seo.title');
  const description = descriptionProp || t('seo.description');
  const keywords = t('seo.keywords');
  const featureList = t('seo.featureList', { returnObjects: true });

  const canonicalUrl = buildLangHref(canonicalPath, 'fr');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'WaterPulse',
    alternateName: isEn
      ? 'Free rainwater tank calculator'
      : "Calculateur de cuve d'eau de pluie",
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    url: SITE_URL,
    description,
    keywords,
    inLanguage: isEn ? 'en' : 'fr-FR',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: Array.isArray(featureList) ? featureList : [],
    creator: {
      '@type': 'Organization',
      name: 'WaterPulse',
      url: SITE_URL,
    },
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <link rel="alternate" hrefLang="fr" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="WaterPulse" />
      <meta property="og:locale" content={isEn ? 'en_US' : 'fr_FR'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
