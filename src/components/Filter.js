import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import * as exts from "constants/extTypes";
import { connect } from "react-redux";
import {
  updatePageSizeAction,
  updateFilterExtensionAction,
} from "store/fileInfo/actions";

const Filter = props => {
  const history = useHistory();
  const { path, dirId } = useParams();

  const [showListRow, setShowListRow] = useState(false);
  const { pageSize, filterExtension } = props.paginationSet;
  const { updateFilterExtension } = props;

  const handleChangePageSize = e => {
    const pageSize = parseInt(e.target.innerText);
    props.updatePageSize(pageSize);
    setShowListRow(false);
    history.push(`/ecm-redirect/${path}/${dirId ? dirId + "/" : ""}1`);
  };

  const handleUpdateFilterExtension = filterExtention => {
    updateFilterExtension(filterExtention);
    history.push(`/ecm-redirect/${path}/${dirId ? dirId + "/" : ""}1`);
  };

  return (
    <div className="sortingBox" style={{ display: "block" }}>
      <ul className="icoBtn" style={{ display: "block" }}>
        <li>
          <Link to="#" onClick={() => handleUpdateFilterExtension(exts.ALL)}>
            <img
              alt=""
              title="All type"
              src={
                filterExtension === exts.ALL
                  ? require("assets/img/main/ico/ico_all_on.png").default
                  : require("assets/img/main/ico/ico_all_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => handleUpdateFilterExtension(exts.POWERPOINT)}>
            <img
              alt=""
              title="Powerpoint"
              src={
                filterExtension === exts.POWERPOINT || filterExtension === exts.ALL
                  ? require("assets/img/main/ico/ico_ppt_on.png").default
                  : require("assets/img/main/ico/ico_ppt_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => handleUpdateFilterExtension(exts.EXCEL)}>
            <img
              alt=""
              title="Excel"
              src={
                filterExtension === exts.EXCEL || filterExtension === exts.ALL
                  ? require("assets/img/main/ico/ico_xlsx_on.png").default
                  : require("assets/img/main/ico/ico_xlsx_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => handleUpdateFilterExtension(exts.WORD)}>
            <img
              alt=""
              title="Word"
              src={
                filterExtension === exts.WORD || filterExtension === exts.ALL
                  ? require("assets/img/main/ico/ico_doc_on.png").default
                  : require("assets/img/main/ico/ico_doc_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => handleUpdateFilterExtension(exts.PDF)}>
            <img
              alt=""
              title="Pdf"
              src={
                filterExtension === exts.PDF || filterExtension === exts.ALL
                  ? require("assets/img/main/ico/ico_pdf_on.png").default
                  : require("assets/img/main/ico/ico_pdf_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => handleUpdateFilterExtension(exts.IMAGE)}>
            <img
              alt=""
              title="Image"
              src={
                filterExtension === exts.IMAGE || filterExtension === exts.ALL
                  ? require("assets/img/main/ico/ico_img_on.png").default
                  : require("assets/img/main/ico/ico_img_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => handleUpdateFilterExtension(exts.CAD)}>
            <img
              alt=""
              title="CAD"
              src={
                filterExtension === exts.CAD || filterExtension === exts.ALL
                  ? require("assets/img/main/ico/ico_cad_on.png").default
                  : require("assets/img/main/ico/ico_cad_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => handleUpdateFilterExtension(exts.VIDEO)}>
            <img
              alt=""
              title="Video"
              src={
                filterExtension === exts.VIDEO || filterExtension === exts.ALL
                  ? require("assets/img/main/ico/ico_tv_on.png").default
                  : require("assets/img/main/ico/ico_tv_off.png").default
              }
            />
          </Link>
        </li>
      </ul>
      <div className="viewCountBtnWrap">
        <div className="mainViewCount">
          <div className="am_DivSelectyze am_grey" style={{ zIndex: 10 }}>
            <span>Show </span>
            <Link
              to="#"
              className="am_selectyzeValue"
              onClick={() => setShowListRow(!showListRow)}>
              {pageSize}
            </Link>
            <ul
              className="am_UlSelectize"
              style={showListRow ? { display: "block" } : { display: "none" }}>
              <li>
                <Link to="#" onClick={handleChangePageSize}>
                  15
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleChangePageSize}>
                  30
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleChangePageSize}>
                  50
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleChangePageSize}>
                  100
                </Link>
              </li>
            </ul>
            <span> Rows</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    paginationSet: state.fileInfoReducers.paginationSet,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePageSize: pageSize => dispatch(updatePageSizeAction(pageSize)),
    updateFilterExtension: filterExtension =>
      dispatch(updateFilterExtensionAction(filterExtension)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
