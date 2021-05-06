import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Error from "./Error";

const PrivateRoute = (props) => {
  const { employee, children } = props;

  return (
    <Route render={() => (employee.id > 0 ? children : <Error />)}></Route>
  );
};

const mapStateToProps = (state) => {
  return {
    employee: state.employeeReducers,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
