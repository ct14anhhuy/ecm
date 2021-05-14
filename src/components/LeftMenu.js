import React, { useState } from "react";
import Frame from "react-frame-component";
import TreeView from "./TreeView";
import {
  getMyContents,
  getImportantContents,
  getFavoriteContents,
  getSharedContents,
  getDepartmentContents,
  getTrashContents,
  getContentsFromPath,
} from "store/fileInfo/actions";
import { connect } from "react-redux";

import styles from "./LeftMenu.module.css";
/* eslint import/no-webpack-loader-syntax: off */
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const LeftMenu = (props) => {
  const [selectedTab, setSelectedTab] = useState(true);

  const handleSelectedRoute = (e) => {
    props.setHeaderPath(e.target.innerText);
  };

  const handleOnSelect = (id, path) => {
    props.setHeaderPath(path);
    props.getContentsFromPath(id);
  };

  return (
    <div>
      <div className={styles.bgBoxLayout}>
        <ul className={styles.tab_more}>
          <li>
            <span
              className={selectedTab ? styles.tabon : ""}
              onClick={() => {
                setSelectedTab(true);
              }}
            >
              Shortcut
            </span>
          </li>
          <li>
            <span
              className={selectedTab ? "" : styles.tabon}
              onClick={() => {
                setSelectedTab(false);
              }}
            >
              Content Box
            </span>
          </li>
        </ul>
      </div>
      <div
        className={styles.tabCnt}
        style={selectedTab ? { display: "block" } : { display: "none" }}
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
        style={selectedTab ? { display: "none" } : { display: "block" }}
      >
        <div className={`${styles.bgBoxLayout} ${styles.select02}`}>
          <div
            className={`${styles.DivSelectyze} ${styles.grey}`}
            style={{ zIndex: 9999 }}
          >
            <span className={styles.selectyzeValue}>
              <span>POSCO ICT</span>
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
    getMyContents: () => dispatch(getMyContents()),
    getImportantContents: () => dispatch(getImportantContents()),
    getFavoriteContents: () => dispatch(getFavoriteContents()),
    getSharedContents: () => dispatch(getSharedContents()),
    getDepartmentContents: () => dispatch(getDepartmentContents()),
    getTrashContents: () => dispatch(getTrashContents()),
    getContentsFromPath: (dirId) => dispatch(getContentsFromPath(dirId)),
  };
};

export default connect(null, mapDispatchToProps)(LeftMenu);
