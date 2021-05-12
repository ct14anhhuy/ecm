import { useState } from "react";
import { Link } from "react-router-dom";
import GetBackgroundIconFromExtension from "components/common/GetBackgroundIconFromExtension";

const SelectFile = (props) => {
  const { key } = props.file;
  const [fileName, setFileName] = useState(props.file.name);
  const [editFileName, setEditFileName] = useState(false);

  const handleChangeFileName = () => {
    setEditFileName(!editFileName);
    props.handleChangeFileName(key, fileName);
  };

  const handleDeleteFile = () => {
    props.handleDeleteFile(key);
  };

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
            <GetBackgroundIconFromExtension fileName={fileName} />
          </span>
          <span className="contentsNameViewTitle">{fileName}</span>
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
          <Link className="btnDel" to="/" onClick={handleDeleteFile}>
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
            defaultValue={fileName.substring(0, fileName.lastIndexOf("."))}
            onChange={(e) => {
              setFileName(`${e.target.value}.${fileName.split(".").pop()}`);
            }}
          />
        </span>
        <span className="floatR">
          <Link className="btnChk" to="/" onClick={handleChangeFileName}>
            <img
              alt=""
              src={require("assets/img/popup/ico/ico_check.png").default}
            />
          </Link>
          <Link className="btnDel" to="/" onClick={handleDeleteFile}>
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
