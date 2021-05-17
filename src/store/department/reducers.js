import * as types from "./types";

const departmentReducers = (state = [], action) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS:
      return [...action.payload.departments];
    default:
      return state;
  }
};

export default departmentReducers;
