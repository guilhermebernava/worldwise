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
import { useState } from "react";
import { useCities } from "../../context/CitiesContext";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Map({ mapPosition }) {
  const { cities, status, getCityInfo } = useCities();
  const [localMarkers, setLocalMarkers] = useState(() => {
    const markers = cities.map((city) => {
      return {
        lat: city.position.lat,
        lng: city.position.lng,
      };
    });

    return markers;
  });

  async function handleAddMarker(latlng) {
    setLocalMarkers((prev) => [...prev, { lat: latlng.lat, lng: latlng.lng }]);
  }

  return (
    <MapContainer
      center={mapPosition}
      zoom={6}
      scrollWheelZoom={true}
      className={styles.wordMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {localMarkers.map((city) => (
        <Marker position={[city.lat, city.lng]} key={city.id}>
          {/* <Popup>
            <span style={{ fontFamily: "Noto Color Emoji" }}>{city.emoji}</span>
            <span>{city.cityName}</span>
          </Popup> */}
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
