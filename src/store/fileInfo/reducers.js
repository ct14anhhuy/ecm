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
    case types.CHANGE_FAVORITE:
      const stateFav = [...state.data];
      const idEditFav = stateFav.findIndex((f) => f.id === action.payload.id);
      stateFav[idEditFav] = {
        ...state.data[idEditFav],
        isFavorite: !stateFav[idEditFav].isFavorite,
      };
      return { ...state, data: stateFav };
    case types.CHANGE_IMPORTANT:
      const stateImp = [...state.data];
      const idEditImp = stateImp.findIndex((f) => f.id === action.payload.id);
      stateImp[idEditImp] = {
        ...stateImp[idEditImp],
        isImportant: !stateImp[idEditImp].isImportant,
      };
      return { ...state, data: stateImp };
    case types.BEGIN_UPDATE:
      return { ...state, done: false, error: false };
    case types.UPDATE_SUCCESS:
      return { ...state, done: true, error: false };
    case types.UPDATE_FAILURE:
      return { ...state, done: true, error: true };
    default:
      return state;
  }
};

export default fileInfoReducers;
