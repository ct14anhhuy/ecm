import { useState } from "react";
import { Link } from "react-router-dom";
import * as exts from "utils/extTypes";

const Filter = (props) => {
  const [showListRow, setShowListRow] = useState(false);
  const [showNumOfElems, setShowNumOfElems] = useState("Show");

  return (
    <div className="sortingBox" style={{ display: "block" }}>
      <ul className="icoBtn" style={{ display: "block" }}>
        <li>
          <Link to="/" onClick={() => props.setFilterExt(exts.ALL)}>
            <img
              alt=""
              title="All"
              src={require("assets/img/main/ico/ico_all_on.png").default}
            />
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => props.setFilterExt(exts.POWERPOINT)}>
            <img
              alt=""
              title="Powerpoint"
              src={require("assets/img/main/ico/ico_ppt_on.png").default}
            />
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => props.setFilterExt(exts.EXCEL)}>
            <img
              alt=""
              title="Excel"
              src={require("assets/img/main/ico/ico_xlsx_on.png").default}
            />
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => props.setFilterExt(exts.WORD)}>
            <img
              alt=""
              title="Word"
              src={require("assets/img/main/ico/ico_doc_on.png").default}
            />
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => props.setFilterExt(exts.PDF)}>
            <img
              alt=""
              title="PDF"
              src={require("assets/img/main/ico/ico_pdf_on.png").default}
            />
          </Link>
        </li>
        <li>
          <Link to="/" onClick={() => props.setFilterExt(exts.IMAGE)}>
            <img
              alt=""
              title="Image"
              src={require("assets/img/main/ico/ico_img_on.png").default}
            />
          </Link>
        </li>
      </ul>
      <div className="viewCountBtnWrap">
        <div className="mainViewCount">
          <div className="am_DivSelectyze am_grey" style={{ zIndex: 10 }}>
            <Link
              className="am_selectyzeValue"
              onClick={() => {
                setShowListRow(!showListRow);
              }}
              to="/"
            >
              {showNumOfElems}
            </Link>
            <ul
              className="am_UlSelectize"
              style={showListRow ? { display: "block" } : { display: "none" }}
            >
              <li
                onClick={() => {
                  setShowListRow(false);
                  setShowNumOfElems("15 rows");
                }}
              >
                <Link to="/">15</Link>
              </li>
              <li
                onClick={() => {
                  setShowListRow(false);
                  setShowNumOfElems("30 rows");
                }}
              >
                <Link to="/">30</Link>
              </li>
              <li
                onClick={() => {
                  setShowListRow(false);
                  setShowNumOfElems("50 rows");
                }}
              >
                <Link to="/">50</Link>
              </li>
              <li
                onClick={() => {
                  setShowListRow(false);
                  setShowNumOfElems("100 rows");
                }}
              >
                <Link to="/">100</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
