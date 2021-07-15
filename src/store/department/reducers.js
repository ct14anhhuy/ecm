import * as types from "./types";
import produce from "immer";

const initState = { data: [] };

const departmentReducers = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_DEPARTMENTS:
        draft.data = action.payload.departments;
        break;
      default:
        return state;
    }
  });

export default departmentReducers;
