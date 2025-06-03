import styles from "./EyeIcon.module.css";

export default function EyeIcon({ off = false }) {
  if (off) {
    return (
      <img className={styles.image} src="images/hide.png" alt="hidden-eye" />
    );
  }

  return (
    <img className={styles.image} src="images/view.png" alt="hidden-eye" />
  );
}
