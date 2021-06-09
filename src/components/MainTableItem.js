import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import {
  changeFavoriteAction,
  changeImportantAction,
  changeCheckedAction,
} from "store/fileInfo/actions";
import { getFileShareUrlAction } from "store/fileUrl/actions";
import {
  changeShowEditFileAction,
  changeShowOpenContentAction,
  changeSelectedItemAction,
  changeEditItemAction,
} from "store/systemParams/actions";
import { Link } from "react-router-dom";
import moment from "moment";
import GetBackgroundIconFromExtension from "./common/GetBackgroundIconFromExtension";

const MainTableItem = (props) => {
  const { fileUrl, fileInfo, user, headerPath, menuActive } = props;
  const [isTrash, setIsTrash] = useState(false);

  const node = useRef();

  useEffect(() => {
    if (fileUrl.shareUrl) {
      copyToClipboard(`ECMProtocol: ${fileUrl.shareUrl}`);
    }
  }, [fileUrl.shareUrl]);

  useEffect(() => {
    if (headerPath === "Trash" && menuActive) {
      setIsTrash(true);
    } else {
      setIsTrash(false);
    }
  }, [headerPath, menuActive]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    node.current.style.display = "none";
  };

  const handleOnCopyUrl = () => {
    props.getFileShareUrl(fileInfo.id);
  };

  const handleEditFile = (editItem) => {
    props.changeEditItem(editItem);
    props.changeShowEditFile();
  };

  const renderInTrash = (
    <tr>
      <td>
        <div className="contentsBox">
          <div className="contentTitle">
            <label className={fileInfo.checked ? "i_check c_on" : "i_check"}>
              <input
                type="checkbox"
                defaultChecked={fileInfo.checked}
                onChange={() =>
                  props.changeChecked(fileInfo.id, !fileInfo.checked)
                }
              />
            </label>
            <Link className="ico_fav_3" to="/">
              <img
                alt=""
                src={
                  fileInfo.isImportant
                    ? require("assets/img/main/left/ico_go_cnt15_on.png")
                        .default
                    : require("assets/img/main/left/ico_go_cnt15.png").default
                }
              />
            </Link>
            <Link className="ico_fav" to="/">
              <img
                alt=""
                src={
                  fileInfo.isFavorite
                    ? require("assets/img/main/ico/ico_fav_blue_on.png").default
                    : require("assets/img/main/ico/ico_fav.png").default
                }
              />
            </Link>
            <Link to="/">
              <GetBackgroundIconFromExtension fileName={fileInfo.name} />
              {fileInfo.name}
            </Link>
          </div>
          <Link className="listInfo" to="/">
            <img
              alt=""
              src={require("assets/img/contents/ecmMain/bg_info.png").default}
            />
          </Link>
          <ul
            className="infoMenu"
            ref={node}
            style={{ top: 16, display: "none" }}
          >
            <li style={{ fontWeight: "bold" }}>
              <span>Copy URL</span>
              <span>Edit</span>
            </li>
          </ul>
        </div>
      </td>
      <td>{fileInfo.owner}</td>
      <td>{fileInfo.modifier}</td>
      <td>{fileInfo.size}KB</td>
      <td>{fileInfo.securityLevel}</td>
      <td>{fileInfo.version}</td>
      <td>{moment(fileInfo.modifiedDate).format("DD/MM/YYYY")}</td>
    </tr>
  );

  const render = (
    <tr>
      <td>
        <div className="contentsBox">
          <div className="contentTitle">
            <label className={fileInfo.checked ? "i_check c_on" : "i_check"}>
              <input
                type="checkbox"
                defaultChecked={fileInfo.checked}
                onChange={() =>
                  props.changeChecked(fileInfo.id, !fileInfo.checked)
                }
              />
            </label>
            <Link
              className="ico_fav_3"
              to="/"
              onClick={() => props.changeImportant(fileInfo.id, user.id)}
            >
              <img
                alt=""
                src={
                  fileInfo.isImportant
                    ? require("assets/img/main/left/ico_go_cnt15_on.png")
                        .default
                    : require("assets/img/main/left/ico_go_cnt15.png").default
                }
              />
            </Link>
            <Link
              className="ico_fav"
              to="/"
              onClick={() => props.changeFavorite(fileInfo.id, user.id)}
            >
              <img
                alt=""
                src={
                  fileInfo.isFavorite
                    ? require("assets/img/main/ico/ico_fav_blue_on.png").default
                    : require("assets/img/main/ico/ico_fav.png").default
                }
              />
            </Link>
            <Link
              to="/"
              onDoubleClick={() => {
                props.changeSelectedItem(fileInfo);
                props.changeShowOpenContent();
              }}
            >
              <GetBackgroundIconFromExtension fileName={fileInfo.name} />
              {fileInfo.name}
            </Link>
          </div>
          <Link
            className="listInfo"
            to="/"
            onClick={() => (node.current.style.display = "block")}
          >
            <img
              alt=""
              src={require("assets/img/contents/ecmMain/bg_info.png").default}
            />
          </Link>
          <ul
            className="infoMenu"
            ref={node}
            style={{ top: 16, display: "none" }}
            onClick={() => (node.current.style.display = "none")}
          >
            {fileInfo.owner === user.epLiteId ? (
              <li style={{ fontWeight: "bold" }}>
                <Link to="/" onClick={handleOnCopyUrl}>
                  Copy URL
                </Link>
                <Link to="/" onClick={() => handleEditFile(fileInfo)}>
                  Edit
                </Link>
              </li>
            ) : (
              <li style={{ fontWeight: "bold" }}>
                <span>Copy URL</span>
                <span>Edit</span>
              </li>
            )}
          </ul>
        </div>
      </td>
      <td>{fileInfo.owner}</td>
      <td>{fileInfo.modifier}</td>
      <td>{fileInfo.size}KB</td>
      <td>{fileInfo.securityLevel}</td>
      <td>{fileInfo.version}</td>
      <td>{moment(fileInfo.modifiedDate).format("DD/MM/YYYY")}</td>
    </tr>
  );

  return <React.Fragment>{!isTrash ? render : renderInTrash}</React.Fragment>;
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducers,
    fileUrl: state.fileUrlReducers,
    headerPath: state.systemParamsReducers.headerPath,
    menuActive: state.systemParamsReducers.menuActive,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFavorite: (id, employeeId) =>
      dispatch(changeFavoriteAction(id, employeeId)),
    changeImportant: (id, employeeId) =>
      dispatch(changeImportantAction(id, employeeId)),
    changeChecked: (id, checked) => dispatch(changeCheckedAction(id, checked)),
    getFileShareUrl: (id) => dispatch(getFileShareUrlAction(id)),
    changeShowEditFile: () => dispatch(changeShowEditFileAction()),
    changeShowOpenContent: () => dispatch(changeShowOpenContentAction()),
    changeSelectedItem: (selectedItem) =>
      dispatch(changeSelectedItemAction(selectedItem)),
    changeEditItem: (editItem) => dispatch(changeEditItemAction(editItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTableItem);
