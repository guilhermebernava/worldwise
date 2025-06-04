import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useCities } from "../../context/CitiesContext";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Map({ onSelectedPosition }) {
  const { cities, lastCity } = useCities();

  function handleAddMarker(latlng) {
    onSelectedPosition(latlng);
  }

  let lastCityPosition;
  if (lastCity == null) lastCityPosition = [40, 0];
  else lastCityPosition = [lastCity.position.lat, lastCity.position.lng];

  return (
    <MapContainer
      center={lastCityPosition}
      zoom={6}
      scrollWheelZoom={true}
      className={styles.wordMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {cities.map((city) => (
        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>
            {city.emoji != null && (
              <span style={{ fontFamily: "Noto Color Emoji" }}>
                {city.emoji}
              </span>
            )}
            <span>{city.name}</span>
          </Popup>
        </Marker>
      ))}
      <AddMarkerOnClick onAddMarker={handleAddMarker} />
    </MapContainer>
  );
}

function AddMarkerOnClick({ onAddMarker }) {
  useMapEvents({
    click(e) {
      if (e.originalEvent) e.originalEvent.preventDefault();
      onAddMarker(e.latlng);
    },
  });
  return null;
}

export default Map;
