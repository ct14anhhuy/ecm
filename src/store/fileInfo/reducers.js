import * as types from "./types";

const initState = {
  data: [],
  done: false,
  error: false,
};

const fileInfoReducers = (state = initState, action) => {
  switch (action.type) {
    case types.GET_MY_CONTENTS:
    case types.GET_IMPORTANT_CONTENTS:
    case types.GET_FAVORITE_CONTENTS:
    case types.GET_SHARED_CONTENTS:
    case types.GET_DEPARTMENT_CONTENTS:
    case types.GET_TRASH_CONTENTS:
    case types.GET_CONTENTS_FROM_PATH:
    case types.SEARCH_CONTENTS:
      return { ...state, data: [...action.payload.fileInfos] };
    case types.CHANGE_FAVORITE: {
      const prevState = [...state.data];
      const editId = prevState.findIndex((f) => f.id === action.payload.id);
      prevState[editId] = {
        ...state.data[editId],
        isFavorite: !prevState[editId].isFavorite,
      };
      return { ...state, data: prevState };
    }
    case types.CHANGE_IMPORTANT: {
      const prevState = [...state.data];
      const editId = prevState.findIndex((f) => f.id === action.payload.id);
      prevState[editId] = {
        ...prevState[editId],
        isImportant: !prevState[editId].isImportant,
      };
      return { ...state, data: prevState };
    }
    case types.CHANGE_CHECKED: {
      const prevState = [...state.data];
      const editId = prevState.findIndex((f) => f.id === action.payload.id);
      prevState[editId] = {
        ...prevState[editId],
        checked: action.payload.checked,
      };
      return { ...state, data: prevState };
    }
    case types.SELECT_MULTI: {
      const editIds = action.payload.fileIds;
      const newState = state.data.map((f) =>
        editIds.includes(f.id)
          ? { ...f, checked: action.payload.checked }
          : { ...f, checked: false }
      );
      return { ...state, data: newState };
    }
    case types.MOVE_TO_TRASH: {
      const removeIds = action.payload.fileIds;
      const newState = state.data.filter((f) => !removeIds.includes(f.id));
      return { ...state, data: newState };
    }
    case types.RECOVER_FILE: {
      const recoverIds = action.payload.fileIds;
      const newState = state.data.filter((f) => !recoverIds.includes(f.id));
      return { ...state, data: newState };
    }
    case types.DELETE_FILE: {
      const deleteIds = action.payload.fileIds;
      const newState = state.data.filter((f) => !deleteIds.includes(f.id));
      return { ...state, data: newState };
    }
    case types.EDIT_FILE: {
      const prevState = [...state.data];
      const fileInfo = action.payload.fileInfo;
      const editId = prevState.findIndex((f) => f.id === fileInfo.id);
      prevState[editId] = {
        ...prevState[editId],
        name: fileInfo.name,
        directoryId: fileInfo.directoryId,
        securityLevel: fileInfo.securityLevel,
        tag: fileInfo.tag,
      };
      return { ...state, data: prevState };
    }
    case types.BEGIN_UPDATE_FILE:
      return { ...state, done: false, error: false };
    case types.UPDATE_FILE_SUCCESS:
      return { ...state, done: true, error: false };
    case types.UPDATE_FILE_FAILURE:
      return { ...state, done: true, error: true };
    default:
      return state;
  }
};

export default fileInfoReducers;
