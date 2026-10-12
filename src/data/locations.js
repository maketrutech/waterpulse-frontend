/**
 * Catalogue géographique WaterPulse — pays → villes principales + coordonnées.
 * Les libellés FR/EN sont portés ici pour rester maintenables à grande échelle.
 *
 * @typedef {{ fr: string, en: string }} LocalizedLabel
 * @typedef {{ id: string, labels: LocalizedLabel, lat: number, lon: number }} City
 * @typedef {{ region: string, labels: LocalizedLabel, cities: City[] }} Country
 */

/** @type {Record<string, Country>} */
export const LOCATIONS = {
  /* ── Afrique du Nord & Moyen-Orient ─────────────────────────── */
  MA: {
    region: 'mena',
    labels: { fr: 'Maroc', en: 'Morocco' },
    cities: [
      { id: 'rabat', labels: { fr: 'Rabat', en: 'Rabat' }, lat: 34.0209, lon: -6.8416 },
      { id: 'casablanca', labels: { fr: 'Casablanca', en: 'Casablanca' }, lat: 33.5731, lon: -7.5898 },
      { id: 'marrakech', labels: { fr: 'Marrakech', en: 'Marrakesh' }, lat: 31.6295, lon: -7.9811 },
      { id: 'fes', labels: { fr: 'Fès', en: 'Fez' }, lat: 34.0181, lon: -5.0078 },
      { id: 'tanger', labels: { fr: 'Tanger', en: 'Tangier' }, lat: 35.7595, lon: -5.834 },
      { id: 'agadir', labels: { fr: 'Agadir', en: 'Agadir' }, lat: 30.4278, lon: -9.5981 },
      { id: 'oujda', labels: { fr: 'Oujda', en: 'Oujda' }, lat: 34.6814, lon: -1.9086 },
      { id: 'meknes', labels: { fr: 'Meknès', en: 'Meknes' }, lat: 33.8935, lon: -5.5473 },
    ],
  },
  DZ: {
    region: 'mena',
    labels: { fr: 'Algérie', en: 'Algeria' },
    cities: [
      { id: 'algiers', labels: { fr: 'Alger', en: 'Algiers' }, lat: 36.7538, lon: 3.0588 },
      { id: 'oran', labels: { fr: 'Oran', en: 'Oran' }, lat: 35.6971, lon: -0.6308 },
      { id: 'constantine', labels: { fr: 'Constantine', en: 'Constantine' }, lat: 36.365, lon: 6.6147 },
      { id: 'annaba', labels: { fr: 'Annaba', en: 'Annaba' }, lat: 36.904, lon: 7.755 },
      { id: 'tlemcen', labels: { fr: 'Tlemcen', en: 'Tlemcen' }, lat: 34.8783, lon: -1.315 },
    ],
  },
  TN: {
    region: 'mena',
    labels: { fr: 'Tunisie', en: 'Tunisia' },
    cities: [
      { id: 'tunis', labels: { fr: 'Tunis', en: 'Tunis' }, lat: 36.8065, lon: 10.1815 },
      { id: 'sfax', labels: { fr: 'Sfax', en: 'Sfax' }, lat: 34.7398, lon: 10.76 },
      { id: 'sousse', labels: { fr: 'Sousse', en: 'Sousse' }, lat: 35.8256, lon: 10.636 },
      { id: 'gabes', labels: { fr: 'Gabès', en: 'Gabes' }, lat: 33.8881, lon: 10.0975 },
      { id: 'bizerte', labels: { fr: 'Bizerte', en: 'Bizerte' }, lat: 37.2744, lon: 9.8739 },
    ],
  },
  EG: {
    region: 'mena',
    labels: { fr: 'Égypte', en: 'Egypt' },
    cities: [
      { id: 'cairo', labels: { fr: 'Le Caire', en: 'Cairo' }, lat: 30.0444, lon: 31.2357 },
      { id: 'alexandria', labels: { fr: 'Alexandrie', en: 'Alexandria' }, lat: 31.2001, lon: 29.9187 },
      { id: 'giza', labels: { fr: 'Gizeh', en: 'Giza' }, lat: 30.0131, lon: 31.2089 },
      { id: 'luxor', labels: { fr: 'Louxor', en: 'Luxor' }, lat: 25.6872, lon: 32.6396 },
      { id: 'aswan', labels: { fr: 'Assouan', en: 'Aswan' }, lat: 24.0889, lon: 32.8998 },
      { id: 'hurghada', labels: { fr: 'Hurghada', en: 'Hurghada' }, lat: 27.2579, lon: 33.8116 },
    ],
  },
  LY: {
    region: 'mena',
    labels: { fr: 'Libye', en: 'Libya' },
    cities: [
      { id: 'tripoli-ly', labels: { fr: 'Tripoli', en: 'Tripoli' }, lat: 32.8872, lon: 13.1913 },
      { id: 'benghazi', labels: { fr: 'Benghazi', en: 'Benghazi' }, lat: 32.1167, lon: 20.0667 },
      { id: 'misrata', labels: { fr: 'Misrata', en: 'Misrata' }, lat: 32.3754, lon: 15.0925 },
    ],
  },
  AE: {
    region: 'mena',
    labels: { fr: 'Émirats arabes unis', en: 'United Arab Emirates' },
    cities: [
      { id: 'dubai', labels: { fr: 'Dubaï', en: 'Dubai' }, lat: 25.2048, lon: 55.2708 },
      { id: 'abu-dhabi', labels: { fr: 'Abou Dabi', en: 'Abu Dhabi' }, lat: 24.4539, lon: 54.3773 },
      { id: 'sharjah', labels: { fr: 'Charjah', en: 'Sharjah' }, lat: 25.3463, lon: 55.4209 },
      { id: 'al-ain', labels: { fr: 'Al Aïn', en: 'Al Ain' }, lat: 24.2075, lon: 55.7447 },
    ],
  },
  SA: {
    region: 'mena',
    labels: { fr: 'Arabie saoudite', en: 'Saudi Arabia' },
    cities: [
      { id: 'riyadh', labels: { fr: 'Riyad', en: 'Riyadh' }, lat: 24.7136, lon: 46.6753 },
      { id: 'jeddah', labels: { fr: 'Djeddah', en: 'Jeddah' }, lat: 21.4858, lon: 39.1925 },
      { id: 'dammam', labels: { fr: 'Dammam', en: 'Dammam' }, lat: 26.4207, lon: 50.0888 },
      { id: 'mecca', labels: { fr: 'La Mecque', en: 'Mecca' }, lat: 21.3891, lon: 39.8579 },
      { id: 'medina', labels: { fr: 'Médine', en: 'Medina' }, lat: 24.5247, lon: 39.5692 },
    ],
  },
  QA: {
    region: 'mena',
    labels: { fr: 'Qatar', en: 'Qatar' },
    cities: [
      { id: 'doha', labels: { fr: 'Doha', en: 'Doha' }, lat: 25.2854, lon: 51.531 },
      { id: 'al-rayyan', labels: { fr: 'Al Rayyan', en: 'Al Rayyan' }, lat: 25.2919, lon: 51.4244 },
    ],
  },
  KW: {
    region: 'mena',
    labels: { fr: 'Koweït', en: 'Kuwait' },
    cities: [
      { id: 'kuwait-city', labels: { fr: 'Koweït', en: 'Kuwait City' }, lat: 29.3759, lon: 47.9774 },
      { id: 'hawalli', labels: { fr: 'Hawalli', en: 'Hawalli' }, lat: 29.3328, lon: 48.0286 },
    ],
  },
  OM: {
    region: 'mena',
    labels: { fr: 'Oman', en: 'Oman' },
    cities: [
      { id: 'muscat', labels: { fr: 'Mascate', en: 'Muscat' }, lat: 23.588, lon: 58.3829 },
      { id: 'salalah', labels: { fr: 'Salalah', en: 'Salalah' }, lat: 17.0151, lon: 54.0924 },
    ],
  },
  JO: {
    region: 'mena',
    labels: { fr: 'Jordanie', en: 'Jordan' },
    cities: [
      { id: 'amman', labels: { fr: 'Amman', en: 'Amman' }, lat: 31.9539, lon: 35.9106 },
      { id: 'aqaba', labels: { fr: 'Aqaba', en: 'Aqaba' }, lat: 29.532, lon: 35.0063 },
      { id: 'irbid', labels: { fr: 'Irbid', en: 'Irbid' }, lat: 32.5556, lon: 35.85 },
    ],
  },
  IL: {
    region: 'mena',
    labels: { fr: 'Israël', en: 'Israel' },
    cities: [
      { id: 'tel-aviv', labels: { fr: 'Tel Aviv', en: 'Tel Aviv' }, lat: 32.0853, lon: 34.7818 },
      { id: 'jerusalem', labels: { fr: 'Jérusalem', en: 'Jerusalem' }, lat: 31.7683, lon: 35.2137 },
      { id: 'haifa', labels: { fr: 'Haïfa', en: 'Haifa' }, lat: 32.794, lon: 34.9896 },
    ],
  },
  TR: {
    region: 'mena',
    labels: { fr: 'Turquie', en: 'Turkey' },
    cities: [
      { id: 'istanbul', labels: { fr: 'Istanbul', en: 'Istanbul' }, lat: 41.0082, lon: 28.9784 },
      { id: 'ankara', labels: { fr: 'Ankara', en: 'Ankara' }, lat: 39.9334, lon: 32.8597 },
      { id: 'izmir', labels: { fr: 'Izmir', en: 'Izmir' }, lat: 38.4237, lon: 27.1428 },
      { id: 'antalya', labels: { fr: 'Antalya', en: 'Antalya' }, lat: 36.8969, lon: 30.7133 },
    ],
  },

  /* ── Europe ─────────────────────────────────────────────────── */
  FR: {
    region: 'europe',
    labels: { fr: 'France', en: 'France' },
    cities: [
      { id: 'paris', labels: { fr: 'Paris', en: 'Paris' }, lat: 48.8566, lon: 2.3522 },
      { id: 'lyon', labels: { fr: 'Lyon', en: 'Lyon' }, lat: 45.764, lon: 4.8357 },
      { id: 'marseille', labels: { fr: 'Marseille', en: 'Marseille' }, lat: 43.2965, lon: 5.3698 },
      { id: 'toulouse', labels: { fr: 'Toulouse', en: 'Toulouse' }, lat: 43.6047, lon: 1.4442 },
      { id: 'bordeaux', labels: { fr: 'Bordeaux', en: 'Bordeaux' }, lat: 44.8378, lon: -0.5792 },
      { id: 'nice', labels: { fr: 'Nice', en: 'Nice' }, lat: 43.7102, lon: 7.262 },
      { id: 'nantes', labels: { fr: 'Nantes', en: 'Nantes' }, lat: 47.2184, lon: -1.5536 },
      { id: 'montpellier', labels: { fr: 'Montpellier', en: 'Montpellier' }, lat: 43.6108, lon: 3.8767 },
      { id: 'strasbourg', labels: { fr: 'Strasbourg', en: 'Strasbourg' }, lat: 48.5734, lon: 7.7521 },
      { id: 'lille', labels: { fr: 'Lille', en: 'Lille' }, lat: 50.6292, lon: 3.0573 },
    ],
  },
  ES: {
    region: 'europe',
    labels: { fr: 'Espagne', en: 'Spain' },
    cities: [
      { id: 'madrid', labels: { fr: 'Madrid', en: 'Madrid' }, lat: 40.4168, lon: -3.7038 },
      { id: 'barcelona', labels: { fr: 'Barcelone', en: 'Barcelona' }, lat: 41.3874, lon: 2.1686 },
      { id: 'valencia', labels: { fr: 'Valence', en: 'Valencia' }, lat: 39.4699, lon: -0.3763 },
      { id: 'seville', labels: { fr: 'Séville', en: 'Seville' }, lat: 37.3891, lon: -5.9845 },
      { id: 'malaga', labels: { fr: 'Malaga', en: 'Malaga' }, lat: 36.7213, lon: -4.4214 },
      { id: 'bilbao', labels: { fr: 'Bilbao', en: 'Bilbao' }, lat: 43.263, lon: -2.935 },
      { id: 'zaragoza', labels: { fr: 'Saragosse', en: 'Zaragoza' }, lat: 41.6488, lon: -0.8891 },
    ],
  },
  PT: {
    region: 'europe',
    labels: { fr: 'Portugal', en: 'Portugal' },
    cities: [
      { id: 'lisbon', labels: { fr: 'Lisbonne', en: 'Lisbon' }, lat: 38.7223, lon: -9.1393 },
      { id: 'porto', labels: { fr: 'Porto', en: 'Porto' }, lat: 41.1579, lon: -8.6291 },
      { id: 'faro', labels: { fr: 'Faro', en: 'Faro' }, lat: 37.0194, lon: -7.9322 },
      { id: 'coimbra', labels: { fr: 'Coimbra', en: 'Coimbra' }, lat: 40.2033, lon: -8.4103 },
      { id: 'braga', labels: { fr: 'Braga', en: 'Braga' }, lat: 41.5518, lon: -8.4229 },
    ],
  },
  IT: {
    region: 'europe',
    labels: { fr: 'Italie', en: 'Italy' },
    cities: [
      { id: 'rome', labels: { fr: 'Rome', en: 'Rome' }, lat: 41.9028, lon: 12.4964 },
      { id: 'milan', labels: { fr: 'Milan', en: 'Milan' }, lat: 45.4642, lon: 9.19 },
      { id: 'naples', labels: { fr: 'Naples', en: 'Naples' }, lat: 40.8518, lon: 14.2681 },
      { id: 'turin', labels: { fr: 'Turin', en: 'Turin' }, lat: 45.0703, lon: 7.6869 },
      { id: 'florence', labels: { fr: 'Florence', en: 'Florence' }, lat: 43.7696, lon: 11.2558 },
      { id: 'palermo', labels: { fr: 'Palerme', en: 'Palermo' }, lat: 38.1157, lon: 13.3615 },
      { id: 'bologna', labels: { fr: 'Bologne', en: 'Bologna' }, lat: 44.4949, lon: 11.3426 },
    ],
  },
  DE: {
    region: 'europe',
    labels: { fr: 'Allemagne', en: 'Germany' },
    cities: [
      { id: 'berlin', labels: { fr: 'Berlin', en: 'Berlin' }, lat: 52.52, lon: 13.405 },
      { id: 'munich', labels: { fr: 'Munich', en: 'Munich' }, lat: 48.1351, lon: 11.582 },
      { id: 'hamburg', labels: { fr: 'Hambourg', en: 'Hamburg' }, lat: 53.5511, lon: 9.9937 },
      { id: 'frankfurt', labels: { fr: 'Francfort', en: 'Frankfurt' }, lat: 50.1109, lon: 8.6821 },
      { id: 'cologne', labels: { fr: 'Cologne', en: 'Cologne' }, lat: 50.9375, lon: 6.9603 },
      { id: 'stuttgart', labels: { fr: 'Stuttgart', en: 'Stuttgart' }, lat: 48.7758, lon: 9.1829 },
    ],
  },
  BE: {
    region: 'europe',
    labels: { fr: 'Belgique', en: 'Belgium' },
    cities: [
      { id: 'brussels', labels: { fr: 'Bruxelles', en: 'Brussels' }, lat: 50.8503, lon: 4.3517 },
      { id: 'antwerp', labels: { fr: 'Anvers', en: 'Antwerp' }, lat: 51.2194, lon: 4.4025 },
      { id: 'liege', labels: { fr: 'Liège', en: 'Liège' }, lat: 50.6326, lon: 5.5797 },
      { id: 'ghent', labels: { fr: 'Gand', en: 'Ghent' }, lat: 51.0543, lon: 3.7174 },
      { id: 'charleroi', labels: { fr: 'Charleroi', en: 'Charleroi' }, lat: 50.4108, lon: 4.4446 },
    ],
  },
  CH: {
    region: 'europe',
    labels: { fr: 'Suisse', en: 'Switzerland' },
    cities: [
      { id: 'zurich', labels: { fr: 'Zurich', en: 'Zurich' }, lat: 47.3769, lon: 8.5417 },
      { id: 'geneva', labels: { fr: 'Genève', en: 'Geneva' }, lat: 46.2044, lon: 6.1432 },
      { id: 'bern', labels: { fr: 'Berne', en: 'Bern' }, lat: 46.948, lon: 7.4474 },
      { id: 'lausanne', labels: { fr: 'Lausanne', en: 'Lausanne' }, lat: 46.5197, lon: 6.6323 },
      { id: 'basel', labels: { fr: 'Bâle', en: 'Basel' }, lat: 47.5596, lon: 7.5886 },
    ],
  },
  NL: {
    region: 'europe',
    labels: { fr: 'Pays-Bas', en: 'Netherlands' },
    cities: [
      { id: 'amsterdam', labels: { fr: 'Amsterdam', en: 'Amsterdam' }, lat: 52.3676, lon: 4.9041 },
      { id: 'rotterdam', labels: { fr: 'Rotterdam', en: 'Rotterdam' }, lat: 51.9244, lon: 4.4777 },
      { id: 'the-hague', labels: { fr: 'La Haye', en: 'The Hague' }, lat: 52.0705, lon: 4.3007 },
      { id: 'utrecht', labels: { fr: 'Utrecht', en: 'Utrecht' }, lat: 52.0907, lon: 5.1214 },
    ],
  },
  GB: {
    region: 'europe',
    labels: { fr: 'Royaume-Uni', en: 'United Kingdom' },
    cities: [
      { id: 'london', labels: { fr: 'Londres', en: 'London' }, lat: 51.5074, lon: -0.1278 },
      { id: 'manchester', labels: { fr: 'Manchester', en: 'Manchester' }, lat: 53.4808, lon: -2.2426 },
      { id: 'birmingham', labels: { fr: 'Birmingham', en: 'Birmingham' }, lat: 52.4862, lon: -1.8904 },
      { id: 'edinburgh', labels: { fr: 'Édimbourg', en: 'Edinburgh' }, lat: 55.9533, lon: -3.1883 },
      { id: 'glasgow', labels: { fr: 'Glasgow', en: 'Glasgow' }, lat: 55.8642, lon: -4.2518 },
      { id: 'bristol', labels: { fr: 'Bristol', en: 'Bristol' }, lat: 51.4545, lon: -2.5879 },
    ],
  },
  IE: {
    region: 'europe',
    labels: { fr: 'Irlande', en: 'Ireland' },
    cities: [
      { id: 'dublin', labels: { fr: 'Dublin', en: 'Dublin' }, lat: 53.3498, lon: -6.2603 },
      { id: 'cork', labels: { fr: 'Cork', en: 'Cork' }, lat: 51.8985, lon: -8.4756 },
      { id: 'galway', labels: { fr: 'Galway', en: 'Galway' }, lat: 53.2707, lon: -9.0568 },
    ],
  },
  AT: {
    region: 'europe',
    labels: { fr: 'Autriche', en: 'Austria' },
    cities: [
      { id: 'vienna', labels: { fr: 'Vienne', en: 'Vienna' }, lat: 48.2082, lon: 16.3738 },
      { id: 'graz', labels: { fr: 'Graz', en: 'Graz' }, lat: 47.0707, lon: 15.4395 },
      { id: 'salzburg', labels: { fr: 'Salzbourg', en: 'Salzburg' }, lat: 47.8095, lon: 13.055 },
    ],
  },
  PL: {
    region: 'europe',
    labels: { fr: 'Pologne', en: 'Poland' },
    cities: [
      { id: 'warsaw', labels: { fr: 'Varsovie', en: 'Warsaw' }, lat: 52.2297, lon: 21.0122 },
      { id: 'krakow', labels: { fr: 'Cracovie', en: 'Krakow' }, lat: 50.0647, lon: 19.945 },
      { id: 'wroclaw', labels: { fr: 'Wrocław', en: 'Wroclaw' }, lat: 51.1079, lon: 17.0385 },
      { id: 'gdansk', labels: { fr: 'Gdańsk', en: 'Gdansk' }, lat: 54.352, lon: 18.6466 },
    ],
  },
  GR: {
    region: 'europe',
    labels: { fr: 'Grèce', en: 'Greece' },
    cities: [
      { id: 'athens', labels: { fr: 'Athènes', en: 'Athens' }, lat: 37.9838, lon: 23.7275 },
      { id: 'thessaloniki', labels: { fr: 'Thessalonique', en: 'Thessaloniki' }, lat: 40.6401, lon: 22.9444 },
      { id: 'heraklion', labels: { fr: 'Héraklion', en: 'Heraklion' }, lat: 35.3387, lon: 25.1442 },
      { id: 'patras', labels: { fr: 'Patras', en: 'Patras' }, lat: 38.2466, lon: 21.7346 },
    ],
  },
  RO: {
    region: 'europe',
    labels: { fr: 'Roumanie', en: 'Romania' },
    cities: [
      { id: 'bucharest', labels: { fr: 'Bucarest', en: 'Bucharest' }, lat: 44.4268, lon: 26.1025 },
      { id: 'cluj', labels: { fr: 'Cluj-Napoca', en: 'Cluj-Napoca' }, lat: 46.7712, lon: 23.6236 },
      { id: 'timisoara', labels: { fr: 'Timișoara', en: 'Timisoara' }, lat: 45.7489, lon: 21.2087 },
    ],
  },
  CZ: {
    region: 'europe',
    labels: { fr: 'Tchéquie', en: 'Czechia' },
    cities: [
      { id: 'prague', labels: { fr: 'Prague', en: 'Prague' }, lat: 50.0755, lon: 14.4378 },
      { id: 'brno', labels: { fr: 'Brno', en: 'Brno' }, lat: 49.1951, lon: 16.6068 },
    ],
  },
  SE: {
    region: 'europe',
    labels: { fr: 'Suède', en: 'Sweden' },
    cities: [
      { id: 'stockholm', labels: { fr: 'Stockholm', en: 'Stockholm' }, lat: 59.3293, lon: 18.0686 },
      { id: 'gothenburg', labels: { fr: 'Göteborg', en: 'Gothenburg' }, lat: 57.7089, lon: 11.9746 },
      { id: 'malmo', labels: { fr: 'Malmö', en: 'Malmo' }, lat: 55.605, lon: 13.0038 },
    ],
  },
  NO: {
    region: 'europe',
    labels: { fr: 'Norvège', en: 'Norway' },
    cities: [
      { id: 'oslo', labels: { fr: 'Oslo', en: 'Oslo' }, lat: 59.9139, lon: 10.7522 },
      { id: 'bergen', labels: { fr: 'Bergen', en: 'Bergen' }, lat: 60.3913, lon: 5.3221 },
    ],
  },
  DK: {
    region: 'europe',
    labels: { fr: 'Danemark', en: 'Denmark' },
    cities: [
      { id: 'copenhagen', labels: { fr: 'Copenhague', en: 'Copenhagen' }, lat: 55.6761, lon: 12.5683 },
      { id: 'aarhus', labels: { fr: 'Aarhus', en: 'Aarhus' }, lat: 56.1629, lon: 10.2039 },
    ],
  },
  FI: {
    region: 'europe',
    labels: { fr: 'Finlande', en: 'Finland' },
    cities: [
      { id: 'helsinki', labels: { fr: 'Helsinki', en: 'Helsinki' }, lat: 60.1699, lon: 24.9384 },
      { id: 'tampere', labels: { fr: 'Tampere', en: 'Tampere' }, lat: 61.4978, lon: 23.761 },
    ],
  },
  HU: {
    region: 'europe',
    labels: { fr: 'Hongrie', en: 'Hungary' },
    cities: [
      { id: 'budapest', labels: { fr: 'Budapest', en: 'Budapest' }, lat: 47.4979, lon: 19.0402 },
      { id: 'debrecen', labels: { fr: 'Debrecen', en: 'Debrecen' }, lat: 47.5316, lon: 21.6273 },
    ],
  },

  /* ── Amérique du Nord ───────────────────────────────────────── */
  US: {
    region: 'americas',
    labels: { fr: 'États-Unis', en: 'United States' },
    cities: [
      { id: 'new-york', labels: { fr: 'New York', en: 'New York' }, lat: 40.7128, lon: -74.006 },
      { id: 'los-angeles', labels: { fr: 'Los Angeles', en: 'Los Angeles' }, lat: 34.0522, lon: -118.2437 },
      { id: 'phoenix', labels: { fr: 'Phoenix', en: 'Phoenix' }, lat: 33.4484, lon: -112.074 },
      { id: 'houston', labels: { fr: 'Houston', en: 'Houston' }, lat: 29.7604, lon: -95.3698 },
      { id: 'chicago', labels: { fr: 'Chicago', en: 'Chicago' }, lat: 41.8781, lon: -87.6298 },
      { id: 'miami', labels: { fr: 'Miami', en: 'Miami' }, lat: 25.7617, lon: -80.1918 },
      { id: 'denver', labels: { fr: 'Denver', en: 'Denver' }, lat: 39.7392, lon: -104.9903 },
      { id: 'san-francisco', labels: { fr: 'San Francisco', en: 'San Francisco' }, lat: 37.7749, lon: -122.4194 },
      { id: 'seattle', labels: { fr: 'Seattle', en: 'Seattle' }, lat: 47.6062, lon: -122.3321 },
      { id: 'austin', labels: { fr: 'Austin', en: 'Austin' }, lat: 30.2672, lon: -97.7431 },
    ],
  },
  CA: {
    region: 'americas',
    labels: { fr: 'Canada', en: 'Canada' },
    cities: [
      { id: 'toronto', labels: { fr: 'Toronto', en: 'Toronto' }, lat: 43.6532, lon: -79.3832 },
      { id: 'montreal', labels: { fr: 'Montréal', en: 'Montreal' }, lat: 45.5017, lon: -73.5673 },
      { id: 'vancouver', labels: { fr: 'Vancouver', en: 'Vancouver' }, lat: 49.2827, lon: -123.1207 },
      { id: 'calgary', labels: { fr: 'Calgary', en: 'Calgary' }, lat: 51.0447, lon: -114.0719 },
      { id: 'ottawa', labels: { fr: 'Ottawa', en: 'Ottawa' }, lat: 45.4215, lon: -75.6972 },
      { id: 'edmonton', labels: { fr: 'Edmonton', en: 'Edmonton' }, lat: 53.5461, lon: -113.4938 },
    ],
  },
  MX: {
    region: 'americas',
    labels: { fr: 'Mexique', en: 'Mexico' },
    cities: [
      { id: 'mexico-city', labels: { fr: 'Mexico', en: 'Mexico City' }, lat: 19.4326, lon: -99.1332 },
      { id: 'guadalajara', labels: { fr: 'Guadalajara', en: 'Guadalajara' }, lat: 20.6597, lon: -103.3496 },
      { id: 'monterrey', labels: { fr: 'Monterrey', en: 'Monterrey' }, lat: 25.6866, lon: -100.3161 },
      { id: 'cancun', labels: { fr: 'Cancún', en: 'Cancun' }, lat: 21.1619, lon: -86.8515 },
      { id: 'tijuana', labels: { fr: 'Tijuana', en: 'Tijuana' }, lat: 32.5149, lon: -117.0382 },
    ],
  },

  /* ── Amérique latine & autres marchés solaires clés ─────────── */
  BR: {
    region: 'americas',
    labels: { fr: 'Brésil', en: 'Brazil' },
    cities: [
      { id: 'sao-paulo', labels: { fr: 'São Paulo', en: 'Sao Paulo' }, lat: -23.5505, lon: -46.6333 },
      { id: 'rio', labels: { fr: 'Rio de Janeiro', en: 'Rio de Janeiro' }, lat: -22.9068, lon: -43.1729 },
      { id: 'brasilia', labels: { fr: 'Brasilia', en: 'Brasilia' }, lat: -15.8267, lon: -47.9218 },
      { id: 'salvador', labels: { fr: 'Salvador', en: 'Salvador' }, lat: -12.9777, lon: -38.5016 },
      { id: 'fortaleza', labels: { fr: 'Fortaleza', en: 'Fortaleza' }, lat: -3.7172, lon: -38.5433 },
    ],
  },
  CL: {
    region: 'americas',
    labels: { fr: 'Chili', en: 'Chile' },
    cities: [
      { id: 'santiago', labels: { fr: 'Santiago', en: 'Santiago' }, lat: -33.4489, lon: -70.6693 },
      { id: 'antofagasta', labels: { fr: 'Antofagasta', en: 'Antofagasta' }, lat: -23.6509, lon: -70.3975 },
      { id: 'valparaiso', labels: { fr: 'Valparaíso', en: 'Valparaiso' }, lat: -33.0472, lon: -71.6127 },
    ],
  },
  AR: {
    region: 'americas',
    labels: { fr: 'Argentine', en: 'Argentina' },
    cities: [
      { id: 'buenos-aires', labels: { fr: 'Buenos Aires', en: 'Buenos Aires' }, lat: -34.6037, lon: -58.3816 },
      { id: 'cordoba-ar', labels: { fr: 'Córdoba', en: 'Cordoba' }, lat: -31.4201, lon: -64.1888 },
      { id: 'mendoza', labels: { fr: 'Mendoza', en: 'Mendoza' }, lat: -32.8895, lon: -68.8458 },
    ],
  },
  CO: {
    region: 'americas',
    labels: { fr: 'Colombie', en: 'Colombia' },
    cities: [
      { id: 'bogota', labels: { fr: 'Bogotá', en: 'Bogota' }, lat: 4.711, lon: -74.0721 },
      { id: 'medellin', labels: { fr: 'Medellín', en: 'Medellin' }, lat: 6.2476, lon: -75.5658 },
      { id: 'cali', labels: { fr: 'Cali', en: 'Cali' }, lat: 3.4516, lon: -76.532 },
    ],
  },
  PE: {
    region: 'americas',
    labels: { fr: 'Pérou', en: 'Peru' },
    cities: [
      { id: 'lima', labels: { fr: 'Lima', en: 'Lima' }, lat: -12.0464, lon: -77.0428 },
      { id: 'arequipa', labels: { fr: 'Arequipa', en: 'Arequipa' }, lat: -16.409, lon: -71.5375 },
    ],
  },

  AU: {
    region: 'apac',
    labels: { fr: 'Australie', en: 'Australia' },
    cities: [
      { id: 'sydney', labels: { fr: 'Sydney', en: 'Sydney' }, lat: -33.8688, lon: 151.2093 },
      { id: 'melbourne', labels: { fr: 'Melbourne', en: 'Melbourne' }, lat: -37.8136, lon: 144.9631 },
      { id: 'brisbane', labels: { fr: 'Brisbane', en: 'Brisbane' }, lat: -27.4698, lon: 153.0251 },
      { id: 'perth', labels: { fr: 'Perth', en: 'Perth' }, lat: -31.9505, lon: 115.8605 },
      { id: 'adelaide', labels: { fr: 'Adélaïde', en: 'Adelaide' }, lat: -34.9285, lon: 138.6007 },
    ],
  },
  IN: {
    region: 'apac',
    labels: { fr: 'Inde', en: 'India' },
    cities: [
      { id: 'new-delhi', labels: { fr: 'New Delhi', en: 'New Delhi' }, lat: 28.6139, lon: 77.209 },
      { id: 'mumbai', labels: { fr: 'Mumbai', en: 'Mumbai' }, lat: 19.076, lon: 72.8777 },
      { id: 'bangalore', labels: { fr: 'Bengaluru', en: 'Bengaluru' }, lat: 12.9716, lon: 77.5946 },
      { id: 'hyderabad', labels: { fr: 'Hyderabad', en: 'Hyderabad' }, lat: 17.385, lon: 78.4867 },
      { id: 'chennai', labels: { fr: 'Chennai', en: 'Chennai' }, lat: 13.0827, lon: 80.2707 },
      { id: 'jaipur', labels: { fr: 'Jaipur', en: 'Jaipur' }, lat: 26.9124, lon: 75.7873 },
    ],
  },
  CN: {
    region: 'apac',
    labels: { fr: 'Chine', en: 'China' },
    cities: [
      { id: 'beijing', labels: { fr: 'Pékin', en: 'Beijing' }, lat: 39.9042, lon: 116.4074 },
      { id: 'shanghai', labels: { fr: 'Shanghai', en: 'Shanghai' }, lat: 31.2304, lon: 121.4737 },
      { id: 'guangzhou', labels: { fr: 'Canton', en: 'Guangzhou' }, lat: 23.1291, lon: 113.2644 },
      { id: 'shenzhen', labels: { fr: 'Shenzhen', en: 'Shenzhen' }, lat: 22.5431, lon: 114.0579 },
      { id: 'chengdu', labels: { fr: 'Chengdu', en: 'Chengdu' }, lat: 30.5728, lon: 104.0668 },
    ],
  },
  JP: {
    region: 'apac',
    labels: { fr: 'Japon', en: 'Japan' },
    cities: [
      { id: 'tokyo', labels: { fr: 'Tokyo', en: 'Tokyo' }, lat: 35.6762, lon: 139.6503 },
      { id: 'osaka', labels: { fr: 'Osaka', en: 'Osaka' }, lat: 34.6937, lon: 135.5023 },
      { id: 'nagoya', labels: { fr: 'Nagoya', en: 'Nagoya' }, lat: 35.1815, lon: 136.9066 },
      { id: 'fukuoka', labels: { fr: 'Fukuoka', en: 'Fukuoka' }, lat: 33.5904, lon: 130.4017 },
    ],
  },
  KR: {
    region: 'apac',
    labels: { fr: 'Corée du Sud', en: 'South Korea' },
    cities: [
      { id: 'seoul', labels: { fr: 'Séoul', en: 'Seoul' }, lat: 37.5665, lon: 126.978 },
      { id: 'busan', labels: { fr: 'Busan', en: 'Busan' }, lat: 35.1796, lon: 129.0756 },
      { id: 'incheon', labels: { fr: 'Incheon', en: 'Incheon' }, lat: 37.4563, lon: 126.7052 },
    ],
  },
  TH: {
    region: 'apac',
    labels: { fr: 'Thaïlande', en: 'Thailand' },
    cities: [
      { id: 'bangkok', labels: { fr: 'Bangkok', en: 'Bangkok' }, lat: 13.7563, lon: 100.5018 },
      { id: 'chiang-mai', labels: { fr: 'Chiang Mai', en: 'Chiang Mai' }, lat: 18.7883, lon: 98.9853 },
      { id: 'phuket', labels: { fr: 'Phuket', en: 'Phuket' }, lat: 7.8804, lon: 98.3923 },
    ],
  },
  VN: {
    region: 'apac',
    labels: { fr: 'Viêt Nam', en: 'Vietnam' },
    cities: [
      { id: 'hanoi', labels: { fr: 'Hanoï', en: 'Hanoi' }, lat: 21.0278, lon: 105.8342 },
      { id: 'ho-chi-minh', labels: { fr: 'Hô Chi Minh-Ville', en: 'Ho Chi Minh City' }, lat: 10.8231, lon: 106.6297 },
      { id: 'da-nang', labels: { fr: 'Da Nang', en: 'Da Nang' }, lat: 16.0544, lon: 108.2022 },
    ],
  },
  ID: {
    region: 'apac',
    labels: { fr: 'Indonésie', en: 'Indonesia' },
    cities: [
      { id: 'jakarta', labels: { fr: 'Jakarta', en: 'Jakarta' }, lat: -6.2088, lon: 106.8456 },
      { id: 'surabaya', labels: { fr: 'Surabaya', en: 'Surabaya' }, lat: -7.2575, lon: 112.7521 },
      { id: 'bandung', labels: { fr: 'Bandung', en: 'Bandung' }, lat: -6.9175, lon: 107.6191 },
    ],
  },
  PH: {
    region: 'apac',
    labels: { fr: 'Philippines', en: 'Philippines' },
    cities: [
      { id: 'manila', labels: { fr: 'Manille', en: 'Manila' }, lat: 14.5995, lon: 120.9842 },
      { id: 'cebu', labels: { fr: 'Cebu', en: 'Cebu' }, lat: 10.3157, lon: 123.8854 },
      { id: 'davao', labels: { fr: 'Davao', en: 'Davao' }, lat: 7.1907, lon: 125.4553 },
    ],
  },

  ZA: {
    region: 'africa',
    labels: { fr: 'Afrique du Sud', en: 'South Africa' },
    cities: [
      { id: 'johannesburg', labels: { fr: 'Johannesburg', en: 'Johannesburg' }, lat: -26.2041, lon: 28.0473 },
      { id: 'cape-town', labels: { fr: 'Le Cap', en: 'Cape Town' }, lat: -33.9249, lon: 18.4241 },
      { id: 'durban', labels: { fr: 'Durban', en: 'Durban' }, lat: -29.8587, lon: 31.0218 },
      { id: 'pretoria', labels: { fr: 'Pretoria', en: 'Pretoria' }, lat: -25.7479, lon: 28.2293 },
    ],
  },
  NG: {
    region: 'africa',
    labels: { fr: 'Nigeria', en: 'Nigeria' },
    cities: [
      { id: 'lagos', labels: { fr: 'Lagos', en: 'Lagos' }, lat: 6.5244, lon: 3.3792 },
      { id: 'abuja', labels: { fr: 'Abuja', en: 'Abuja' }, lat: 9.0765, lon: 7.3986 },
      { id: 'kano', labels: { fr: 'Kano', en: 'Kano' }, lat: 12.0022, lon: 8.592 },
    ],
  },
  KE: {
    region: 'africa',
    labels: { fr: 'Kenya', en: 'Kenya' },
    cities: [
      { id: 'nairobi', labels: { fr: 'Nairobi', en: 'Nairobi' }, lat: -1.2921, lon: 36.8219 },
      { id: 'mombasa', labels: { fr: 'Mombasa', en: 'Mombasa' }, lat: -4.0435, lon: 39.6682 },
    ],
  },
  SN: {
    region: 'africa',
    labels: { fr: 'Sénégal', en: 'Senegal' },
    cities: [
      { id: 'dakar', labels: { fr: 'Dakar', en: 'Dakar' }, lat: 14.7167, lon: -17.4677 },
      { id: 'thies', labels: { fr: 'Thiès', en: 'Thies' }, lat: 14.7886, lon: -16.926 },
      { id: 'saint-louis', labels: { fr: 'Saint-Louis', en: 'Saint-Louis' }, lat: 16.0326, lon: -16.4818 },
    ],
  },
  GH: {
    region: 'africa',
    labels: { fr: 'Ghana', en: 'Ghana' },
    cities: [
      { id: 'accra', labels: { fr: 'Accra', en: 'Accra' }, lat: 5.6037, lon: -0.187 },
      { id: 'kumasi', labels: { fr: 'Kumasi', en: 'Kumasi' }, lat: 6.6885, lon: -1.6244 },
    ],
  },
  CI: {
    region: 'africa',
    labels: { fr: "Côte d'Ivoire", en: 'Ivory Coast' },
    cities: [
      { id: 'abidjan', labels: { fr: 'Abidjan', en: 'Abidjan' }, lat: 5.36, lon: -4.0083 },
      { id: 'yamoussoukro', labels: { fr: 'Yamoussoukro', en: 'Yamoussoukro' }, lat: 6.8276, lon: -5.2893 },
    ],
  },
};

/** Pays par défaut (marché principal WaterPulse). */
export const DEFAULT_COUNTRY = 'MA';

/** @returns {City} */
export function getDefaultCity(countryCode = DEFAULT_COUNTRY) {
  const country = LOCATIONS[countryCode] ?? LOCATIONS[DEFAULT_COUNTRY];
  return country.cities[0];
}

/**
 * Normalise une chaîne pour la recherche (accents / casse).
 * @param {string} value
 */
export function normalizeSearch(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * @param {LocalizedLabel} labels
 * @param {string} lang
 */
export function pickLabel(labels, lang) {
  const code = (lang || 'fr').slice(0, 2);
  return labels?.[code] || labels?.en || labels?.fr || '';
}

/**
 * Liste des pays triée alphabétiquement selon la langue UI.
 * @param {string} lang
 * @returns {{ code: string, label: string, region: string }[]}
 */
export function getSortedCountries(lang = 'fr') {
  return Object.entries(LOCATIONS)
    .map(([code, country]) => ({
      code,
      label: pickLabel(country.labels, lang),
      region: country.region,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, lang.slice(0, 2), { sensitivity: 'base' }));
}

/**
 * Villes d'un pays, triées alphabétiquement.
 * @param {string} countryCode
 * @param {string} lang
 * @returns {{ id: string, label: string, lat: number, lon: number }[]}
 */
export function getSortedCities(countryCode, lang = 'fr') {
  const country = LOCATIONS[countryCode];
  if (!country) return [];

  return country.cities
    .map((city) => ({
      id: city.id,
      label: pickLabel(city.labels, lang),
      lat: city.lat,
      lon: city.lon,
    }))
    .sort((a, b) => a.label.localeCompare(b.label, lang.slice(0, 2), { sensitivity: 'base' }));
}

/**
 * @param {string} countryCode
 * @param {string} cityId
 */
export function findCity(countryCode, cityId) {
  return LOCATIONS[countryCode]?.cities.find((city) => city.id === cityId) ?? null;
}
