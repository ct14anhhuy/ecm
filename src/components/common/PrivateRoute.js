import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Error from "./Error";

const PrivateRoute = ({ children, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (user.id ? children : <Error message="Token expires, please login via EP Lite" />)}
    />
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducers,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
