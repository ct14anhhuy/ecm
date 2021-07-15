import * as types from "./types";
import produce from "immer";

const initState = { data: [], fileShared: [] };

const employeeReducers = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.SEARCH_BY_NAME:
      case types.GET_BY_DEPARTMENT:
        draft.data = action.payload.employees;
        break;
      case types.GET_FILE_SHARED:
        draft.fileShared = action.payload.fileShared;
        break;
      default:
        return state;
    }
  });

export default employeeReducers;
