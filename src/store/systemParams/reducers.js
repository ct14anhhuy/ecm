import * as types from "./types";

const initState = {
  headerPath: "My Contents",
  currentDirectory: {
    id: 0,
    isRoot: true,
  },
  menuActive: true,
};

const systemParamsReducers = (state = initState, action) => {
  switch (action.type) {
    case types.CHANGE_HEADER_PATH:
      return { ...state, headerPath: action.payload.path };
    case types.CHANGE_MENU_ACTIVE:
      return { ...state, menuActive: action.payload.shortcutActive };
    case types.CHANGE_CURRENT_DIRECTORY:
      return {
        ...state,
        currentDirectory: {
          ...state.currentDirectory,
          id: action.payload.id,
          isRoot: action.payload.isRoot,
        },
      };
    default:
      return state;
  }
};

export default systemParamsReducers;
