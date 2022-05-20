import * as types from "./types";
import produce from "immer";

const initState = {
  editUrl: "",
  viewUrl: "",
  shareUrl: "",
};

const fileUrlReducers = (state = initState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case types.GET_FILE_URL:
        draft.editUrl = action.payload.editUrl;
        draft.viewUrl = action.payload.viewUrl;
        break;
      case types.GET_FILE_SHARE_URL:
        draft.shareUrl = action.payload.shareUrl;
        break;
      default:
        return state;
    }
  });

export default fileUrlReducers;
