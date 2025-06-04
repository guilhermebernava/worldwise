import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import Tab from "../../components/Tab/Tab";
import UserButton from "../../components/UserButton/UserButton";
import styles from "./Logged.module.css";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useCities } from "../../context/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Map from "../../components/Map/Map";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ErrorPopup from "../../components/ErrorPopUp/ErrorPopUp";

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

  const navigate = useNavigate();
  const location = useLocation();

  const modalDataRef = useRef(null);
  const { status, error, resetError } = useCities();
  const showModal = location.pathname.includes("/formModal");

  useEffect(() => {
    if (geolocationPosition) {
      modalDataRef.current = {
        lat: geolocationPosition.lat,
        lng: geolocationPosition.lng,
      };

      navigate(
        `formModal/${modalDataRef.current.lat}/${modalDataRef.current.lng}`,
        { state: { background: location } }
      );
    }
  }, [geolocationPosition]);

  return (
    <>
      {showModal && <Outlet />}{" "}
      <div className={styles.main}>
        {status === "error" && error && (
          <ErrorPopup message={error} onClose={resetError} />
        )}

        <div className={styles.container}>
          <Logo />
          <Tab />
        </div>
        <div className={styles.map}>
          <Map
            onSelectedPosition={(pos) => {
              modalDataRef.current = { lat: pos.lat, lng: pos.lng };
              navigate(
                `formModal/${modalDataRef.current.lat}/${modalDataRef.current.lng}`,
                { state: { background: location } }
              );
            }}
          />
          <div className={styles.userButton}>
            <UserButton />
          </div>
          <div className={styles.bottom}>
            <Button
              disable={isLoadingPosition}
              text={isLoadingPosition ? "Loading..." : "Use your position"}
              onClick={() => {
                getPosition();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Logged;
