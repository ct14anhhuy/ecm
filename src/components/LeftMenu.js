import { useEffect, useState } from "react";
import Frame from "react-frame-component";
import TreeView from "./TreeView";
import { Link, NavLink, useHistory } from "react-router-dom";
import {
  changeHeaderPathAction,
  changeMenuActiveAction,
  changeCurrentDirectoryAction
} from "store/systemParams/actions";
import { connect } from "react-redux";

import styles from "assets/css/modules/LeftMenu.module.css";
/* eslint import/no-webpack-loader-syntax: off */
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const LeftMenu = props => {
  const history = useHistory();

  const {
    menuActive,
    changeMenuActive,
    changeCurrentDirectory,
    changeHeaderPath
  } = props;
  const [selectedDirectory, setSelectedDirectory] = useState({
    id: 0,
    isRoot: true
  });

  const handleSelectedRoute = e => {
    changeHeaderPath(e.target.innerText);
  };

  const handleOnSelect = (id, path, isRoot) => {
    changeHeaderPath(path);
    setSelectedDirectory({ id, isRoot });
    history.push(`/ecm/p/${id}`);
  };

  useEffect(() => {
    if (menuActive) {
      changeCurrentDirectory(0, true);
    } else {
      const { id, isRoot } = selectedDirectory;
      changeCurrentDirectory(id, isRoot);
    }
  }, [changeCurrentDirectory, menuActive, selectedDirectory]);

  return (
    <div>
      <div className={styles.bgBoxLayout}>
        <ul className={styles.tab_more}>
          <li>
            <Link
              to="#"
              className={menuActive ? styles.tabon : ""}
              onClick={() => changeMenuActive(true)}
            >
              Shortcut
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className={menuActive ? "" : styles.tabon}
              onClick={() => changeMenuActive(false)}
            >
              Content Box
            </Link>
          </li>
        </ul>
      </div>
      <div
        className={styles.tabCnt}
        style={menuActive ? { display: "block" } : { display: "none" }}
      >
        <ul className={styles.btnBox}>
          <li>
            <NavLink
              activeClassName={styles.active}
              to="/ecm/my-contents"
              className={styles.btn_01}
              onClick={e => {
                handleSelectedRoute(e);
              }}
            >
              My Contents
            </NavLink>
          </li>
          <li className={styles.newWin}>
            <NavLink
              activeClassName={styles.active}
              to="/ecm/impotant-contents"
              className={styles.btn_30}
              onClick={e => {
                handleSelectedRoute(e);
              }}
            >
              Impotant Contents
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.active}
              to="/ecm/favorite-contents"
              className={styles.btn_06}
              onClick={e => {
                handleSelectedRoute(e);
              }}
            >
              Favorite Contents
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.active}
              to="/ecm/shared-contents"
              className={styles.btn_07}
              onClick={e => {
                handleSelectedRoute(e);
              }}
            >
              Shared Contents
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.active}
              to="/ecm/departments-contents"
              className={styles.btn_16}
              onClick={e => {
                handleSelectedRoute(e);
              }}
            >
              Departments Contents
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.active}
              to="/ecm/trash"
              className={styles.btn_rcb}
              onClick={e => {
                handleSelectedRoute(e);
              }}
            >
              Trash
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        className={styles.tabCnt}
        style={menuActive ? { display: "none" } : { display: "block" }}
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
                height="97%"
                scrolling="auto"
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

const mapStateToProps = state => {
  return {
    menuActive: state.systemParamsReducers.menuActive
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeHeaderPath: path => dispatch(changeHeaderPathAction(path)),
    changeMenuActive: shortcutActive =>
      dispatch(changeMenuActiveAction(shortcutActive)),
    changeCurrentDirectory: (id, isRoot) =>
      dispatch(changeCurrentDirectoryAction(id, isRoot))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
