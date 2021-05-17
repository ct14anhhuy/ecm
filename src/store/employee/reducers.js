import * as types from "./types";

const employeeReducers = (state = [], action) => {
  switch (action.type) {
    case types.SEARCH_BY_NAME:
    case types.GET_BY_DEPARTMENT:
      return [...action.payload.employees];
    default:
      return state;
  }
};

export default employeeReducers;
