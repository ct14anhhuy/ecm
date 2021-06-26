import { useState } from "react";
import { Link } from "react-router-dom";
import * as exts from "utils/extTypes";
import { connect } from "react-redux";
import { updatePageLimitAction } from "store/pagination/actions";

const Filter = props => {
  const [showListRow, setShowListRow] = useState(false);
  const { pageLimit, updatePageLimit, setFilterExt, filterExt } = props;

  const handleChangePageLimit = e => {
    const pgLimit = parseInt(e.target.innerText);
    setShowListRow(false);
    updatePageLimit(pgLimit);
  };

  return (
    <div className="sortingBox" style={{ display: "block" }}>
      <ul className="icoBtn" style={{ display: "block" }}>
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.ALL)}>
            <img
              alt=""
              title="All"
              src={
                filterExt === exts.ALL
                  ? require("assets/img/main/ico/ico_all_on.png").default
                  : require("assets/img/main/ico/ico_all_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.POWERPOINT)}>
            <img
              alt=""
              title="Powerpoint"
              src={
                filterExt === exts.POWERPOINT || filterExt === exts.ALL
                  ? require("assets/img/main/ico/ico_ppt_on.png").default
                  : require("assets/img/main/ico/ico_ppt_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.EXCEL)}>
            <img
              alt=""
              title="Excel"
              src={
                filterExt === exts.EXCEL || filterExt === exts.ALL
                  ? require("assets/img/main/ico/ico_xlsx_on.png").default
                  : require("assets/img/main/ico/ico_xlsx_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.WORD)}>
            <img
              alt=""
              title="Word"
              src={
                filterExt === exts.WORD || filterExt === exts.ALL
                  ? require("assets/img/main/ico/ico_doc_on.png").default
                  : require("assets/img/main/ico/ico_doc_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.PDF)}>
            <img
              alt=""
              title="PDF"
              src={
                filterExt === exts.PDF || filterExt === exts.ALL
                  ? require("assets/img/main/ico/ico_pdf_on.png").default
                  : require("assets/img/main/ico/ico_pdf_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.IMAGE)}>
            <img
              alt=""
              title="Image"
              src={
                filterExt === exts.IMAGE || filterExt === exts.ALL
                  ? require("assets/img/main/ico/ico_img_on.png").default
                  : require("assets/img/main/ico/ico_img_off.png").default
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
              className="am_selectyzeValue"
              onClick={() => setShowListRow(!showListRow)}
              to="#"
            >
              {pageLimit}
            </Link>
            <ul
              className="am_UlSelectize"
              style={showListRow ? { display: "block" } : { display: "none" }}
            >
              <li>
                <Link to="#" onClick={handleChangePageLimit}>
                  15
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleChangePageLimit}>
                  30
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleChangePageLimit}>
                  50
                </Link>
              </li>
              <li>
                <Link to="#" onClick={handleChangePageLimit}>
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
    pageLimit: state.paginationReducers.pageLimit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePageLimit: pageLimit => dispatch(updatePageLimitAction(pageLimit))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
