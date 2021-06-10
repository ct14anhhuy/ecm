import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Frame from "react-frame-component";
import SelectFile from "./SelectFile";
import TreeView from "components/TreeView";
import RoleAssignEdit from "./RoleAssignEdit";
import { fileToByteArray } from "utils/fileHelper";
import { addFilesAction } from "store/fileInfo/actions";
import { changeShowAddFileAction } from "store/systemParams/actions";
import { EDIT_PERMISSION, VIEW_PERMISSION } from "utils/commonConstants";
import swal from "sweetalert";

import styles from "assets/css/modules/AddEdit.module.css";
/* eslint import/no-webpack-loader-syntax: off */
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const AddFile = props => {
  const fileRef = useRef();
  const { changeShowAddFile, addFiles, fileInfos } = props;

  const [state, setState] = useState({
    owner: props.owner,
    tag: "#",
    directoryId: null,
    securityLevel: "Public",
    files: []
  });

  const [showListDirectory, setShowListDirectory] = useState(false);
  const [selectedPath, setSelectedPath] = useState("");
  const [editRoles, setEditRoles] = useState([]);
  const [viewRoles, setViewRoles] = useState([]);

  const firstUpdate = useRef(true);

  const handleChangeFileName = (key, fileName) => {
    const arr = [...state.files];
    const idEdit = arr.findIndex(f => f.key === key);
    arr[idEdit] = { ...arr[idEdit], fileName };
    setState({ ...state, files: [...arr] });
  };

  const handleDeleteFile = key => {
    const arr = state.files.filter(f => f.key !== key);
    setState({
      ...state,
      files: arr
    });
  };

  const handleSelectFile = e => {
    if (!e.target.files[0]) return;
    setState({
      ...state,
      files: [
        ...state.files,
        {
          data: e.target.files[0],
          key: new Date().getTime(),
          fileName: e.target.files[0].name
        }
      ]
    });
  };

  const handleOnSelectPath = (selectedId, path, isRoot) => {
    if (isRoot) return;
    setShowListDirectory(false);
    setSelectedPath(path);
    setState({ ...state, directoryId: selectedId });
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (fileInfos.done) {
      if (!fileInfos.error) {
        swal("Success!", "Add file success!", "success").then(() => {
          changeShowAddFile();
        });
      } else {
        swal("Failure!", "Add file failure!", "error");
      }
    }
  }, [changeShowAddFile, fileInfos.done, fileInfos.error]);

  const handleAddFiles = async () => {
    let fileInfos = [];
    let viewEmps = viewRoles.map(e => ({
      employeeId: e.id,
      permission: VIEW_PERMISSION
    }));
    let editEmps = editRoles.map(e => ({
      employeeId: e.id,
      permission: EDIT_PERMISSION
    }));
    const fileShares = [...viewEmps, ...editEmps];
    if (state.files) {
      const { owner, tag, directoryId, securityLevel } = state;
      fileInfos = await Promise.all(
        state.files.map(async file => ({
          name: file.fileName,
          owner: owner.id,
          tag,
          directoryId,
          securityLevel,
          fileShares,
          fileData: await fileToByteArray(file.data)
        }))
      );
    }
    addFiles(fileInfos);
  };

  const handleChangeSecurityLevel = e => {
    setState({ ...state, securityLevel: e.target.text });
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
          backgroundColor: "rgb(85, 85, 85)"
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
          backgroundColor: "rgb(255, 255, 255)"
        }}
      >
        <div className="popup_layer_typeB" style={{ display: "block" }}>
          <div className={styles.wrapBody}>
            <div
              className={styles.popLayerWrap}
              style={{ margin: "0px 0px 0px -400px", width: 865, height: 635 }}
            >
              <div className={styles.header}>
                <h1 className={styles.tit}>Add Content</h1>
                <Link
                  className={styles.close}
                  to="/"
                  onClick={() => changeShowAddFile()}
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
                    <span className={styles.floatR}>
                      <Link
                        className={styles.btnBlack}
                        to="/"
                        onClick={() => fileRef.current.click()}
                      >
                        <span>
                          <b>+</b> Add Content
                        </span>
                      </Link>
                    </span>
                    <input
                      type="file"
                      id="file"
                      ref={fileRef}
                      style={{ display: "none" }}
                      accept=".doc,.docx,.xls,.xlsx,.xlsm,.csv,.ppt,.pptx,.pdf,.jpg,.gif,.png,.jpeg"
                      onChange={handleSelectFile}
                    />
                  </p>
                  <div className={styles.contentList}>
                    <ul className={styles.list}>
                      {state.files.map(file => (
                        <SelectFile
                          key={file.key}
                          file={file}
                          styles={styles}
                          showDeleteButton={true}
                          handleChangeFileName={handleChangeFileName}
                          handleDeleteFile={handleDeleteFile}
                        />
                      ))}
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
                                onClick={() =>
                                  setShowListDirectory(!showListDirectory)
                                }
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
                          <TreeView handleOnDoubleClick={handleOnSelectPath} />
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
                        onClick={handleChangeSecurityLevel}
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
                        onClick={handleChangeSecurityLevel}
                      >
                        Secret A/Not Open
                      </Link>
                      <Link
                        className={`${styles.btn_safe3} ${
                          state.securityLevel === "Secret A" ? styles.on : ""
                        }`}
                        to="/"
                        onClick={handleChangeSecurityLevel}
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
                        onClick={handleChangeSecurityLevel}
                      >
                        Secret B/Not Open
                      </Link>
                      <Link
                        className={`${styles.btn_safe5} ${
                          state.securityLevel === "Secret B" ? styles.on : ""
                        }`}
                        to="/"
                        onClick={handleChangeSecurityLevel}
                      >
                        Secret B
                      </Link>
                      <Link
                        className={`${styles.btn_safe6} ${
                          state.securityLevel === "Public" ? styles.on : ""
                        }`}
                        to="/"
                        onClick={handleChangeSecurityLevel}
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
                      onChange={e =>
                        setState({ ...state, tag: e.target.value })
                      }
                    />
                  </div>
                  <p className={styles.popSubTitle}>
                    <span className={styles.subtype_2}>Permission Setting</span>
                  </p>
                  <div>
                    <RoleAssignEdit
                      owner={state.owner}
                      editRoles={editRoles}
                      setEditRoles={setEditRoles}
                      viewRoles={viewRoles}
                      setViewRoles={setViewRoles}
                    />
                  </div>
                </div>
              </div>
              <p className={styles.modifyBtn}>
                <Link to="/" onClick={handleAddFiles}>
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

const mapStateToProps = state => {
  return {
    fileInfos: state.fileInfoReducers,
    owner: state.userReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addFiles: fileInfos => dispatch(addFilesAction(fileInfos)),
    changeShowAddFile: () => dispatch(changeShowAddFileAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFile);
