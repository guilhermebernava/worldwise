import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useCities } from "../../context/CitiesContext";
import { formatDateToMMDDYYYY } from "../../helpers/DateHelper";
import FlagEmoji from "../FlagEmoji/FlagEmoji";
import styles from "./Cities.module.css";
import Spinner from "../Spinner/Spinner";
import Title from "../../components/Title/Title";

function Cities() {
  //serve para pegar a URL ATUAL.
  const location = useLocation();
  const { cities, deleteCity, status } = useCities();
  const navigate = useNavigate();
  const showOutlet = location.pathname.includes("/city");

  return (
    <div className={styles.container}>
      {status === "loading" && <Spinner />}
      {showOutlet && <Outlet />}
      {cities.length == 0 && status !== "loading" && !showOutlet && (
        <Title
          text="👋 Try to add your first city by clicking on city on the map!"
          small={true}
        />
      )}
      {cities.length > 0 &&
        status !== "loading" &&
        !showOutlet &&
        cities.map((content) => (
          <div
            key={content.id}
            className={styles.content}
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
