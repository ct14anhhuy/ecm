import { Link } from "react-router-dom";
import { useEffect, useRef, useState, Fragment } from "react";
import { connect } from "react-redux";
import {
  searchByNameAction,
  getByDepartmentAction
} from "store/employee/actions";

import styles from "assets/css/modules/RoleAssignEdit.module.css";

const RoleAssignEdit = props => {
  const { owner, editRoles, setEditRoles, viewRoles, setViewRoles } = props;

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectName, setSelectName] = useState(true);
  const [selectAll, setSelectAll] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setEmployees(
      props.employees.map(emp => Object.assign({}, emp, { selected: false }))
    );
  }, [props.employees]);

  useEffect(() => {
    const deps = props.departments.map(dep =>
      Object.assign({}, dep, { selected: false, expanded: false })
    );
    const result = deps.map(dep => ({
      ...dep,
      employees: dep.employees.map(emp =>
        Object.assign({}, emp, { selected: false })
      )
    }));
    setDepartments(result);
  }, [props.departments]);

  const handleMoveToEdit = () => {
    let checkedEmps = [];
    if (selectName) {
      checkedEmps = employees.filter(emp => emp.selected);
    } else {
      const newArr = [...departments];
      const checkedDeps = newArr.filter(dep =>
        dep.employees.some(emp => emp.selected)
      );
      for (const dep of checkedDeps) {
        checkedEmps = [
          ...checkedEmps,
          ...dep.employees.filter(emp => emp.selected)
        ];
      }
    }
    const result = checkedEmps.filter(
      emp =>
        !editRoles.some(cur => emp.id === cur.id) &&
        !viewRoles.some(cur => emp.id === cur.id)
    );
    setEditRoles([
      ...result.map(emp => ({ ...emp, selected: false })),
      ...editRoles
    ]);
  };

  const handleMoveToView = () => {
    let checkedEmps = [];
    if (selectName) {
      checkedEmps = employees.filter(emp => emp.selected);
    } else {
      const newArr = [...departments];
      const checkedDeps = newArr.filter(dep =>
        dep.employees.some(emp => emp.selected)
      );
      for (const dep of checkedDeps) {
        checkedEmps = [
          ...checkedEmps,
          ...dep.employees.filter(emp => emp.selected)
        ];
      }
    }
    const result = checkedEmps.filter(
      emp =>
        !editRoles.some(cur => emp.id === cur.id) &&
        !viewRoles.some(cur => emp.id === cur.id)
    );
    setViewRoles([
      ...result.map(emp => ({ ...emp, selected: false })),
      ...viewRoles
    ]);
  };

  const handleEditToLeft = () => {
    setEditRoles(editRoles.filter(emp => !emp.selected));
  };

  const handleViewToLeft = () => {
    setViewRoles(viewRoles.filter(emp => !emp.selected));
  };

  const handleEditToView = () => {
    const checkedEmps = editRoles.filter(emp => emp.selected);
    setEditRoles(editRoles.filter(emp => !emp.selected));
    setViewRoles([
      ...checkedEmps.map(emp => ({ ...emp, selected: false })),
      ...viewRoles
    ]);
  };

  const handleViewToEdit = () => {
    const checkedEmps = viewRoles.filter(emp => emp.selected);
    setViewRoles(viewRoles.filter(emp => !emp.selected));
    setEditRoles([
      ...checkedEmps.map(emp => ({ ...emp, selected: false })),
      ...editRoles
    ]);
  };

  const handleSearch = () => {
    props.searchByName(searchStr);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setEmployees(employees.map(emp => ({ ...emp, selected: !selectAll })));
  };

  const handleSelect = empId => {
    const newArr = [...employees];
    const arrId = newArr.findIndex(emp => emp.id === empId);
    newArr[arrId].selected = !newArr[arrId].selected;
    setEmployees(newArr);
  };

  const handleDepartmentSelect = depId => {
    const newArr = [...departments];
    const arrId = newArr.findIndex(dep => dep.id === depId);
    newArr[arrId].selected = !newArr[arrId].selected;
    newArr[arrId].employees = newArr[arrId].employees.map(emp => ({
      ...emp,
      selected: newArr[arrId].selected
    }));
    setDepartments(newArr);
  };

  const handleDepartmentExpanded = depId => {
    const newArr = [...departments];
    const arrId = newArr.findIndex(dep => dep.id === depId);
    newArr[arrId].expanded = !newArr[arrId].expanded;
    setDepartments(newArr);
  };

  const handleSelectEdit = empId => {
    const newArr = [...editRoles];
    const arrId = newArr.findIndex(emp => emp.id === empId);
    newArr[arrId].selected = !newArr[arrId].selected;
    setEditRoles(newArr);
  };

  const handleSelectView = empId => {
    const newArr = [...viewRoles];
    const arrId = newArr.findIndex(emp => emp.id === empId);
    newArr[arrId].selected = !newArr[arrId].selected;
    setViewRoles(newArr);
  };

  const handleSelectStaff = empId => {
    const newArr = [...departments];
    const arrId = newArr.findIndex(dep =>
      dep.employees.some(emp => emp.id === empId)
    );
    const childrenId = newArr[arrId].employees.findIndex(
      emp => emp.id === empId
    );
    newArr[arrId].employees[childrenId].selected =
      !newArr[arrId].employees[childrenId].selected;
    setDepartments(newArr);
  };

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
                      <div
                        className={styles.innerPad0}
                      >{`${owner.lastName} ${owner.firstName} (${owner.epLiteId})`}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={styles.contents}>
                <ul className={styles.tabUL}>
                  <li>
                    <Link
                      className={selectName ? styles.on : ""}
                      to="#"
                      onClick={() => setSelectName(true)}
                    >
                      Name
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
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
                  onChange={e => setSearchStr(e.target.value)}
                />
                <Link to="#" onClick={handleSearch}>
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
                      {" "}
                      {employees.filter(emp => emp.selected).length}
                    </span>
                    /Total
                    <span className={styles.blue}> {employees.length}</span>
                  </p>
                  <Link
                    className={styles.btn_delall}
                    to="#"
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
                        {employees.map(emp => (
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
                                  {`${emp.lastName} ${emp.firstName} (${emp.epLiteId})`}
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
                <div className={`${styles.maxH} ${styles.type_4}`}>
                  <div className={styles.marR17} style={{ background: "none" }}>
                    <table className={styles.tblFolder}>
                      <colgroup>
                        <col width={35} />
                        <col width={30} />
                        <col width="*" />
                      </colgroup>
                      <tbody>
                        {departments.map(dep => (
                          <Fragment key={dep.id}>
                            <tr className={styles.tr_10873}>
                              <td className={styles.bdr0}>
                                <div className={styles.treeTitle}>
                                  <label
                                    className={`${styles.i_check} ${
                                      dep.selected ? styles.c_on : ""
                                    }`}
                                    style={{
                                      marginLeft: 2
                                    }}
                                  >
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        handleDepartmentSelect(dep.id)
                                      }
                                    />
                                  </label>
                                </div>
                              </td>
                              <td className={styles.bdr1}>
                                <img
                                  alt=""
                                  style={{ cursor: "pointer" }}
                                  src={
                                    dep.expanded
                                      ? require("assets/img/form/ico_tree_on.gif")
                                          .default
                                      : require("assets/img/form/ico_tree_off.gif")
                                          .default
                                  }
                                  onClick={() =>
                                    handleDepartmentExpanded(dep.id)
                                  }
                                />
                              </td>
                              <td className={styles.agl}>
                                <strong>{dep.name}</strong>
                              </td>
                            </tr>
                            {dep.employees.map(emp => (
                              <tr
                                key={emp.id}
                                className={styles.groupOne}
                                style={!dep.expanded ? { display: "none" } : {}}
                              >
                                <td className={styles.bdr0}> </td>
                                <td className={styles.bdr1}>
                                  <div className={styles.treeTitle}>
                                    <label
                                      className={`${styles.i_check} ${
                                        emp.selected ? styles.c_on : ""
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        onChange={() =>
                                          handleSelectStaff(emp.id)
                                        }
                                      />
                                    </label>
                                  </div>
                                </td>
                                <td className={styles.agl}>
                                  <div className={styles.d_tooltip}>
                                    {`${emp.lastName} ${emp.firstName} (${emp.epLiteId})`}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.part_C}>
              <div>
                <p className={styles.btn_move} style={{ marginTop: 30 }}>
                  <Link to="#" onClick={handleMoveToEdit}>
                    <img
                      alt=""
                      src={
                        require("assets/img/popup/btn/btn_personR.png").default
                      }
                    />
                  </Link>
                  <Link to="#" onClick={handleEditToLeft}>
                    <img
                      alt=""
                      src={
                        require("assets/img/popup/btn/btn_personL.png").default
                      }
                    />
                  </Link>
                </p>
                <p className={styles.btn_move} style={{ marginTop: 130 }}>
                  <Link to="#" onClick={handleMoveToView}>
                    <img
                      alt=""
                      src={
                        require("assets/img/popup/btn/btn_personR.png").default
                      }
                    />
                  </Link>
                  <Link to="#" onClick={handleViewToLeft}>
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
                  <Link
                    className={styles.btn_delall}
                    to="#"
                    onClick={() => setEditRoles([])}
                  >
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
                    {editRoles.map(emp => (
                      <tr
                        key={emp.id}
                        className={emp.selected ? styles.on : ""}
                        onClick={() => handleSelectEdit(emp.id)}
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
                                onChange={() => handleSelectEdit(emp.id)}
                              />
                            </label>
                            <span className={styles.checkTxt}>
                              {`${emp.lastName} ${emp.firstName} (${emp.epLiteId})`}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.btn_move}>
                <Link to="#" onClick={handleEditToView}>
                  <img
                    alt=""
                    src={
                      require("assets/img/popup/btn/btn_personD.png").default
                    }
                  />
                </Link>
                <Link to="#" onClick={handleViewToEdit}>
                  <img
                    alt=""
                    src={
                      require("assets/img/popup/btn/btn_personU.png").default
                    }
                  />
                </Link>
              </p>
              <div className={styles.sub} style={{ marginTop: 17 }}>
                <span className={styles.floatL} style={{ width: 250 }}>
                  <strong>View</strong>
                </span>
                <span className={styles.floatR}>
                  <Link
                    className={styles.btn_delall}
                    to="#"
                    onClick={() => setViewRoles([])}
                  >
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
                    {viewRoles.map(emp => (
                      <tr
                        key={emp.id}
                        className={emp.selected ? styles.on : ""}
                        onClick={() => handleSelectView(emp.id)}
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
                                onChange={() => handleSelectView(emp.id)}
                              />
                            </label>
                            <span className={styles.checkTxt}>
                              {`${emp.lastName} ${emp.firstName} (${emp.epLiteId})`}
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

const mapStateToProps = state => {
  return {
    departments: state.departmentReducers.data,
    employees: state.employeeReducers.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchByName: name => dispatch(searchByNameAction(name)),
    getByDepartment: depId => dispatch(getByDepartmentAction(depId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleAssignEdit);
