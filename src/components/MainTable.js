import { useState } from "react";
import { Link } from "react-router-dom";
import MainTableItem from "./MainTableItem";
import { connect } from "react-redux";
import { selectMultiAction } from "store/fileInfo/actions";

const MainTable = props => {
  const fileInfos = props.fileInfos;
  const [selectAll, setSelectAll] = useState(false);

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
              <Link to="#" className="icoSort">
                File Name
              </Link>
            </div>
          </th>
          <th>
            <Link to="#" className="icoSort">
              Owner
            </Link>
          </th>
          <th>
            <Link to="#" className="icoSort">
              Size
            </Link>
          </th>
          <th>
            <Link to="#" className="icoSort">
              Security Level
            </Link>
          </th>
          <th>
            <Link to="#" className="icoSort">
              Version
            </Link>
          </th>
          <th>
            <Link to="#" className="icoSort">
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
    selectMulti: (fileIds, checked) => dispatch(selectMultiAction(fileIds, checked))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
