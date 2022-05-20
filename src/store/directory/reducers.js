import * as types from "./types";
import produce from "immer";

const initState = {
  data: [],
  loading: false,
  done: false,
  error: "",
};

const directoryReducers = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_DIRECTORIES:
        draft.data = action.payload.directories;
        break;
      case types.DELETE_DIRECTORY:
        draft.data = draft.data.filter(f => f.id !== action.payload.id);
        break;
      case types.BEGIN_UPDATE_DIRECTORY:
        draft.loading = true;
        draft.done = false;
        draft.error = "";
        break;
      case types.UPDATE_DIRECTORY_SUCCESS:
        draft.loading = false;
        draft.done = true;
        draft.error = "";
        draft.data.push(action.payload.directory);
        break;
      case types.UPDATE_DIRECTORY_FAILURE:
        draft.loading = false;
        draft.done = true;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default directoryReducers;
