import * as types from "./types";
import { fileInfoService } from "services/fileInfoService";

const getMyContentsAction = () => {
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

const getImportantContentsAction = () => {
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

const getFavoriteContentsAction = () => {
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

const getSharedContentsAction = () => {
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

const getDepartmentContentsAction = () => {
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

const getTrashContentsAction = () => {
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

const getContentsFromPathAction = (dirId) => {
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

const searchContentsAction = (searchStr) => {
  return async (dispatch) => {
    try {
      if (!searchStr || searchStr.trim().length < 1) return;
      const obj = await fileInfoService.searchContents(searchStr);
      dispatch({
        type: types.SEARCH_CONTENTS,
        payload: {
          fileInfos: obj.fileInfos,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const changeFavoriteAction = (id, employeeId) => {
  return async (dispatch) => {
    try {
      await fileInfoService.changeFavorite(id, employeeId);
      dispatch({
        type: types.CHANGE_FAVORITE,
        payload: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const changeImportantAction = (id, employeeId) => {
  return async (dispatch) => {
    try {
      await fileInfoService.changeImportant(id, employeeId);
      dispatch({
        type: types.CHANGE_IMPORTANT,
        payload: {
          id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export {
  getMyContentsAction,
  getImportantContentsAction,
  getFavoriteContentsAction,
  getSharedContentsAction,
  getDepartmentContentsAction,
  getTrashContentsAction,
  getContentsFromPathAction,
  searchContentsAction,
  changeFavoriteAction,
  changeImportantAction,
};
