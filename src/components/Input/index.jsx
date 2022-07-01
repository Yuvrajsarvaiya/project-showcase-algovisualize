import styles from "./Input.module.css";

const Input = ({ onChange, type, ...props }) => {
  return (
    <input
      className={styles.input}
      type={type}
      onChange={onChange}
      {...props}
    />
  );
};

export default Input;
