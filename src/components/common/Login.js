import { useParams, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "store/user/actions";
import { useEffect } from "react";

const Login = props => {
  const { login } = props;
  const { token } = useParams();

  useEffect(() => {
    login();
    localStorage.setItem("accessToken", token);
  }, [login, token]);

  return <Redirect to="/ecm/my-contents/1" />;
};

const mapDispatchToProps = dispatch => {
  return {
    login: () => dispatch(loginAction()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
