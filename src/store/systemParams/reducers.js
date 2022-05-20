import * as types from "./types";
import produce from "immer";

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

const systemParamsReducers = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.CHANGE_HEADER_PATH:
        draft.headerPath = action.payload.path;
        break;
      case types.CHANGE_MENU_ACTIVE:
        draft.menuActive = action.payload.shortcutActive;
        break;
      case types.CHANGE_CURRENT_DIRECTORY:
        draft.currentDirectory.id = action.payload.id;
        draft.currentDirectory.isRoot = action.payload.isRoot;
        break;
      case types.CHANGE_SHOW_ADD_FILE:
        draft.showAddFile = !draft.showAddFile;
        break;
      case types.CHANGE_SHOW_EDIT_FILE:
        draft.showEditFile = !draft.showEditFile;
        break;
      case types.CHANGE_SHOW_CREATE_DIRECTORY:
        draft.showCreateDirectory = !draft.showCreateDirectory;
        break;
      case types.CHANGE_SHOW_OPEN_CONTENT:
        draft.showOpenContent = !draft.showOpenContent;
        break;
      case types.CHANGE_SELECTED_ITEM:
        draft.selectedItem = action.payload.selectedItem;
        break;
      case types.CHANGE_EDIT_ITEM:
        draft.editItem = action.payload.editItem;
        break;
      default:
        return state;
    }
  });

export default systemParamsReducers;
