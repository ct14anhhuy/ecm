import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MainTableItem from "./MainTableItem";
import { connect } from "react-redux";
import * as exts from "utils/extTypes";
import { selectMultiAction } from "store/fileInfo/actions";
import {
  updateCurrentPageAction,
  updatePageNeighboursAction,
  updateTotalPagesAction,
  updateTotalRecordsAction
} from "store/pagination/actions";

const MainTable = props => {
  const firstUpdate = useRef(true);
  const [fileInfos, setFileInfos] = useState(props.fileInfos);
  const [selectAll, setSelectAll] = useState(false);
  const [currentFiles, setCurrentFiles] = useState([]);
  const {
    updateCurrentPage,
    updateTotalRecords,
    updateTotalPages,
    updatePageNeighbours
  } = props;
  const { pageLimit, currentPage, pageNeighbours } = props.pagination;

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

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const FIRST_PAGE = 1;
    const totalRecords = fileInfos.length;
    const totalPages = Math.ceil(totalRecords / pageLimit);
    const offset = (currentPage - 1) * pageLimit;
    const currentFiles = fileInfos.slice(offset, offset + pageLimit);
    updateTotalRecords(totalRecords);
    updateTotalPages(totalPages);
    updatePageNeighbours(Math.max(0, Math.min(pageNeighbours, 2)));
    updateCurrentPage(totalRecords < pageLimit ? FIRST_PAGE : currentPage);
    setCurrentFiles(currentFiles);
  }, [
    currentPage,
    fileInfos,
    pageLimit,
    pageNeighbours,
    updateCurrentPage,
    updatePageNeighbours,
    updateTotalPages,
    updateTotalRecords
  ]);

  const handleSelectAll = checked => {
    const fileIds = currentFiles.map(f => f.id);
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
        {currentFiles.map(fileInfo => (
          <MainTableItem key={fileInfo.id} fileInfo={fileInfo} />
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    fileInfos: state.fileInfoReducers.data,
    pagination: state.paginationReducers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentPage: page => dispatch(updateCurrentPageAction(page)),
    updateTotalRecords: totalRecords =>
      dispatch(updateTotalRecordsAction(totalRecords)),
    updateTotalPages: totalPages =>
      dispatch(updateTotalPagesAction(totalPages)),
    updatePageNeighbours: pageNeighbours =>
      dispatch(updatePageNeighboursAction(pageNeighbours)),
    selectMulti: (fileIds, checked) =>
      dispatch(selectMultiAction(fileIds, checked))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
