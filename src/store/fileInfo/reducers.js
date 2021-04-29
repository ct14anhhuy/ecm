import * as types from "./types";
import { fileInfo } from "../../mock/fileInfo";

const fileInfoReducers = (state = fileInfo, action) => {
  switch (action.type) {
    case types.CHANGE_FAVORITE:
      const stateFav = [...state];
      const idEdit = stateFav.findIndex((f) => f.Id === action.payload.id);
      stateFav[idEdit] = {
        ...state[idEdit],
        IsFavorite: !stateFav[idEdit].IsFavorite,
      };
      return stateFav;
    case types.CHANGE_IMPORTANT:
      const stateImp = [...state];
      const idEditImp= stateImp.findIndex((f) => f.Id === action.payload.id);
      stateImp[idEditImp] = {
        ...stateImp[idEditImp],
        IsImportant: !stateImp[idEditImp].IsImportant,
      };
      return stateImp;
    default:
      return state;
  }
};

export default fileInfoReducers;
