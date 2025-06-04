import styles from "./Textarea.module.css";

function Textarea({
  value,
  name,
  onChange,
  type = "text",
  label = "",
  placeholder = "",
}) {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={label}>
        {label}
      </label>
      <textarea
        className={styles.textarea}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Textarea;
