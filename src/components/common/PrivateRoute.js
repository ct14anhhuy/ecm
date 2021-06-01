import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Error from "./Error";

const PrivateRoute = (props) => {
  const { user, children } = props;

  return (
    <Route
      render={() =>
        user.id > 0 ? (
          children
        ) : (
          <Error message="Token expires, please login via EP" />
        )
      }
    ></Route>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducers,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
