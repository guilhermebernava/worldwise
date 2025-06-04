import styles from "./Countries.module.css";
import Title from "../Title/Title";
import FlagEmoji from "../FlagEmoji/FlagEmoji";
import { useCities } from "../../context/CitiesContext";
import Spinner from "../Spinner/Spinner";

function Countries() {
  const { cities, status } = useCities();

  const countries =
    cities.length > 1
      ? cities.reduce((arr, city) => {
          if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
          else return arr;
        }, [])
      : [];

  return (
    <>
      {countries.length == 0 && status !== "loading" && !showOutlet && (
        <Title
          text="👋 Try to add your first city by clicking on city on the map!"
          small={true}
        />
      )}
      {status === "loading" && <Spinner />}
      {cities.length > 0 && (
        <div className={styles.container}>
          {cities.length == 0 && !showOutlet && (
            <Title
              text="👋 Try to add your first city by clicking on city on the map!"
              small={true}
            />
          )}
          {countries.length > 0 &&
            countries.map((content, index) => (
              <div
                key={content.id}
                className={styles.content}
                onClick={() => navigate(`city/${content.id}`)}
              >
                {content.emoji != null && (
                  <FlagEmoji countryCode={content.emoji} />
                )}
                <Title text={content.country} small={true} />
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default Countries;
