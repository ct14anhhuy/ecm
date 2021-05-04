import { useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginRequest } from "../../store/employee/actions";

const Login = (props) => {
  const { token } = useParams();
  localStorage.setItem("accessToken", token);

  props.login();

  return <Redirect to="/"></Redirect>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(loginRequest()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
