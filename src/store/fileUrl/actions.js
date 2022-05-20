import * as types from "./types";
import { fileUrlService } from "services/fileUrlService";

const getFileUrlAction = id => {
  return async dispatch => {
    try {
      const fileUrl = await fileUrlService.getFileUrl(id);
      dispatch({
        type: types.GET_FILE_URL,
        payload: {
          editUrl: fileUrl[1],
          viewUrl: fileUrl[0],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getFileShareUrlAction = id => {
  return async dispatch => {
    try {
      const fileUrl = await fileUrlService.getFileShareUrl(id);
      dispatch({
        type: types.GET_FILE_SHARE_URL,
        payload: {
          shareUrl: fileUrl,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export { getFileUrlAction, getFileShareUrlAction };
