import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Button from "../Button/Button";
import { useLogin } from "../../context/LoginContext";

function PageNav() {
  const { resetGlobalError } = useLogin();

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.nav}>
        <li className={styles.navItem}>
          <NavLink to="/">
            <picture>
              <source
                className={styles.logo}
                media="(max-width: 670px)"
                srcSet="images/icon.png"
              />
              <img
                className={styles.logo}
                src="images/logo.png"
                alt="world-wise-logo"
              />
            </picture>
          </NavLink>
        </li>

        <ul className={styles.navItens}>
          <li className={styles.navItem}>
            <NavLink to="/pricing">Pricing</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li className={styles.navItem}>
            <NavLink to="/login">
              <Button text="LOG IN" onClick={resetGlobalError} />
            </NavLink>
          </li>
        </ul>
      </ul>
    </nav>
  );
}

export default PageNav;
