import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  searchContentsAction,
  moveToTrashAction,
  recoverFileAction,
  deleteFileAction,
} from "store/fileInfo/actions";
import swal from "sweetalert";
import React from "react";

const OptionBox = (props) => {
  const { shortcutBox, headerPath } = props;
  const [inpSearch, setInpSearch] = useState(null);
  const [isTrash, setIsTrash] = useState(false);

  useEffect(() => {
    if (headerPath === "Trash" && shortcutBox) {
      setIsTrash(true);
    } else {
      setIsTrash(false);
    }
  }, [headerPath, shortcutBox]);

  const handleMoveToTrash = () => {
    const fileIds = props.fileInfos.filter((f) => f.checked).map((f) => f.id);
    if (fileIds.length > 0) {
      swal({
        title: "Warning!",
        text: `Move ${fileIds.length} file(s) to trash!`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          props.moveToTrash(fileIds);
        }
      });
    }
  };

  const handleDelete = () => {
    const fileIds = props.fileInfos.filter((f) => f.checked).map((f) => f.id);
    if (fileIds.length > 0) {
      props.deleteFile(fileIds);
    }
  };

  const handleRecover = () => {
    const fileIds = props.fileInfos.filter((f) => f.checked).map((f) => f.id);
    if (fileIds.length > 0) {
      props.recoverFile(fileIds);
    }
  };

  return (
    <div className="optionBox" style={{ display: "block" }}>
      <div className="left" style={{ display: "block", zIndex: 4 }}>
        <div className="sorting_btn">
          <Link to="/" onClick={() => props.setShowAddModal(true)}>
            <span>
              <em className="add">Add File</em>
            </span>
          </Link>

          {!isTrash ? (
            <Link
              to="/"
              className="optionBox__remove_a"
              onClick={handleMoveToTrash}
            >
              <span>
                <em className="optionBox__remove_em">Move To Trash</em>
              </span>
            </Link>
          ) : null}

          {isTrash ? (
            <React.Fragment>
              <Link to="/" onClick={handleRecover}>
                <span>
                  <em className="add">Recover</em>
                </span>
              </Link>
              <Link
                to="/"
                className="optionBox__remove_a"
                onClick={handleDelete}
              >
                <span>
                  <em className="optionBox__remove_em">Delete</em>
                </span>
              </Link>
            </React.Fragment>
          ) : null}

          {props.user.roleId === 1 ? (
            <Link
              to="/"
              onClick={() => props.setShowCreateDirectoryModal(true)}
            >
              <span>
                <em className="new">Create Directory</em>
              </span>
            </Link>
          ) : null}

          {props.user.roleId === 1 && !shortcutBox ? (
            <Link to="/" className="optionBox__remove_a">
              <span>
                <em className="optionBox__remove_em">Delete Directory</em>
              </span>
            </Link>
          ) : null}
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
    fileInfos: state.fileInfoReducers.data,
    headerPath: state.systemParamsReducers.headerPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchContents: (searchStr) => dispatch(searchContentsAction(searchStr)),
    moveToTrash: (fileIds) => dispatch(moveToTrashAction(fileIds)),
    recoverFile: (fileIds) => dispatch(recoverFileAction(fileIds)),
    deleteFile: (fileIds) => dispatch(deleteFileAction(fileIds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionBox);
