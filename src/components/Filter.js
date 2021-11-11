import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import * as exts from "constants/extTypes";
import { connect } from "react-redux";
import { updatePageSizeAction } from "store/fileInfo/actions";

const Filter = props => {
  const history = useHistory();

  const [showListRow, setShowListRow] = useState(false);
  const { pageSize, setFilterExt, filterExt } = props;

  const handleChangePageSize = e => {
    const pageSize = parseInt(e.target.innerText);
    props.updatePageSize(pageSize);
    setShowListRow(false);
    history.push("/refresh");
  };

  return (
    <div className="sortingBox" style={{ display: "block" }}>
      <ul className="icoBtn" style={{ display: "block" }}>
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.ALL)}>
            <img
              alt=""
              title="All type"
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
              title="Pdf"
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
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.CAD)}>
            <img
              alt=""
              title="CAD"
              src={
                filterExt === exts.CAD || filterExt === exts.ALL
                  ? require("assets/img/main/ico/ico_cad_on.png").default
                  : require("assets/img/main/ico/ico_cad_off.png").default
              }
            />
          </Link>
        </li>
        <li>
          <Link to="#" onClick={() => setFilterExt(exts.VIDEO)}>
            <img
              alt=""
              title="Video"
              src={
                filterExt === exts.VIDEO || filterExt === exts.ALL
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
              className="am_selectyzeValue"
              onClick={() => setShowListRow(!showListRow)}
              to="#"
            >
              {pageSize}
            </Link>
            <ul
              className="am_UlSelectize"
              style={showListRow ? { display: "block" } : { display: "none" }}
            >
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
    pageSize: state.fileInfoReducers.paginationSet.pageSize
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePageSize: pageSize => dispatch(updatePageSizeAction(pageSize))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
