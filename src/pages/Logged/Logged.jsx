import Button from "../../components/Button/Button";
import Logo from "../../components/Logo/Logo";
import styles from "./Logged.module.css";

function Logged() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Logo />
      </div>
      <div className={styles.map}>
        <div className={styles.loggedUser}></div>
        <Button />
      </div>
    </div>
  );
}

export default Logged;
