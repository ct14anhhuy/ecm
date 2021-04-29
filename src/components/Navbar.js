const Navbar = (props) => {
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

export default Navbar;
