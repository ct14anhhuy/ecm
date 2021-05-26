import * as types from "./types";

const initState = {
  data: [],
  done: false,
  error: false,
};

const directoryReducers = (state = initState, action) => {
  switch (action.type) {
    case types.GET_DIRECTORIES:
      return { ...state, data: action.payload.directories };
    case types.BEGIN_UPDATE:
      return { ...state, done: false, error: false };
    case types.UPDATE_SUCCESS:
      return {
        ...state,
        done: true,
        error: false,
        data: [...state.data, action.payload.directory],
      };
    case types.UPDATE_FAILURE:
      return { ...state, done: true, error: true };
    default:
      return state;
  }
};

export default directoryReducers;
