import * as types from "./types";

const empployeeReducers = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return action.payload.employee;
    case types.LOGOUT:
      return {};
    default:
      return state;
  }
};

export default empployeeReducers;
