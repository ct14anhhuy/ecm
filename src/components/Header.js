import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as act from "store/user/actions";

const Header = (props) => {
  const { user } = props;

  return (
    <div id="header">
      <div className="infoArea clfix">
        <div className="minWidth">
          <div className="topLt">
            <h1 className="logo">
              <Link className="logo_ci" to="/">
                <img
                  alt="With POSCO"
                  src={
                    require("assets/img/layout/posco-the-great-logo.png")
                      .default
                  }
                />
              </Link>
              <Link className="logo_sys" to="/">
                <img
                  alt="ECM"
                  src={require("assets/img/layout/logo_ecm.png").default}
                />
              </Link>
            </h1>
          </div>
          <div className="topRt">
            <div className="psnName showHideTrg">
              <Link className="trg" to="/">
                <strong>{user.lastName + " " + user.firstName}</strong>
              </Link>
            </div>
            <Link
              to="/"
              onClick={() => {
                props.logout();
              }}
            >
              <img
                alt=""
                src={require("assets/img/layout/ico_help02.png").default}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(act.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
