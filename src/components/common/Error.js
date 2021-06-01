import styles from "./Error.module.css";
import { connect } from "react-redux";

const Error = (props) => {
  return (
    <div className={styles.error__main}>
      <div className={styles.error__fof}>
        <h1>{props.message}</h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    systemError: state.systemParamsReducers.systemError,
  };
};

export default connect(mapStateToProps, null)(Error);
