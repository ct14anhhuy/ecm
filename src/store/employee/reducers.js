import * as types from "./types";

const initState = { data: [], fileShared: [] };

const employeeReducers = (state = initState, action) => {
  switch (action.type) {
    case types.SEARCH_BY_NAME:
    case types.GET_BY_DEPARTMENT:
      return { ...state, data: [...action.payload.employees] };
    case types.GET_FILE_SHARED:
      return { ...state, fileShared: [...action.payload.fileShared] };
    default:
      return state;
  }
};

export default employeeReducers;
