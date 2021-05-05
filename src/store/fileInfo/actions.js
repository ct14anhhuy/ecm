import * as types from "./types";
import { fileInfoService } from "../../services/fileInfoService";

const getMyContents = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getMyContents();
      dispatch({
        type: types.GET_MY_CONTENTS,
        payload: {
          fileInfos: obj.fileInfos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getImportantContents = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getImportantContents();
      dispatch({
        type: types.GET_IMPORTANT_CONTENTS,
        payload: {
          fileInfos: obj.fileInfos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getFavoriteContents = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getFavoriteContents();
      dispatch({
        type: types.GET_FAVORITE_CONTENTS,
        payload: {
          fileInfos: obj.fileInfos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getSharedContents = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getSharedContents();
      dispatch({
        type: types.GET_SHARED_CONTENTS,
        payload: {
          fileInfos: obj.fileInfos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getDepartmentContents = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getDepartmentContents();
      dispatch({
        type: types.GET_DEPARTMENT_CONTENTS,
        payload: {
          fileInfos: obj.fileInfos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getTrashContents = () => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getTrashContents();
      dispatch({
        type: types.GET_TRASH_CONTENTS,
        payload: {
          fileInfos: obj.fileInfos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const getContentsFromPath = (dirId) => {
  return async (dispatch) => {
    try {
      const obj = await fileInfoService.getContentsFromPath(dirId);
      dispatch({
        type: types.GET_CONTENTS_FROM_PATH,
        payload: {
          fileInfos: obj.fileInfos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

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

export {
  getMyContents,
  getImportantContents,
  getFavoriteContents,
  getSharedContents,
  getDepartmentContents,
  getTrashContents,
  getContentsFromPath,
  changeFavorite,
  changeImportant,
};
