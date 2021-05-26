import React from "react";
import Frame from "react-frame-component";
import TreeView from "./TreeView";
import {
  getMyContentsAction,
  getImportantContentsAction,
  getFavoriteContentsAction,
  getSharedContentsAction,
  getDepartmentContentsAction,
  getTrashContentsAction,
  getContentsFromPathAction,
} from "store/fileInfo/actions";
import { changeHeaderPathAction } from "store/systemParams/actions";
import { connect } from "react-redux";

import styles from "assets/css/modules/LeftMenu.module.css";
/* eslint import/no-webpack-loader-syntax: off */
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const LeftMenu = (props) => {
  const { shortcutBox, setshortcutBox } = props;

  const handleSelectedRoute = (e) => {
    props.changeHeaderPath(e.target.innerText);
  };

  const handleOnSelect = (id, path) => {
    props.changeHeaderPath(path);
    props.getContentsFromPath(id);
  };

  return (
    <div>
      <div className={styles.bgBoxLayout}>
        <ul className={styles.tab_more}>
          <li>
            <span
              className={shortcutBox ? styles.tabon : ""}
              onClick={() => setshortcutBox(true)}
            >
              Shortcut
            </span>
          </li>
          <li>
            <span
              className={shortcutBox ? "" : styles.tabon}
              onClick={() => setshortcutBox(false)}
            >
              Content Box
            </span>
          </li>
        </ul>
      </div>
      <div
        className={styles.tabCnt}
        style={shortcutBox ? { display: "block" } : { display: "none" }}
      >
        <ul className={styles.btnBox}>
          <li>
            <span
              className={styles.btn_01}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getMyContents();
              }}
            >
              My Contents
            </span>
          </li>
          <li className={styles.newWin}>
            <span
              className={styles.btn_30}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getImportantContents();
              }}
            >
              Impotant Contents
            </span>
          </li>
          <li>
            <span
              className={styles.btn_06}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getFavoriteContents();
              }}
            >
              Favorite Contents
            </span>
          </li>
          <li>
            <span
              className={styles.btn_07}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getSharedContents();
              }}
            >
              Shared Contents
            </span>
          </li>
          <li>
            <span
              className={styles.btn_16}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getDepartmentContents();
              }}
            >
              Departments Contents
            </span>
          </li>
          <li>
            <span
              className={styles.btn_rcb}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getTrashContents();
              }}
            >
              Trash
            </span>
          </li>
        </ul>
      </div>
      <div
        className={styles.tabCnt}
        style={shortcutBox ? { display: "none" } : { display: "block" }}
      >
        <div className={`${styles.bgBoxLayout} ${styles.select02}`}>
          <div
            className={`${styles.DivSelectyze} ${styles.grey}`}
            style={{ zIndex: 9999 }}
          >
            <span className={styles.selectyzeValue}>
              <span>POSCO VST</span>
            </span>
          </div>
          <div className={styles.myconList}>
            <div className={styles.treeFldConBox}>
              <Frame
                width="100%"
                height="100%"
                scrolling="no"
                frameBorder="0"
                head={<style>{antdStyles}</style>}
              >
                <TreeView handleOnSelect={handleOnSelect} />
              </Frame>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyContents: () => dispatch(getMyContentsAction()),
    getImportantContents: () => dispatch(getImportantContentsAction()),
    getFavoriteContents: () => dispatch(getFavoriteContentsAction()),
    getSharedContents: () => dispatch(getSharedContentsAction()),
    getDepartmentContents: () => dispatch(getDepartmentContentsAction()),
    getTrashContents: () => dispatch(getTrashContentsAction()),
    getContentsFromPath: (dirId) => dispatch(getContentsFromPathAction(dirId)),
    changeHeaderPath: (path) => dispatch(changeHeaderPathAction(path)),
  };
};

export default connect(null, mapDispatchToProps)(LeftMenu);
