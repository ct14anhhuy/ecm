import * as types from "./types";

const initState = {
  editUrl: "",
  viewUrl: "",
  shareUrl: ""
};

const fileUrlReducers = (state = initState, action) => {
  switch (action.type) {
    case types.GET_FILE_URL:
      return {
        ...state,
        editUrl: action.payload.editUrl,
        viewUrl: action.payload.viewUrl
      };
    case types.GET_FILE_SHARE_URL:
      return {
        ...state,
        shareUrl: action.payload.shareUrl
      };
    default:
      return state;
  }
};

export default fileUrlReducers;
