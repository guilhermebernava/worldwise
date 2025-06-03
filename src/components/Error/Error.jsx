import styles from "./Error.module.css";

function Error({ text = "" }) {
  return <h2 className={styles.error}>* {text}</h2>;
}

export default Error;
