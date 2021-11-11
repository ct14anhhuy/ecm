import { lazy, Suspense, useEffect, useState, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Filter from "./Filter";
import Footer from "./Footer";
import Navbar from "./Navbar";
import OptionBox from "./OptionBox";
import MainTable from "./MainTable";
import Paging from "./Paging";
import * as exts from "constants/extTypes";
import { connect } from "react-redux";
import { getDirectoriesAction } from "store/directory/actions";
import { getDepartmentsAction } from "store/department/actions";
import Loading from "./common/Loading";
import { route } from "routes";

import "assets/css/main.css";

const AddFile = lazy(() => import("components/register/AddFile"));
const EditFile = lazy(() => import("components/register/EditFile"));
const CreateDirectory = lazy(() => import("./CreateDirectory"));
const OpenContent = lazy(() => import("./OpenContent"));

const App = props => {
  const { path, dirId, page } = useParams();
  const [visibleLeftMenu, setVisibleLeftMenu] = useState(true);
  const [filterExt, setFilterExt] = useState(exts.ALL);

  const { showAddFile, showEditFile, showCreateDirectory, showOpenContent } =
    props.systemParams;

  const { getDirectories, getDepartments } = props;

  useEffect(() => {
    if (props.directories.length === 0) return;
    route(path, dirId, page, props.directories);
  }, [dirId, page, path, props.directories]);

  useEffect(() => {
    getDirectories();
    getDepartments();
  }, [getDepartments, getDirectories]);

  return (
    <Fragment>
      <div id="wrap">
        <Header />
        <div id="container">
          <div className="ecmWrap">
            <div className={`ecmContent ${!visibleLeftMenu ? "hide" : ""}`}>
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
    </Fragment>
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
    getDepartments: () => dispatch(getDepartmentsAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
