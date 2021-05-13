import * as types from "./types";

const fileInfoReducers = (state = [], action) => {
  switch (action.type) {
    case types.GET_MY_CONTENTS:
    case types.GET_IMPORTANT_CONTENTS:
    case types.GET_FAVORITE_CONTENTS:
    case types.GET_SHARED_CONTENTS:
    case types.GET_DEPARTMENT_CONTENTS:
    case types.GET_TRASH_CONTENTS:
    case types.GET_CONTENTS_FROM_PATH:
    case types.SEARCH_CONTENTS:
      return [...action.payload.fileInfos];
    case types.CHANGE_FAVORITE:
      const stateFav = [...state];
      const idEditFav = stateFav.findIndex((f) => f.id === action.payload.id);
      stateFav[idEditFav] = {
        ...state[idEditFav],
        isFavorite: !stateFav[idEditFav].isFavorite,
      };
      return stateFav;
    case types.CHANGE_IMPORTANT:
      const stateImp = [...state];
      const idEditImp = stateImp.findIndex((f) => f.id === action.payload.id);
      stateImp[idEditImp] = {
        ...stateImp[idEditImp],
        isImportant: !stateImp[idEditImp].isImportant,
      };
      return stateImp;
    default:
      return state;
  }
};

export default fileInfoReducers;
