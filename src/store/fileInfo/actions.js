import * as types from "./types";

const changeFavorite = (id) => {
  return {
    type: types.CHANGE_FAVORITE,
    payload: {
      id,
    },
  };
};

const changeImportant = (id) => {
  return {
    type: types.CHANGE_IMPORTANT,
    payload: {
      id,
    },
  };
};

export { changeFavorite, changeImportant };
