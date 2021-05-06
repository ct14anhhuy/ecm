import React, { useState } from "react";
import Frame from "react-frame-component";
import { Link } from "react-router-dom";
import TreeView from "./TreeView";

/* eslint import/no-webpack-loader-syntax: off */
import globalStyles from "!!raw-loader!assets/css/global.css";
import layoutStyles from "!!raw-loader!assets/css/layout.css";
import bbsStyles from "!!raw-loader!assets/css/bbs.css";
import ecmPopupStyles from "!!raw-loader!assets/css/ecm_popup.css";
import calendaStyles from "!!raw-loader!assets/css/calenda.css";
import createDirectoryStyles from "!!raw-loader!./CreateDirectory.css";
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const CreateDirectory = (props) => {
  const [showListDirectory, setShowListDirectory] = useState(false);
  const [selectedPath, setSelectedPath] = useState({
    id: null,
    path: "",
  });

  const handleOnSelectPath = (selectedId, path) => {
    setShowListDirectory(false);
    setSelectedPath({ id: selectedId, path: path });
  };

  const body = (
    <div
      className="popLayerWrap"
      style={{ margin: "-318px 0px 0px -400px", width: 865 }}
    >
      <div className="header">
        <h1 className="tit">Create Directory</h1>
        <Link
          className="close"
          to="/"
          onClick={() => props.setShowCreateDirectoryModal(false)}
        >
          <img
            alt=""
            src={
              require("assets/img/contents/ecmMain/img_close.gif").default
            }
          />
        </Link>
      </div>
      <div className="contents">
        <div className="columnBox">
          <p className="popSubTitle">
            <span className="subtype_2">Directory Name</span>
          </p>
          <table className="popTb" style={{ marginBottom: 10 }}>
            <colgroup>
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <div className="innerPad">
                    <input
                      className="baseInput"
                      style={{ width: "100%", height: 25 }}
                      type="text"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="popSubTitle">
            <span className="subtype_2">Path</span>
          </p>
          <div className="saveBox">
            <span className="floatL">
              <table className="popTb">
                <tbody>
                  <tr>
                    <td style={{ paddingLeft: 5 }}>
                      <label className="label">{selectedPath.path}</label>
                    </td>
                    <td width={63}>
                      <Link
                        className="latelyHistoryBtn"
                        to="/"
                        onClick={() => setShowListDirectory(!showListDirectory)}
                      >
                        <span>Show All</span>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </span>
            <div
              className="treeConBox"
              style={
                showListDirectory
                  ? { height: 300, display: "block" }
                  : { height: 300, display: "none" }
              }
            >
              <div className="contentSelect">
                <div
                  className="DivSelectyze grey"
                  style={{ paddingLeft: 7, zIndex: 9 }}
                >
                  <Link className="selectyzeValue" to="/">
                    <span>POSCO ICT</span>
                  </Link>
                  <ul className="UlSelectize">
                    <li>
                      <Link to="/">POSCO ICT</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="treeCon">
                <TreeView handleOnDoubleClick={handleOnSelectPath} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="modifyBtn">
        <Link
          to="/"
          style={{
            background: `url(${
              require("assets/img/popup/bg/bg_modifyBtn.gif").default
            }) no-repeat left top #2768b2`,
          }}
        >
          Create
        </Link>
      </p>
    </div>
  );
  return (
    <React.Fragment>
      <div
        className="blockUI blockOverlay"
        style={{
          margin: 0,
          padding: 0,
          border: "currentColor",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: 1001,
          cursor: "default",
          opacity: "0.6",
          backgroundColor: "rgb(85, 85, 85)",
        }}
      ></div>
      <div
        className="blockUI blockMsg blockPage"
        style={{
          margin: "-317px 0px 0px -432.5px",
          padding: 0,
          left: "50%",
          top: "50%",
          width: 865,
          height: 635,
          textAlign: "center",
          color: "rgb(0, 0, 0)",
          position: "absolute",
          zIndex: 1012,
          cursor: "wait",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <div
          className="popup_layer_typeB"
          style={{ display: "block", cursor: "default" }}
        >
          <Frame
            width={865}
            height={635}
            align="middle"
            frameBorder={0}
            scrolling="no"
            style={{ border: "0px currentColor" }}
            head={
              <style>
                {antdStyles}
                {globalStyles}
                {layoutStyles}
                {bbsStyles}
                {ecmPopupStyles}
                {calendaStyles}
                {createDirectoryStyles}
              </style>
            }
          >
            {body}
          </Frame>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CreateDirectory;
