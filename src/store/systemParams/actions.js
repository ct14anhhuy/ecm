import * as types from "./types";

const changeHeaderPathAction = (path) => {
  return {
    type: types.CHANGE_HEADER_PATH,
    payload: {
      path,
    },
  };
};

const changeMenuActiveAction = (shortcutActive) => {
  return {
    type: types.CHANGE_MENU_ACTIVE,
    payload: {
      shortcutActive,
    },
  };
};

const changeCurrentDirectoryAction = (id, isRoot) => {
  return {
    type: types.CHANGE_CURRENT_DIRECTORY,
    payload: {
      id,
      isRoot,
    },
  };
};

export {
  changeHeaderPathAction,
  changeMenuActiveAction,
  changeCurrentDirectoryAction,
};
