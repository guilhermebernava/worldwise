import styles from "./Main.module.css";
import PageNav from "../PageNav/PageNav";

function Main({ children, hasBackgroundImage = false }) {
  return (
    <div
      className={`${styles.mainContainer} ${
        hasBackgroundImage ? styles.backgroundImage : ""
      }`}
    >
      <PageNav />
      {children}
    </div>
  );
}

export default Main;
