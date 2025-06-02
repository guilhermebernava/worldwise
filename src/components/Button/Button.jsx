import styles from "./Button.module.css";

function Button({ text = "custom button", onClick }) {
  return (
    <button
      className={styles.button}
      onClick={(e) => {
        onClick();
        e.stopPropagation();
      }}
    >
      {text}
    </button>
  );
}

export default Button;
