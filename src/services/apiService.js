/**
 * Service d'accès à l'API WaterPulse (backend partagé).
 */

function createApiError(code, fallback) {
  const error = new Error(fallback);
  error.code = code;
  return error;
}

/**
 * Interroge GET /rain-data pour les précipitations moyennes.
 * @param {number|string} lat
 * @param {number|string} lon
 * @returns {Promise<object>}
 */
export async function fetchRainData(lat, lon) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const params = new URLSearchParams({
    lat: String(lat),
    lon: String(lon),
  });
  const url = `${baseUrl}/rain-data?${params.toString()}`;

  let response;

  try {
    response = await fetch(url);
  } catch {
    throw createApiError(
      'network',
      'Impossible de joindre le serveur API.'
    );
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    throw createApiError(
      'invalidJson',
      'Réponse invalide du serveur (JSON attendu).'
    );
  }

  if (!response.ok) {
    const message =
      payload?.message ||
      payload?.error ||
      `Erreur serveur (${response.status}).`;
    throw new Error(message);
  }

  return payload;
}
