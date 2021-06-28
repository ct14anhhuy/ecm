import React, { lazy, Suspense, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Filter from "./Filter";
import Footer from "./Footer";
import Navbar from "./Navbar";
import OptionBox from "./OptionBox";
import MainTable from "./MainTable";
import Paging from "./Paging";
import * as exts from "utils/extTypes";
import { connect } from "react-redux";
import { getDirectoriesAction } from "store/diretory/actions";
import {
  getMyContentsAction,
  getImportantContentsAction,
  getFavoriteContentsAction,
  getSharedContentsAction,
  getDepartmentContentsAction,
  getTrashContentsAction,
  getContentsFromPathAction
} from "store/fileInfo/actions";
import { updateCurrentPageAction } from "store/pagination/actions";
import { getDepartmentsAction } from "store/department/actions";
import Loading from "./common/Loading";
import {
  ROUTE_DEPARTMENT_CONTENTS,
  ROUTE_DIRECTORY_PATH,
  ROUTE_FAVORITE_CONTENTS,
  ROUTE_IMPORTANT_CONTENTS,
  ROUTE_MY_CONTENTS,
  ROUTE_SHARED_CONTENTS,
  ROUTE_TRASH_CONTENTS
} from "utils/commonConstants";

import "assets/css/main.css";

const AddFile = lazy(() => import("components/register/AddFile"));
const EditFile = lazy(() => import("components/register/EditFile"));
const CreateDirectory = lazy(() => import("./CreateDirectory"));
const OpenContent = lazy(() => import("./OpenContent"));

const App = props => {
  const FIRST_PAGE = 1;
  const { path, id } = useParams();
  const [visibleLeftMenu, setVisibleLeftMenu] = useState(true);
  const [filterExt, setFilterExt] = useState(exts.ALL);

  const { showAddFile, showEditFile, showCreateDirectory, showOpenContent } =
    props.systemParams;

  const { getDirectories, getDepartments } = props;

  useEffect(() => {
    switch (path) {
      case ROUTE_MY_CONTENTS:
        props.getMyContents();
        break;
      case ROUTE_IMPORTANT_CONTENTS:
        props.getImportantContents();
        break;
      case ROUTE_FAVORITE_CONTENTS:
        props.getFavoriteContents();
        break;
      case ROUTE_SHARED_CONTENTS:
        props.getSharedContents();
        break;
      case ROUTE_DEPARTMENT_CONTENTS:
        props.getDepartmentContents();
        break;
      case ROUTE_TRASH_CONTENTS:
        props.getTrashContents();
        break;
      case ROUTE_DIRECTORY_PATH: {
        const validId = props.directories.filter(x => id.includes(x.id));
        if (validId.length > 0) {
          props.getContentsFromPath(id);
        }
        break;
      }
      default:
        break;
    }
    props.updateCurrentPage(FIRST_PAGE);
  }, [id, path, props]);

  useEffect(() => {
    getDirectories();
    getDepartments();
  }, [getDepartments, getDirectories]);

  return (
    <React.Fragment>
      <div id="wrap">
        <Header />
        <div id="container">
          <div className="ecmWrap">
            <div className={`ecmContent ${!visibleLeftMenu ? "hide" : null}`}>
              <div className="areaL">
                <LeftMenu />
              </div>
              <div
                className="areaC"
                style={{
                  borderRightColor: "currentColor",
                  borderRightWidth: "medium",
                  borderRightStyle: "none"
                }}
              >
                <Link
                  className="btn_areaL"
                  to="#"
                  onClick={() => setVisibleLeftMenu(!visibleLeftMenu)}
                >
                  <img
                    alt=""
                    src={
                      visibleLeftMenu
                        ? require("assets/img/main/btn/btn_areaL.png").default
                        : require("assets/img/main/btn/btn_areaL_on.png")
                            .default
                    }
                  />
                </Link>
                <div className="areaCBox">
                  <Navbar />
                  <div className="listContent">
                    <OptionBox />
                    <div className="normalList">
                      <Filter
                        filterExt={filterExt}
                        setFilterExt={setFilterExt}
                      />
                      <div>
                        <MainTable filterExt={filterExt} />
                      </div>
                      <Paging />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <Suspense fallback={<Loading />}>
        {showAddFile ? <AddFile /> : null}
        {showEditFile ? <EditFile /> : null}
        {showCreateDirectory ? <CreateDirectory /> : null}
        {showOpenContent ? <OpenContent /> : null}
      </Suspense>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    directories: state.directoryReducers.data,
    systemParams: state.systemParamsReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDirectories: () => dispatch(getDirectoriesAction()),
    getDepartments: () => dispatch(getDepartmentsAction()),
    getMyContents: () => dispatch(getMyContentsAction()),
    getImportantContents: () => dispatch(getImportantContentsAction()),
    getFavoriteContents: () => dispatch(getFavoriteContentsAction()),
    getSharedContents: () => dispatch(getSharedContentsAction()),
    getDepartmentContents: () => dispatch(getDepartmentContentsAction()),
    getTrashContents: () => dispatch(getTrashContentsAction()),
    getContentsFromPath: dirId => dispatch(getContentsFromPathAction(dirId)),
    updateCurrentPage: currentPage =>
      dispatch(updateCurrentPageAction(currentPage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
