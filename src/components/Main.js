import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Filter from "./Filter";
import AddFile from "components/register/AddFile";
import EditFile from "components/register/EditFile";
import Footer from "./Footer";
import Navbar from "./Navbar";
import OptionBox from "./OptionBox";
import MainTable from "./MainTable";
import CreateDirectory from "./CreateDirectory";
import Paging from "./Paging";
import * as exts from "utils/extTypes";
import OpenContent from "./OpenContent";
import { connect } from "react-redux";
import { getDirectoriesAction } from "store/diretory/actions";
import { getMyContentsAction } from "store/fileInfo/actions";
import { getDepartmentsAction } from "store/department/actions";

import "assets/css/main.css";

const App = (props) => {
  const [visibleLeftMenu, setVisibleLeftMenu] = useState(true);
  const [filterExt, setFilterExt] = useState(exts.ALL);

  const { showAddFile, showEditFile, showCreateDirectory, showOpenContent } =
    props.systemParams;

  const { getDirectories, getMyContents, getDepartments } = props;

  useEffect(() => {
    getDirectories();
    getMyContents();
    getDepartments();
  }, [getDepartments, getDirectories, getMyContents]);

  return (
    <React.Fragment>
      <div id="wrap">
        <Header />
        <div id="container">
          <div className="ecmWrap">
            <div
              className="ecmContent"
              style={
                visibleLeftMenu
                  ? { padding: "0px 0px 0px 222px" }
                  : { padding: "0px 0px 0px 0px" }
              }
            >
              <div className="areaL">
                <LeftMenu />
              </div>
              <div
                className="areaC"
                style={{
                  borderRightColor: "currentColor",
                  borderRightWidth: "medium",
                  borderRightStyle: "none",
                }}
              >
                <Link
                  className="btn_areaL"
                  to="/"
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

      {showAddFile ? <AddFile /> : null}
      {showEditFile ? <EditFile /> : null}
      {showCreateDirectory ? <CreateDirectory /> : null}
      {showOpenContent ? <OpenContent /> : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    systemParams: state.systemParamsReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDirectories: () => dispatch(getDirectoriesAction()),
    getMyContents: () => dispatch(getMyContentsAction()),
    getDepartments: () => dispatch(getDepartmentsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
