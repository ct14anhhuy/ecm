import { useEffect, useState, useContext, useRef } from "react";
import { connect } from "react-redux";
import { changeFavorite, changeImportant } from "store/fileInfo/actions";
import { getFileShareUrl } from "store/fileUrl/actions";
import { Link } from "react-router-dom";
import moment from "moment";
import { MainContext } from "context";
import GetBackgroundIconFromExtension from "./common/GetBackgroundIconFromExtension";

const MainTableItem = (props) => {
  var contextData = useContext(MainContext);

  const { fileUrl, fileInfo, user } = props;
  const [fileChecked, setFileChecked] = useState(false);

  const node = useRef();

  useEffect(() => {
    setFileChecked(props.selectAll);
  }, [props.selectAll]);

  useEffect(() => {
    navigator.clipboard.writeText(`ECMProtocol: ${fileUrl.shareUrl}`);
  }, [fileUrl.shareUrl]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    }
    node.current.style.display = "none";
  };

  const handleOnCopyUrl = () => {
    props.getFileShareUrl(fileInfo.id);
  };

  return (
    <tr>
      <td>
        <div className="contentsBox">
          <div className="contentTitle">
            <label className={fileChecked ? "i_check c_on" : "i_check"}>
              <input
                type="checkbox"
                defaultChecked={fileChecked}
                onChange={() => {
                  setFileChecked(!fileChecked);
                }}
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
                    ? require("assets/img/main/left/ico_go_cnt15_on.png").default
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
                contextData.setSelectedItem(fileInfo);
                contextData.setShowOpenContent(true);
              }}
            >
              <GetBackgroundIconFromExtension fileName={fileInfo.name} />
              {fileInfo.name}
            </Link>
          </div>
          <Link
            className="listInfo"
            to="/"
            onClick={() => {
              node.current.style.display = "block";
            }}
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
            onClick={() => {
              node.current.style.display = "none";
            }}
          >
            <li style={{ fontWeight: "bold" }}>
              <Link to="/" onClick={handleOnCopyUrl}>
                Copy URL
              </Link>
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
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducers,
    fileUrl: state.fileUrlReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFavorite: (id, employeeId) => {
      dispatch(changeFavorite(id, employeeId));
    },
    changeImportant: (id, employeeId) => {
      dispatch(changeImportant(id, employeeId));
    },
    getFileShareUrl: (id) => {
      dispatch(getFileShareUrl(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTableItem);
