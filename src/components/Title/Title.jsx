import styles from "./Title.module.css";

function Title({ text = "", small = false }) {
  return (
    <h1 className={`${styles.title} ${small ? styles.small : ""}`}>{text}</h1>
  );
}

export default Title;
