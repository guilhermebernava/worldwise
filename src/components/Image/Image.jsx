import styles from "./Image.module.css";

function Image({ src, alt }) {
  return <img className={styles.image} src={src} alt={alt} />;
}

export default Image;
