import * as types from "./types";

const initState = { data: [], sharedEmps: [] };

const employeeReducers = (state = initState, action) => {
  switch (action.type) {
    case types.SEARCH_BY_NAME:
    case types.GET_BY_DEPARTMENT:
      return { ...state, data: [...action.payload.employees] };
    case types.GET_FILE_SHARED:
      return { ...state, sharedEmps: [...action.payload.employees] };
    default:
      return state;
  }
};

export default employeeReducers;
