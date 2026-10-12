import { useTranslation } from 'react-i18next';
import {
  CalendarDays,
  CloudRain,
  Droplets,
  Loader2,
  Percent,
  Warehouse,
} from 'lucide-react';

function normalizeData(result) {
  if (!result) return null;
  const payload = result.data ?? result;

  if (
    payload.collectableL == null &&
    payload.tankRecommendedL == null &&
    payload.annualRainfallMm == null
  ) {
    return null;
  }

  const breakdown = Array.isArray(payload.monthlyBreakdown)
    ? payload.monthlyBreakdown
    : [];

  return {
    annualRainfallMm:
      payload.annualRainfallMm != null ? Number(payload.annualRainfallMm) : null,
    collectableL:
      payload.collectableL != null ? Number(payload.collectableL) : null,
    needsL: payload.needsL != null ? Number(payload.needsL) : null,
    tankRecommendedL:
      payload.tankRecommendedL != null
        ? Number(payload.tankRecommendedL)
        : null,
    savingsL: payload.savingsL != null ? Number(payload.savingsL) : null,
    autonomyPercent:
      payload.autonomyPercent != null ? Number(payload.autonomyPercent) : null,
    monthly: breakdown.map((item, index) => ({
      monthIndex:
        typeof item.month === 'number' && item.month >= 1 && item.month <= 12
          ? item.month - 1
          : index,
      value: Number(item.rainfallMm ?? 0),
    })),
  };
}

export default function ResultSection({ data, loading, error }) {
  const { t, i18n } = useTranslation();
  const locale = (i18n.resolvedLanguage || i18n.language || 'fr').startsWith('en')
    ? 'en-US'
    : 'fr-FR';

  const monthLabels = t('results.months', { returnObjects: true });
  const normalized = normalizeData(data);

  const formatNumber = (value, digits = 0) => {
    if (value == null || Number.isNaN(value)) return '—';
    return value.toLocaleString(locale, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  };

  const monthLabel = (monthIndex) =>
    Array.isArray(monthLabels) && monthLabels[monthIndex]
      ? monthLabels[monthIndex]
      : `M${monthIndex + 1}`;

  const maxMonthly = normalized?.monthly?.length
    ? Math.max(...normalized.monthly.map((m) => m.value), 1)
    : 1;

  return (
    <section className="mx-auto mt-6 max-w-4xl px-4 pb-4 sm:px-6">
      {loading && (
        <div
          className="flex min-h-[12rem] animate-fade-up flex-col items-center justify-center rounded-2xl border border-sky-mid/10 bg-white/70 px-6 py-10 text-center shadow-panel backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="mb-3 h-10 w-10 animate-spin text-sky-mid" aria-hidden="true" />
          <p className="font-display text-lg font-bold text-sky-deep">
            {t('results.analyzing')}
          </p>
          <p className="mt-2 max-w-sm animate-pulse-soft text-sm text-sky-deep/80">
            {t('results.analyzingHint')}
          </p>
        </div>
      )}

      {!loading && error && (
        <div
          role="alert"
          className="animate-fade-up rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-red-800"
        >
          <p className="font-semibold">{t('results.errorTitle')}</p>
          <p className="mt-1 text-sm opacity-90">{error}</p>
        </div>
      )}

      {!loading && !error && !normalized && (
        <div className="min-h-[8rem] rounded-2xl border border-dashed border-sky-mid/25 bg-white/50 px-6 py-8 text-center text-sky-deep/80">
          <Droplets className="mx-auto mb-2 h-8 w-8 text-sky-mid" aria-hidden="true" />
          <p className="text-sm sm:text-base">{t('results.empty')}</p>
        </div>
      )}

      {!loading && !error && normalized && (
        <div className="animate-fade-up space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-sky-mid/10 bg-white p-6 shadow-panel">
              <div className="mb-3 flex items-center gap-2 text-sky-mid">
                <CloudRain size={18} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {t('results.rainfall')}
                </span>
              </div>
              <p className="font-display text-3xl font-extrabold text-sky-deep sm:text-4xl">
                {formatNumber(normalized.annualRainfallMm, 0)}
                <span className="ml-2 text-base font-semibold text-sky-deep/70">
                  {t('results.rainfallUnit')}
                </span>
              </p>
            </article>

            <article className="rounded-2xl border border-sky-mid/10 bg-white p-6 shadow-panel">
              <div className="mb-3 flex items-center gap-2 text-sky-mid">
                <Warehouse size={18} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {t('results.tank')}
                </span>
              </div>
              <p className="font-display text-3xl font-extrabold text-sky-deep sm:text-4xl">
                {formatNumber(normalized.tankRecommendedL, 0)}
                <span className="ml-2 text-base font-semibold text-sky-deep/70">
                  {t('results.liters')}
                </span>
              </p>
              <p className="mt-2 text-xs text-sky-deep/70">{t('results.tankHint')}</p>
            </article>

            <article className="rounded-2xl border border-sky-mid/10 bg-white p-6 shadow-panel">
              <div className="mb-3 flex items-center gap-2 text-sky-mid">
                <Droplets size={18} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {t('results.collectable')}
                </span>
              </div>
              <p className="font-display text-3xl font-extrabold text-sky-deep sm:text-4xl">
                {formatNumber(normalized.collectableL, 0)}
                <span className="ml-2 text-base font-semibold text-sky-deep/70">
                  {t('results.litersYear')}
                </span>
              </p>
            </article>

            <article className="rounded-2xl border border-sky-mid/10 bg-white p-6 shadow-panel">
              <div className="mb-3 flex items-center gap-2 text-sky-mid">
                <Percent size={18} aria-hidden="true" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  {t('results.autonomy')}
                </span>
              </div>
              <p className="font-display text-3xl font-extrabold text-sky-deep sm:text-4xl">
                {normalized.autonomyPercent == null
                  ? '—'
                  : `${formatNumber(normalized.autonomyPercent, 0)}%`}
              </p>
              <p className="mt-2 text-sm text-sky-deep/75">
                {t('results.needs')}: {formatNumber(normalized.needsL, 0)}{' '}
                {t('results.litersYear')}
              </p>
              <p className="mt-1 text-sm text-sky-deep/75">
                {t('results.savings')}: {formatNumber(normalized.savingsL, 0)}{' '}
                {t('results.litersYear')}
              </p>
            </article>
          </div>

          {normalized.monthly.length > 0 && (
            <article className="rounded-2xl border border-sky-mid/10 bg-white p-6 shadow-panel">
              <div className="mb-4 flex items-center gap-2 text-sky-mid">
                <CalendarDays size={18} aria-hidden="true" />
                <h3 className="font-display text-lg font-bold text-sky-deep">
                  {t('results.monthlyTitle')}
                </h3>
              </div>
              <div className="flex h-48 items-end gap-1.5 sm:gap-2">
                {normalized.monthly.map((month) => {
                  const heightPct = Math.max(
                    (month.value / maxMonthly) * 100,
                    month.value > 0 ? 4 : 0
                  );
                  return (
                    <div
                      key={month.monthIndex}
                      className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                    >
                      <span className="text-[10px] font-semibold text-sky-deep/70 sm:text-xs">
                        {formatNumber(month.value, 0)}
                      </span>
                      <div
                        className="w-full origin-bottom animate-bar-grow rounded-t-md bg-gradient-to-t from-sky-mid to-aqua"
                        style={{ height: `${heightPct}%` }}
                        title={`${monthLabel(month.monthIndex)}: ${formatNumber(
                          month.value,
                          0
                        )} mm`}
                      />
                      <span className="text-[10px] font-medium text-sky-deep/80 sm:text-xs">
                        {monthLabel(month.monthIndex)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </article>
          )}
        </div>
      )}
    </section>
  );
}
