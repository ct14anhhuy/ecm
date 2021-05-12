import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Frame from "react-frame-component";
import { connect } from "react-redux";
import * as act from "store/employee/actions";

/* eslint import/no-webpack-loader-syntax: off */
import globalStyles from "!!raw-loader!assets/css/global.css";
import layoutStyles from "!!raw-loader!assets/css/layout.css";
import bbsStyles from "!!raw-loader!assets/css/bbs.css";
import popColumnRStyles from "!!raw-loader!assets/css/popColumnR.css";
import ecmPopupStyles from "!!raw-loader!assets/css/ecm_popup.css";
import roleAssignEditStyles from "!!raw-loader!./RoleAssignEdit.css";

const RoleAssignEdit = (props) => {
  const [employees, setEmployees] = useState([]);
  const [selectName, setSelectName] = useState(true);
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    // props.initState();
  });

  useEffect(() => {
    setEmployees(props.employees);
  }, [props.employees]);

  const tabRoleBody = (
    <div className="positionBox type_2" style={{ width: 800 }}>
      <div className="positionSearch">
        <div className="part_L">
          <table className="popTb">
            <colgroup>
              <col width={86} />
              <col width="*" />
            </colgroup>
            <tbody>
              <tr>
                <th height={25}>Owner</th>
                <td className="account0">
                  <div className="innerPad0">POSCO ICT</div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="contents">
            <ul className="tabUL">
              <li>
                <Link
                  className={selectName ? "on" : ""}
                  to="/"
                  onClick={() => setSelectName(true)}
                >
                  Name
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className={selectName ? "" : "on"}
                  onClick={() => setSelectName(false)}
                >
                  Department
                </Link>
              </li>
            </ul>
          </div>
          <div
            className="roleBox01"
            style={selectName ? { display: "block" } : { display: "none" }}
          >
            <input
              className="search"
              style={{ msImeMode: "active" }}
              type="text"
              defaultValue={searchStr}
              onChange={(e) => {
                setSearchStr(e.target.value);
              }}
            />
            <Link to="/" onClick={() => props.searchByName(searchStr)}>
              <img
                style={{ marginTop: 6 }}
                alt=""
                src={require("assets/img/popup/bg/bg_search.gif").default}
              />
            </Link>
            <div className="count_box">
              <div className="allCheck">
                <span>
                  <label
                    className="i_check"
                    style={{
                      marginLeft: 2,
                      background: `url(${
                        require("assets/img/form/check-off.png").default
                      }) no-repeat`,
                    }}
                  >
                    <input name="checkbox" type="checkbox" defaultValue={1} />
                  </label>
                </span>
              </div>
              <p className="count">
                Select
                <span className="red">0</span>
                /Total
                <span className="blue">0</span>
              </p>
              <Link
                className="btn_delall"
                to="/"
                style={{
                  background: `url(${
                    require("assets/img/popup/bg/bg_btnGray.gif").default
                  }) 0 0 repeat`,
                }}
              >
                Delete All
              </Link>
            </div>
            <div className="maxH type_2">
              <div className="marR16">
                <table className="normalTb" style={{ width: "100%" }}>
                  <tbody>
                    {employees.map((emp) => (
                      <tr key={emp.id}>
                        <td>
                          <div className="contentTitle">
                            <label
                              className="i_check"
                              style={{
                                marginLeft: 10,
                                background: `url(${
                                  require("assets/img/form/check-off.png")
                                    .default
                                }) no-repeat`,
                              }}
                            >
                              <input name="checkbox" type="checkbox" />
                            </label>
                            <span className="checkTxt">
                              {`${emp.lastName} ${emp.firstName}`}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div
            className="partBox01"
            style={selectName ? { display: "none" } : { display: "block" }}
          >
            <input className="search" type="text" />
            <Link to="/">
              <img
                style={{ marginTop: 5 }}
                alt=""
                src={require("assets/img/popup/bg/bg_search.gif").default}
              />
            </Link>
            <div className="maxH type_4">
              <div style={{ display: "none" }}>
                <select className="selectyze" style={{ display: "none" }}>
                  <option>포스코</option>
                </select>
                <div className="DivSelectyze grey" style={{ zIndex: 9999 }}>
                  <Link className="selectyzeValue" to="/">
                    <span>포스코</span>
                  </Link>
                  <ul className="UlSelectize">
                    <li>
                      <Link to="/">포스코</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="marR17" style={{ background: "none" }}>
                <table className="tblFolder">
                  <colgroup>
                    <col width={35} />
                    <col width={30} />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    <tr className="tr_10873">
                      <td className="bdr0">
                        <div className="treeTitle">
                          <label
                            className="i_check"
                            style={{
                              marginLeft: 2,
                              background: `url(${
                                require("assets/img/form/check-off.png").default
                              }) no-repeat`,
                            }}
                          >
                            <input name="checkbox" type="checkbox" />
                          </label>
                        </div>
                      </td>
                      <td className="bdr1">
                        <img
                          alt=""
                          src={
                            require("assets/img/form/ico_tree_on.gif").default
                          }
                        />
                      </td>
                      <td className="agl">
                        <strong>임원</strong>
                        <Link className="personView" to="/">
                          <img
                            alt=""
                            src={
                              require("assets/img/icon/btn_show_peo.gif")
                                .default
                            }
                          />
                        </Link>
                      </td>
                    </tr>
                    <tr className="tr_10002">
                      <td className="bdr0">
                        <div className="treeTitle">
                          <label
                            className="i_check"
                            style={{
                              marginLeft: 2,
                              background: `url(${
                                require("assets/img/form/check-off.png").default
                              }) no-repeat`,
                            }}
                          >
                            <input name="checkbox" type="checkbox" />
                          </label>
                        </div>
                      </td>
                      <td className="bdr1">
                        <img
                          className="classDeptTree"
                          style={{ cursor: "pointer" }}
                          alt=""
                          src={
                            require("assets/img/form/ico_tree_off.gif").default
                          }
                        />
                      </td>
                      <td className="agl">
                        <Link to="/">CEO직속</Link>
                      </td>
                    </tr>
                    <tr className="tr_13514">
                      <td className="bdr0">
                        <div className="treeTitle">
                          <label
                            className="i_check"
                            style={{
                              marginLeft: 2,
                              background: `url(${
                                require("assets/img/form/check-off.png").default
                              }) no-repeat`,
                            }}
                          >
                            <input name="checkbox" type="checkbox" />
                          </label>
                        </div>
                      </td>
                      <td className="bdr1">
                        <img
                          className="classDeptTree"
                          style={{ cursor: "pointer" }}
                          alt=""
                          src={
                            require("assets/img/form/ico_tree_off.gif").default
                          }
                        />
                      </td>
                      <td className="agl">
                        <Link to="/">커뮤니케이션본부</Link>
                        <Link className="personView" to="/">
                          <img
                            alt=""
                            src={
                              require("assets/img/icon/btn_show_peo.gif")
                                .default
                            }
                          />
                        </Link>
                      </td>
                    </tr>
                    <tr className="groupOne">
                      <td className="bdr0"> </td>
                      <td className="bdr1">
                        <div className="treeTitle">
                          <label
                            className="i_check"
                            style={{
                              marginLeft: 2,
                              background: `url(${
                                require("assets/img/form/check-off.png").default
                              }) no-repeat`,
                            }}
                          >
                            <input type="checkbox" />
                          </label>
                        </div>
                      </td>
                      <td className="agl">
                        <div className="d_tooltip">
                          임상혁&nbsp;&nbsp;&nbsp;(홍보위원 / ishhy)
                        </div>
                      </td>
                    </tr>
                    <tr className="tr_12749">
                      <td className="bdr0">
                        <div className="treeTitle">
                          <label
                            className="i_check"
                            style={{
                              marginLeft: 2,
                              background: `url(${
                                require("assets/img/form/check-off.png").default
                              }) no-repeat`,
                            }}
                          >
                            <input type="checkbox" />
                          </label>
                        </div>
                      </td>
                      <td className="bdr1">
                        <img
                          className="classDeptTree"
                          style={{ cursor: "pointer" }}
                          alt=""
                          src={
                            require("assets/img/form/ico_tree_off.gif").default
                          }
                        />
                      </td>
                      <td className="agl">
                        <Link to="/">전략기획본부</Link>
                        <Link className="personView" to="/">
                          <img
                            alt=""
                            src={
                              require("assets/img/icon/btn_show_peo.gif")
                                .default
                            }
                          />
                        </Link>
                      </td>
                    </tr>
                    <tr className="tr_12676">
                      <td className="bdr0">
                        <div className="treeTitle">
                          <label
                            className="i_check"
                            style={{
                              marginLeft: 2,
                              background: `url(${
                                require("assets/img/form/check-off.png").default
                              }) no-repeat`,
                            }}
                          >
                            <input name="checkbox" type="checkbox" />
                          </label>
                        </div>
                      </td>
                      <td className="bdr1">
                        <img
                          className="classDeptTree"
                          style={{ cursor: "pointer" }}
                          alt=""
                          src={
                            require("assets/img/form/ico_tree_off.gif").default
                          }
                        />
                      </td>
                      <td className="agl">
                        <Link to="/">경영지원본부</Link>
                        <Link className="personView" to="/">
                          <img
                            alt=""
                            src={
                              require("assets/img/icon/btn_show_peo.gif")
                                .default
                            }
                          />
                        </Link>
                      </td>
                    </tr>
                    <tr className="tr_12675">
                      <td className="bdr0">
                        <div className="treeTitle">
                          <label
                            className="i_check"
                            style={{
                              marginLeft: 2,
                              background: `url(${
                                require("assets/img/form/check-off.png").default
                              }) no-repeat`,
                            }}
                          >
                            <input name="checkbox" type="checkbox" />
                          </label>
                        </div>
                      </td>
                      <td className="bdr1">
                        <img
                          className="classDeptTree"
                          style={{ cursor: "pointer" }}
                          alt=""
                          src={
                            require("assets/img/form/ico_tree_off.gif").default
                          }
                        />
                      </td>
                      <td className="agl">
                        <Link to="/">철강부문</Link>
                        <Link className="personView" to="/">
                          <img
                            alt=""
                            src={
                              require("assets/img/icon/btn_show_peo.gif")
                                .default
                            }
                          />
                        </Link>
                      </td>
                      <td style={{ width: 0, display: "none" }} />
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="part_C">
          <div>
            <p className="btn_move" style={{ marginTop: 30 }}>
              <Link to="/">
                <img
                  alt=""
                  src={require("assets/img/popup/btn/btn_personR.png").default}
                />
              </Link>
              <Link to="/">
                <img
                  alt=""
                  src={require("assets/img/popup/btn/btn_personL.png").default}
                />
              </Link>
            </p>
            <p className="btn_move" style={{ marginTop: 130 }}>
              <Link to="/">
                <img
                  alt=""
                  src={require("assets/img/popup/btn/btn_personR.png").default}
                />
              </Link>
              <Link to="/">
                <img
                  alt=""
                  src={require("assets/img/popup/btn/btn_personL.png").default}
                />
              </Link>
            </p>
          </div>
        </div>
        <div className="part_R section_2">
          <div className="sub" style={{ marginTop: 0 }}>
            <span className="floatL" style={{ width: 250 }}>
              <strong>Edit/View</strong>
            </span>
            <span className="floatR">
              <Link
                className="btn_delall"
                to="/"
                style={{
                  background: `url(${
                    require("assets/img/popup/bg/bg_btnGray.gif").default
                  }) 0 0 repeat`,
                }}
              >
                Delete All
              </Link>
            </span>
          </div>
          <div className="roleT">
            <table className="personTb">
              <caption>사람 목록</caption>
              <colgroup>
                <col width={50} />
                <col width="*" />
              </colgroup>
              <tbody></tbody>
            </table>
          </div>

          <p className="btn_move">
            <Link to="/">
              <img
                alt=""
                src={require("assets/img/popup/btn/btn_personD.png").default}
              />
            </Link>
            <Link to="/">
              <img
                alt=""
                src={require("assets/img/popup/btn/btn_personU.png").default}
              />
            </Link>
            <Link to="/">
              <img
                alt=""
                src={require("assets/img/popup/btn/btn_personB.png").default}
              />
            </Link>
          </p>

          <div className="sub" style={{ marginTop: 17 }}>
            <span className="floatL" style={{ width: 250 }}>
              <strong>View</strong>
            </span>
            <span className="floatR">
              <Link
                className="btn_delall"
                to="/"
                style={{
                  background: `url(${
                    require("assets/img/popup/bg/bg_btnGray.gif").default
                  }) 0 0 repeat`,
                }}
              >
                Delete All
              </Link>
            </span>
          </div>
          <div className="roleT">
            <table className="personTb">
              <colgroup>
                <col width={50} />
                <col width="*" />
              </colgroup>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Frame
      width="830"
      height="550"
      frameBorder="0"
      scrolling="no"
      head={
        <style>
          {globalStyles}
          {layoutStyles}
          {bbsStyles}
          {popColumnRStyles}
          {ecmPopupStyles}
          {roleAssignEditStyles}
        </style>
      }
    >
      {tabRoleBody}
    </Frame>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employeeReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initState: () => dispatch(act.initState()),
    searchByName: (name) => dispatch(act.searchByName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAssignEdit);
