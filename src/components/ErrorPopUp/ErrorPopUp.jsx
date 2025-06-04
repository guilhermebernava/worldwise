import styles from "./ErrorPopup.module.css";

function ErrorPopup({ message, onClose }) {
  return (
    <div className={styles.popup}>
      <span>{message}</span>
      <button onClick={onClose} className={styles.closeButton}>
        X
      </button>
    </div>
  );
}

export default ErrorPopup;
