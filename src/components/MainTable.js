import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainTableItem from "./MainTableItem";
import { connect } from "react-redux";
import * as exts from "constants/extTypes";
import { selectMultiAction } from "store/fileInfo/actions";

const MainTable = props => {
  const [fileInfos, setFileInfos] = useState(props.fileInfos);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    const fe = props.filterExt;
    const fi = props.fileInfos;
    switch (fe) {
      case exts.ALL:
        setFileInfos(fi);
        break;
      default:
        setFileInfos(
          fi.filter(fileInfo => {
            return fe.includes(fileInfo.name.split(".").pop());
          })
        );
        break;
    }
  }, [props.fileInfos, props.filterExt]);

  const handleSelectAll = checked => {
    const fileIds = fileInfos.map(f => f.id);
    setSelectAll(checked);
    props.selectMulti(fileIds, checked);
  };

  return (
    <table className="normalTb" style={{ marginBottom: 15 }}>
      <colgroup>
        <col width="*" />
        <col width={110} />
        <col width={70} />
        <col width={120} />
        <col width={60} />
        <col width={120} />
      </colgroup>
      <thead>
        <tr>
          <th>
            <div className="allCheck">
              <span>
                <label className={selectAll ? "i_check c_on" : "i_check"}>
                  <input
                    type="checkbox"
                    defaultChecked={selectAll}
                    onChange={() => handleSelectAll(!selectAll)}
                  />
                </label>
              </span>
              <Link className="icoSort" to="#">
                File Name
              </Link>
            </div>
          </th>
          <th>
            <Link className="icoSort" to="#">
              Owner
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="#">
              Size
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="#">
              Security Level
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="#">
              Version
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="#">
              Modified Date
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {fileInfos.map(fileInfo => (
          <MainTableItem key={fileInfo.id} fileInfo={fileInfo} />
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    fileInfos: state.fileInfoReducers.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectMulti: (fileIds, checked) =>
      dispatch(selectMultiAction(fileIds, checked))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
