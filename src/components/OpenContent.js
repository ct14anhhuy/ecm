import React from "react";
import Frame from "react-frame-component";
import { Link } from "react-router-dom";

/* eslint import/no-webpack-loader-syntax: off */
import globalStyles from "!!raw-loader!assets/css/global.css";
import layoutStyles from "!!raw-loader!assets/css/layout.css";
import popupStyles from "!!raw-loader!assets/css/popup.css";
import contentsStyles from "!!raw-loader!assets/css/contents.css";
import openContentStyles from "!!raw-loader!./OpenContent.css";

const OpenContent = (props) => {
  const bodyFrame = (
    <div className="popLayerWrap">
      <div className="header">
        <h1 className="tit">Open Content</h1>
        <Link
          className="close"
          to="/"
          onClick={() => props.setShowOpenContent(false)}
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
        <div className="columnBoxs" style={{ marginBottom: 10 }}>
          <table className="normalPopTb">
            <colgroup>
              <col width={150} />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th style={{ width: 150 }}>File Name</th>
                <td style={{ msWordBreak: "break-all" }}>
                  <div className="conText">
                    <span>{props.selectedItem.name}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="btnBox">
          <Link to="/">Edit</Link>
          <Link to="/">View</Link>
        </p>
      </div>
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
          margin: 0,
          padding: 0,
          left: "643.5px",
          top: "394.5px",
          width: 600,
          height: 165,
          textAlign: "center",
          color: "rgb(0, 0, 0)",
          position: "fixed",
          zIndex: 1012,
          cursor: "wait",
          backgroundColor: "rgb(255, 255, 255)",
        }}
      >
        <div className="popup_layer_typeB" style={{ display: "block" }}>
          <Frame
            width={600}
            height={165}
            scrolling="no"
            frameBorder="0"
            head={
              <style>
                {globalStyles}
                {layoutStyles}
                {popupStyles}
                {contentsStyles}
                {openContentStyles}
              </style>
            }
          >
            {bodyFrame}
          </Frame>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OpenContent;
