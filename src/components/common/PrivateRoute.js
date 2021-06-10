import { connect } from "react-redux";
import Main from "components/Main";
import Error from "./Error";

const PrivateRoute = props => {
  return props.user.id ? (
    <Main />
  ) : (
    <Error message="Token expires, please login via EP Lite" />
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducers
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
