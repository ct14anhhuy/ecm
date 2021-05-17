import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchContents } from "store/fileInfo/actions";

const OptionBox = (props) => {
  const [inpSearch, setInpSearch] = useState(null);

  return (
    <div className="optionBox" style={{ display: "block" }}>
      <div className="left" style={{ display: "block", zIndex: 4 }}>
        <div className="sorting_btn">
          <Link to="/" onClick={() => props.setShowAddModal(true)}>
            <span>
              <em className="add">Add File</em>
            </span>
          </Link>
          <Link
            to="/"
            onClick={() => props.setShowCreateDirectoryModal(true)}
            style={props.user.roleId !== 1 ? { display: "none" } : {}}
          >
            <span>
              <em className="new">Create Directory</em>
            </span>
          </Link>
        </div>
      </div>
      <div className="right">
        <div className="listSearchT" style={{ display: "block" }}>
          <input
            className="i_input"
            style={{
              padding: "0px 10px",
              border: "1px solid rgb(200, 200, 200)",
              width: 155,
              height: 23,
              lineHeight: 23,
              marginRight: 0,
              float: "left",
              msImeMode: "active",
            }}
            type="text"
            defaultValue={inpSearch}
            placeholder="File Name/Owner"
            onChange={(e) => setInpSearch(e.target.value)}
          />
          <input
            className="btn_whiteS_typeA mr_r5"
            style={{ background: "none", marginLeft: "-2px" }}
            type="image"
            alt=""
            src={require("assets/img/main/btn/btn_search.gif").default}
            onClick={() => props.searchContents(inpSearch)}
          />
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
    searchContents: (searchStr) => dispatch(searchContents(searchStr)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionBox);
