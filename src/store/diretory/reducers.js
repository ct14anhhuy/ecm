import * as types from "./types";

const directoryReducers = (state = [], action) => {
  switch (action.type) {
    case types.GET_DIRECTORIES:
      return action.payload.directories;
    default:
      return state;
  }
};

export default directoryReducers;
