import { useState } from "react";
import styles from "./Input.module.css";
import EyeIcon from "../EyeIcon/EyeIcon";

function Input({
  value,
  name,
  onChange,
  type = "text",
  label = "",
  placeholder = "",
  isPassword = false,
}) {
  const [visible, setVisible] = useState(!isPassword);

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <input
        className={styles.input}
        name={name}
        type={`${isPassword && visible ? "text" : type}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {isPassword && (
        <span onClick={() => setVisible((v) => !v)} className={styles.toggle}>
          {visible ? (
            <EyeIcon off={true} color={"var(--color-brand--2)"} />
          ) : (
            <EyeIcon color="var(--color-brand--2)" />
          )}
        </span>
      )}
    </div>
  );
}

export default Input;
