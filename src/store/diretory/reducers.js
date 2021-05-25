import * as types from "./types";

const initState = {
  data: [],
};

const directoryReducers = (state = initState, action) => {
  switch (action.type) {
    case types.GET_DIRECTORIES:
      return { ...state, data: [...action.payload.directories] };
    default:
      return state;
  }
};

export default directoryReducers;
