import * as types from "./types";
import produce from "immer";

const initState = {
  paginationSet: {
    pageIndex: 1,
    pageSize: 15,
    totalRows: 0,
    filterExtension: "ALL"
  },
  data: [],
  loading: false,
  done: false,
  error: ""
};

const fileInfoReducers = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_MY_CONTENTS:
      case types.GET_IMPORTANT_CONTENTS:
      case types.GET_FAVORITE_CONTENTS:
      case types.GET_SHARED_CONTENTS:
      case types.GET_DEPARTMENT_CONTENTS:
      case types.GET_TRASH_CONTENTS:
      case types.GET_CONTENTS_FROM_PATH:
      case types.SEARCH_CONTENTS:
        draft.data = action.payload.fileInfos;
        draft.paginationSet.pageIndex = action.payload.pagedSet.pageIndex;
        draft.paginationSet.pageSize = action.payload.pagedSet.pageSize;
        draft.paginationSet.totalRows = action.payload.pagedSet.totalRows;
        break;
      case types.CHANGE_FAVORITE: {
        const editId = draft.data.findIndex(f => f.id === action.payload.id);
        draft.data[editId].isFavorite = !draft.data[editId].isFavorite;
        break;
      }
      case types.CHANGE_IMPORTANT: {
        const editId = draft.data.findIndex(f => f.id === action.payload.id);
        draft.data[editId].isImportant = !draft.data[editId].isImportant;
        break;
      }
      case types.CHANGE_CHECKED: {
        const editId = draft.data.findIndex(f => f.id === action.payload.id);
        draft.data[editId].checked = action.payload.checked;
        break;
      }
      case types.SELECT_MULTI: {
        const editIds = action.payload.fileIds;
        draft.data = draft.data.map(f =>
          editIds.includes(f.id)
            ? { ...f, checked: action.payload.checked }
            : { ...f, checked: false }
        );
        break;
      }
      case types.MOVE_TO_TRASH:
        const removeIds = action.payload.fileIds;
        draft.data = draft.data.filter(f => !removeIds.includes(f.id));
        break;
      case types.RECOVER_FILE:
        const recoverIds = action.payload.fileIds;
        draft.data = draft.data.filter(f => !recoverIds.includes(f.id));
        break;
      case types.DELETE_FILE:
        const deleteIds = action.payload.fileIds;
        draft.data = draft.data.filter(f => !deleteIds.includes(f.id));
        break;
      case types.EDIT_FILE: {
        const fileInfo = action.payload.fileInfo;
        const editId = draft.data.findIndex(f => f.id === fileInfo.id);
        draft.data[editId].name = fileInfo.name;
        draft.data[editId].directoryId = fileInfo.directoryId;
        draft.data[editId].securityLevel = fileInfo.securityLevel;
        draft.data[editId].tag = fileInfo.tag;
        break;
      }
      case types.UPDATE_PAGE_SIZE:
        draft.paginationSet.pageSize = action.payload.pageSize;
        break;
      case types.UPDATE_FILTER_EXTENSION:
        draft.paginationSet.filterExtension = action.payload.filterExtension;
        break;
      case types.BEGIN_UPDATE_FILE:
        draft.loading = true;
        draft.done = false;
        draft.error = "";
        break;
      case types.UPDATE_FILE_SUCCESS:
        draft.loading = false;
        draft.done = true;
        draft.error = "";
        break;
      case types.UPDATE_FILE_FAILURE:
        draft.loading = false;
        draft.done = true;
        draft.error = action.payload.error;
        break;
      default:
        return state;
    }
  });

export default fileInfoReducers;
