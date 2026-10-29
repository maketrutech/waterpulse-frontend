import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { DEFAULT_COUNTRY, getDefaultCity } from '../data/locations';

/**
 * Carte Leaflet — module chargé uniquement dans le navigateur
 * (import dynamique). Leaflet lit `window` dès l'évaluation du module.
 */
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

export default function LocationMap({ lat, lon, zoom, onPositionChange }) {
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
