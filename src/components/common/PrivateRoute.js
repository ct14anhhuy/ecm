import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Error from "./Error";

const PrivateRoute = (props) => {
  const employee = props.employee;

  return (
    <Route render={() => (employee.id > 0 ? props.children : <Error />)}></Route>
  );
};

const mapStateToProps = (state) => {
  return {
    employee: state.employeeReducers,
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
