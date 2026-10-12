/**
 * Calculs récupération d'eau de pluie & dimensionnement de cuve.
 */

/** Litres / personne / jour */
export const USAGE_RATES = {
  wc: 25,
  laundry: 15,
  garden: 60, // L/jour foyer (pas par personne)
};

/** Coef toiture */
export const ROOF_COEFFICIENTS = {
  tiles: 0.9,
  flat: 0.6,
  metal: 0.8,
};

/** Coefficient de filtration (gouttières / filtre) */
export const FILTRATION_COEF = 0.9;

/** Réserve d'autonomie cible (jours) */
export const RESERVE_DAYS = 21;

/** Volumes de cuve standards (L) pour arrondi commercial */
const STANDARD_TANK_SIZES = [
  200, 300, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 7500, 10000,
  15000, 20000, 30000, 50000,
];

/**
 * Arrondit vers le volume de cuve standard supérieur.
 * @param {number} liters
 * @returns {number}
 */
export function roundUpTankSize(liters) {
  const value = Number(liters);
  if (!Number.isFinite(value) || value <= 0) return STANDARD_TANK_SIZES[0];

  const match = STANDARD_TANK_SIZES.find((size) => size >= value);
  return match ?? Math.ceil(value / 1000) * 1000;
}

/**
 * Besoins annuels selon foyer et usages cochés.
 * @param {number} people
 * @param {{ wc?: boolean, laundry?: boolean, garden?: boolean }} usages
 * @returns {number} litres / an
 */
export function computeAnnualNeeds(people, usages = {}) {
  const n = Math.max(0, Number(people) || 0);
  let daily = 0;

  if (usages.wc) daily += USAGE_RATES.wc * n;
  if (usages.laundry) daily += USAGE_RATES.laundry * n;
  if (usages.garden) daily += USAGE_RATES.garden;

  return daily * 365;
}

/**
 * Eau collectable annuelle (L).
 * Surface(m²) × précipitations(mm) × coef toiture × filtration
 * (1 mm sur 1 m² = 1 L)
 */
export function computeCollectable(surfaceM2, annualRainfallMm, roofCoef) {
  const surface = Number(surfaceM2);
  const rain = Number(annualRainfallMm);
  const coef = Number(roofCoef);

  if (![surface, rain, coef].every(Number.isFinite)) return 0;
  if (surface <= 0 || rain < 0 || coef <= 0) return 0;

  return surface * rain * coef * FILTRATION_COEF;
}

/**
 * Volume de cuve recommandé (L) — réserve 21 jours sur le minimum offre/demande.
 */
export function computeRecommendedTank(collectableL, needsL) {
  const collectable = Math.max(0, Number(collectableL) || 0);
  const needs = Math.max(0, Number(needsL) || 0);
  const base = Math.min(collectable, needs > 0 ? needs : collectable);
  return base * (RESERVE_DAYS / 365);
}

/**
 * Orchestration complète du calcul.
 * @returns {object}
 */
export function computeRainwaterScenario({
  surfaceM2,
  roofType = 'tiles',
  people = 1,
  usages = { wc: true, laundry: false, garden: false },
  annualRainfallMm,
  monthlyBreakdown = [],
}) {
  const roofCoef = ROOF_COEFFICIENTS[roofType] ?? ROOF_COEFFICIENTS.tiles;
  const collectableL = computeCollectable(surfaceM2, annualRainfallMm, roofCoef);
  const needsL = computeAnnualNeeds(people, usages);
  const tankRawL = computeRecommendedTank(collectableL, needsL);
  const tankRecommendedL = roundUpTankSize(tankRawL);
  const savingsL = Math.min(collectableL, needsL > 0 ? needsL : collectableL);
  const autonomyRatio = needsL > 0 ? collectableL / needsL : null;

  return {
    annualRainfallMm: Number(annualRainfallMm) || 0,
    roofCoef,
    collectableL: Math.round(collectableL),
    needsL: Math.round(needsL),
    tankRawL: Math.round(tankRawL),
    tankRecommendedL,
    savingsL: Math.round(savingsL),
    autonomyPercent:
      autonomyRatio == null
        ? null
        : Math.round(Math.min(autonomyRatio * 100, 999)),
    monthlyBreakdown: Array.isArray(monthlyBreakdown) ? monthlyBreakdown : [],
  };
}
