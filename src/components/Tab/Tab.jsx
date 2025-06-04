import { useState } from "react";
import styles from "./Tab.module.css";
import FlagEmoji from "../FlagEmoji/FlagEmoji";
import { useCities } from "../../context/CitiesContext";

function Tab({ buttons = [], content = [] }) {
  const { deleteCity } = useCities();

  if (buttons.lenght != content.lenght)
    throw new Error("BUTTONS and CONTENT MUST HAVE THE SAME SIZE");

  const [tab, setTab] = useState(0);

  return (
    <>
      <div className={styles.tabs}>
        <div className={styles.buttons}>
          {buttons.map((button, index) => (
            <button
              key={index}
              className={`${styles.tabButton} ${
                tab === index ? styles.selected : ""
              } ${index === 0 ? styles.first : ""} ${
                index === buttons.length - 1 ? styles.last : ""
              }`}
              onClick={() => setTab(index)}
              disabled={tab === index}
            >
              {button.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.tabContent}>
        {content.length > 0 &&
          content[tab].map((content, index) => (
            <div
              className={styles.content}
              key={index}
              onClick={() => console.log(content)}
            >
              {content.emoji != null && (
                <FlagEmoji countryCode={content.emoji} />
              )}

              <span className={styles.contentText}>{content.name}</span>
              <section className={styles.contentEnd}>
                <span className={styles.contentText}>({content.date})</span>
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
    </>
  );
}

export default Tab;
