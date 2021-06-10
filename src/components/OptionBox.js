import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  searchContentsAction,
  moveToTrashAction,
  recoverFileAction,
  deleteFileAction
} from "store/fileInfo/actions";
import { deleteDirectoryAction } from "store/diretory/actions";
import {
  changeShowAddFileAction,
  changeShowCreateDirectoryAction
} from "store/systemParams/actions";
import swal from "sweetalert";

const OptionBox = props => {
  const { headerPath, menuActive, currentDirectory } = props.systemParams;
  const [inpSearch, setInpSearch] = useState(null);
  const [isTrash, setIsTrash] = useState(false);

  useEffect(() => {
    if (headerPath === "Trash" && menuActive) {
      setIsTrash(true);
    } else {
      setIsTrash(false);
    }
  }, [headerPath, menuActive]);

  const handleMoveToTrash = () => {
    const fileIds = props.fileInfos.filter(f => f.checked).map(f => f.id);
    if (fileIds.length > 0) {
      swal({
        title: "Warning!",
        text: `Move ${fileIds.length} file(s) to trash!`,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          props.moveToTrash(fileIds);
        }
      });
    }
  };

  const handleDeleteFile = () => {
    const fileIds = props.fileInfos.filter(f => f.checked).map(f => f.id);
    if (fileIds.length > 0) {
      if (fileIds.length > 0) {
        swal({
          title: "Warning!",
          text: `Remove ${fileIds.length} file(s)!`,
          icon: "warning",
          buttons: true,
          dangerMode: true
        }).then(willDelete => {
          if (willDelete) {
            props.deleteFile(fileIds);
          }
        });
      }
    }
  };

  const handleDeleteDirectory = () => {
    if (currentDirectory.isRoot) return;
    swal({
      title: "Warning!",
      text: "Delete this folder will delete all files inside it and cannot be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        props.deleteDirectory(currentDirectory.id);
      }
    });
  };

  const handleRecover = () => {
    const fileIds = props.fileInfos.filter(f => f.checked).map(f => f.id);
    if (fileIds.length > 0) {
      props.recoverFile(fileIds);
    }
  };

  return (
    <div className="optionBox" style={{ display: "block" }}>
      <div className="left" style={{ display: "block", zIndex: 4 }}>
        <div className="sorting_btn">
          <Link to="/" onClick={() => props.changeShowAddFile()}>
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
                onClick={handleDeleteFile}
              >
                <span>
                  <em className="optionBox__remove_em">Delete</em>
                </span>
              </Link>
            </React.Fragment>
          ) : null}

          {props.user.roleId === 1 ? (
            <Link to="/" onClick={() => props.changeShowCreateDirectory()}>
              <span>
                <em className="new">Create Directory</em>
              </span>
            </Link>
          ) : null}

          {props.user.roleId === 1 && !menuActive ? (
            <Link
              to="/"
              className="optionBox__remove_a"
              onClick={handleDeleteDirectory}
            >
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
              msImeMode: "active"
            }}
            type="text"
            defaultValue={inpSearch}
            placeholder="File Name/Owner"
            onChange={e => setInpSearch(e.target.value)}
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

const mapStateToProps = state => {
  return {
    user: state.userReducers,
    fileInfos: state.fileInfoReducers.data,
    systemParams: state.systemParamsReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchContents: searchStr => dispatch(searchContentsAction(searchStr)),
    moveToTrash: fileIds => dispatch(moveToTrashAction(fileIds)),
    recoverFile: fileIds => dispatch(recoverFileAction(fileIds)),
    deleteFile: fileIds => dispatch(deleteFileAction(fileIds)),
    deleteDirectory: id => dispatch(deleteDirectoryAction(id)),
    changeShowAddFile: () => dispatch(changeShowAddFileAction()),
    changeShowCreateDirectory: () => dispatch(changeShowCreateDirectoryAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionBox);
