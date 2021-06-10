import React, { useEffect, useRef, useState } from "react";
import Frame from "react-frame-component";
import { Link } from "react-router-dom";
import TreeView from "./TreeView";
import { connect } from "react-redux";
import { createDirectoryAction } from "store/diretory/actions";
import { changeShowCreateDirectoryAction } from "store/systemParams/actions";
import swal from "sweetalert";

import styles from "assets/css/modules/CreateDirectory.module.css";
/* eslint import/no-webpack-loader-syntax: off */
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const CreateDirectory = props => {
  const [showListDirectory, setShowListDirectory] = useState(false);
  const [selectedPath, setSelectedPath] = useState({
    id: null,
    path: ""
  });
  const [path, setPath] = useState("");

  const firstUpdate = useRef(true);

  const handleOnSelectPath = (selectedId, path) => {
    setShowListDirectory(false);
    setSelectedPath({ id: selectedId, path: path });
  };

  const handleCreateDirectory = () => {
    if (!selectedPath.id || !path) {
      swal("Error!", "Check your input!", "error");
      return;
    }
    const directory = { parentId: selectedPath.id, name: path };
    props.createDirectory(directory);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (props.directories.done) {
      if (!props.directories.error) {
        swal("Success!", "Create directory success!", "success").then(() => {
          props.changeShowCreateDirectory();
        });
      } else {
        swal("Failure!", "Create directory failure!", "error");
      }
    }
  }, [props]);

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
      ></div>
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
          cursor: "wait",
          backgroundColor: "rgb(255, 255, 255)"
        }}
      >
        <div
          className={styles.popup_layer_typeB}
          style={{ display: "block", cursor: "default" }}
        >
          <div
            className={styles.popLayerWrap}
            style={{ margin: "-317px 0px 0px -432.5px", width: 865 }}
          >
            <div className={styles.header}>
              <h1 className={styles.tit}>Create Directory</h1>
              <Link
                className={styles.close}
                to="/"
                onClick={() => props.changeShowCreateDirectory()}
              >
                <img
                  alt=""
                  src={
                    require("assets/img/contents/ecmMain/img_close.gif").default
                  }
                />
              </Link>
            </div>
            <div className={styles.contents}>
              <div className={styles.columnBox}>
                <p className={styles.popSubTitle}>
                  <span className={styles.subtype_2}>Directory Name</span>
                </p>
                <table className={styles.popTb} style={{ marginBottom: 10 }}>
                  <colgroup>
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <div className={styles.innerPad}>
                          <input
                            className={styles.baseInput}
                            style={{ width: "100%", height: 25 }}
                            type="text"
                            value={path}
                            onChange={e => setPath(e.target.value)}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className={styles.popSubTitle}>
                  <span className={styles.subtype_2}>Path</span>
                </p>
                <div className={styles.saveBox}>
                  <span className={styles.floatL}>
                    <table className={styles.popTb}>
                      <tbody>
                        <tr>
                          <td style={{ paddingLeft: 5 }}>
                            <label className={styles.label}>
                              {selectedPath.path}
                            </label>
                          </td>
                          <td width={63}>
                            <Link
                              className={styles.latelyHistoryBtn}
                              to="/"
                              onClick={() =>
                                setShowListDirectory(!showListDirectory)
                              }
                            >
                              <span>Show All</span>
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
                        className={`${styles.DivSelectyze} ${styles.grey}`}
                        style={{ paddingLeft: 7, zIndex: 9 }}
                      >
                        <Link className={styles.selectyzeValue} to="/">
                          <span>POSCO VST</span>
                        </Link>
                      </div>
                    </div>
                    <div className={styles.treeCon} style={{ height: "100%" }}>
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
              </div>
            </div>
            <p className={styles.modifyBtn}>
              <Link
                to="/"
                style={{
                  background: `url(${
                    require("assets/img/popup/bg/bg_modifyBtn.gif").default
                  }) no-repeat left top #2768b2`
                }}
                onClick={handleCreateDirectory}
              >
                Create
              </Link>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    directories: state.directoryReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createDirectory: directory => dispatch(createDirectoryAction(directory)),
    changeShowCreateDirectory: () => dispatch(changeShowCreateDirectoryAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDirectory);
