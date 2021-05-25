import * as types from "./types";

const initState = { data: [] };

const departmentReducers = (state = initState, action) => {
  switch (action.type) {
    case types.GET_DEPARTMENTS:
      return { ...state, data: [...action.payload.departments] };
    default:
      return state;
  }
};

export default departmentReducers;
