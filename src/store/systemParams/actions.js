import * as types from "./types";

const changeHeaderPathAction = (path) => {
  return {
    type: types.CHANGE_HEADER_PATH,
    payload: {
      path,
    },
  };
};

export {
  changeHeaderPathAction,
};
