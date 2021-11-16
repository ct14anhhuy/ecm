import { useEffect, useRef, useState, Fragment } from "react";
import { connect } from "react-redux";
import {
  changeFavoriteAction,
  changeImportantAction,
  changeCheckedAction
} from "store/fileInfo/actions";
import { getFileShareUrlAction } from "store/fileUrl/actions";
import {
  changeShowEditFileAction,
  changeShowOpenContentAction,
  changeSelectedItemAction,
  changeEditItemAction
} from "store/systemParams/actions";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { GetBackgroundIconFromExtension } from "./common/GetBackgroundIconFromExtension";
import { ROUTE_TRASH_CONTENTS } from "constants/routePaths";

const MainTableItem = props => {
  const { path } = useParams();
  const { fileUrl, fileInfo, user } = props;
  const [isTrash, setIsTrash] = useState(false);

  const node = useRef();

  useEffect(() => {
    if (fileUrl.shareUrl) {
      copyToClipboard(`ECMProtocol: ${fileUrl.shareUrl}`);
    }
  }, [fileUrl.shareUrl]);

  useEffect(() => {
    if (path === ROUTE_TRASH_CONTENTS) {
      setIsTrash(true);
    } else {
      setIsTrash(false);
    }
  }, [path]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const copyToClipboard = text => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const handleClick = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    node.current.style.display = "none";
  };

  const handleOnCopyUrl = () => {
    props.getFileShareUrl(fileInfo.id);
  };

  const handleEditFile = editItem => {
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
            <Link to="#" className="ico_fav_3">
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
            <Link to="#" className="ico_fav">
              <img
                alt=""
                src={
                  fileInfo.isFavorite
                    ? require("assets/img/main/ico/ico_fav_blue_on.png").default
                    : require("assets/img/main/ico/ico_fav.png").default
                }
              />
            </Link>
            <Link to="#">
              <img
                alt=""
                style={{ width: 16, height: 16 }}
                src={GetBackgroundIconFromExtension(fileInfo.name)}
              />
              {fileInfo.name}
            </Link>
          </div>
          <Link to="#" className="listInfo">
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
      <td>{fileInfo.size.toLocaleString(undefined, 0)}KB</td>
      <td>{fileInfo.securityLevel}</td>
      <td>{fileInfo.version}</td>
      <td>{format(new Date(fileInfo.modifiedDate), "dd/MM/yyyy HH:mm")}</td>
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
              to="#"
              className="ico_fav_3"
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
              to="#"
              className="ico_fav"
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
              to="#"
              onDoubleClick={() => {
                props.changeSelectedItem(fileInfo);
                props.changeShowOpenContent();
              }}
            >
              <img
                alt=""
                style={{ width: 16, height: 16 }}
                src={GetBackgroundIconFromExtension(fileInfo.name)}
              />
              {fileInfo.name}
            </Link>
          </div>
          <Link
            to="#"
            className="listInfo"
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
                <Link to="#" onClick={handleOnCopyUrl}>
                  Copy URL
                </Link>
                <Link to="#" onClick={() => handleEditFile(fileInfo)}>
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
      <td>{fileInfo.size.toLocaleString(undefined, 0)}KB</td>
      <td>{fileInfo.securityLevel}</td>
      <td>{fileInfo.version}</td>
      <td>{format(new Date(fileInfo.modifiedDate), "dd/MM/yyyy HH:mm")}</td>
    </tr>
  );

  return <Fragment>{!isTrash ? render : renderInTrash}</Fragment>;
};

const mapStateToProps = state => {
  return {
    user: state.userReducers,
    fileUrl: state.fileUrlReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFavorite: (id, employeeId) =>
      dispatch(changeFavoriteAction(id, employeeId)),
    changeImportant: (id, employeeId) =>
      dispatch(changeImportantAction(id, employeeId)),
    changeChecked: (id, checked) => dispatch(changeCheckedAction(id, checked)),
    getFileShareUrl: id => dispatch(getFileShareUrlAction(id)),
    changeShowEditFile: () => dispatch(changeShowEditFileAction()),
    changeShowOpenContent: () => dispatch(changeShowOpenContentAction()),
    changeSelectedItem: selectedItem =>
      dispatch(changeSelectedItemAction(selectedItem)),
    changeEditItem: editItem => dispatch(changeEditItemAction(editItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTableItem);
