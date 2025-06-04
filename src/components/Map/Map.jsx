import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";

//coisas que ja existe para o REACT do leaflet
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";
//precisa importar O CSS para leaflet funcionar
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
  const { cities, position } = useCities();

  function onAddMarker(latlng) {
    //estou passando esse valor para function, para o pai desse componente
    //tenha acesso ao latlng;
    onSelectedPosition(latlng);
  }

  return (
    <MapContainer
      center={position}
      zoom={12}
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
      <AddMarkerOnClick onAddMarker={onAddMarker} />
      <ChangeCenter position={position} />
    </MapContainer>
  );
}

function AddMarkerOnClick({ onAddMarker }) {
  //toda vez que clicar no mapa, ele vai chamar o metodo onAddMarker
  useMapEvents({
    click(e) {
      if (e.originalEvent) e.originalEvent.preventDefault();
      onAddMarker(e.latlng);
    },
  });
  return null;
}

function ChangeCenter({ position }) {
  //pega o mapa que esta sendo mostrado
  const map = useMap();

  useEffect(() => {
    //altera a posicao do mapa sempre que position alterar.
    map.setView(position);
  }, [position, map]);

  return null;
}

export default Map;
