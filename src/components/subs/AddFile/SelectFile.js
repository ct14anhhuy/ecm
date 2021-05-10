import { useState } from "react";
import { Link } from "react-router-dom";

const SelectFile = (props) => {
  const [editFileName, setEditFileName] = useState(false);
  
  return (
    <li>
      <span
        className="contentsNameView"
        style={editFileName ? { display: "none" } : { display: "block" }}
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
              src={require("assets/img/fileicons/pdf.png").default}
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
                require("assets/img/popup/ico/ico_contentList_edit.png").default
              }
            />
          </Link>
          <Link className="btnDel" to="/">
            <img
              alt=""
              src={
                require("assets/img/popup/ico/ico_contentList_del.png").default
              }
            />
          </Link>
        </span>
      </span>
      <span
        className="contentsNameEdit"
        style={editFileName ? { display: "block" } : { display: "none" }}
      >
        <span className="title floatL">
          <span className="contentsExtImageEdit">
            <img
              alt=""
              style={{ width: 16, height: 16 }}
              src={require("assets/img/fileicons/pdf.png").default}
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
              src={require("assets/img/popup/ico/ico_check.png").default}
            />
          </Link>
          <Link className="btnDel" to="/">
            <img
              alt=""
              src={
                require("assets/img/popup/ico/ico_contentList_del.png").default
              }
            />
          </Link>
        </span>
      </span>
    </li>
  );
};

export default SelectFile;
