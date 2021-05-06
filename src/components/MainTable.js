import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainTableItem from "./MainTableItem";
import { connect } from "react-redux";
import * as exts from "utils/extTypes";

const MainTable = (props) => {
  const [fileInfos, setFileInfos] = useState(
    props.fileInfos.map((fi) => Object.assign(fi, { showInfo: false }))
  );
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
          fi.filter((fileInfo) => {
            return fe.includes(fileInfo.name.split(".").pop());
          })
        );
        break;
    }
  }, [props.fileInfos, props.filterExt]);

  const handleShowInfo = (id) => {
    setFileInfos(
      fileInfos.map((fi) =>
        fi.id === id ? { ...fi, showInfo: !fi.showInfo } : { ...fi, showInfo: false }
      )
    );
  };

  return (
    <table className="normalTb" style={{ marginBottom: 15 }}>
      <colgroup>
        <col width="*" />
        <col width={100} />
        <col width={100} />
        <col width={60} />
        <col width={150} />
        <col width={70} />
        <col width={100} />
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
                    onChange={() => {
                      setSelectAll(!selectAll);
                    }}
                  />
                </label>
              </span>
              <Link className="icoSort" to="/">
                File Name
              </Link>
            </div>
          </th>
          <th>
            <Link className="icoSort" to="/">
              Owner
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="/">
              Modifier
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="/">
              Size
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="/">
              Security Level
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="/">
              Version
            </Link>
          </th>
          <th>
            <Link className="icoSort" to="/">
              Date Modified
            </Link>
          </th>
        </tr>
      </thead>
      <tbody>
        {fileInfos.map((fileInfo) => (
          <MainTableItem
            key={fileInfo.id}
            selectAll={selectAll}
            fileInfo={fileInfo}
            handleShowInfo={handleShowInfo}
          />
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  return {
    fileInfos: state.fileInfoReducers,
  };
};

export default connect(mapStateToProps, null)(MainTable);
