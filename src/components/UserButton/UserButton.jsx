import { useLogin } from "../../context/LoginContext";
import styles from "./UserButton.module.css";

function UserButton({ isLittle = false }) {
  const { user, logout } = useLogin();

  return (
    <div className={styles.container}>
      <img
        className={`${styles.image} ${isLittle ? styles.little : ""}`}
        src={user.photo}
        alt={user.name}
      />
      <h2 className={`${styles.name} ${isLittle ? styles.little : ""}`}>
        Welcome, {user.name}
      </h2>
      <button
        className={`${styles.button} ${isLittle ? styles.little : ""}`}
        onClick={() => logout()}
      >
        LOGOUT
      </button>
    </div>
  );
}

export default UserButton;
