import styles from "./Button.module.css";

function Button({
  text = "custom button",
  onClick,
  bigButton = false,
  disable = false,
}) {
  return (
    <button
      disabled={disable}
      className={`${styles.button} ${bigButton ? styles.bigButton : ""}`}
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
