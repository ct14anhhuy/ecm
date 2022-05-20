import { useEffect, useState } from "react";
import Frame from "react-frame-component";
import TreeView from "./TreeView";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import {
  changeHeaderPathAction,
  changeMenuActiveAction,
  changeCurrentDirectoryAction
} from "store/systemParams/actions";
import { connect } from "react-redux";

import styles from "assets/css/modules/LeftMenu.module.css";
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";
import {
  ROUTE_DEPARTMENT_CONTENTS,
  ROUTE_DIRECTORY_PATH,
  ROUTE_FAVORITE_CONTENTS,
  ROUTE_IMPORTANT_CONTENTS,
  ROUTE_MY_CONTENTS,
  ROUTE_SHARED_CONTENTS,
  ROUTE_TRASH_CONTENTS
} from "constants/routePaths";

const LeftMenu = props => {
  const history = useHistory();
  const { path } = useParams();

  const { menuActive, changeMenuActive, changeCurrentDirectory, changeHeaderPath } =
    props;

  const [selectedDirectory, setSelectedDirectory] = useState({
    id: 0,
    isRoot: true
  });

  const handleOnSelect = (id, path, isRoot) => {
    changeHeaderPath(path);
    setSelectedDirectory({ id, isRoot });
    history.push(`/ecm/${ROUTE_DIRECTORY_PATH}/${id}/1`);
  };

  const getNavLinkClass = urlPath => {
    return path === urlPath ? styles.on : null;
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
          <li className={getNavLinkClass(ROUTE_MY_CONTENTS)}>
            <NavLink
              activeClassName={styles.active}
              to={`/ecm/${ROUTE_MY_CONTENTS}/1`}
              className={styles.btn_01}
              onClick={e => changeHeaderPath(e.target.innerText)}
            >
              My Contents
            </NavLink>
          </li>
          <li className={getNavLinkClass(ROUTE_IMPORTANT_CONTENTS)}>
            <NavLink
              activeClassName={styles.active}
              to={`/ecm/${ROUTE_IMPORTANT_CONTENTS}/1`}
              className={styles.btn_30}
              onClick={e => changeHeaderPath(e.target.innerText)}
            >
              Impotant Contents
            </NavLink>
          </li>
          <li className={getNavLinkClass(ROUTE_FAVORITE_CONTENTS)}>
            <NavLink
              activeClassName={styles.active}
              to={`/ecm/${ROUTE_FAVORITE_CONTENTS}/1`}
              className={styles.btn_06}
              onClick={e => changeHeaderPath(e.target.innerText)}
            >
              Favorite Contents
            </NavLink>
          </li>
          <li className={getNavLinkClass(ROUTE_SHARED_CONTENTS)}>
            <NavLink
              activeClassName={styles.active}
              to={`/ecm/${ROUTE_SHARED_CONTENTS}/1`}
              className={styles.btn_07}
              onClick={e => changeHeaderPath(e.target.innerText)}
            >
              Shared Contents
            </NavLink>
          </li>
          <li className={getNavLinkClass(ROUTE_DEPARTMENT_CONTENTS)}>
            <NavLink
              activeClassName={styles.active}
              to={`/ecm/${ROUTE_DEPARTMENT_CONTENTS}/1`}
              className={styles.btn_16}
              onClick={e => changeHeaderPath(e.target.innerText)}
            >
              Departments Contents
            </NavLink>
          </li>
          <li className={getNavLinkClass(ROUTE_TRASH_CONTENTS)}>
            <NavLink
              activeClassName={styles.active}
              to={`/ecm/${ROUTE_TRASH_CONTENTS}/1`}
              className={styles.btn_rcb}
              onClick={e => changeHeaderPath(e.target.innerText)}
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
    changeMenuActive: shortcutActive => dispatch(changeMenuActiveAction(shortcutActive)),
    changeCurrentDirectory: (id, isRoot) =>
      dispatch(changeCurrentDirectoryAction(id, isRoot))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
