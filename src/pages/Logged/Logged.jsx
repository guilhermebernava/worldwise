import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import Tab from "../../components/Tab/Tab";
import UserButton from "../../components/UserButton/UserButton";
import styles from "./Logged.module.css";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useCities } from "../../context/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Map from "../../components/Map/Map";
import Spinner from "../../components/Spinner/Spinner";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Logged() {
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities, countries, status } = useCities();

  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  return (
    <>
      {status === "loading" && <Spinner />}
      {status === "ready" && (
        <div className={styles.main}>
          <div className={styles.container}>
            <Logo />
            <Tab
              buttons={["Cities", "Countries"]}
              content={[cities, countries]}
            />
          </div>
          <div className={styles.map}>
            <Map mapPosition={mapPosition} />
            <div className={styles.userButton}>
              <UserButton />
            </div>
            <div className={styles.bottom}>
              <Button
                text={isLoadingPosition ? "Loading..." : "Use your position"}
                onClick={getPosition}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Logged;
