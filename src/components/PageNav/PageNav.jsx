import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Button from "../Button/Button";
import { useLogin } from "../../context/LoginContext";
import Logo from "../Logo/Logo";

function PageNav() {
  const { resetGlobalError, user } = useLogin();

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <Logo />
        </li>

        <ul className={styles.navItens}>
          <li className={styles.navItem}>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li className={styles.navItem}>
            {user != null && (
              <NavLink to="/logged">
                <Button text="USER 123" />
              </NavLink>
            )}

            {user == null && (
              <NavLink to="/login">
                <Button text="LOG IN" onClick={resetGlobalError} />
              </NavLink>
            )}
          </li>
        </ul>
      </ul>
    </nav>
  );
}

export default PageNav;
