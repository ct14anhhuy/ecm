import { useState } from "react";
import Frame from "react-frame-component";
import { useContext } from "react";
import { Link } from "react-router-dom";
import RoleAssignEdit from "./RoleAssignEdit";
import { MainContext } from "context";
import TreeView from "components/TreeView";

/* eslint import/no-webpack-loader-syntax: off */
import globalStyles from "!!raw-loader!assets/css/global.css";
import layoutStyles from "!!raw-loader!assets/css/layout.css";
import bbsStyles from "!!raw-loader!assets/css/bbs.css";
import calendaStyles from "!!raw-loader!assets/css/calenda.css";
import ecmPopupStyles from "!!raw-loader!assets/css/ecm_popup.css";
import addFileStyles from "!!raw-loader!./AddFileFrame.css";
import antdStyles from "!!raw-loader!antd/dist/antd.min.css";

const AddFileFrame = () => {
  const contextData = useContext(MainContext);
  const [showListDirectory, setShowListDirectory] = useState(false);
  const [editFileName, setEditFileName] = useState(false);
  const [selectedPath, setSelectedPath] = useState({
    id: null,
    path: "",
  });

  const handleOnSelectPath = (selectedId, path) => {
    setShowListDirectory(false);
    setSelectedPath({ id: selectedId, path: path });
  };

  const bodyFrame = (
    <div>
      <div
        className="popLayerWrap"
        style={{ margin: "-318px 0px 0px -400px", width: 865, height: 635 }}
      >
        <div className="header">
          <h1 className="tit">Add Content</h1>
          <Link className="close" to="/" onClick={() => contextData.setShowAddFileModal(false)}>
            <img
              alt="닫기"
              src={
                require("assets/img/contents/ecmMain/img_close.gif")
                  .default
              }
            />
          </Link>
        </div>
        <div className="contents">
          <div className="columnBox">
            <p className="popSubTitle">
              <span className="subtype_2">Content List</span>
              <span className="floatR">
                <Link
                  className="btnBlack"
                  style={{
                    background: `url(${
                      require("assets/img/popup/bg/bg_blackBtn_L.png")
                        .default
                    }) right 0 no-repeat`,
                  }}
                  to="/"
                >
                  <span
                    style={{
                      background: `url(${
                        require("assets/img/popup/bg/bg_blackBtn_R.png")
                          .default
                      }) right 0 no-repeat`,
                    }}
                  >
                    <b>+</b> Add Content
                  </span>
                </Link>
              </span>
            </p>
            <div className="contentList">
              <ul className="list">
                <li>
                  <span
                    className="contentsNameView"
                    style={
                      editFileName ? { display: "none" } : { display: "block" }
                    }
                  >
                    <Link
                      className="title"
                      style={{
                        width: "93%",
                        overflow: "hidden",
                        display: "block",
                        whiteSpace: "nowrap",
                        msTextOverflow: "ellipsis",
                      }}
                      to="/"
                    >
                      <span className="contentsExtImage">
                        <img
                          alt=""
                          style={{ width: 16, height: 16 }}
                          src={
                            require("assets/img/fileicons/pdf.png")
                              .default
                          }
                        />
                      </span>
                      <span className="contentsNameViewTitle">
                        20210105_2021년 구정휴무일정 공지문.pdf
                      </span>
                    </Link>
                    <span className="floatR">
                      <Link
                        className="btnChk"
                        to="/"
                        onClick={() => setEditFileName(!editFileName)}
                      >
                        <img
                          alt=""
                          src={
                            require("assets/img/popup/ico/ico_contentList_edit.png")
                              .default
                          }
                        />
                      </Link>
                      <Link className="btnDel" to="/">
                        <img
                          alt=""
                          src={
                            require("assets/img/popup/ico/ico_contentList_del.png")
                              .default
                          }
                        />
                      </Link>
                    </span>
                  </span>
                  <span
                    className="contentsNameEdit"
                    style={
                      editFileName ? { display: "block" } : { display: "none" }
                    }
                  >
                    <span className="title floatL">
                      <span className="contentsExtImageEdit">
                        <img
                          alt=""
                          style={{ width: 16, height: 16 }}
                          src={
                            require("assets/img/fileicons/pdf.png")
                              .default
                          }
                        />
                      </span>
                      <input
                        className="contentsNameEditTitle"
                        style={{ msImeMode: "active" }}
                        type="text"
                        size={100}
                        defaultValue="20210105_2021년 구정휴무일정 공지문.pdf"
                      />
                    </span>
                    <span className="floatR">
                      <Link
                        className="btnChk"
                        to="/"
                        onClick={() => setEditFileName(!editFileName)}
                      >
                        <img
                          alt=""
                          src={
                            require("assets/img/popup/ico/ico_check.png")
                              .default
                          }
                        />
                      </Link>
                      <Link className="btnDel" to="/">
                        <img
                          alt=""
                          src={
                            require("assets/img/popup/ico/ico_contentList_del.png")
                              .default
                          }
                        />
                      </Link>
                    </span>
                  </span>
                </li>
              </ul>
            </div>
            <p className="popSubTitle">
              <span className="subtype_2">Location</span>
            </p>
            <div className="saveBox" style={{ zIndex: "inherit" }}>
              <span className="floatL">
                <table className="popTb">
                  <tbody>
                    <tr>
                      <td style={{ paddingLeft: 5 }}>
                        <label className="label">{selectedPath.path}</label>
                      </td>
                      <td width={63}>
                        <Link
                          className="btnBlueLine"
                          to="/"
                          onClick={() => {
                            setShowListDirectory(!showListDirectory);
                          }}
                        >
                          <span>
                            <em>Show All</em>
                          </span>
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
            <p className="popSubTitle" style={{ float: "left" }}>
              <span className="subtype_2"> Security Grade</span>
            </p>
            <br />
            <div className="share_set">
              <ol className="safe_grade">
                <li className="grade1">Specific Employee Sharing</li>
                <li className="grade2">Department Employee Sharing</li>
                <li className="grade3">Specific Employee Sharing</li>
                <li className="grade4">All Employee Sharing</li>
              </ol>
              <div className="safe_btn_box">
                <Link
                  className="btn_safe1"
                  to="/"
                  style={{
                    background: `url(${
                      require("assets/img/popup/bg/bg_safe_btn.png")
                        .default
                    }) no-repeat 0 0`,
                  }}
                >
                  Secret
                </Link>
                <Link
                  className="btn_safe2"
                  to="/"
                  style={{
                    background: `url(${
                      require("assets/img/popup/bg/bg_safe_btn.png")
                        .default
                    }) no-repeat 0 0`,
                  }}
                >
                  Secret A/Not Open
                </Link>
                <Link
                  className="btn_safe3"
                  to="/"
                  style={{
                    background: `url(${
                      require("assets/img/popup/bg/bg_safe_btn.png")
                        .default
                    }) no-repeat 0 0`,
                  }}
                >
                  Secret A
                </Link>
                <Link
                  className="btn_safe4"
                  to="/"
                  style={{
                    background: `url(${
                      require("assets/img/popup/bg/bg_safe_btn.png")
                        .default
                    }) no-repeat 0 0`,
                  }}
                >
                  Secret B/Not Open
                </Link>
                <Link
                  className="btn_safe5"
                  to="/"
                  style={{
                    background: `url(${
                      require("assets/img/popup/bg/bg_safe_btn.png")
                        .default
                    }) no-repeat 0 0`,
                  }}
                >
                  Secret B
                </Link>
                <Link
                  className="btn_safe6"
                  to="/"
                  style={{
                    background: `url(${
                      require("assets/img/popup/bg/bg_safe_btn.png")
                        .default
                    }) no-repeat 0 0`,
                  }}
                >
                  Public
                </Link>
              </div>
            </div>
            <p className="popSubTitle">
              <span className="subtype_2">Tag</span>
              <span className="subtype_2" style={{ fontWeight: "normal" }}>
                (up to 20 characters per tag, maximum 10 can be registered)
              </span>
            </p>
            <div className="hashtag_inputer">
              <span className="inputer">
                <em className="clone" />
                <em className="marker">#</em>
                <input type="text" maxLength={20} />
              </span>
            </div>
            <p className="popSubTitle">
              <span className="subtype_2">Permission Setting</span>
            </p>
            <div>
              <RoleAssignEdit />
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
            Add
          </Link>
        </p>
      </div>
    </div>
  );

  return (
    <Frame
      width="865"
      height="635"
      align="middle"
      frameBorder="0"
      scrolling="no"
      style={{ border: "0px" }}
      head={
        <style>
          {antdStyles}
          {globalStyles}
          {layoutStyles}
          {bbsStyles}
          {calendaStyles}
          {ecmPopupStyles}
          {addFileStyles}
        </style>
      }
    >
      {bodyFrame}
    </Frame>
  );
};

export default AddFileFrame;
