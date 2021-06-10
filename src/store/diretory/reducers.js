import * as types from "./types";

const initState = {
  data: [],
  done: false,
  error: false
};

const directoryReducers = (state = initState, action) => {
  switch (action.type) {
    case types.GET_DIRECTORIES:
      return { ...state, data: action.payload.directories };
    case types.DELETE_DIRECTORY: {
      const deleteIds = action.payload.id;
      const newState = state.data.filter(f => f.id !== deleteIds);
      return { ...state, data: newState };
    }
    case types.BEGIN_UPDATE_DIRECTORY:
      return { ...state, done: false, error: false };
    case types.UPDATE_DIRECTORY_SUCCESS:
      return {
        ...state,
        done: true,
        error: false,
        data: [...state.data, action.payload.directory]
      };
    case types.UPDATE_DIRECTORY_FAILURE:
      return { ...state, done: true, error: true };
    default:
      return state;
  }
};

export default directoryReducers;
