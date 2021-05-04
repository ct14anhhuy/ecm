import { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import { changeFavorite, changeImportant } from "../store/fileInfo/actions";
import { Link } from "react-router-dom";
import moment from "moment";
import { MainContext } from "../context";
import { GetBackgroundIconFromExtension } from "../utils/fileInfo";

const MainTableItem = (props) => {
  var contextData = useContext(MainContext);

  const fileInfo = props.fileInfo;
  const [fileChecked, setFileChecked] = useState(false);

  useEffect(() => {
    setFileChecked(props.selectAll);
  }, [props.selectAll]);

  const handleOnCopyUrl = () => {
    navigator.clipboard.writeText(fileInfo.Id);
    props.handleShowInfo(fileInfo.Id);
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
              onClick={() => props.changeImportant(fileInfo.Id)}
            >
              <img
                alt=""
                src={
                  fileInfo.IsImportant
                    ? require("../assets/img/main/left/ico_fix_on.png").default
                    : require("../assets/img/main/left/ico_fix.png").default
                }
              />
            </Link>
            <Link
              className="ico_fav"
              to="/"
              onClick={() => props.changeFavorite(fileInfo.Id)}
            >
              <img
                alt=""
                src={
                  fileInfo.IsFavorite
                    ? require("../assets/img/main/ico/ico_fav_blue_on.png")
                        .default
                    : require("../assets/img/main/ico/ico_fav.png").default
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
              <GetBackgroundIconFromExtension fileName={fileInfo.Name} />
              {fileInfo.Name}
            </Link>
          </div>
          <Link
            className="listInfo"
            to="/"
            onClick={() => {
              props.handleShowInfo(fileInfo.Id);
            }}
          >
            <img
              alt=""
              src={
                require("../assets/img/contents/ecmMain/bg_info.png").default
              }
            />
          </Link>
          <ul
            className="infoMenu"
            style={
              fileInfo.showInfo
                ? { top: 16, display: "block" }
                : { top: 16, display: "none" }
            }
          >
            <li style={{ fontWeight: "bold" }}>
              <Link to="/" onClick={handleOnCopyUrl}>
                Copy URL
              </Link>
            </li>
          </ul>
        </div>
      </td>
      <td>{fileInfo.Owner}</td>
      <td>{fileInfo.Modifier}</td>
      <td>{fileInfo.Size}KB</td>
      <td>{fileInfo.SecurityLevel}</td>
      <td>{fileInfo.Version}</td>
      <td>{moment(fileInfo.ModifiedDate).format("DD/MM/YYYY")}</td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeFavorite: (id) => {
      dispatch(changeFavorite(id));
    },
    changeImportant: (id) => {
      dispatch(changeImportant(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(MainTableItem);
