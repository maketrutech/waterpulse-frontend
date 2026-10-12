import { useEffect } from 'react';

/** Identifiant éditeur Google AdSense (partagé SolarPulse / WaterPulse) */
export const ADSENSE_CLIENT = 'ca-pub-7530851972602654';

/**
 * Emplacement publicitaire Google AdSense (réutilisable).
 * @param {object} props
 * @param {string} [props.dataAdSlot] - Identifiant du slot AdSense (unités futures)
 * @param {string} [props.className] - Classes Tailwind optionnelles sur le wrapper
 */
export default function AdBanner({ dataAdSlot, className = '' }) {
  useEffect(() => {
    try {
      // Push sécurisé : ne plante pas si AdSense / adblock est indisponible
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Bloqueur de pubs, script non chargé, ou environnement hors navigateur
    }
  }, [dataAdSlot]);

  return (
    <div
      className={`mx-auto my-3 flex w-full max-w-4xl justify-center px-4 sm:px-6 ${className}`}
      aria-hidden="true"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: 90 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={dataAdSlot || undefined}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
