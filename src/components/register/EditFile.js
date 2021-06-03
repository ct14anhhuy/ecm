import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Frame from "react-frame-component";
import SelectFile from "./SelectFile";
import TreeView from "components/TreeView";
import RoleAssignEdit from "./RoleAssignEdit";
import swal from "sweetalert";
import { changeShowEditFileAction } from "store/systemParams/actions";
import { getFileSharedAction } from "store/employee/actions";
import { editFileAction } from "store/fileInfo/actions";
import { VIEW_PERMISSION, EDIT_PERMISSION } from "utils/commonConstants";

import styles from "assets/css/modules/AddEdit.module.css";
/* eslint import/no-webpack-loader-syntax: off */
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const EditFile = (props) => {
  const tvRef = useRef();

  const { editItem } = props.systemParams;
  const {
    owner,
    sharedEmps,
    getFileShared,
    editFile,
    fileInfos,
    changeShowEditFile,
  } = props;

  const [state, setState] = useState({
    directoryId: editItem.directoryId,
    tag: editItem.tag,
    securityLevel: editItem.securityLevel,
    file: { fileName: editItem.name },
  });

  const [showListDirectory, setShowListDirectory] = useState(false);
  const [selectedPath, setSelectedPath] = useState("");
  const [editRoles, setEditRoles] = useState([]);
  const [viewRoles, setViewRoles] = useState([]);

  const firstUpdate = useRef(true);

  const handleChangeFileName = (key, fileName) => {
    setState({ ...state, file: { ...state.file, fileName } });
  };

  useEffect(() => {
    setEditRoles(sharedEmps.filter((e) => e.roleId === EDIT_PERMISSION));
    setViewRoles(sharedEmps.filter((e) => e.roleId === VIEW_PERMISSION));
  }, [sharedEmps]);

  useEffect(() => {
    setTimeout(() => {
      const path = tvRef.current.handleGetPath();
      setSelectedPath(path);
    }, 100);
  }, []);

  useEffect(() => {
    getFileShared(editItem.id);
  }, [editItem.id, getFileShared]);

  const handleOnSelectPath = (selectedId, path, isRoot) => {
    if (isRoot) return;
    setShowListDirectory(false);
    setSelectedPath(path);
    setState({ ...state, directoryId: selectedId });
  };

  useEffect(() => {
    console.log(firstUpdate.current);
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (fileInfos.done) {
      if (!fileInfos.error) {
        swal("Success!", "Edit file success!", "success").then(() => {
          changeShowEditFile();
        });
      } else {
        swal("Failure!", "Edit file failure!", "error");
      }
    }
  }, [changeShowEditFile, fileInfos.done, fileInfos.error]);

  const handleEditFile = () => {
    const viewEmps = viewRoles.map((e) => ({
      employeeId: e.id,
      permission: VIEW_PERMISSION,
      fileId: editItem.id,
    }));
    const editEmps = editRoles.map((e) => ({
      employeeId: e.id,
      permission: EDIT_PERMISSION,
      fileId: editItem.id,
    }));
    const fileInfo = {
      id: editItem.id,
      name: state.file.fileName,
      directoryId: state.directoryId,
      securityLevel: state.securityLevel,
      tag: state.tag,
      fileShares: [...viewEmps, ...editEmps],
    };
    editFile(fileInfo);
  };

  return (
    <React.Fragment>
      <div
        className="blockUI blockOverlay"
        style={{
          margin: 0,
          padding: 0,
          border: "currentColor",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 1001,
          cursor: "default",
          opacity: "0.6",
          backgroundColor: "rgb(85, 85, 85)",
        }}
      />
      <div
        className="blockUI blockMsg blockPage"
        style={{
          margin: "-317px 0px 0px -432.5px",
          padding: 0,
          left: "50%",
          top: "50%",
          width: 865,
          height: 635,
          color: "rgb(0, 0, 0)",
          position: "absolute",
          zIndex: 1012,
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <div className="popup_layer_typeB" style={{ display: "block" }}>
          <div className={styles.wrapBody}>
            <div
              className={styles.popLayerWrap}
              style={{ margin: "0px 0px 0px -400px", width: 865, height: 635 }}
            >
              <div className={styles.header}>
                <h1 className={styles.tit}>Edit Content</h1>
                <Link
                  className={styles.close}
                  to="/"
                  onClick={() => props.changeShowEditFile()}
                >
                  <img
                    alt=""
                    src={
                      require("assets/img/contents/ecmMain/img_close.gif")
                        .default
                    }
                  />
                </Link>
              </div>
              <div className={styles.contents}>
                <div className={styles.columnBox}>
                  <p className={styles.popSubTitle}>
                    <span className={styles.subtype_2}>Content List</span>
                  </p>
                  <div className={styles.contentList}>
                    <ul className={styles.list}>
                      <SelectFile
                        file={state.file}
                        styles={styles}
                        showDeleteButton={false}
                        handleChangeFileName={handleChangeFileName}
                      />
                    </ul>
                  </div>
                  <p className={styles.popSubTitle}>
                    <span className={styles.subtype_2}>Location</span>
                  </p>
                  <div className={styles.saveBox} style={{ zIndex: "inherit" }}>
                    <span className={styles.floatL}>
                      <table className={styles.popTb}>
                        <tbody>
                          <tr>
                            <td style={{ paddingLeft: 5 }}>
                              <label className={styles.label}>
                                {selectedPath}
                              </label>
                            </td>
                            <td width={63}>
                              <Link
                                className={styles.btnBlueLine}
                                to="/"
                                onClick={() => {
                                  setShowListDirectory(!showListDirectory);
                                }}
                              >
                                <span>
                                  <em>Show All</em>
                                </span>
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </span>
                    <div
                      className={styles.treeConBox}
                      style={
                        showListDirectory
                          ? { height: 300, display: "block" }
                          : { height: 300, display: "none" }
                      }
                    >
                      <div className={styles.contentSelect}>
                        <div
                          className={`${styles.DivSelectyze}`}
                          style={{ paddingLeft: 7, zIndex: 9 }}
                        >
                          <Link className={styles.selectyzeValue} to="/">
                            <span>POSCO VST</span>
                          </Link>
                        </div>
                      </div>
                      <div
                        className={styles.treeCon}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <Frame
                          width="100%"
                          height="100%"
                          frameBorder={0}
                          head={<style>{antdStyles}</style>}
                        >
                          <TreeView
                            nodeId={editItem.directoryId}
                            ref={tvRef}
                            handleOnDoubleClick={handleOnSelectPath}
                          />
                        </Frame>
                      </div>
                    </div>
                  </div>
                  <p className={styles.popSubTitle} style={{ float: "left" }}>
                    <span className={styles.subtype_2}> Security Grade</span>
                  </p>
                  <br />
                  <div className={styles.share_set}>
                    <ol className={styles.safe_grade}>
                      <li className={styles.grade1}>
                        Specific Employee Sharing
                      </li>
                      <li className={styles.grade2}>
                        Department Employee Sharing
                      </li>
                      <li className={styles.grade3}>
                        Specific Employee Sharing
                      </li>
                      <li className={styles.grade4}>All Employee Sharing</li>
                    </ol>
                    <div className={styles.safe_btn_box}>
                      <Link
                        className={`${styles.btn_safe1} ${
                          state.securityLevel === "Secret" ? styles.on : ""
                        }`}
                        to="/"
                        onClick={(e) =>
                          setState({ ...state, securityLevel: e.target.text })
                        }
                      >
                        Secret
                      </Link>
                      <Link
                        className={`${styles.btn_safe2} ${
                          state.securityLevel === "Secret A/Not Open"
                            ? styles.on
                            : ""
                        }`}
                        to="/"
                        onClick={(e) =>
                          setState({ ...state, securityLevel: e.target.text })
                        }
                      >
                        Secret A/Not Open
                      </Link>
                      <Link
                        className={`${styles.btn_safe3} ${
                          state.securityLevel === "Secret A" ? styles.on : ""
                        }`}
                        to="/"
                        onClick={(e) =>
                          setState({ ...state, securityLevel: e.target.text })
                        }
                      >
                        Secret A
                      </Link>
                      <Link
                        className={`${styles.btn_safe4} ${
                          state.securityLevel === "Secret B/Not Open"
                            ? styles.on
                            : ""
                        }`}
                        to="/"
                        onClick={(e) =>
                          setState({ ...state, securityLevel: e.target.text })
                        }
                      >
                        Secret B/Not Open
                      </Link>
                      <Link
                        className={`${styles.btn_safe5} ${
                          state.securityLevel === "Secret B" ? styles.on : ""
                        }`}
                        to="/"
                        onClick={(e) =>
                          setState({ ...state, securityLevel: e.target.text })
                        }
                      >
                        Secret B
                      </Link>
                      <Link
                        className={`${styles.btn_safe6} ${
                          state.securityLevel === "Public" ? styles.on : ""
                        }`}
                        to="/"
                        onClick={(e) =>
                          setState({ ...state, securityLevel: e.target.text })
                        }
                      >
                        Public
                      </Link>
                    </div>
                  </div>
                  <p className={styles.popSubTitle}>
                    <span className={styles.subtype_2}>Tag</span>
                  </p>
                  <div className={styles.hashtag_inputer}>
                    <input
                      type="text"
                      value={state.tag}
                      onChange={(e) =>
                        setState({ ...state, tag: e.target.value })
                      }
                    />
                  </div>
                  <p className={styles.popSubTitle}>
                    <span className={styles.subtype_2}>Permission Setting</span>
                  </p>
                  <div>
                    <RoleAssignEdit
                      owner={owner}
                      editRoles={editRoles}
                      setEditRoles={setEditRoles}
                      viewRoles={viewRoles}
                      setViewRoles={setViewRoles}
                    />
                  </div>
                </div>
              </div>
              <p className={styles.modifyBtn}>
                <Link to="/" onClick={handleEditFile}>
                  Confirm
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    fileInfos: state.fileInfoReducers,
    owner: state.userReducers,
    systemParams: state.systemParamsReducers,
    sharedEmps: state.employeeReducers.sharedEmps,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeShowEditFile: () => dispatch(changeShowEditFileAction()),
    getFileShared: (fileId) => dispatch(getFileSharedAction(fileId)),
    editFile: (fileInfo) => dispatch(editFileAction(fileInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFile);