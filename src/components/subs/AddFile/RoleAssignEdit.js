import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import * as act from "store/employee/actions";

import styles from "./RoleAssignEdit.module.css";

const RoleAssignEdit = (props) => {
  const [employees, setEmployees] = useState([]);
  const [editRoles, setEditRoles] = useState([]);
  const [viewRoles, setViewRoles] = useState([]);

  const [selectName, setSelectName] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  const firstUpdate = useRef(true);

  const handleSearch = () => {
    props.searchByName(searchStr);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setEmployees(employees.map((emp) => ({ ...emp, selected: !selectAll })));
  };

  const handleSelect = (empId) => {
    const newArr = [...employees];
    const arrId = newArr.findIndex((emp) => emp.id === empId);
    newArr[arrId].selected = !newArr[arrId].selected;
    setEmployees(newArr);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setEmployees(
      props.employees.map((emp) => Object.assign({}, emp, { selected: false }))
    );
  }, [props.employees]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className={styles.roleAssignBody}>
        <div
          className={`${styles.positionBox} ${styles.type_2}`}
          style={{ width: 800 }}
        >
          <div className={styles.positionSearch}>
            <div className={styles.part_L}>
              <table className={styles.popTb}>
                <colgroup>
                  <col width={86} />
                  <col width="*" />
                </colgroup>
                <tbody>
                  <tr>
                    <th height={25}>Owner</th>
                    <td className={styles.account0}>
                      <div className={styles.innerPad0}>POSCO ICT</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.contents}>
                <ul className={styles.tabUL}>
                  <li>
                    <Link
                      className={selectName ? styles.on : ""}
                      to="/"
                      onClick={() => setSelectName(true)}
                    >
                      Name
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/"
                      className={selectName ? "" : styles.on}
                      onClick={() => setSelectName(false)}
                    >
                      Department
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={styles.roleBox01}
                style={selectName ? { display: "block" } : { display: "none" }}
              >
                <input
                  className={styles.search}
                  style={{ msImeMode: "active" }}
                  type="text"
                  defaultValue={searchStr}
                  onChange={(e) => {
                    setSearchStr(e.target.value);
                  }}
                />
                <Link to="/" onClick={handleSearch}>
                  <img
                    style={{ marginTop: 6 }}
                    alt=""
                    src={require("assets/img/popup/bg/bg_search.gif").default}
                  />
                </Link>
                <div className={styles.count_box}>
                  <div className={styles.allCheck}>
                    <span>
                      <label
                        className={`${styles.i_check} ${
                          selectAll ? styles.c_on : ""
                        }`}
                      >
                        <input
                          name="checkbox"
                          type="checkbox"
                          defaultValue={selectAll}
                          onChange={handleSelectAll}
                        />
                      </label>
                    </span>
                  </div>
                  <p className={styles.count}>
                    Select
                    <span className={styles.red}>
                      {employees.filter((emp) => emp.selected).length}
                    </span>
                    /Total
                    <span className={styles.blue}>{employees.length}</span>
                  </p>
                  <Link
                    className={styles.btn_delall}
                    to="/"
                    onClick={() => setEmployees([])}
                  >
                    Delete All
                  </Link>
                </div>
                <div className={`${styles.maxH} ${styles.type_2}`}>
                  <div className={styles.marR16}>
                    <table
                      className={styles.normalTb}
                      style={{ width: "100%" }}
                    >
                      <tbody>
                        {employees.map((emp) => (
                          <tr key={emp.id}>
                            <td>
                              <div className={styles.contentTitle}>
                                <label
                                  className={`${styles.i_check} ${
                                    emp.selected ? styles.c_on : ""
                                  }`}
                                >
                                  <input
                                    name="checkbox"
                                    type="checkbox"
                                    onChange={() => handleSelect(emp.id)}
                                  />
                                </label>
                                <span className={styles.checkTxt}>
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
                className={styles.partBox01}
                style={selectName ? { display: "none" } : { display: "block" }}
              >
                <input className={styles.search} type="text" />
                <Link to="/">
                  <img
                    style={{ marginTop: 5 }}
                    alt=""
                    src={require("assets/img/popup/bg/bg_search.gif").default}
                  />
                </Link>
                <div className={`${styles.maxH} ${styles.type_4}`}>
                  <div style={{ display: "none" }}>
                    <select
                      className={styles.selectyze}
                      style={{ display: "none" }}
                    >
                      <option>포스코</option>
                    </select>
                    <div
                      className={`${styles.DivSelectyze} ${styles.grey}`}
                      style={{ zIndex: 9999 }}
                    >
                      <Link className={styles.selectyzeValue} to="/">
                        <span>포스코</span>
                      </Link>
                      <ul className={styles.UlSelectize}>
                        <li>
                          <Link to="/">포스코</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.marR17} style={{ background: "none" }}>
                    <table className={styles.tblFolder}>
                      <colgroup>
                        <col width={35} />
                        <col width={30} />
                        <col width="*" />
                      </colgroup>
                      <tbody>
                        <tr className={styles.tr_10873}>
                          <td className={styles.bdr0}>
                            <div className={styles.treeTitle}>
                              <label
                                className={styles.i_check}
                                style={{
                                  marginLeft: 2,
                                }}
                              >
                                <input name="checkbox" type="checkbox" />
                              </label>
                            </div>
                          </td>
                          <td className={styles.bdr1}>
                            <img
                              alt=""
                              src={
                                require("assets/img/form/ico_tree_on.gif")
                                  .default
                              }
                            />
                          </td>
                          <td className={styles.agl}>
                            <strong>임원</strong>
                            <Link className={styles.personView} to="/">
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
                        <tr className={styles.tr_10002}>
                          <td className={styles.bdr0}>
                            <div className={styles.treeTitle}>
                              <label className={styles.i_check}>
                                <input name="checkbox" type="checkbox" />
                              </label>
                            </div>
                          </td>
                          <td className={styles.bdr1}>
                            <img
                              className={styles.classDeptTree}
                              style={{ cursor: "pointer" }}
                              alt=""
                              src={
                                require("assets/img/form/ico_tree_off.gif")
                                  .default
                              }
                            />
                          </td>
                          <td className={styles.agl}>
                            <Link to="/">CEO직속</Link>
                          </td>
                        </tr>
                        <tr className={styles.tr_13514}>
                          <td className={styles.bdr0}>
                            <div className={styles.treeTitle}>
                              <label className={styles.i_check}>
                                <input name="checkbox" type="checkbox" />
                              </label>
                            </div>
                          </td>
                          <td className={styles.bdr1}>
                            <img
                              className={styles.classDeptTree}
                              style={{ cursor: "pointer" }}
                              alt=""
                              src={
                                require("assets/img/form/ico_tree_off.gif")
                                  .default
                              }
                            />
                          </td>
                          <td className={styles.agl}>
                            <Link to="/">커뮤니케이션본부</Link>
                            <Link className={styles.personView} to="/">
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
                        <tr className={styles.groupOne}>
                          <td className={styles.bdr0}> </td>
                          <td className={styles.bdr1}>
                            <div className={styles.treeTitle}>
                              <label className={styles.i_check}>
                                <input type="checkbox" />
                              </label>
                            </div>
                          </td>
                          <td className={styles.agl}>
                            <div className={styles.d_tooltip}>
                              임상혁&nbsp;&nbsp;&nbsp;(홍보위원 / ishhy)
                            </div>
                          </td>
                        </tr>
                        <tr className={styles.tr_12749}>
                          <td className={styles.bdr0}>
                            <div className={styles.treeTitle}>
                              <label className={styles.i_check}>
                                <input type="checkbox" />
                              </label>
                            </div>
                          </td>
                          <td className={styles.bdr1}>
                            <img
                              className={styles.classDeptTree}
                              style={{ cursor: "pointer" }}
                              alt=""
                              src={
                                require("assets/img/form/ico_tree_off.gif")
                                  .default
                              }
                            />
                          </td>
                          <td className={styles.agl}>
                            <Link to="/">전략기획본부</Link>
                            <Link className={styles.personView} to="/">
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
                        <tr className={styles.tr_12676}>
                          <td className={styles.bdr0}>
                            <div className={styles.treeTitle}>
                              <label className={styles.i_check}>
                                <input name="checkbox" type="checkbox" />
                              </label>
                            </div>
                          </td>
                          <td className={styles.bdr1}>
                            <img
                              className={styles.classDeptTree}
                              style={{ cursor: "pointer" }}
                              alt=""
                              src={
                                require("assets/img/form/ico_tree_off.gif")
                                  .default
                              }
                            />
                          </td>
                          <td className={styles.agl}>
                            <Link to="/">경영지원본부</Link>
                            <Link className={styles.personView} to="/">
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
                        <tr className={styles.tr_12675}>
                          <td className={styles.bdr0}>
                            <div className={styles.treeTitle}>
                              <label className={styles.i_check}>
                                <input name="checkbox" type="checkbox" />
                              </label>
                            </div>
                          </td>
                          <td className={styles.bdr1}>
                            <img
                              className={styles.classDeptTree}
                              style={{ cursor: "pointer" }}
                              alt=""
                              src={
                                require("assets/img/form/ico_tree_off.gif")
                                  .default
                              }
                            />
                          </td>
                          <td className={styles.agl}>
                            <Link to="/">철강부문</Link>
                            <Link className={styles.personView} to="/">
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
            <div className={styles.part_C}>
              <div>
                <p className={styles.btn_move} style={{ marginTop: 30 }}>
                  <Link to="/">
                    <img
                      alt=""
                      src={
                        require("assets/img/popup/btn/btn_personR.png").default
                      }
                    />
                  </Link>
                  <Link to="/">
                    <img
                      alt=""
                      src={
                        require("assets/img/popup/btn/btn_personL.png").default
                      }
                    />
                  </Link>
                </p>
                <p className={styles.btn_move} style={{ marginTop: 130 }}>
                  <Link to="/">
                    <img
                      alt=""
                      src={
                        require("assets/img/popup/btn/btn_personR.png").default
                      }
                    />
                  </Link>
                  <Link to="/">
                    <img
                      alt=""
                      src={
                        require("assets/img/popup/btn/btn_personL.png").default
                      }
                    />
                  </Link>
                </p>
              </div>
            </div>
            <div className={`${styles.part_R} ${styles.section_2}`}>
              <div className={styles.sub} style={{ marginTop: 0 }}>
                <span className={styles.floatL} style={{ width: 250 }}>
                  <strong>Edit</strong>
                </span>
                <span className={styles.floatR}>
                  <Link className={styles.btn_delall} to="/">
                    Delete All
                  </Link>
                </span>
              </div>
              <div className={styles.roleT}>
                <table className={styles.personTb}>
                  <caption>사람 목록</caption>
                  <colgroup>
                    <col width={50} />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    {employees.map((emp) => (
                      <tr
                        key={emp.id}
                        className={emp.selected ? styles.on : ""}
                        onClick={() => handleSelect(emp.id)}
                      >
                        <td>
                          <div className={styles.contentTitle}>
                            <label
                              className={`${styles.i_check} ${
                                emp.selected ? styles.c_on : ""
                              }`}
                            >
                              <input
                                name="checkbox"
                                type="checkbox"
                                onChange={() => handleSelect(emp.id)}
                              />
                            </label>
                            <span className={styles.checkTxt}>
                              {`${emp.lastName} ${emp.firstName}`}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className={styles.btn_move}>
                <Link to="/">
                  <img
                    alt=""
                    src={
                      require("assets/img/popup/btn/btn_personD.png").default
                    }
                  />
                </Link>
                <Link to="/">
                  <img
                    alt=""
                    src={
                      require("assets/img/popup/btn/btn_personU.png").default
                    }
                  />
                </Link>
                <Link to="/">
                  <img
                    alt=""
                    src={
                      require("assets/img/popup/btn/btn_personB.png").default
                    }
                  />
                </Link>
              </p>

              <div className={styles.sub} style={{ marginTop: 17 }}>
                <span className={styles.floatL} style={{ width: 250 }}>
                  <strong>View</strong>
                </span>
                <span className={styles.floatR}>
                  <Link className={styles.btn_delall} to="/">
                    Delete All
                  </Link>
                </span>
              </div>
              <div className={styles.roleT}>
                <table className={styles.personTb}>
                  <colgroup>
                    <col width={50} />
                    <col width="*" />
                  </colgroup>
                  <tbody>
                    {employees.map((emp) => (
                      <tr
                        key={emp.id}
                        className={emp.selected ? styles.on : ""}
                        onClick={() => handleSelect(emp.id)}
                      >
                        <td>
                          <div className={styles.contentTitle}>
                            <label
                              className={`${styles.i_check} ${
                                emp.selected ? styles.c_on : ""
                              }`}
                            >
                              <input
                                name="checkbox"
                                type="checkbox"
                                onChange={() => handleSelect(emp.id)}
                              />
                            </label>
                            <span className={styles.checkTxt}>
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
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    employees: state.employeeReducers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchByName: (name) => dispatch(act.searchByName(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAssignEdit);
