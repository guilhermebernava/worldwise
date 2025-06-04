import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useCities } from "../../context/CitiesContext";
import { formatDateToMMDDYYYY } from "../../helpers/DateHelper";
import FlagEmoji from "../FlagEmoji/FlagEmoji";
import styles from "./Cities.module.css";

function Cities() {
  //serve para pegar a URL ATUAL.
  const location = useLocation();
  const { cities, deleteCity } = useCities();
  const navigate = useNavigate();
  const showOutlet = location.pathname.includes("/city");

  return (
    <div className={styles.container}>
      {showOutlet && <Outlet />}
      {cities.length == 0 && !showOutlet && (
        <Title
          text="👋 Try to add your first city by clicking on city on the map!"
          small={true}
        />
      )}
      {cities.length > 0 &&
        !showOutlet &&
        cities.map((content) => (
          <div
            className={styles.content}
            key={content.id}
            onClick={() => navigate(`city/${content.id}`)}
          >
            {content.emoji != null && <FlagEmoji countryCode={content.emoji} />}

            <span className={styles.contentText}>{content.name}</span>
            <section className={styles.contentEnd}>
              <span className={styles.contentText}>
                ({formatDateToMMDDYYYY(content.date)})
              </span>
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  deleteCity(content.id);
                  e.stopPropagation();
                }}
              >
                X
              </button>
            </section>
          </div>
        ))}
    </div>
  );
}

export default Cities;
