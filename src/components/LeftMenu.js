import React, { useState } from "react";
import Frame from "react-frame-component";
import { Link } from "react-router-dom";
import TreeView from "./TreeView";

/* eslint import/no-webpack-loader-syntax: off */
import globalStyles from "!!raw-loader!../assets/css/global.css";
import layoutStyles from "!!raw-loader!../assets/css/layout.css";
import bbsStyles from "!!raw-loader!../assets/css/bbs.css";
import leftMenuStyles from "!!raw-loader!./LeftMenu.css";
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const LeftMenu = (props) => {
  const [selectedTab, setSelectedTab] = useState(true);

  const handleSelectedRoute = (e) => {
    props.setHeaderPath(e.target.text);
  };

  const handleOnSelect = (path) => {
    props.setHeaderPath(path);
  };

  const bodyFrame = (
    <div>
      <div className="bgBoxLayout">
        <ul className="tab_more">
          <li>
            <Link
              className={selectedTab ? "tabon" : ""}
              to="/"
              onClick={() => {
                setSelectedTab(true);
              }}
            >
              Shortcut
            </Link>
          </li>
          <li>
            <Link
              className={selectedTab ? "" : "tabon"}
              to="/"
              onClick={() => {
                setSelectedTab(false);
              }}
            >
              Content Box
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="tabCnt"
        style={selectedTab ? { display: "block" } : { display: "none" }}
      >
        <ul className="btnBox">
          <li
            style={{
              background: `url(${
                require("../assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <Link
              className="btn_01"
              to="/"
              style={{
                background: `url(${
                  require("../assets/img/main/left/ico_go_cnt01.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => handleSelectedRoute(e)}
            >
              My Contents
            </Link>
          </li>
          <li
            className="newWin"
            style={{
              background: `url(${
                require("../assets/img/main/left/bg_go_newwin_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <Link
              className="btn_30"
              to="/"
              style={{
                background: `url(${
                  require("../assets/img/main/left/ico_go_cnt30.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => handleSelectedRoute(e)}
            >
              Impotant Contents
            </Link>
          </li>
          <li
            style={{
              background: `url(${
                require("../assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <Link
              className="btn_06"
              to="/"
              style={{
                background: `url(${
                  require("../assets/img/main/left/ico_go_cnt26.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => handleSelectedRoute(e)}
            >
              Favorite Contents
            </Link>
          </li>
          <li
            style={{
              background: `url(${
                require("../assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <Link
              className="btn_07"
              to="/"
              style={{
                background: `url(${
                  require("../assets/img/main/left/ico_go_cnt27.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => handleSelectedRoute(e)}
            >
              Shared Contents
            </Link>
          </li>
          <li
            style={{
              background: `url(${
                require("../assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <Link
              className="btn_16"
              to="/"
              style={{
                background: `url(${
                  require("../assets/img/main/left/ico_go_cnt16.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => handleSelectedRoute(e)}
            >
              Departments Contents
            </Link>
          </li>
          <li
            style={{
              background: `url(${
                require("../assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <Link
              className="btn_rcb"
              to="/"
              style={{
                background: `url(${
                  require("../assets/img/main/left/ico_go_rcb.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => handleSelectedRoute(e)}
            >
              Trash
            </Link>
          </li>
        </ul>
      </div>
      <div
        className="tabCnt"
        style={selectedTab ? { display: "none" } : { display: "block" }}
      >
        <div className="bgBoxLayout select02">
          <div className="DivSelectyze grey" style={{ zIndex: 9999 }}>
            <span className="selectyzeValue">
              <span>POSCO ICT</span>
            </span>
          </div>
          <div className="myconList">
            <div className="treeFldConBox">
              <TreeView handleOnSelect={handleOnSelect} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Frame
      width="100%"
      height={988}
      scrolling="no"
      frameBorder="0"
      head={
        <style>
          {antdStyles}
          {globalStyles}
          {layoutStyles}
          {bbsStyles}
          {leftMenuStyles}
        </style>
      }
    >
      {bodyFrame}
    </Frame>
  );
};

export default LeftMenu;
