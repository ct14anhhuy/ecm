import { connect } from "react-redux";

const Navbar = props => {
  return (
    <div className="treeBox">
      <div className="baseFolder">
        <p className="txt">
          <span>{props.headerPath}</span>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    headerPath: state.systemParamsReducers.headerPath
  };
};

export default connect(mapStateToProps, null)(Navbar);
