import * as types from "./types";

const changeHeaderPathAction = path => {
  return {
    type: types.CHANGE_HEADER_PATH,
    payload: {
      path
    }
  };
};

const changeMenuActiveAction = shortcutActive => {
  return {
    type: types.CHANGE_MENU_ACTIVE,
    payload: {
      shortcutActive
    }
  };
};

const changeCurrentDirectoryAction = (id, isRoot) => {
  return {
    type: types.CHANGE_CURRENT_DIRECTORY,
    payload: {
      id,
      isRoot
    }
  };
};

const changeShowAddFileAction = () => {
  return {
    type: types.CHANGE_SHOW_ADD_FILE
  };
};

const changeShowEditFileAction = () => {
  return {
    type: types.CHANGE_SHOW_EDIT_FILE
  };
};

const changeShowCreateDirectoryAction = () => {
  return {
    type: types.CHANGE_SHOW_CREATE_DIRECTORY
  };
};

const changeShowOpenContentAction = () => {
  return {
    type: types.CHANGE_SHOW_OPEN_CONTENT
  };
};

const changeSelectedItemAction = selectedItem => {
  return {
    type: types.CHANGE_SELECTED_ITEM,
    payload: {
      selectedItem
    }
  };
};

const changeEditItemAction = editItem => {
  return {
    type: types.CHANGE_EDIT_ITEM,
    payload: {
      editItem
    }
  };
};

export {
  changeHeaderPathAction,
  changeMenuActiveAction,
  changeCurrentDirectoryAction,
  changeShowAddFileAction,
  changeShowEditFileAction,
  changeShowCreateDirectoryAction,
  changeShowOpenContentAction,
  changeSelectedItemAction,
  changeEditItemAction
};
