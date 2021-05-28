import * as types from "./types";

const initState = {
  headerPath: "My Contents",
  currentDirectory: {
    id: 0,
    isRoot: true,
  },
  menuActive: true,
  showAddFile: false,
  showEditFile: false,
  showCreateDirectory: false,
  showOpenContent: false,
  selectedItem: {},
  editItem: {},
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
    case types.CHANGE_SHOW_ADD_FILE:
      return { ...state, showAddFile: !state.showAddFile };
    case types.CHANGE_SHOW_EDIT_FILE:
      return { ...state, showEditFile: !state.showEditFile };
    case types.CHANGE_SHOW_CREATE_DIRECTORY:
      return { ...state, showCreateDirectory: !state.showCreateDirectory };
    case types.CHANGE_SHOW_OPEN_CONTENT:
      return { ...state, showOpenContent: !state.showOpenContent };
    case types.CHANGE_SELECTED_ITEM:
      return { ...state, selectedItem: action.payload.selectedItem };
    case types.CHANGE_EDIT_ITEM:
      return { ...state, editItem: action.payload.editItem };
    default:
      return state;
  }
};

export default systemParamsReducers;
