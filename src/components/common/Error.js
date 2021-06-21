import styles from "./Error.module.css";

const Error = props => {
  return (
    <div className={styles.error__main}>
      <div className={styles.error__fof}>
        <h1>{props.message}</h1>
      </div>
    </div>
  );
};

export default Error;
