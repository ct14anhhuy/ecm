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

/* eslint import/no-webpack-loader-syntax: off */
import globalStyles from "!!raw-loader!assets/css/global.css";
import layoutStyles from "!!raw-loader!assets/css/layout.css";
import bbsStyles from "!!raw-loader!assets/css/bbs.css";
import leftMenuStyles from "!!raw-loader!./LeftMenu.css";
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

  const bodyFrame = (
    <div>
      <div className="bgBoxLayout">
        <ul className="tab_more">
          <li>
            <span
              className={selectedTab ? "tabon" : ""}
              onClick={() => {
                setSelectedTab(true);
              }}
            >
              Shortcut
            </span>
          </li>
          <li>
            <span
              className={selectedTab ? "" : "tabon"}
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
        className="tabCnt"
        style={selectedTab ? { display: "block" } : { display: "none" }}
      >
        <ul className="btnBox">
          <li
            style={{
              background: `url(${
                require("assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <span
              className="btn_01"
              style={{
                background: `url(${
                  require("assets/img/main/left/ico_go_cnt01.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getMyContents();
              }}
            >
              My Contents
            </span>
          </li>
          <li
            className="newWin"
            style={{
              background: `url(${
                require("assets/img/main/left/bg_go_newwin_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <span
              className="btn_30"
              style={{
                background: `url(${
                  require("assets/img/main/left/ico_go_cnt30.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getImportantContents();
              }}
            >
              Impotant Contents
            </span>
          </li>
          <li
            style={{
              background: `url(${
                require("assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <span
              className="btn_06"
              style={{
                background: `url(${
                  require("assets/img/main/left/ico_go_cnt26.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getFavoriteContents();
              }}
            >
              Favorite Contents
            </span>
          </li>
          <li
            style={{
              background: `url(${
                require("assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <span
              className="btn_07"
              style={{
                background: `url(${
                  require("assets/img/main/left/ico_go_cnt27.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getSharedContents();
              }}
            >
              Shared Contents
            </span>
          </li>
          <li
            style={{
              background: `url(${
                require("assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <span
              className="btn_16"
              style={{
                background: `url(${
                  require("assets/img/main/left/ico_go_cnt16.png").default
                }) 15px center no-repeat`,
              }}
              onClick={(e) => {
                handleSelectedRoute(e);
                props.getDepartmentContents();
              }}
            >
              Departments Contents
            </span>
          </li>
          <li
            style={{
              background: `url(${
                require("assets/img/main/left/bg_go_cnt.png").default
              }) left top no-repeat`,
            }}
          >
            <span
              className="btn_rcb"
              style={{
                background: `url(${
                  require("assets/img/main/left/ico_go_rcb.png").default
                }) 15px center no-repeat`,
              }}
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
