import * as types from "./types";

const employeeReducers = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.payload.employee;
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default employeeReducers;
