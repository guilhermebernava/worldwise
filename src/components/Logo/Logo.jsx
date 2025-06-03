import styles from "./Logo.module.css";
import { NavLink } from "react-router-dom";

function Logo() {
  return (
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
  );
}

export default Logo;
