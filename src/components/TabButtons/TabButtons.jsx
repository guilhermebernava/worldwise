import { useNavigate, useLocation } from "react-router-dom";
import styles from "./TabButtons.module.css";
import { useState } from "react";

function TabButtons() {
  const navigte = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(0);
  const disableButton = location.pathname.includes("/city");

  return (
    <div className={styles.buttons}>
      <button
        className={`${styles.tabButton} ${
          selected === 0 ? styles.selected : ""
        }`}
        onClick={() => {
          setSelected(0);
          navigte("cities");
        }}
        disabled={disableButton}
      >
        CITIES
      </button>
      <button
        className={`${styles.tabButton} ${
          selected === 1 ? styles.selected : ""
        }`}
        onClick={() => {
          setSelected(1);
          navigte("countries");
        }}
        disabled={disableButton}
      >
        COUNTRIES
      </button>
    </div>
  );
}

export default TabButtons;
