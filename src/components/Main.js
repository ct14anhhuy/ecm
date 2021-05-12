import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "assets/css/main.css";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Filter from "./Filter";
import AddFile from "./AddFile";
import Footer from "./Footer";
import Navbar from "./Navbar";
import OptionBox from "./OptionBox";
import MainTable from "./MainTable";
import { MainContext } from "context";
import CreateDirectory from "./CreateDirectory";
import Paging from "./Paging";
import * as exts from "utils/extTypes";
import OpenContent from "./OpenContent";
import { connect } from "react-redux";
import { getDirectories } from "store/diretory/actions";
import { getMyContents } from "store/fileInfo/actions";

const App = (props) => {
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showCreateDirectoryModal, setShowCreateDirectoryModal] =
    useState(false);
  const [showOpenContent, setShowOpenContent] = useState(false);
  const [visibleLeftMenu, setVisibleLeftMenu] = useState(true);
  const [headerPath, setHeaderPath] = useState("My Contents");
  const [filterExt, setFilterExt] = useState(exts.ALL);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    props.getDirectories();
    props.getMyContents();
  }, [props]);

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
                <LeftMenu setHeaderPath={setHeaderPath} />
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
                  onClick={() => {
                    setVisibleLeftMenu(!visibleLeftMenu);
                  }}
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
                  <Navbar headerPath={headerPath} />
                  <div className="listContent">
                    <OptionBox
                      setShowAddModal={setShowAddFileModal}
                      setShowCreateDirectoryModal={setShowCreateDirectoryModal}
                    />
                    <div className="normalList">
                      <Filter setFilterExt={setFilterExt} />
                      <div>
                        <MainContext.Provider
                          value={{ setSelectedItem, setShowOpenContent }}
                        >
                          <MainTable filterExt={filterExt} />
                        </MainContext.Provider>
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

      {showAddFileModal ? (
        <MainContext.Provider value={{ setShowAddFileModal }}>
          <AddFile />
        </MainContext.Provider>
      ) : (
        ""
      )}

      {showCreateDirectoryModal ? (
        <CreateDirectory
          setShowCreateDirectoryModal={setShowCreateDirectoryModal}
        />
      ) : (
        ""
      )}

      {showOpenContent ? (
        <OpenContent
          selectedItem={selectedItem}
          setShowOpenContent={setShowOpenContent}
        />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDirectories: () => dispatch(getDirectories()),
    getMyContents: () => dispatch(getMyContents()),
  };
};

export default connect(null, mapDispatchToProps)(App);
