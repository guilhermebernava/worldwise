import styles from "./FlagEmoji.module.css";

export default function FlagEmoji({ countryCode }) {
  return <span className={styles.emoji}>{countryCode}</span>;
}
