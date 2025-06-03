import { useLogin } from "../../context/LoginContext";
import styles from "./UserButton.module.css";

function UserButton() {
  const { user, logout } = useLogin();

  return (
    <div className={styles.container}>
      <img className={styles.image} src={user.photo} alt={user.name} />
      <h2 className={styles.name}>Welcome, {user.name}</h2>
      <button className={styles.button} onClick={() => logout()}>
        LOGOUT
      </button>
    </div>
  );
}

export default UserButton;
