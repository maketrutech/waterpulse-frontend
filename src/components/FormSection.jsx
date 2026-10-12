import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calculator,
  ChevronDown,
  Droplets,
  Home,
  Loader2,
  LocateFixed,
  MapPin,
  Users,
} from 'lucide-react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  DEFAULT_COUNTRY,
  findCity,
  getDefaultCity,
  getSortedCities,
  getSortedCountries,
} from '../data/locations';
import { ROOF_COEFFICIENTS } from '../services/rainCalc';
import SearchableSelect from './SearchableSelect';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function createMarkerIcon(alt) {
  return new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    alt,
  });
}

const DEFAULT_CITY = getDefaultCity(DEFAULT_COUNTRY);
const CITY_ZOOM = 11;
const COUNTRY_ZOOM = 6;

const ROOF_TYPES = [
  { id: 'tiles', coef: ROOF_COEFFICIENTS.tiles },
  { id: 'flat', coef: ROOF_COEFFICIENTS.flat },
  { id: 'metal', coef: ROOF_COEFFICIENTS.metal },
];

function RecenterMap({ lat, lon, zoom = CITY_ZOOM }) {
  const map = useMap();

  useEffect(() => {
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const targetZoom = Number.isFinite(zoom) ? zoom : CITY_ZOOM;
    map.flyTo([lat, lon], targetZoom, { duration: 0.7 });
  }, [lat, lon, zoom, map]);

  return null;
}

function MapClickHandler({ onPositionChange }) {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      onPositionChange(lat, lng);
    },
  });
  return null;
}

function LocationMap({ lat, lon, zoom, onPositionChange }) {
  const { t } = useTranslation();
  const numericLat = Number(lat);
  const numericLon = Number(lon);
  const position = [
    Number.isFinite(numericLat) ? numericLat : DEFAULT_CITY.lat,
    Number.isFinite(numericLon) ? numericLon : DEFAULT_CITY.lon,
  ];
  const markerIconInstance = createMarkerIcon(t('form.markerAlt'));

  return (
    <MapContainer
      center={position}
      zoom={Number.isFinite(zoom) ? zoom : CITY_ZOOM}
      scrollWheelZoom
      className="z-0 h-full w-full"
      aria-label={t('form.mapLabel')}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap lat={position[0]} lon={position[1]} zoom={zoom} />
      <MapClickHandler onPositionChange={onPositionChange} />
      <Marker
        position={position}
        icon={markerIconInstance}
        alt={t('form.markerAlt')}
        title={t('form.markerAlt')}
        draggable
        eventHandlers={{
          dragend: (event) => {
            const { lat: nextLat, lng: nextLng } = event.target.getLatLng();
            onPositionChange(nextLat, nextLng);
          },
        }}
      />
    </MapContainer>
  );
}

function DeferredLocationMap({ lat, lon, zoom, onPositionChange }) {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || shouldLoad) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '160px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldLoad]);

  return (
    <div
      ref={containerRef}
      className="mt-4 overflow-hidden rounded-2xl border border-sky-mid/20 shadow-sm"
      role="region"
      aria-label={t('form.mapLabel')}
      aria-busy={!shouldLoad}
    >
      <div className="relative h-64 w-full bg-mist sm:h-80">
        {shouldLoad ? (
          <LocationMap
            lat={lat}
            lon={lon}
            zoom={zoom}
            onPositionChange={onPositionChange}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center text-sm font-medium text-sky-deep/70"
            aria-hidden="true"
          >
            {t('form.mapLoading')}
          </div>
        )}
      </div>
      <p className="bg-mist px-3 py-2.5 text-center text-xs font-medium text-sky-deep/80">
        {t('form.mapHint')}
      </p>
    </div>
  );
}

/**
 * Formulaire récupération d'eau de pluie.
 */
export default function FormSection({ onSubmit, loading }) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || 'fr').slice(0, 2);

  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [cityId, setCityId] = useState(DEFAULT_CITY.id);
  const [mapZoom, setMapZoom] = useState(CITY_ZOOM);
  const [form, setForm] = useState({
    lat: DEFAULT_CITY.lat,
    lon: DEFAULT_CITY.lon,
    surfaceM2: 100,
    people: 4,
  });
  const [roofType, setRoofType] = useState('tiles');
  const [usages, setUsages] = useState({
    wc: true,
    laundry: true,
    garden: false,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoMessage, setGeoMessage] = useState(null);

  const countryOptions = useMemo(
    () =>
      getSortedCountries(lang).map((item) => ({
        value: item.code,
        label: item.label,
      })),
    [lang]
  );

  const cityOptions = useMemo(
    () =>
      getSortedCities(country, lang).map((item) => ({
        value: item.id,
        label: item.label,
      })),
    [country, lang]
  );

  const applyPosition = (lat, lon, { custom = true, zoom = CITY_ZOOM } = {}) => {
    setForm((prev) => ({
      ...prev,
      lat: Number(Number(lat).toFixed(5)),
      lon: Number(Number(lon).toFixed(5)),
    }));
    setMapZoom(zoom);
    if (custom) setCityId('');
    setGeoMessage(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryChange = (nextCountry) => {
    const firstCity = getDefaultCity(nextCountry);
    setCountry(nextCountry);
    setCityId(firstCity.id);
    applyPosition(firstCity.lat, firstCity.lon, {
      custom: false,
      zoom: COUNTRY_ZOOM,
    });
  };

  const handleCityChange = (nextCityId) => {
    if (!nextCityId) {
      setCityId('');
      return;
    }
    const selected = findCity(country, nextCityId);
    if (!selected) return;
    setCityId(nextCityId);
    applyPosition(selected.lat, selected.lon, {
      custom: false,
      zoom: CITY_ZOOM,
    });
  };

  const handleUseMyLocation = () => {
    setGeoMessage(null);
    if (!navigator.geolocation) {
      setGeoMessage({ type: 'error', key: 'form.geo.unsupported' });
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        applyPosition(position.coords.latitude, position.coords.longitude, {
          custom: true,
        });
        setShowAdvanced(true);
        setGeoMessage({ type: 'success', key: 'form.geo.success' });
        setGeoLoading(false);
      },
      (error) => {
        let key = 'form.geo.generic';
        if (error.code === error.PERMISSION_DENIED) key = 'form.geo.denied';
        else if (error.code === error.POSITION_UNAVAILABLE) key = 'form.geo.unavailable';
        else if (error.code === error.TIMEOUT) key = 'form.geo.timeout';
        setGeoMessage({ type: 'error', key });
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const toggleUsage = (key) => {
    setUsages((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      lat: Number(form.lat),
      lon: Number(form.lon),
      surfaceM2: Number(form.surfaceM2),
      people: Number(form.people),
      roofType,
      usages: { ...usages },
    });
  };

  return (
    <section id="calculateur" className="relative z-10 -mt-10 px-4 sm:px-6">
      <form
        onSubmit={handleSubmit}
        aria-label={t('form.formLabel')}
        className="mx-auto max-w-4xl animate-fade-up rounded-2xl border border-white/60 bg-white/95 p-6 shadow-panel backdrop-blur-md sm:p-8"
        style={{ animationDelay: '120ms' }}
      >
        <div className="mb-6 flex items-start gap-3">
          <span
            className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-mid/10 text-sky-mid"
            role="img"
            aria-label={t('form.locationIconLabel')}
          >
            <MapPin size={22} aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-sky-deep sm:text-2xl">
              {t('form.title')}
            </h2>
            <p className="mt-1 text-sm text-sky-deep/80">{t('form.subtitle')}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <SearchableSelect
            id="country"
            label={t('form.country')}
            options={countryOptions}
            value={country}
            onChange={handleCountryChange}
            searchPlaceholder={t('form.searchCountry')}
            noResultsLabel={t('form.noResults')}
            disabled={loading || geoLoading}
          />
          <SearchableSelect
            id="city"
            label={t('form.city')}
            options={cityOptions}
            value={cityId}
            onChange={handleCityChange}
            searchPlaceholder={t('form.searchCity')}
            emptyLabel={t('form.customPosition')}
            noResultsLabel={t('form.noResults')}
            allowEmpty
            disabled={loading || geoLoading}
          />
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={loading || geoLoading}
            className="inline-flex min-h-12 touch-target items-center justify-center gap-2 rounded-xl border border-sky-mid/30 bg-mist px-4 py-3 text-sm font-semibold text-sky-deep
              transition hover:border-sky-mid/50 hover:bg-white
              focus:outline-none focus:ring-2 focus:ring-sky-mid/30
              disabled:cursor-not-allowed disabled:opacity-70"
          >
            {geoLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                {t('form.locating')}
              </>
            ) : (
              <>
                <LocateFixed size={18} className="text-sky-deep" aria-hidden="true" />
                {t('form.useMyLocation')}
              </>
            )}
          </button>
          {geoMessage && (
            <p
              role={geoMessage.type === 'error' ? 'alert' : 'status'}
              className={`text-sm font-medium sm:max-w-md sm:text-right ${
                geoMessage.type === 'error' ? 'text-red-800' : 'text-sky-mid'
              }`}
            >
              {t(geoMessage.key)}
            </p>
          )}
        </div>

        <DeferredLocationMap
          lat={form.lat}
          lon={form.lon}
          zoom={mapZoom}
          onPositionChange={(lat, lon) => {
            applyPosition(lat, lon, { custom: true, zoom: CITY_ZOOM });
            setShowAdvanced(true);
          }}
        />

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="surfaceM2" className="label-field">
              {t('form.surface')}
            </label>
            <div className="relative">
              <input
                id="surfaceM2"
                name="surfaceM2"
                type="number"
                min="1"
                step="1"
                required
                value={form.surfaceM2}
                onChange={handleChange}
                className="input-field touch-target pr-14"
                disabled={loading}
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-sky-deep/70">
                m²
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="people" className="label-field">
              {t('form.people')}
            </label>
            <div className="relative">
              <input
                id="people"
                name="people"
                type="number"
                min="1"
                step="1"
                required
                value={form.people}
                onChange={handleChange}
                className="input-field touch-target pr-12"
                disabled={loading}
              />
              <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sky-deep">
                <Users size={18} aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>

        <fieldset className="mt-6" disabled={loading || geoLoading}>
          <legend className="mb-3 flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-aqua/25 text-sky-deep">
              <Home size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-sky-deep">
                {t('form.roofType')}
              </span>
              <span className="block text-xs font-medium text-sky-deep/75">
                {t('form.roofHint')}
              </span>
            </span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label={t('form.roofType')}>
            {ROOF_TYPES.map((roof) => {
              const selected = roofType === roof.id;
              return (
                <button
                  key={roof.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setRoofType(roof.id)}
                  className={`min-h-12 touch-target rounded-2xl border px-4 py-4 text-left transition
                    focus:outline-none focus:ring-2 focus:ring-sky-mid/40
                    ${
                      selected
                        ? 'border-sky-mid bg-sky-mid/15 shadow-sm'
                        : 'border-sky-mid/20 bg-white hover:border-sky-mid/40 hover:bg-mist/80'
                    }`}
                >
                  <span className="block font-display text-sm font-bold text-sky-deep sm:text-base">
                    {t(`form.roofs.${roof.id}.label`)}
                  </span>
                  <span className="mt-1 block text-xs font-semibold text-sky-deep/75">
                    {t(`form.roofs.${roof.id}.hint`, { coef: roof.coef })}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-6" disabled={loading || geoLoading}>
          <legend className="mb-3 flex items-center gap-2">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-mid/10 text-sky-mid">
              <Droplets size={20} aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-sky-deep">
                {t('form.usages')}
              </span>
              <span className="block text-xs font-medium text-sky-deep/75">
                {t('form.usagesHint')}
              </span>
            </span>
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {['wc', 'laundry', 'garden'].map((key) => (
              <label
                key={key}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition
                  ${
                    usages[key]
                      ? 'border-sky-mid bg-sky-mid/10'
                      : 'border-sky-mid/20 bg-white hover:bg-mist/80'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={usages[key]}
                  onChange={() => toggleUsage(key)}
                  className="h-5 w-5 rounded border-sky-mid/40 text-sky-mid focus:ring-sky-mid/30"
                />
                <span className="text-sm font-semibold text-sky-deep">
                  {t(`form.usageOptions.${key}`)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-6 border-t border-sky-mid/15 pt-4">
          <button
            type="button"
            onClick={() => setShowAdvanced((open) => !open)}
            className="flex min-h-12 w-full touch-target items-center justify-between gap-2 text-left text-sm font-semibold text-sky-deep transition hover:text-sky-mid focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-mid/40"
            aria-expanded={showAdvanced}
            aria-controls="advanced-coords"
          >
            <span>{t('form.preciseCoords')}</span>
            <ChevronDown
              size={20}
              aria-hidden="true"
              className={`shrink-0 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            />
          </button>
          {showAdvanced && (
            <div id="advanced-coords" className="mt-4 grid animate-fade-up gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="lat" className="label-field">
                  {t('form.latitude')}
                </label>
                <input
                  id="lat"
                  name="lat"
                  type="number"
                  step="any"
                  required
                  value={form.lat}
                  onChange={(event) => {
                    handleChange(event);
                    setCityId('');
                    setGeoMessage(null);
                  }}
                  className="input-field touch-target"
                  disabled={loading}
                />
              </div>
              <div>
                <label htmlFor="lon" className="label-field">
                  {t('form.longitude')}
                </label>
                <input
                  id="lon"
                  name="lon"
                  type="number"
                  step="any"
                  required
                  value={form.lon}
                  onChange={(event) => {
                    handleChange(event);
                    setCityId('');
                    setGeoMessage(null);
                  }}
                  className="input-field touch-target"
                  disabled={loading}
                />
              </div>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || geoLoading}
          className="mt-8 flex min-h-12 w-full touch-target items-center justify-center gap-2 rounded-2xl bg-sky-mid px-6 py-4 font-display text-base font-bold text-white shadow-panel transition hover:bg-sky-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-aqua disabled:cursor-not-allowed disabled:opacity-70 sm:text-lg"
        >
          {loading ? (
            <>
              <Loader2 size={22} className="animate-spin" aria-hidden="true" />
              {t('form.calculating')}
            </>
          ) : (
            <>
              <Calculator size={22} aria-hidden="true" />
              {t('form.submit')}
            </>
          )}
        </button>
      </form>
    </section>
  );
}
