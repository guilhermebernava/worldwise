import styles from "./Paragraph.module.css";

function Paragraph({ text = "" }) {
  return <p className={styles.paragraph}>{text}</p>;
}

export default Paragraph;
