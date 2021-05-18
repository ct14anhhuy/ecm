import { useRef, useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "context";
import TreeView from "components/TreeView";
import { connect } from "react-redux";
import SelectFile from "./SelectFile";
import Frame from "react-frame-component";
import RoleAssignEdit from "./RoleAssignEdit";

import styles from "./AddFileFrame.module.css";

/* eslint import/no-webpack-loader-syntax: off */
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const AddFileFrame = (props) => {
  const fileRef = useRef();
  const contextData = useContext(MainContext);

  const [state, setState] = useState({
    owner: props.owner,
    tag: "#",
    directoryId: null,
    securityLevel: "Public",
    files: [],
  });
  const [showListDirectory, setShowListDirectory] = useState(false);
  const [selectedPath, setSelectedPath] = useState("");

  const handleChangeFileName = (key, fileName) => {
    const arr = [...state.files];
    const idEdit = arr.findIndex((f) => f.key === key);
    arr[idEdit] = { ...state.files[idEdit], name: fileName };
    setState({ ...state, files: arr });
  };

  const handleDeleteFile = (key) => {
    const arr = state.files.filter((f) => f.key !== key);
    setState({
      ...state,
      files: arr,
    });
  };

  const handleSelectFile = (e) => {
    if (!e.target.files[0]) return;
    setState({
      ...state,
      files: [
        ...state.files,
        Object.assign(e.target.files[0], { key: new Date().getTime() }),
      ],
    });
  };

  const handleOnSelectPath = (selectedId, path) => {
    setShowListDirectory(false);
    setSelectedPath(path);
    setState({ ...state, directoryId: selectedId });
  };

  return (
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
            onClick={() => contextData.setShowAddFileModal(false)}
          >
            <img
              alt=""
              src={require("assets/img/contents/ecmMain/img_close.gif").default}
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
                onChange={handleSelectFile}
              />
            </p>
            <div className={styles.contentList}>
              <ul className={styles.list}>
                {state.files.map((file) => (
                  <SelectFile
                    key={file.key}
                    file={file}
                    styles={styles}
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
                        <label className={styles.label}>{selectedPath}</label>
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
                <li className={styles.grade1}>Specific Employee Sharing</li>
                <li className={styles.grade2}>Department Employee Sharing</li>
                <li className={styles.grade3}>Specific Employee Sharing</li>
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
                    state.securityLevel === "Secret A/Not Open" ? styles.on : ""
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
                    state.securityLevel === "Secret B/Not Open" ? styles.on : ""
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
                onChange={(e) => {
                  setState({ ...state, tag: e.target.value });
                }}
              />
            </div>
            <p className={styles.popSubTitle}>
              <span className={styles.subtype_2}>Permission Setting</span>
            </p>
            <div>
              <RoleAssignEdit owner={state.owner} />
            </div>
          </div>
        </div>
        <p className={styles.modifyBtn}>
          <Link to="/">Add</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    owner: state.userReducers,
  };
};

export default connect(mapStateToProps, null)(AddFileFrame);
