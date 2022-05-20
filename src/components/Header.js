import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "store/user/actions";

const Header = props => {
  const { user } = props;

  const handleLogout = () => {
    const link = document.createElement("a");
    link.href = "ECMProtocol: <Logout>";
    link.click();
    link.remove();
    props.logout();
  };

  return (
    <div id="header">
      <div className="infoArea clfix">
        <div className="minWidth">
          <div className="topLt">
            <h1 className="logo">
              <Link to="#" className="logo_ci">
                <img alt="" src={require("assets/img/layout/posco-the-great-logo.png").default} />
              </Link>
              <Link to="#" className="logo_sys">
                <img alt="" src={require("assets/img/layout/logo_ecm.png").default} />
              </Link>
            </h1>
          </div>
          <div className="topRt">
            <div className="psnName showHideTrg">
              <span className="trg">
                <strong>{`${user.lastName} ${user.firstName} (${user.epLiteId})`}</strong>
              </span>
            </div>
            <span onClick={handleLogout}>
              <img alt="" src={require("assets/img/layout/ico_help02.png").default} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userReducers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logoutAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
