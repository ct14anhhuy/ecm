import * as types from "./types";

const initState = {
  id: null,
  epLiteId: "",
  firstName: "",
  lastName: "",
  departmentId: null,
  roleId: "",
};

const empployeeReducers = (state = initState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const employee = action.payload.employee;
      return {
        ...state,
        id: employee.Id,
        epLiteId: employee.EpLiteId,
        firstName: employee.FirstName,
        lastName: employee.LastName,
        departmentId: employee.DepartmentId,
        roleId: employee.RoleId,
      };
    case types.LOGOUT:
      return initState;
    default:
      return state;
  }
};

export default empployeeReducers;
