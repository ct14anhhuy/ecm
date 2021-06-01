import { useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "store/user/actions";

const Login = (props) => {
  const { token } = useParams();
  localStorage.setItem("accessToken", token);
  props.login();

  return <Redirect to="/"></Redirect>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => dispatch(loginAction()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
