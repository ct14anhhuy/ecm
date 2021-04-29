import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/css/main.css";
import Header from "./Header";
import LeftMenu from "./LeftMenu";
import Filter from "./Filter";
import AddFile from "./AddFile";
import Footer from "./Footer";
import Navbar from "./Navbar";
import OptionBox from "./OptionBox";
import MainTable from "./MainTable";
import { MainContext } from "../context";
import CreateDirectory from "./CreateDirectory";
import Paging from "./Paging";
import * as exts from "../utils/extTypes";

const App = () => {
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showCreateDirectoryModal, setShowCreateDirectoryModal] = useState(
    false
  );
  const [visibleLeftMenu, setVisibleLeftMenu] = useState(true);
  const [headerPath, setHeaderPath] = useState("My Contents");
  const [filterExt, setFilterExt] = useState(exts.ALL);
  const [searchStr, setSearchStr] = useState(null);

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
                      require("../assets/img/main/btn/btn_areaL.png").default
                    }
                  />
                </Link>
                <div className="areaCBox">
                  <Navbar headerPath={headerPath} />
                  <div className="listContent">
                    <OptionBox
                      setShowAddModal={setShowAddFileModal}
                      setShowCreateDirectoryModal={setShowCreateDirectoryModal}
                      setSearchStr={setSearchStr}
                    />
                    <div className="normalList">
                      <Filter setFilterExt={setFilterExt} />
                      <div>
                        <MainTable filterExt={filterExt} searchStr={searchStr} />
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
        <MainContext.Provider value={setShowAddFileModal}>
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
    </React.Fragment>
  );
};

export default App;
