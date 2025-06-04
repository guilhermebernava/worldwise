import { useEffect, useState } from "react";
import { useCities } from "../../context/CitiesContext";
import styles from "./City.module.css";
import { useNavigate, useParams } from "react-router-dom";
import FlagEmoji from "../FlagEmoji/FlagEmoji";
import { formatDateToMMDDYYYY } from "../../helpers/DateHelper";

function City() {
  const { getCityById } = useCities();
  const { id } = useParams();
  const [city, setCity] = useState();
  const navite = useNavigate();

  function getWikipediaUrl(cityName) {
    const encodedName = encodeURIComponent(
      cityName.trim().replace(/\s+/g, "_")
    );
    return `https://en.wikipedia.org/wiki/${encodedName}`;
  }

  useEffect(() => {
    setCity(getCityById(id));
    console.log("teste " + city);
  }, [getCityById, id]);

  if (!city) return <p>Carregando...</p>;

  return (
    <div className={styles.container}>
      <Text title={"City"} text={city.name} emoji={city.emoji} />

      <Text
        title={`You went to ${city.name} on`}
        text={formatDateToMMDDYYYY(city.date)}
      />
      <Text title={"Your Notes"} text={city.notes} />
      <Text
        title={"Learn More"}
        text={getWikipediaUrl(city.name)}
        isLink={true}
      />

      <button onClick={() => navite("/app/logged")} className={styles.button}>
        BACK
      </button>
    </div>
  );
}

function Text({ title, text, emoji = null, isLink = false }) {
  return (
    <div>
      <h2 className={styles.title}>
        {emoji && <FlagEmoji countryCode={emoji} />} {title}:
      </h2>
      {isLink ? (
        <a
          className={styles.text}
          target="_blank"
          rel="noopener noreferrer"
          href={text}
        >
          {text}
        </a>
      ) : (
        <p className={styles.text}>{text}</p>
      )}
    </div>
  );
}

export default City;
